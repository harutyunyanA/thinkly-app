import { CheckSquare, CircleDot } from "lucide-react";
import type { QuizQuestion } from "../../types";

type AnswerPreviewProprs = {
  question: QuizQuestion;
  answer: any;
};

export function AnswerPreview({ answer, question }: AnswerPreviewProprs) {
  return (
    <div
      key={answer.key}
      className={
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl border " +
        (answer.isCorrect
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-white")
      }
    >
      <div className={answer.isCorrect ? "text-green-600" : "text-purple-600"}>
        {question.multipleAnswers ? (
          <CheckSquare className="w-5 h-5" />
        ) : (
          <CircleDot className="w-5 h-5" />
        )}
      </div>
      <p className={answer.text ? "text-gray-800" : "text-red-600 opacity-70"}>
        {answer.text || "—"}
      </p>
    </div>
  );
}
