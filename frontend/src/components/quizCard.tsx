type QuizCardProps = {
  title: string;
  progress: number;
};

export function QuizCard({ title, progress }: QuizCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <p className="font-medium mb-2">{title}</p>

      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className="h-2 bg-indigo-600 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500 mt-2">Completion: {progress}%</p>
    </div>
  );
}
