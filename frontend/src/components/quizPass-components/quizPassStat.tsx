import type { AnswerState } from "../../pages/main/quizPass";

type QuizPassStat = {
  answersState: AnswerState[];
};

export function QuizPassStat({ answersState }: QuizPassStat) {
  const answeredCount = answersState.filter((a) => a.isCorrect !== null).length;
  const correctCount = answersState.filter((a) => a.isCorrect === true).length;
  const score =
    answeredCount > 0 ? ((correctCount / answeredCount) * 100).toFixed(2) : "0";

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Answered</span>
        <span className="font-medium text-gray-800">
          {answeredCount}/{answersState.length}
        </span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Correct</span>
        <span className="font-medium text-gray-800">
          {correctCount}/{answersState.length}
        </span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Score</span>
        <span className="font-medium text-gray-800">{score}%</span>
      </div>
    </div>
  );
}
