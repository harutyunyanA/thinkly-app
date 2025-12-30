import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IQuiz } from "../../types";
import {
  Brain,
  ChartColumn,
  ChevronLeft,
  CircleCheck,
  Share2,
  Star,
} from "lucide-react";
import { RecentCompletions } from "../../components/quizPass-components/recentCompletions";
import { Modal } from "../../components/modal";
import { ShareQuiz } from "../../components/quizPass-components/shareQuiz";

export function QuizPassDetails() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    Axios.get("quiz/" + quizId).then((res) => {
      setQuiz(res.data.payload);
    });
  }, [quizId]);
  console.log(quiz);
  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div id="title" className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <Link
            to="/home"
            className="mt-1 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600 mt-1 max-w-xl">{quiz.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-200 transition cursor-pointer text-gray-700"
            onClick={() => setIsShareOpen(true)}
          >
            <Share2 size={18} />
            Share
          </button>

          <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition cursor-pointer">
            Start Quiz
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        id="stat-info"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Difficulty */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl">
            <Brain size={22} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Difficulty</p>
            <p className="text-lg font-semibold text-gray-900">
              {quiz.difficulty.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Completions */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <CircleCheck size={22} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completions</p>
            <p className="text-lg font-semibold text-gray-900">
              {quiz.completions}
            </p>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <ChartColumn size={22} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="text-lg font-semibold text-gray-900">
              {quiz.averageScore}
            </p>
          </div>
        </div>

        {/* Top Score */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl">
            <Star size={22} className="text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Top Score</p>
            <p className="text-lg font-semibold text-gray-900">
              {quiz.topScore}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Completions */}
      <div
        id="recent-comp"
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >
        <RecentCompletions />
      </div>
      <Modal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)}>
        <ShareQuiz />
      </Modal>
    </div>
  );
}
