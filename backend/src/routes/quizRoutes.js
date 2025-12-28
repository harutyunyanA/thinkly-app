import express from "express";
import controller from "../controllers/quizController.js";
import {
  imageUpload,
  isAuthenticated,
  optionalAuthentication,
} from "../middlewares/index.js";

const router = express.Router();

router.get("/", controller.getAllQuizzes);
router.post("/", isAuthenticated, controller.createQuiz);
router.get("/:id", controller.getQuizById);
router.get("/:id/info", controller.getQuizInfoById);
router.patch("/:id", isAuthenticated, controller.updateQuiz);
router.delete("/:id", isAuthenticated, controller.deleteQuiz);

router.post(
  "/:id/question",
  isAuthenticated,
  imageUpload("avatar"),
  controller.addQuestion
);

router.patch(
  "/:quizId/question/:questionId",
  isAuthenticated,
  controller.updateQuestion
);

router.delete(
  "/:quizId/question/:questionId",
  isAuthenticated,
  controller.deleteQuestion
);

router.post(
  "/:quizId/duplicate",
  isAuthenticated,
  controller.duplicateQuiz
);

router.get("/user/:id", controller.getUserQuizzes);
router.post("/:id/submit", optionalAuthentication, controller.submitQuiz);
router.get("/:id/results", isAuthenticated, controller.getQuizResults);
router.get("/search", isAuthenticated, controller.searchQuiz);
export default router;
