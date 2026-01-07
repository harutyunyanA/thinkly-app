import type { IAttempt } from "../../types";
import { AllUsersAttemptsTable } from "./allUsersAttemptsTable";

type RecentCompletionsProps = {
  attempts: IAttempt[];
};

export function RecentCompletions({ attempts }: RecentCompletionsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">
          Recent Completions
        </h1>
        <p className="text-sm text-gray-500">
          Students who recently completed this quiz
        </p>
      </div>

      <div className="max-h-[420px] overflow-y-auto">
        <AllUsersAttemptsTable attempts={attempts} />
      </div>
    </div>
  );
}
