import { DashboardStats } from "./dashboard/dashboardStatistic";
import { DashboardActivity } from "./dashboard/dashboardActivity";
import { DashboardLeaderboard } from "./dashboard/dashboardLeaderboard";
import { DashboardRecentQuizzes } from "./dashboard/dashboardRecentQuizzes";

export function Dashboard() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardActivity />
        <DashboardLeaderboard />
      </div>

      <DashboardRecentQuizzes />
    </div>
  );
}
