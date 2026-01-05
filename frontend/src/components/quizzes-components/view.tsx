import { useEffect, useState } from "react";
import type { IQuiz } from "../../types";
import { BadgeCheck, ListChecks, CheckSquare, CircleDot } from "lucide-react";
import { Axios } from "../../lib/api";

type ViewQuizProps = {
  quizId: string;
  closeModal: () => void;
};

export function ViewQuiz({ quizId, closeModal }: ViewQuizProps) {
  const [quiz, setQuiz] = useState<IQuiz>();
  useEffect(() => {
    Axios.get(`/quiz/${quizId}/info`)
      .then((res) => {
        setQuiz(res.data.payload);
      })
      .catch(() => {
        closeModal();
      });
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="border border-gray-200 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold text-gray-900 truncate">
              {quiz?.title}
            </h2>

            {quiz?.description && (
              <p className="mt-2 text-gray-600">{quiz.description}</p>
            )}
          </div>

          <div className="shrink-0">
            <span
              className="
                inline-flex items-center gap-2
                px-3 py-1.5 rounded-full
                border border-gray-200 bg-gray-50
                text-gray-700 text-sm
              "
            >
              <BadgeCheck className="w-4 h-4 text-purple-600" />
              Difficulty: {quiz?.difficulty.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <ListChecks className="w-4 h-4" />
          Questions: {quiz?.questions.length}
        </div>
      </div>

      <div className="space-y-4">
        {quiz?.questions.map((question, index) => (
          <div
            key={question._id}
            className="border border-gray-200 bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span
                    className="
                      inline-flex items-center justify-center
                      w-8 h-8 rounded-lg
                      bg-purple-50 text-purple-700
                      border border-purple-100
                      text-sm font-semibold
                      shrink-0
                    "
                  >
                    {index + 1}
                  </span>

                  <h3 className="text-lg font-semibold text-gray-900">
                    {question.text}
                  </h3>
                </div>
              </div>

              <span
                className="
                  shrink-0 inline-flex items-center gap-2
                  px-3 py-1.5 rounded-full
                  border border-gray-200 bg-gray-50
                  text-gray-700 text-sm
                "
              >
                {question.multipleAnswers ? (
                  <>
                    <CheckSquare className="w-4 h-4 text-purple-600" />
                    Multiple answers
                  </>
                ) : (
                  <>
                    <CircleDot className="w-4 h-4 text-purple-600" />
                    Single answer
                  </>
                )}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {question.answers.map((answer) => (
                <div
                  key={answer._id}
                  className={
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border " +
                    (answer.isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white")
                  }
                >
                  <div
                    className={
                      answer.isCorrect ? "text-green-600" : "text-purple-600"
                    }
                  >
                    {question.multipleAnswers ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <CircleDot className="w-5 h-5" />
                    )}
                  </div>

                  <p className="text-gray-800">{answer.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
