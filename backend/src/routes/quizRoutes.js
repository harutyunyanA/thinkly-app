import express from "express";
import controller from "../controllers/quizController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { optionalAuthentication } from "../middlewares/optionalAuthentication.js";

const router = express.Router();

router.get("/", controller.getAllQuizzes);
router.post("/", isAuthenticated, controller.createQuiz);
router.get("/:id", controller.getQuizById);
router.patch("/:id", isAuthenticated, controller.updateQuiz);
router.delete("/:id", isAuthenticated, controller.deleteQuiz);
router.post("/:id/question", isAuthenticated, controller.addQuestion);
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
router.get("/user/:id", controller.getUserQuizzes);
router.post("/:id/submit", optionalAuthentication, controller.submitQuiz);
router.get("/:id/results", isAuthenticated, controller.getQuizResults);
router.get("/search", isAuthenticated, controller.searchQuiz);
export default router;
