import Attempt from "../models/Attempt.js";
import { sendResponse } from "../utils/sendResponse.js";

class AttemptController {
  async createAttempt(req, res) {
    try {
      const { quiz: quizId } = req.body;
      const userId = req.user._id;

      if (!quizId) {
        return sendResponse(res, 400, false, "Quiz ID is required");
      }

      const attempt = await Attempt.findOne({
        user: userId,
        quiz: quizId,
        status: "in_progress",
      });

      if (attempt) {
        return sendResponse(res, 200, true, "Attempt resumed", {
          attemptId: attempt._id,
        });
      }

      const newAttempt = await Attempt.create({
        user: userId,
        quiz: quizId,
        answers: [],
        correctCount: 0,
        status: "inProgress",
      });

      return sendResponse(res, 200, true, "Attempt created", {
        attemptId: attempt._id.toString(),
      });
    } catch (err) {
      return sendResponse(res, 500, false, "Server error");
    }
  }

  async checkAnswer(req, res) {
    const { question, selectedAnswers } = req.body;
    const { _id: userId } = req.user;
    const attemptId = useParams();

    if (!question || !selectedAnswers) {
      return sendResponse(res, 400, false, "question and answers required");
    }

    const foundQuestion = await Question.findById(question._id);

    if (!foundQuestion) {
      return sendResponse(res, 404, false, "question not found");
    }

    const correctAnswerIds = foundQuestion.answers
      .filter((a) => a.isCorrect)
      .map((a) => a._id.toString());

    if (correctAnswerIds.length !== selectedAnswers.length) {
      return sendResponse(res, 200, false, "NOT CORRECT", correctAnswerIds);
    }

    for (const answerId of selectedAnswers) {
      if (!correctAnswerIds.includes(answerId)) {
        return sendResponse(res, 200, false, "NOT CORRECT", correctAnswerIds);
      }
    }
    return sendResponse(res, 200, true, "CORRECT", correctAnswerIds);
  }
}

export default new AttemptController();
