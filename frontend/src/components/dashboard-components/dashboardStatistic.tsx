import { StatCard } from "./statCard";
import { TrendingUp, Clock, CheckCircle, BookOpen } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Quizzes"
        value="42"
        icon={<BookOpen size={22} className="text-indigo-600" />}
      />

      <StatCard
        title="Completed"
        value="18"
        icon={<CheckCircle size={22} className="text-green-600" />}
      />

      <StatCard
        title="Avg. Score"
        value="78%"
        icon={<TrendingUp size={22} className="text-purple-600" />}
      />

      <StatCard
        title="Time Spent"
        value="12h"
        icon={<Clock size={22} className="text-orange-600" />}
      />
    </div>
  );
}
