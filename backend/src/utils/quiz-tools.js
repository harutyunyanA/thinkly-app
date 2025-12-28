import { Question } from "../models/index.js";

class QuizTools {
  async addQuestion(questionData, quizId) {
    try {
      const { text, multipleAnswers, answers, imageUrl } = questionData;

      if (!text?.trim() || !Array.isArray(answers) || !answers.length) {
        throw new Error(
          "Please provide question text and at least one answer."
        );
      }

      this.validateAnswers(answers, multipleAnswers);

      const question = new Question({
        quiz: quizId,
        text: text.trim(),
        multipleAnswers,
        answers,
        imageUrl,
      });

      await question.save();

      return question;
    } catch (err) {
      throw new Error("Failed to create question: " + err.message);
    }
  }

  validateAnswers(answers, multipleAnswers) {
    const correctCount = answers.filter((a) => a.isCorrect).length;

    if (!multipleAnswers && correctCount !== 1) {
      throw new Error(
        `Single-answer question must have exactly one correct answer (currently ${correctCount}).`
      );
    }

    if (multipleAnswers && correctCount < 1) {
      throw new Error(
        `Multi-answer question must have at least one correct answer.`
      );
    }
  }
  async updateQuiz(quiz) {
    await Quiz.findByIdAndUpdate(quiz._id, quiz, { new: true });
  }
}

export default new QuizTools();
