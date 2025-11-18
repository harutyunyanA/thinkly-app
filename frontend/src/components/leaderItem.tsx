type LeaderItemProps = {
  place: number;
  name: string;
  score: string | number;
};

export function LeaderItem({ place, name, score }: LeaderItemProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <div className="flex items-center gap-3">
        <span className="font-bold text-indigo-600">{place}</span>
        <span className="font-medium">{name}</span>
      </div>
      <span className="text-gray-700 font-semibold">{score}</span>
    </div>
  );
}
