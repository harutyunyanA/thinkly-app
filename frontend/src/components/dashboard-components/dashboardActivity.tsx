import { useEffect, useState } from "react";
import type { IQuiz } from "../../types";
import { Axios } from "../../lib/api";
import { QuizItem } from "./quizItem";
import { useDebounce } from "../../lib/hooks/useDebounce";
import { Search } from "lucide-react";

export function DashboardActivity() {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const s = debouncedSearch.toLowerCase();
    return quiz.title.toLowerCase().includes(s);
    // quiz.description.toLowerCase().includes(s)
  });

  useEffect(() => {
    Axios.get("/quiz").then((res) => {
      setQuizzes(res.data.payload);
    });
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-6 col-span-2 h-full flex flex-col overflow-hidden">
      <h2 className="text-lg font-semibold">Recent Quizzes</h2>
      <div className="flex justify-between items-center flex-wrap gap-4">
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
      <div className="flex flex-col gap-2 mt-4 flex-1 overflow-y-auto">
        {filteredQuizzes.length ? (
          filteredQuizzes.map((quiz) => <QuizItem key={quiz._id} quiz={quiz} />)
        ) : (
          <p className="text-gray-500 text-sm">No quizzes found</p>
        )}
      </div>
    </div>
  );
}
