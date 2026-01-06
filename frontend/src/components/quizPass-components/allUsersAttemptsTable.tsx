import type { IAttempt } from "../../types";

type AttemptsTableProps = {
  attempts: IAttempt[];
};

export const AllUsersAttemptsTable = ({ attempts }: AttemptsTableProps) => {
  if (!attempts || attempts.length === 0)
    return <p className="text-gray-500 p-4">No attempts yet</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left border-b border-gray-200">#</th>
            <th className="px-4 py-3 text-left border-b border-gray-200">
              User
            </th>
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

            return (
              <tr key={attempt._id}>
                <td className="px-4 py-2 border-b border-gray-200">
                  {index + 1}
                </td>

                <td className="px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    {attempt.user.avatar && (
                      <img
                        src={attempt.user.avatar}
                        alt={attempt.user.username}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span>{attempt.user.username}</span>
                  </div>
                </td>

                <td className="px-4 py-2 border-b border-gray-200">
                  {attempt.score.toFixed(2)}
                </td>

                <td className="px-4 py-2 border-b border-gray-200">
                  {attempt.correctCount} / {attempt.answers.length}
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
