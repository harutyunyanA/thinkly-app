import express from "express";
import controller from "../controllers/attemptController.js";
import { isAuthenticated } from "../middlewares/index.js";
const router = express.Router();

router.post("/start", isAuthenticated, controller.createAttempt);

router.post(
  "/:id/check-answer",
  isAuthenticated,
  controller.checkAnswer
);

router.delete("/:id", isAuthenticated, controller.deleteAttempt)

router.post("/:id/complete", isAuthenticated, controller.complete)

export default router;
