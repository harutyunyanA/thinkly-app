import { Circle, CircleDot, Square, SquareCheck } from "lucide-react";
import type { IAnswer } from "../../types";

type MultiAnswerItemProps = {
  answer: IAnswer;
  isSelected: boolean;
  onSelect: () => void;
};

export function MultiAnswerItem({
  answer,
  isSelected,
  onSelect,
}: MultiAnswerItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition
        ${
          isSelected
            ? "bg-indigo-100 border-indigo-500"
            : "bg-white border-gray-200 hover:bg-gray-100"
        }
      `}
    >
      <span className="flex-shrink-0 text-indigo-600">
        {isSelected ? (
          <SquareCheck className="w-5 h-5" />
        ) : (
          <Square className="w-5 h-5" />
        )}
      </span>

      <span className="text-gray-800">{answer.text}</span>
    </div>
  );
}
