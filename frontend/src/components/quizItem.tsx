import { MoreHorizontal } from "lucide-react";
import type { IQuiz } from "../types";

type QuizItemProps = {
  quiz: IQuiz;
};

export function QuizItem({ quiz }: QuizItemProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        
        {/* IMAGE */}
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
          {quiz.imageURL ? (
            <img
              src={quiz.imageURL}
              alt={quiz.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg">📘</span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-gray-900">{quiz.title}</p>
          </div>

          <p className="text-gray-500 text-sm">{quiz.description}</p>

          {/* Metadata */}
          <div className="flex gap-4 mt-1 text-xs text-gray-400">
            <p>{quiz.questions.length} questions</p>
            <p>Average Score {quiz.averageScore}</p>
            <p>
              Created {new Date(quiz.createdAt).toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-1.5 border rounded-md text-sm hover:bg-gray-100">
          View
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-md">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
