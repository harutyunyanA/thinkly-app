import { LeaderItem } from "../leaderItem";

export function DashboardLeaderboard() {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>

      <LeaderItem place={1} name="Emma Johnson" score="980" />
      <LeaderItem place={2} name="Alex Green" score="940" />
      <LeaderItem place={3} name="Sophia Lee" score="900" />
    </div>
  );
}
