import { useEffect, useState } from "react";
import type { QuizForm } from "../../types";
import { Axios } from "../../lib/api";
import type { AxiosError } from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EditQuizDetails } from "../editQuiz-components/editQuizDetails";
import { EditQuizQuestions } from "../editQuiz-components/editQuizQuestions";
import { convertQuiz } from "../../lib/convertQuiz";
import { PreviewQuiz } from "../createQuiz-components/previewQuiz";
import { validateQuiz } from "../../lib/validateQuiz";

type EditQuizProps = {
  quizId: string;
  closeModal: () => void;
};

export function EditQuiz({ quizId, closeModal }: EditQuizProps) {
  const [quiz, setQuiz] = useState<QuizForm | null>(null);
  const [page, setPage] = useState(1);

  const validQuiz = quiz ? validateQuiz(quiz) : false;

  useEffect(() => {
    Axios.get(`/quiz/${quizId}/info`)
      .then((res) => {
        setQuiz(convertQuiz(res.data.payload));
      })
      .catch(() => {
        closeModal();
      });
  }, [quizId, closeModal]);

  //---safe quiz!==null
  const setSafeQuiz: React.Dispatch<React.SetStateAction<QuizForm>> = (
    action
  ) => {
    setQuiz((prev) => {
      if (!prev) return prev;

      return typeof action === "function" ? action(prev) : action;
    });
  };
  // -------------------------------------

  if (!quiz) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Edit Quiz</h1>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {page === 1 && <EditQuizDetails quiz={quiz} setQuiz={setSafeQuiz} />}

        {page === 2 && <EditQuizQuestions quiz={quiz} setQuiz={setSafeQuiz} />}

        {page === 3 && <PreviewQuiz quiz={quiz} />}

        {page === 3 && !validQuiz && (
          <div className="px-6 py-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            <p>Fill all required fields *</p>
          </div>
        )}
      </div>

      <div className="flex justify-end p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex gap-3">
          {page === 2 && (
            <button
              onClick={() => setPage(page - 1)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
          )}

          {page === 1 && (
            <button
              onClick={() => setPage(2)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {page === 2 && (
            <button
              onClick={() => setPage(3)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Preview & Save
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {page === 3 && (
            <div className="flex items-center gap-2 px-4">
              <button
                onClick={() => setPage(page - 1)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              <button
                disabled={!validQuiz}
                className="flex items-center gap-2 px-4 py-2 rounded-md transition
                  bg-indigo-600 text-white hover:bg-indigo-700
                  disabled:bg-gray-300 disabled:text-gray-600
                  disabled:hover:bg-gray-300 disabled:cursor-not-allowed"
                onClick={() => {
                  Axios.patch(`/quiz/${quizId}`, quiz)
                    .then(() => {
                      console.log("quiz edited successfully");
                      closeModal();
                    })
                    .catch((err: AxiosError<{ message: string }>) => {
                      console.log(err.response?.data.message);
                    });
                }}
              >
                Save
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
