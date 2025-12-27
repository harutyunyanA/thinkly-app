type ActivityItemProps = {
  title: string;
  details: string;
};

export function ActivityItem({ title, details }: ActivityItemProps) {
  return (
    <div className="border-b border-gray-200 py-3">
      <p className="font-medium text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">{details}</p>
    </div>
  );
}
