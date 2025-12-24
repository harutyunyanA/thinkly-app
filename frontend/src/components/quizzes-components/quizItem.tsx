import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ActionMenu } from "./actionMenu";
import type { IQuiz } from "../../types";

type QuizItemProps = {
  deleteQuiz: (quizID:string) => void;
  quiz: IQuiz;
};

export function QuizItem({ quiz, deleteQuiz }: QuizItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition">
      {/* LEFT */}
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
            <p>Created {new Date(quiz.createdAt).toLocaleString("en-US")}</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex items-center gap-2">
        <button className="px-4 py-1.5 border rounded-md text-sm hover:bg-gray-100">
          View
        </button>

        <button
          id="showMore"
          className="p-2 hover:bg-gray-100 rounded-md"
          onClick={() => setIsMenuOpen(true)}
        >
          <MoreHorizontal size={18} />
        </button>

        {isMenuOpen && (
          <ActionMenu onClose={() => setIsMenuOpen(false)} quiz={quiz} deleteQuiz={deleteQuiz}/>
        )}
      </div>
    </div>
  );
}
