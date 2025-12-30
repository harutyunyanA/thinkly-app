import { ChevronLeft, ChevronRight } from "lucide-react";
import { CreateQuizDetails } from "./quizDetails";
import { useState } from "react";
import type { IQuiz, IUser, QuizForm } from "../../types";
import { useOutletContext } from "react-router-dom";
import { CreateQuizQuestions } from "./createQuizQuestions";
import { PreviewQuiz } from "./previewQuiz";
import { AxiosError } from "axios";
import { Axios } from "../../lib/api";
import { validateQuiz } from "../../lib/validateQuiz";

type CreateQuizProps = {
  closeModal: () => void;
  addQuiz: (newQuiz: IQuiz) => void;
};

export function CreateQuiz({ closeModal, addQuiz }: CreateQuizProps) {
  const { userContext } = useOutletContext<{
    userContext: IUser | null;
  }>();

  const quizInitialData: QuizForm = {
    title: "",
    description: "",
    difficulty: "easy",
    category: "",
    imageURL: "",
    owner: userContext?._id ?? "",
    questions: [
      {
        text: "",
        answers: [
          { text: "", isCorrect: false, key: String(crypto.randomUUID()) },
        ],
        multipleAnswers: false,
        imageUrl: "",
        key: String(crypto.randomUUID()),
      },
    ],
    randomized: true,
  };

  const [quiz, setQuiz] = useState<QuizForm>(quizInitialData);
  const [page, setPage] = useState(1);
  const validQuiz = validateQuiz(quiz);

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

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create New Quiz
            </h1>
            <p className="text-sm text-gray-500">
              Add questions, set answers and configure quiz settings
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {page === 1 && <CreateQuizDetails quiz={quiz} setQuiz={setQuiz} />}

        {page === 2 && <CreateQuizQuestions quiz={quiz} setQuiz={setQuiz} />}

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
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              onClick={() => {
                console.log(quiz);
                setPage(3);
              }}
            >
              Preview & Publish
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
                className="flex items-center gap-2 px-4 py-2 rounded-md transition bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!validQuiz}
                onClick={() => {
                  Axios.post("/quiz", quiz)
                    .then((res) => {
                      addQuiz(res.data.payload);
                      console.log("successfully added new quiz");
                      closeModal();
                    })
                    .catch((err: AxiosError<{ message: string }>) => {
                      console.log(err.response?.data.message);
                    });
                }}
              >
                Publish
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
