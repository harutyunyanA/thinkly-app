import { QuizCard } from "../quizCard";

export function DashboardRecentQuizzes() {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Your Recent Quizzes</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuizCard title="JavaScript Basics" progress={80} />
        <QuizCard title="Frontend Roadmap" progress={65} />
        <QuizCard title="Algorithms" progress={73} />
      </div>

      <button className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
        Create New Quiz
      </button>
    </div>
  );
}
