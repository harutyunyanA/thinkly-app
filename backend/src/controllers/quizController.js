import { Question, Quiz, User, Attempt } from "../models/index.js";
import quizTools from "../utils/quiz-tools.js";

class QuizController {
  async getAllQuizzes(req, res) {
    const quizzes = await Quiz.find({});
    return res.send({ payload: quizzes });
  }

  async createQuiz(req, res) {
    try {
      const { title, description, category, difficulty, isPublic, questions } =
        req.body || {};

      if (!title?.trim() || !description?.trim() || !category?.trim()) {
        return res.status(400).send({ message: "Please fill all the fields" });
      }

      if (!Array.isArray(questions) || questions.length === 0) {
        return res
          .status(400)
          .send({ message: "Quiz should have at least one question" });
      }

      const { _id: userId } = req.user;

      const newQuiz = new Quiz({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        difficulty,
        isPublic,
        owner: userId,
        questions: [],
      });

      let questionDocs;
      try {
        questionDocs = await Promise.all(
          questions.map((item) => quizTools.addQuestion(item, newQuiz._id))
        );
      } catch (err) {
        return res.status(400).send({ message: err.message });
      }
      newQuiz.questions = questionDocs.map((q) => q._id);

      await User.findByIdAndUpdate(userId, { $push: { quizzes: newQuiz._id } });
      await newQuiz.save();
      const result = await Quiz.findById(newQuiz._id).populate("questions");
      res.status(201).send({
        message: "Quiz created successfully",
        payload: result,
      });
    } catch (err) {
      res.status(500).send({ message: `Server error: ${err.message}` });
    }
  }

