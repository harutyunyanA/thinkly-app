import { DashboardStats } from "../../components/dashboard-components/dashboardStatistic";
import { DashboardActivity } from "../../components/dashboard-components/dashboardActivity";
import { DashboardLeaderboard } from "../../components/dashboard-components/dashboardLeaderboard";

export function Dashboard() {
  return (
    <div className="h-screen flex flex-col gap-10 overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        <DashboardActivity />
        <DashboardLeaderboard />
      </div>
    </div>
  );
}
