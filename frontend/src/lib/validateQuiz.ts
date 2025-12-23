import type { QuizForm } from "../types";

export function validateQuiz(quiz: QuizForm): boolean {
  if (!quiz.title.trim()) return false;
  if (!quiz.description.trim()) return false;
  if (quiz.questions.length === 0) return false;

  for (const q of quiz.questions) {
    if (!q.text.trim()) return false;
    if (q.answers.length === 0) return false;

    let hasCorrect = false;

    for (const a of q.answers) {
      if (!a.text.trim()) return false;
      if (a.isCorrect) hasCorrect = true;
    }

    if (!hasCorrect) return false;
  }

  return true;
}
