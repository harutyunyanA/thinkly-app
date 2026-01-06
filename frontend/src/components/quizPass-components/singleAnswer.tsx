import { Circle, CircleDot } from "lucide-react";
import type { IAnswer } from "../../types";

type SingleAnswerItemProps = {
  answer: IAnswer;
  isSelected: boolean;
  onSelect: () => void;
};

export function SingleAnswerItem({
  answer,
  isSelected,
  onSelect,
}: SingleAnswerItemProps) {
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
      <span className="shrink-0 text-indigo-600">
        {isSelected ? (
          <CircleDot className="w-5 h-5" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </span>

      <span className="text-gray-800">{answer.text}</span>
    </div>
  );
}
