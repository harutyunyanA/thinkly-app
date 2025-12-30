import type { IQuiz } from "../../types";

type QuizItemProps = {
  quiz: IQuiz;
};

export function QuizItem({ quiz }: QuizItemProps) {

  return (
    <div className="relative border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
          {quiz.imageURL ? (
            <img
              src={quiz.imageURL}
              alt={quiz.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg">{quiz.imageURL || "📘"}</span>
          )}
        </div>

        <div>
          <p className="font-semibold text-gray-900">{quiz.title}</p>
          <p className="text-gray-500 text-sm">{quiz.description}</p>

          <div className="flex gap-4 mt-1 text-xs text-gray-400">
            <p>{quiz.questions.length} questions</p>
            <p>Average Score {quiz.averageScore}</p>
            <p>Difficulty: {quiz.difficulty.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
