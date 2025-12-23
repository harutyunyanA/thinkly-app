import type { QuestionAnswerForm, QuizForm, QuizQuestion } from "../../types";
import { Circle, CircleDot, Trash2 } from "lucide-react";
import React from "react";

type SingleAnswerItemProps = {
  question: QuizQuestion;
  setQuiz: React.Dispatch<React.SetStateAction<QuizForm>>;
  answer: QuestionAnswerForm;
};

export function SingleAnswerItem({
  question,
  setQuiz,
  answer,
}: SingleAnswerItemProps) {
  const deleteAnswer = (questionKey: string, answerKey: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.key === questionKey
          ? { ...q, answers: q.answers.filter((a) => a.key !== answerKey) }
          : q
      ),
    }));
  };

  const updateAnswerText = (
    questionKey: string,
    answerKey: string,
    text: string
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.key === questionKey
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.key === answerKey ? { ...a, text } : a
              ),
            }
          : q
      ),
    }));
  };

  const selectSingleAnswer = (questionKey: string, answerKey: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.key !== questionKey) return q;

        return {
          ...q,
          answers: q.answers.map((a) => ({
            ...a,
            isCorrect: a.key === answerKey,
          })),
        };
      }),
    }));
  };

  return (
    <div
      className="
        w-full flex items-center gap-3
        px-4 py-3
        border border-gray-200 bg-white rounded-xl shadow-sm
        hover:bg-gray-50 transition
      "
    >
      <button
        type="button"
        onClick={() => selectSingleAnswer(question.key, answer.key)}
        className="
          flex items-center justify-center
          w-9 h-9 rounded-lg
          hover:bg-purple-50 transition
          text-purple-600
          shrink-0
        "
        aria-label="Select answer"
      >
        {answer.isCorrect ? (
          <CircleDot className="w-5 h-5" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      <input
        type="text"
        value={answer.text}
        onChange={(e) =>
          updateAnswerText(question.key, answer.key, e.target.value)
        }
        className="
          flex-1
          px-3 py-2
          rounded-lg border border-gray-200 bg-white
          text-gray-800
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300
          transition
        "
        placeholder="Answer text..."
      />

      <button
        type="button"
        className="
          p-2 rounded-lg
          hover:bg-red-50 text-red-500 transition
          shrink-0
        "
        onClick={() => {
          deleteAnswer(question.key, answer.key);
        }}
        aria-label="Delete answer"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