  async getQuizById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: "Please provide quiz ID" });
      }
      const quiz = await Quiz.findById(id)
        .populate({
          path: "questions",
          select: "-answers.isCorrect",
        })
        .populate("owner", "name surname username");
      if (!quiz) {
        return res.status(404).send({ message: "Quiz not found" });
      }
      res.send({ payload: quiz });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async updateQuiz(req, res) {
    const { _id: userId } = req.user;
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "Quiz not found" });
    }

    const quiz = await Quiz.findById(id);

    if (quiz.owner.toString() !== userId.toString()) {
      return res.status(403).send({ message: "" }); /// fill some message that user is not the owner of this quiz and has no rights to edit it
    }

    const { title, description, category, difficulty, isPublic } =
      req.body || {};

    if (!title?.trim() || !description?.trim() || !category?.trim()) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    try {
      quiz.title = title;
      quiz.description = description;
      quiz.category = category;

      if (difficulty) quiz.difficulty = difficulty;

      if (typeof isPublic === "boolean") quiz.isPublic = isPublic;

      await quiz.save();
      res.send({ message: "Quiz updated", payload: quiz });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  async deleteQuiz(req, res) {
    try {
      const { _id: userId } = req.user;
      const { id: quizId } = req.params;
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).send({ message: "Quiz not found" });
      }

      if (quiz.owner.toString() !== userId.toString()) {
        return res
          .status(403)
          .send({ message: "You are not allowed to delete this quiz" });
      }

      await Question.deleteMany({ quiz: quizId });
      await Quiz.deleteOne({ _id: quizId });
      await User.findByIdAndUpdate(userId, { $pull: { quizzes: quizId } });

      res.send({ message: "Quiz successfully deleted" });
    } catch (err) {
      res
        .status(500)
        .send({ message: `Internal server error. ${err.message}` });
    }
  }

  async addQuestion(req, res) {
    try {
      const { _id: userId } = req.user;
      const { id: quizId } = req.params;

      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).send({ message: "Quiz not found" });
      }

      if (quiz.owner.toString() !== userId.toString()) {
        return res
          .status(403)
          .send({ message: "You are not allowed to edit this quiz" });
      }

      const question = await quizTools.addQuestion(req.body, quizId);

      quiz.questions.push(question._id);
      await quiz.save();

      res.status(201).send({ payload: question });
    } catch (err) {
      res
        .status(500)
        .send({ message: `Internal server error. ${err.message}` });
    }
  }

  async updateQuestion(req, res) {
    try {
      const { quizId, questionId } = req.params;
      const { _id: userId } = req.user;

      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).send({ message: "Quiz not found" });
      }

      const question = await Question.findById(questionId);
      if (!question || quiz._id.toString() !== question.quiz.toString()) {
        return res.status(404).send({ message: "Question not found" });
      }

      if (quiz.owner.toString() !== userId.toString()) {
        return res
          .status(403)
          .send({ message: "You are not allowed to edit this question" });
      }

      const { text, answers, multipleAnswers, imageUrl } = req.body || {};
      if (!text?.trim() || !Array.isArray(answers) || !answers.length) {
        return res
          .status(400)
          .send({ message: "Please input question and answers" });
      }

      quizTools.validateAnswers(answers, multipleAnswers);

      question.text = text.trim();
      question.answers = answers;
      question.multipleAnswers = multipleAnswers;
      question.imageUrl = imageUrl;

      await question.save();

      res.send({
        message: "Question is updated successfully",
        payload: question,
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: `Internal Server Error. ${err.message}` });
    }
  }

  async deleteQuestion(req, res) {
    try {
      const { quizId, questionId } = req.params;
      const { _id: userId } = req.user;

      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).send({ message: "Quiz not found" });
      }
      const question = await Question.findById(questionId);
      if (!question || quiz._id.toString() !== question.quiz.toString()) {
        return res.status(404).send({ message: "Question not found" });
      }

      if (quiz.owner.toString() !== userId.toString()) {
        return res
          .status(403)
          .send({ message: "You are not allowed to delete this question" });
      }

      await Question.deleteOne({ _id: questionId });

      quiz.questions = quiz.questions.filter(
        (q) => q._id.toString() !== questionId.toString()
      );
      await quiz.save();
      res.send({ message: "Question deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .send({ message: "Internal server error. " + err.message });
    }
  }

  async getUserQuizzes(req, res) {
    const { id } = req.params;

    const user = await User.findById(id).populate("quizzes");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ payload: user.quizzes });
  }

  async submitQuiz(req, res) {
    const { id: quizId } = req.params;
    const userId = req.user?._id || null;
    const userAnswers = req.body.answers; // объект: { questionId: [answerIds] }

    if (!quizId || !userAnswers || typeof userAnswers !== "object") {
      return res.status(400).send({ message: "Invalid request body" });
    }

    const quiz = await Quiz.findById(quizId).populate("questions");
    const user = await User.findById(userId, { password: 0 });

    if (!quiz) return res.status(404).send({ message: "Quiz not found" });
    const questions = quiz.questions;

    const attempt = new Attempt({
      quiz: quizId,
      score: 0,
      correctCount: 0,
      totalQuestions: questions.length,
    });

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      const selectedIds = userAnswers[question._id.toString()] || [];

      const correctAnswerIds = [];
      for (let j = 0; j < question.answers.length; j++) {
        if (question.answers[j].isCorrect) {
          correctAnswerIds.push(question.answers[j]._id.toString());
        }
      }

      let isCorrect =
        correctAnswerIds.length === selectedIds.length &&
        correctAnswerIds.every((id) => selectedIds.includes(id));

      const answerDetails = {
        questionId: question._id.toString(),
        correct: false,
      };

      if (isCorrect) {
        attempt.correctCount += 1;
        answerDetails.correct = true;
      }

      attempt.answers.push(answerDetails);
    }

    attempt.score = Math.round(
      (attempt.correctCount / attempt.totalQuestions) * 100
    );

    if (userId) {
      attempt.user = userId;
      user.results.push(attempt._id);
      await user.save();
      await attempt.save();
    }

    res.send(attempt);
  }

  async getQuizResults(req, res) {
    try {
      const { _id: userId } = req.user;
      const { id: quizId } = req.params;
      const quiz = await Quiz.findById(quizId).populate("questions");
      if (!quiz) return res.status(404).send({ message: "Quiz not found" });

      const attempt = await Attempt.findOne({ user: userId, quiz: quizId });
      if (!attempt)
        return res.status(404).send({ message: "Results not found" });

      const result = {
        quiz: quiz,
        details: {
          score: attempt.score,
          correctCount: attempt.correctCount,
          createdAt: attempt.createdAt,
          answers: attempt.answers,
        },
      };
      res.send(result);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async searchQuiz(req, res) {
    const { title, category, difficulty } = req.query;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const result = await Quiz.find(filter)
      .select("title _id description category difficulty createdAt owner")
      .populate("owner", "name surname username _id");
    if (!result.length) {
      return res.status(404).send({ message: "No quizzes found" });
    }
    res.send(result);
  }

}

export default new QuizController();
