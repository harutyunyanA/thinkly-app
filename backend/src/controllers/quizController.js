import { Question, Quiz, User, Attempt } from "../models/index.js";
import quizTools from "../utils/quiz-tools.js";
import { sendResponse } from "../utils/sendResponse.js";

class QuizController {
  async getAllQuizzes(req, res) {
    try {
      const quizzes = await Quiz.find({}).sort({ createdAt: -1 });
      return sendResponse(res, 200, true, "All quizzes fetched", quizzes);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async createQuiz(req, res) {
    try {
      const {
        title,
        description,
        category,
        difficulty,
        imageUrl,
        isPublic,
        questions,
      } = req.body || {};

      if (!title?.trim() || !description?.trim())
        return sendResponse(res, 400, false, "Please fill all the fields");

      if (!Array.isArray(questions) || questions.length === 0)
        return sendResponse(
          res,
          400,
          false,
          "Quiz should have at least one question"
        );

      const { _id: userId } = req.user;

      const newQuiz = new Quiz({
        title: title.trim(),
        description: description.trim(),
        // category: category.trim(),
        difficulty,
        imageUrl,
        // isPublic,
        owner: userId,
        questions: [],
      });

      let questionDocs;

      try {
        questionDocs = await Promise.all(
          questions.map((q) => quizTools.addQuestion(q, newQuiz._id))
        );
      } catch (err) {
        return sendResponse(res, 400, false, err.message);
      }

      newQuiz.questions = questionDocs.map((q) => q._id);

      await User.findByIdAndUpdate(userId, { $push: { quizzes: newQuiz._id } });
      await newQuiz.save();

      const result = await Quiz.findById(newQuiz._id).populate("questions");
      return sendResponse(res, 201, true, "Quiz created successfully", result);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async getQuizById(req, res) {
    try {
      const { id } = req.params;
      if (!id) return sendResponse(res, 400, false, "Quiz ID required");

      const quiz = await Quiz.findById(id)
        .populate({ path: "questions", select: "-answers.isCorrect" })
        .populate("owner", "name username");

      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      return sendResponse(res, 200, true, "Quiz fetched successfully", quiz);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async getQuizInfoById(req, res) {
    try {
      const { id } = req.params;
      if (!id) return sendResponse(res, 400, false, "Quiz ID required");

      const quiz = await Quiz.findById(id)
        .populate({ path: "questions" })
        .populate("owner", "name username");

      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      return sendResponse(res, 200, true, "Quiz fetched successfully", quiz);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async updateQuiz(req, res) {
    console.log("heellloo");
    console.log(req.body);
    try {
      const { id } = req.params;
      const { _id: userId } = req.user;
      const { title, description, category, difficulty, isPublic } =
        req.body || {};

      const quiz = await Quiz.findById(id);
      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      if (quiz.owner.toString() !== userId.toString())
        return sendResponse(res, 403, false, "You cannot edit this quiz");

      if (!title?.trim() || !description?.trim())
        return sendResponse(res, 400, false, "Please fill all the fields");

      quiz.title = title.trim();
      quiz.description = description.trim();
      // quiz.category = category.trim();

      if (difficulty) quiz.difficulty = difficulty;
      // if (typeof isPublic === "boolean") quiz.isPublic = isPublic;

      await quiz.save();
      return sendResponse(res, 200, true, "Quiz updated successfully", quiz);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async deleteQuiz(req, res) {
    try {
      const { id } = req.params;
      const { _id: userId } = req.user;

      const quiz = await Quiz.findById(id);
      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      if (quiz.owner.toString() !== userId.toString())
        return sendResponse(res, 403, false, "You cannot delete this quiz");

      await Question.deleteMany({ quiz: id });
      await Quiz.deleteOne({ _id: id });
      await User.findByIdAndUpdate(userId, { $pull: { quizzes: id } });

      return sendResponse(res, 200, true, "Quiz deleted successfully");
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async addQuestion(req, res) {
    try {
      const { id } = req.params;
      const { _id: userId } = req.user;

      const quiz = await Quiz.findById(id);
      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      if (quiz.owner.toString() !== userId.toString())
        return sendResponse(res, 403, false, "You cannot edit this quiz");

      if (req.file) req.body.file = req.file;

      const question = await quizTools.addQuestion(req.body, id);
      quiz.questions.push(question._id);
      await quiz.save();

      return sendResponse(
        res,
        201,
        true,
        "Question added successfully",
        question
      );
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async updateQuestion(req, res) {
    try {
      const { quizId, questionId } = req.params;
      const { _id: userId } = req.user;
      const { text, answers, multipleAnswers, imageUrl } = req.body || {};

      const quiz = await Quiz.findById(quizId);
      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      const question = await Question.findById(questionId);
      if (!question) return sendResponse(res, 404, false, "Question not found");

      if (quiz.owner.toString() !== userId.toString())
        return sendResponse(res, 403, false, "You cannot edit this question");

      if (!text?.trim() || !Array.isArray(answers) || !answers.length)
        return sendResponse(res, 400, false, "Please fill all question fields");

      quizTools.validateAnswers(answers, multipleAnswers);

      question.text = text.trim();
      question.answers = answers;
      question.multipleAnswers = multipleAnswers;
      question.imageUrl = imageUrl;
      await question.save();

      return sendResponse(
        res,
        200,
        true,
        "Question updated successfully",
        question
      );
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async deleteQuestion(req, res) {
    try {
      const { quizId, questionId } = req.params;
      const { _id: userId } = req.user;

      const quiz = await Quiz.findById(quizId);
      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      const question = await Question.findById(questionId);
      if (!question) return sendResponse(res, 404, false, "Question not found");

      if (quiz.owner.toString() !== userId.toString())
        return sendResponse(res, 403, false, "You cannot delete this question");

      await Question.deleteOne({ _id: questionId });

      quiz.questions = quiz.questions.filter(
        (q) => q._id.toString() !== questionId.toString()
      );
      await quiz.save();

      return sendResponse(res, 200, true, "Question deleted successfully");
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async getUserQuizzes(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate("quizzes");
      if (!user) return sendResponse(res, 404, false, "User not found");

      return sendResponse(res, 200, true, "User quizzes fetched", user.quizzes);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async submitQuiz(req, res) {
    try {
      const { id: quizId } = req.params;
      const userId = req.user?._id || null;
      const userAnswers = req.body.answers;

      if (!quizId || !userAnswers || typeof userAnswers !== "object")
        return sendResponse(res, 400, false, "Invalid request body");

      const quiz = await Quiz.findById(quizId).populate("questions");
      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      const attempt = new Attempt({
        quiz: quizId,
        score: 0,
        correctCount: 0,
        totalQuestions: quiz.questions.length,
      });

      for (const question of quiz.questions) {
        const selectedIds = userAnswers[question._id.toString()] || [];
        const correctIds = question.answers
          .filter((a) => a.isCorrect)
          .map((a) => a._id.toString());

        const isCorrect =
          correctIds.length === selectedIds.length &&
          correctIds.every((id) => selectedIds.includes(id));

        if (isCorrect) attempt.correctCount++;
        attempt.answers.push({
          questionId: question._id.toString(),
          correct: isCorrect,
        });
      }

      attempt.score = Math.round(
        (attempt.correctCount / attempt.totalQuestions) * 100
      );

      if (userId) {
        attempt.user = userId;
        const user = await User.findById(userId);
        user.results.push(attempt._id);
        await user.save();
        await attempt.save();
      }

      return sendResponse(res, 200, true, "Quiz submitted", attempt);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async getQuizResults(req, res) {
    try {
      const { id: quizId } = req.params;
      const { _id: userId } = req.user;

      const quiz = await Quiz.findById(quizId).populate("questions");
      if (!quiz) return sendResponse(res, 404, false, "Quiz not found");

      const attempt = await Attempt.findOne({ user: userId, quiz: quizId });
      if (!attempt) return sendResponse(res, 404, false, "Results not found");

      const result = {
        quiz,
        details: {
          score: attempt.score,
          correctCount: attempt.correctCount,
          createdAt: attempt.createdAt,
          answers: attempt.answers,
        },
      };

      return sendResponse(res, 200, true, "Quiz results fetched", result);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async searchQuiz(req, res) {
    try {
      const { title, category, difficulty } = req.query;
      const filter = {};

      if (title) filter.title = { $regex: title, $options: "i" };
      if (category) filter.category = category;
      if (difficulty) filter.difficulty = difficulty;

      const result = await Quiz.find(filter)
        .select("title _id description category difficulty createdAt owner")
        .populate("owner", "name username _id");

      if (!result.length)
        return sendResponse(res, 404, false, "No quizzes found");

      return sendResponse(res, 200, true, "Search completed", result);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async duplicateQuiz(req, res) {
    const { quizId } = req.params;
    const original = await Quiz.findById(quizId).populate("questions");
    if (!original) {
      return sendResponse(res, 404, false, "Quiz not found");
    }

    const duplicatedQuiz = new Quiz({
      title: original.title,
      description: original.description,
      difficulty: original.difficulty,
      imageURL: original.imageURL,
      owner: req.user._id,
      questions: [],
    });

    let questionDocs;
    try {
      questionDocs = await Promise.all(
        original.questions.map((q) =>
          quizTools.addQuestion(q, duplicatedQuiz._id)
        )
      );
    } catch (err) {
      return sendResponse(res, 400, false, err.message);
    }

    duplicatedQuiz.questions = questionDocs.map((q) => q._id);

    await duplicatedQuiz.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { quizzes: duplicatedQuiz._id },
    });

    return sendResponse(res, 200, true, "Quiz duplicated", duplicatedQuiz);
  }
  // async checkAnswer(req, res) {
  //   const { question, selectedAnswers } = req.body;
  //   const { _id: userId } = req.user;

  //   if (!question || !selectedAnswers) {
  //     return sendResponse(res, 400, false, "question and answers required");
  //   }

  //   const foundQuestion = await Question.findById(question._id);

  //   if (!foundQuestion) {
  //     return sendResponse(res, 404, false, "question not found");
  //   }

  //   const correctAnswerIds = foundQuestion.answers
  //     .filter((a) => a.isCorrect)
  //     .map((a) => a._id.toString());

  //   console.log(question);
  //   const attempt = await new Attempt({
  //     user: userId,
  //     quiz: question.quiz

  //   });

  //   if (correctAnswerIds.length !== selectedAnswers.length) {
  //     return sendResponse(res, 200, false, "NOT CORRECT", correctAnswerIds);
  //   }

  //   for (const answerId of selectedAnswers) {
  //     if (!correctAnswerIds.includes(answerId)) {
  //       return sendResponse(res, 200, false, "NOT CORRECT", correctAnswerIds);
  //     }
  //   }
  //   return sendResponse(res, 200, true, "CORRECT", correctAnswerIds);
  // }
}

export default new QuizController();
