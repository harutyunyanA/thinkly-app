import Attempt from "../models/Attempt.js";
import { sendResponse } from "../utils/sendResponse.js";
import { Question, Quiz } from "../models/index.js";

class AttemptController {
  async createAttempt(req, res) {
    try {
      const { quiz: quizId } = req.body;
      const userId = req.user._id;

      if (!quizId) {
        return sendResponse(res, 400, false, "Quiz ID is required");
      }
      await Attempt.findOneAndDelete({
        user: userId,
        quiz: quizId,
        status: "in_progress",
      });

      const newAttempt = await Attempt.create({
        user: userId,
        quiz: quizId,
        answers: [],
        correctCount: 0,
        status: "in_progress",
      });

      return sendResponse(res, 201, true, "Attempt created", {
        attemptId: newAttempt._id.toString(),
      });
    } catch (err) {
      return sendResponse(res, 500, false, "Server error");
    }
  }

  async checkAnswer(req, res) {
    const { questionId, selectedAnswers } = req.body;
    const { id: attemptId } = req.params;

    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      return sendResponse(res, 404, false, "attempt not found");
    }

    if (!questionId || !selectedAnswers || selectedAnswers.length === 0) {
      return sendResponse(res, 400, false, "questionId and answers required");
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return sendResponse(res, 404, false, "question not found");
    }
    const updateAttempt = async (isCorrect) => {
      if (isCorrect) {
        attempt.correctCount += 1;
      }

      attempt.answers.push({
        questionId,
        selectedAnswers,
        isCorrect: isCorrect,
      });
      await attempt.save();
    };
    const correctAnswerIds = question.answers
      .filter((a) => a.isCorrect)
      .map((a) => a._id.toString());

    const isCorrect =
      selectedAnswers.length === correctAnswerIds.length &&
      selectedAnswers.every((id) => correctAnswerIds.includes(id));

    await updateAttempt(isCorrect);

    sendResponse(
      res,
      200,
      isCorrect,
      isCorrect ? "CORRECT" : "INCORRECT",
      correctAnswerIds
    );
  }

  async deleteAttempt(req, res) {
    const { id: attemptId } = req.params;
    const userId = req.user._id;

    if (!attemptId) {
      return sendResponse(res, 400, false, "attempt id is required");
    }

    try {
      const deletedAttempt = await Attempt.findOneAndDelete({
        _id: attemptId,
        user: userId,
      });

      if (!deletedAttempt) {
        return sendResponse(res, 404, false, "attempt not found");
      }

      return sendResponse(res, 200, true, "attempt deleted");
    } catch (err) {
      return sendResponse(res, 500, false, "server error");
    }
  }

  async complete(req, res) {
    try {
      const { id: attemptId } = req.params;

      const attempt = await Attempt.findById(attemptId);
      if (!attempt) {
        return sendResponse(res, 404, false, "attempt not found");
      }

      if (attempt.status === "finished") {
        return sendResponse(res, 400, false, "attempt already finished");
      }

      attempt.status = "finished";
      attempt.score = (attempt.correctCount / attempt.answers.length) * 100;

      const quiz = await Quiz.findById(attempt.quiz);
      if (!quiz) {
        return sendResponse(res, 404, false, "quiz not found");
      }

      quiz.averageScore = Number(
        (
          (quiz.averageScore * quiz.completions + attempt.score) /
          (quiz.completions + 1)
        ).toFixed(2)
      );

      quiz.completions += 1;

      if (quiz.topScore < attempt.score) quiz.topScore = attempt.score;

      attempt.finishedAt = Date.now();

      await quiz.save();
      await attempt.save();

      const userAttempts = await Attempt.find({
        user: req.user._id,
        quiz: attempt.quiz,
        status: "finished",
      });

      console.log(userAttempts);

      return sendResponse(res, 200, true, "quiz completed", userAttempts);
    } catch {
      return sendResponse(res, 500, false, "server error");
    }
  }

  async quizAttempts(req, res) {
    try {
      const { id: quizId } = req.params;

      const attempts = await Attempt.find({
        quiz: quizId,
        status: "finished",
      })
        .sort({ finishedAt: -1 })
        .limit(20)
        .populate({ path: "user", select: "username avatar" })
        .lean();

      return sendResponse(res, 200, true, "", attempts);
    } catch {
      return sendResponse(res, 500, false, "server error");
    }
  }
}

export default new AttemptController();
