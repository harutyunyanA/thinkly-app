import type { QuizForm } from "../../types";
import { BadgeCheck, ListChecks } from "lucide-react";
import { QuestionPreview } from "./previewQuestion";

type PreviewQuizProps = {
  quiz: QuizForm;
};

export function PreviewQuiz({ quiz }: PreviewQuizProps) {
  const isTitleValid = Boolean(quiz.title?.trim());
  const isDescValid = Boolean(quiz.description?.trim());
  const hasQuestions = quiz.questions.length > 0;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="border border-gray-200 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              className={
                "text-2xl truncate " +
                (isTitleValid
                  ? "font-semibold text-gray-900"
                  : "text-red-600 opacity-70")
              }
            >
              {isTitleValid ? quiz.title : "Untitled quiz *"}
            </h2>

            <p
              className={
                "mt-2 " +
                (isDescValid
                  ? "text-gray-600"
                  : "text-red-600 opacity-70 truncate")
              }
            >
              {isDescValid ? quiz.description : "No description *"}
            </p>
          </div>

          <div className="shrink-0">
            <span
              className="
                inline-flex items-center gap-2
                px-3 py-1.5 rounded-full
                border border-gray-200 bg-gray-50
                text-gray-700 text-sm
              "
            >
              <BadgeCheck className="w-4 h-4 text-purple-600" />
              Difficulty: {quiz.difficulty?.toUpperCase?.() ?? "—"}
            </span>
          </div>
        </div>

        <div
          className={
            "mt-4 flex items-center gap-2 text-sm " +
            (hasQuestions ? "text-gray-500" : "text-red-600 opacity-70")
          }
        >
          <ListChecks className="w-4 h-4" />
          Questions: {hasQuestions ? quiz.questions.length : "0*"}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {quiz.questions.map((q, index) => (
          <QuestionPreview key={q.key} question={q} index={index} />
        ))}
      </div>
    </div>
  );
}
