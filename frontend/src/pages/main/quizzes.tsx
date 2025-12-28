import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Axios } from "../../lib/api";
import type { IQuiz, IResponse, IUser } from "../../types";
import { useOutletContext } from "react-router-dom";
import { QuizItem } from "../../components/quizzes-components/quizItem";
import { useDebounce } from "../../lib/hooks/useDebounce";
import { Modal } from "../../components/modal";
import { CreateQuiz } from "../../components/createQuiz-components/createQuiz";

export function Quizzes() {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userContext } = useOutletContext<{
    userContext: IUser | null;
    setUserContext: (u: IUser | null) => void;
  }>();

  useEffect(() => {
    if (!userContext) return;

    Axios.get<IResponse<IQuiz[]>>(`/quiz/user/${userContext._id}`).then(
      (res) => {
        if (res.data.success && res.data.payload) {
          setQuizzes(res.data.payload);
        }
      }
    );
  }, [userContext]);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const s = debouncedSearch.toLowerCase();
    return (
      quiz.title.toLowerCase().includes(s) ||
      quiz.description.toLowerCase().includes(s)
    );
  });

  function deleteQuiz(quizID: string) {
    console.log("deleted");
    setQuizzes((prev) => prev.filter((q) => q._id !== quizID));
  }

  function addQuiz(newQuiz: IQuiz) {
    setQuizzes((prev) => [newQuiz, ...prev]);
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
          <p className="text-gray-600">
            Create, manage and analyze your quizzes
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          + Create New Quiz
        </button>
      </div>

      {/* ---------- CONTENT CARD ---------- */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold">Quiz Library</h2>
          <p className="text-gray-500 text-sm">
            Browse and manage all your quizzes
          </p>
        </div>

        {/* Search bar */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <input
              type="search"
              placeholder="Search quizzes..."
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ---------- QUIZ LIST ---------- */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredQuizzes.length ? (
            filteredQuizzes.map((quiz) => (
              <QuizItem
                key={quiz._id}
                quiz={quiz}
                deleteQuiz={deleteQuiz}
                addQuiz={addQuiz}
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm">No quizzes found</p>
          )}
        </div>
      </div>

      {/* ---------- MODAL ---------- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateQuiz
          closeModal={() => setIsModalOpen(false)}
          addQuiz={addQuiz}
        />
      </Modal>
    </div>
  );
}
