import type { QuizQuestion } from "../../types";
import { CheckSquare, CircleDot, ListChecks } from "lucide-react";
import { AnswerPreview } from "./answerPreview";

type QuestionPreviewProps = {
  question: QuizQuestion;
  index: number;
};

export function QuestionPreview({ question, index }: QuestionPreviewProps) {
  const hasAnswers = question.answers.length > 0;

  return (
    <div className="border border-gray-200 bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span
              className="
                inline-flex items-center justify-center
                w-8 h-8 rounded-lg
                bg-purple-50 text-purple-700
                border border-purple-100
                text-sm font-semibold
                shrink-0
              "
            >
              {index + 1}
            </span>

            <h3
              className={
                "text-lg " +
                (question.text?.trim()
                  ? "font-semibold text-gray-900"
                  : "text-red-600 opacity-70")
              }
            >
              {question.text?.trim() ? question.text : "Untitled question *"}
            </h3>
          </div>

          <div
            className={
              "mt-3 flex items-center gap-2 text-sm " +
              (hasAnswers ? "text-gray-500" : "text-red-600 opacity-70")
            }
          >
            <ListChecks className="w-4 h-4" />
            Answers: {hasAnswers ? question.answers.length : "0*"}
          </div>
        </div>

        <span
          className="
            shrink-0 inline-flex items-center gap-2
            px-3 py-1.5 rounded-full
            border border-gray-200 bg-gray-50
            text-gray-700 text-sm
          "
        >
          {question.multipleAnswers ? (
            <>
              <CheckSquare className="w-4 h-4 text-purple-600" />
              Multiple answers
            </>
          ) : (
            <>
              <CircleDot className="w-4 h-4 text-purple-600" />
              Single answer
            </>
          )}
        </span>
      </div>

      {/* Answers */}
      <div className="mt-4 space-y-2">
        {question.answers.map((a) => (
          <AnswerPreview key={a.key} answer={a} question={question} />
        ))}
      </div>
    </div>
  );
}
