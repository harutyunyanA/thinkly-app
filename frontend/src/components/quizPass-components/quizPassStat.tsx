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
    <div>
      <div>
        <p className="text-sm text-gray-500">Answered</p>
        <p className="text-sm text-gray-700">
          {answeredCount}/{answersState.length}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Correct</p>
        <p className="text-sm text-gray-700">
          {correctCount}/{answersState.length}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Score</p>
        <p className="text-sm text-gray-700">{score}%</p>
      </div>
    </div>
  );
}
