import { useEffect, useState } from "react";
import type { IQuestion } from "../../types";
import { SingleAnswerItem } from "./singleAnswer";
import { MultiAnswerItem } from "./MultiAnswer";
import { Axios } from "../../lib/api";
import type { AnswerState } from "../../pages/main/quizPass";
import { Loader } from "../loader";

type QuizPassQuestionProps = {
  question: IQuestion;
  attemptId: string;
  answerState: AnswerState;
  onAnswerSubmit: (selectedAnswers: string[], isCorrect: boolean) => void;
};

export function QuizPassQuestion({
  question,
  attemptId,
  answerState,
  onAnswerSubmit,
}: QuizPassQuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    answerState.selectedAnswers || []
  );
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
    Axios.post(`attempt/${attemptId}/check-answer`, {
      questionId: question._id,
      selectedAnswers,
    })
      .then((res) => {
        const isCorrect = res.data.success;
        onAnswerSubmit(selectedAnswers, isCorrect);
        console.log(res.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  useEffect(() => {
    setSelectedAnswers(answerState.selectedAnswers || []);
    setIsSubmitting(false);
  }, [question._id, answerState.selectedAnswers]);

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

      {answerState.isCorrect !== null && (
        <div
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            answerState.isCorrect
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {answerState.isCorrect ? "Correct answer" : "Incorrect answer"}
        </div>
      )}

      <button
        onClick={handleSubmitAnswer}
        disabled={
          selectedAnswers.length === 0 ||
          isSubmitting ||
          answerState.isCorrect !== null
        }
        className={`
      self-end px-6 py-2 rounded-lg font-medium transition
      ${
        selectedAnswers.length === 0 ||
        isSubmitting ||
        answerState.isCorrect !== null
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
