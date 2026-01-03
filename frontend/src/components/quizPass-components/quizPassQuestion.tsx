import { useEffect, useState } from "react";
import type { IQuestion } from "../../types";
import { SingleAnswerItem } from "./singleAnswer";
import { MultiAnswerItem } from "./MultiAnswer";
import { Axios } from "../../lib/api";

type QuizPassQuestionProps = {
  question: IQuestion;
};

export function QuizPassQuestion({ question }: QuizPassQuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleAnswerSelect(answerId: string) {
    if (!question.multipleAnswers) {
      setSelectedAnswers([answerId]);
    } else {
      setSelectedAnswers((prev) =>
        prev.includes(answerId)
          ? prev.filter((id) => id !== answerId)
          : [...prev, answerId]
      );
    }
  }

  function handleSubmitAnswer() {
    if (selectedAnswers.length === 0) return;

    setIsSubmitting(true);
    Axios.post("quiz/checkAnswer", { question, selectedAnswers }).then(
      (res) => {
        
      }
    );
  }

  useEffect(() => {
    setSelectedAnswers([]);
    setIsSubmitting(false);
  }, [question._id]);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg font-medium text-gray-800">{question.text}</p>

      <div
        className={`grid gap-4 ${
          question.answers.length % 2 === 0 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {question.answers.map((answer) =>
          question.multipleAnswers ? (
            <MultiAnswerItem
              key={answer._id}
              answer={answer}
              isSelected={selectedAnswers.includes(answer._id)}
              onSelect={() => handleAnswerSelect(answer._id)}
            />
          ) : (
            <SingleAnswerItem
              key={answer._id}
              answer={answer}
              isSelected={selectedAnswers.includes(answer._id)}
              onSelect={() => handleAnswerSelect(answer._id)}
            />
          )
        )}
      </div>

      <button
        onClick={handleSubmitAnswer}
        disabled={selectedAnswers.length === 0 || isSubmitting}
        className={`
          self-end px-6 py-2 rounded-lg font-medium transition
          ${
            selectedAnswers.length === 0 || isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }
        `}
      >
        {isSubmitting ? "Submitting..." : "Confirm answer"}
      </button>
    </div>
  );
}
