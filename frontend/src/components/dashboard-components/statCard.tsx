type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
