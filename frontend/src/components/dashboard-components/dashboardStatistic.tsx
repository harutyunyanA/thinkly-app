import { StatCard } from "./statCard";
import { TrendingUp, Clock, CheckCircle, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Axios } from "../../lib/api";

type dashboardStat = {
  totalQuizzes: number;
  avgScore: number;
  timeSpent: number;
  completed: number;
};
export function DashboardStats() {
  const [data, setData] = useState<dashboardStat | null>(null);

  useEffect(() => {
    Axios.get("/user/dashboardStat").then((res) => {
      setData(res.data.payload);
    });
  }, []);

  const time = data?.timeSpent ?? 0;

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Quizzes"
        value={data?.totalQuizzes || 0}
        icon={<BookOpen size={22} className="text-indigo-600" />}
      />

      <StatCard
        title="Completed"
        value={data?.completed || 0}
        icon={<CheckCircle size={22} className="text-green-600" />}
      />

      <StatCard
        title="Avg. Score"
        value={`${data?.avgScore || 0}%`}
        icon={<TrendingUp size={22} className="text-purple-600" />}
      />

      <StatCard
        title="Time Spent"
        value={`${hours}h ${String(minutes).padStart(2, "0")}m`}
        icon={<Clock size={22} className="text-orange-600" />}
      />
    </div>
  );
}
