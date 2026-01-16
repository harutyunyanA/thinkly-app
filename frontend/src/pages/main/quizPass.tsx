import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { IQuiz } from "../../types";
import { ChevronLeft } from "lucide-react";
import { Axios } from "../../lib/api";
import { QuizPassQuestion } from "../../components/quizPass-components/quizPassQuestion";
import { Modal } from "../../components/modal";
import { ExitQuizContent } from "../../components/quizPass-components/quizExitModal";
import { QuizPassStat } from "../../components/quizPass-components/quizPassStat";
import { QuizResults } from "../../components/quizPass-components/results";
import Loader from "../../components/loader";

export type AnswerState = {
  questionIndex: number;
  selectedAnswers: string[];
  isCorrect: boolean | null;
};

export function QuizPass() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [question, setQuestion] = useState<number>(0);
  const [attemptId, setAttemptId] = useState<string>("");
  const [answersState, setAnswersState] = useState<AnswerState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [userAttempts, setUserAttempts] = useState<any>(null);
  const [result, setResult] = useState<boolean>(false);

  function handleAnswerSubmit(selectedAnswers: string[], isCorrect: boolean) {
    setAnswersState((prev) =>
      prev.map((a) =>
        a.questionIndex === question ? { ...a, selectedAnswers, isCorrect } : a
      )
    );
  }

  function closeResults() {
    setResult(false);
    navigate("/home/quiz/" + quizId);
  }

  function hasUnansweredQuestions() {
    return answersState.some((a) => a.isCorrect === null);
  }

  useEffect(() => {
    if (!quizId) {
      setError("Quiz id is missing");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError("");

        const quizRes = await Axios.get("quiz/" + quizId);
        setQuiz(quizRes.data.payload);

        setAnswersState(
          quizRes.data.payload.questions.map((_: any, i: number) => ({
            questionIndex: i,
            selectedAnswers: [],
            isCorrect: null,
          }))
        );

        const attemptRes = await Axios.post("/attempt/start", { quiz: quizId });
        setAttemptId(attemptRes.data.payload.attemptId);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Something went wrong while loading the quiz"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [quizId]);

  useEffect(() => {
    const answeredCount = answersState.filter(
      (a) => a.isCorrect !== null
    ).length;

    if (answeredCount === quiz?.questions.length && attemptId) {
      Axios.post(`/attempt/${attemptId}/complete`).then((res) => {
        setUserAttempts(res.data.payload);
        setResult(true);
      });
    }
  }, [answersState, quiz?.questions.length, attemptId]);

  if (loading) {
    return <Loader fullscreen />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-red-600 font-medium">{error}</p>
        <Link
          to="/home"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Go back
        </Link>
      </div>
    );
  }

  if (!quiz || !attemptId) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader size={80} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl py-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            if (hasUnansweredQuestions()) {
              setIsExitModalOpen(true);
            }
          }}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <p className="text-lg font-semibold text-gray-800">{quiz.title}</p>
      </div>

      <div className="grid grid-cols-[220px_1fr_220px] gap-6">
        <div className="flex flex-col gap-2 p-4 border rounded-xl bg-white">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              onClick={() => setQuestion(i)}
              className={`
                p-2 text-sm rounded-lg cursor-pointer transition
                ${
                  answersState[i].isCorrect === true
                    ? "bg-green-100 text-green-700 font-medium"
                    : answersState[i].isCorrect === false
                    ? "bg-red-100 text-red-700 font-medium"
                    : question === i
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              Question {i + 1}
            </div>
          ))}
        </div>

        <div className="p-6 border rounded-xl bg-white">
          <QuizPassQuestion
            question={quiz.questions[question]}
            attemptId={attemptId}
            answerState={answersState[question]}
            onAnswerSubmit={handleAnswerSubmit}
            setQuestion={setQuestion}
            quizLength={quiz.questions.length}
          />
        </div>

        <div className="p-4 border rounded-xl bg-white flex flex-col gap-3">
          <QuizPassStat answersState={answersState} />
        </div>
      </div>

      <Modal isOpen={isExitModalOpen} onClose={() => setIsExitModalOpen(false)}>
        <ExitQuizContent
          setIsExitModalOpen={setIsExitModalOpen}
          attemptId={attemptId}
        />
      </Modal>

      {quiz && userAttempts && (
        <Modal isOpen={result} onClose={closeResults}>
          <QuizResults attempts={userAttempts} quiz={quiz} />
        </Modal>
      )}
    </div>
  );
}
