import type { IAttempt, IQuiz } from "../../types";
import { AttemptsTable } from "./userAttemptsTable";

type ResultsProps = {
  attempts: IAttempt[] | null;
  quiz: IQuiz;
};

export const QuizResults = ({ attempts, quiz }: ResultsProps) => {
  if (!attempts || attempts.length === 0)
    return (
      <div className="p-4 text-center text-gray-500">No data available</div>
    );

  const latestAttempt = attempts[attempts.length - 1];
  const totalAttempts = attempts.length;
  const maxScore = Math.max(...attempts.map((a) => a.score));
  const avgScore =
    attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts;

  const time =
    new Date(latestAttempt.finishedAt).getTime() -
    new Date(latestAttempt.createdAt).getTime();
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
        <p className="text-gray-600 mt-1">{quiz.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          Difficulty: <span className="font-medium">{quiz.difficulty}</span>
        </p>
      </div>

      <hr className="border-gray-300 my-6" />

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Your Result
        </h3>
        <div className="grid grid-cols-3 gap-4 text-gray-700">
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Correct Answers</p>
            <p className="text-lg font-semibold">
              {`${latestAttempt.correctCount} / ${latestAttempt.answers.length}`}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-lg font-semibold">
              {latestAttempt.score.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Time</p>
            <p className="text-lg font-semibold">
              {`${minutes}:${seconds.toString().padStart(2, "0")}`}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-6" />

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          All Attempts
        </h3>
        <p className="text-gray-600 mb-3">
          Attempts: <span className="font-medium">{totalAttempts}</span> | Max
          score: <span className="font-medium">{maxScore.toFixed(2)}%</span> |
          Avg score: <span className="font-medium">{avgScore.toFixed(2)}%</span>
        </p>
        <AttemptsTable attempts={attempts} />
      </div>
    </div>
  );
};
