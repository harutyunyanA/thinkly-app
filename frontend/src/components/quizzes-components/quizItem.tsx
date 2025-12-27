import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ActionMenu } from "./actionMenu";
import type { IQuiz } from "../../types";
import { Modal } from "../modal";
import { ViewQuiz } from "./view";
import { EditQuiz } from "./editQuiz";

type QuizItemProps = {
  deleteQuiz: (quizID: string) => void;
  quiz: IQuiz;
};

export function QuizItem({ quiz, deleteQuiz }: QuizItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isViewQuizOpen, setIsViewQuizOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
            <p>Difficulty: {quiz.difficulty.toUpperCase()}</p>
            <p>Created {new Date(quiz.createdAt).toLocaleString("en-US")}</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex items-center gap-2">
        <button
          className="px-4 py-1.5 border rounded-md text-sm hover:bg-gray-100"
          onClick={() => setIsViewQuizOpen(true)}
        >
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
          <ActionMenu
            onClose={() => setIsMenuOpen(false)}
            quiz={quiz}
            deleteQuiz={deleteQuiz}
            setIsEditOpen={setIsEditOpen}
          />
        )}
      </div>

      <Modal isOpen={isViewQuizOpen} onClose={() => setIsViewQuizOpen(false)}>
        <ViewQuiz
          closeModal={() => setIsViewQuizOpen(false)}
          quizId={quiz._id}
        />
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <EditQuiz closeModal={() => setIsEditOpen(false)} quizId={quiz._id} />
      </Modal>
    </div>
  );
}
