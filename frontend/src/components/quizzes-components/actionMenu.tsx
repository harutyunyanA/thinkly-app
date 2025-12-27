import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Axios } from "../../lib/api";
import type { IQuiz } from "../../types";

type ActionMenuProps = {
  onClose: () => void;
  deleteQuiz: (quizID: string) => void;
  setIsEditOpen: (boolean: boolean) => void;
  quiz: IQuiz;
};

export function ActionMenu({
  onClose,
  quiz,
  deleteQuiz,
  setIsEditOpen,
}: ActionMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(e: MouseEvent) {
    if (!menuRef.current?.contains(e.target as Node)) {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
    >
      <button
        type="button"
        onClick={() => {
          onClose();
          setIsEditOpen(true);
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition text-left"
      >
        <Pencil size={16} className="shrink-0" />
        <span>Edit</span>
      </button>

      <div className="h-px bg-gray-100" />

      <button
        type="button"
        onClick={() => {
          Axios.delete("/quiz/" + quiz._id).then(() => {
            deleteQuiz(quiz._id);
          });
          onClose();
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition text-left"
      >
        <Trash2 size={16} className="shrink-0" />
        <span>Delete</span>
      </button>
    </div>
  );
}
