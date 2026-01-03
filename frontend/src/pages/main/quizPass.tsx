import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IQuiz } from "../../types";
import { ChevronLeft } from "lucide-react";
import { Axios } from "../../lib/api";
import { QuizPassQuestion } from "../../components/quizPass-components/quizPassQuestion";

export function QuizPass() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [question, setQuestion] = useState<number>(0);
  const [answered, setAnswered] = useState<number>(0);
  const [attemptId, setAttemptId] = useState<string>("");

  useEffect(() => {
    Axios.get("quiz/" + quizId).then((res) => {
      setQuiz(res.data.payload);
    });

    Axios.post("attempt/start", { quiz: quizId }).then((res) => {
      setAttemptId(res.data.payload.attemptId);
    });
  }, []);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl py-4">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to={"/home/quiz/" + quizId}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <p className="text-lg font-semibold text-gray-800">{quiz.title}</p>
      </div>

      <div id="mainBlock" className="grid grid-cols-[220px_1fr_220px] gap-6">
        <div
          id="qustionOrder"
          className="flex flex-col gap-2 p-4 border border-gray-200 rounded-xl bg-white"
        >
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              onClick={() => setQuestion(i)}
              className={`
                p-2 text-sm rounded-lg cursor-pointer transition
                ${
                  question === i
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              Question {i + 1}
            </div>
          ))}
        </div>

        <div
          id="questionContent"
          className="p-6 border border-gray-200 rounded-xl bg-white "
        >
          <QuizPassQuestion question={quiz.questions[question]} />
        </div>

        <div
          id="quizStat"
          className="p-4 border border-gray-200 rounded-xl bg-white flex flex-col gap-3"
        >
          <p className="text-sm text-gray-500">Progress</p>
          <p className="text-sm text-gray-700">
            {question + 1} / {quiz.questions.length}
          </p>
        </div>
      </div>
    </div>
  );
}
