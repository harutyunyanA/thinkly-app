import { useEffect, useState } from "react";
import type { IQuiz } from "../../types";
import { Axios } from "../../lib/api";
import { QuizItem } from "./quizItem";
import { useDebounce } from "../../lib/hooks/useDebounce";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../loader";

export function DashboardActivity() {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 250);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);

    Axios.get("/quiz")
      .then((res) => {
        setQuizzes(res.data.payload);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-6 col-span-2 h-full flex flex-col overflow-hidden">
      <h2 className="text-lg font-semibold">Recent Quizzes</h2>

      <div className="flex justify-between items-center flex-wrap gap-4 mt-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="search"
            placeholder="Search quizzes..."
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="relative flex-1 mt-4 overflow-y-auto flex flex-col gap-2">
        {loading && (
          <div className="flex justify-center">
            <Loader size={80} />
          </div>
        )}

        <>
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <Link to={"/home/quiz/" + quiz._id} key={quiz._id}>
                <QuizItem quiz={quiz} />
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-sm mt-2">No quizzes found</p>
          )}
        </>
      </div>
    </div>
  );
}
