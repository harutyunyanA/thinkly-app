import { DashboardStats } from "./dashboard/dashboardStatistic";
import { DashboardActivity } from "./dashboard/DashboardActivity";
import { DashboardLeaderboard } from "./dashboard/DashboardLeaderboard";
import { DashboardRecentQuizzes } from "./dashboard/DashboardRecentQuizzes";

export function Dashboard() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">
          Welcome back! Here’s your learning overview.
        </p>
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
