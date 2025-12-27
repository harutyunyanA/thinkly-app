import { ActivityItem } from "./activityItem";

export function DashboardActivity() {
  return (
    <div className="bg-white shadow rounded-xl p-6 col-span-2">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <ActivityItem
        title="Completed quiz: JavaScript Basics"
        details="Score: 92%"
      />
      <ActivityItem
        title="Started quiz: HTML & CSS Challenge"
        details="15 questions"
      />
      <ActivityItem
        title="New quiz added: Algorithms Mastery"
        details="Advanced level"
      />
    </div>
  );
}
