import type { IAttempt } from "../../types";

type AttemptsTableProps = {
  attempts: IAttempt[];
};

export const AttemptsTable = ({ attempts }: AttemptsTableProps) => {
  if (!attempts || attempts.length === 0)
    return <p className="text-gray-500">No attempts yet</p>;

  const maxScore = Math.max(...attempts.map((a) => a.score));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left border-b border-gray-200">#</th>
            <th className="px-4 py-3 text-left border-b border-gray-200">
              Score (%)
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-200">
              Correct Answers
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-200">
              Date
            </th>
            <th className="px-4 py-3 text-left border-b border-gray-200">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {attempts.map((attempt, index) => {
            const attemptTime =
              new Date(attempt.finishedAt).getTime() -
              new Date(attempt.createdAt).getTime();
            const m = Math.floor(attemptTime / 60000);
            const s = Math.floor((attemptTime % 60000) / 1000);

            const isMax = attempt.score === maxScore;

            return (
              <tr
                key={attempt._id}
                className={isMax ? "bg-green-50 font-semibold" : ""}
              >
                <td className="px-4 py-2 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {attempt.score.toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {attempt.correctCount} / {attempt.answers?.length ?? 0}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {new Date(attempt.finishedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {m}:{s.toString().padStart(2, "0")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
