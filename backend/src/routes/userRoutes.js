import express from "express";
import controller from "../controllers/userController.js";
import {
  imageUpload,
  isAuthenticated,
  validateBody,
} from "../middlewares/index.js";

const router = express.Router();

router.get("/me", isAuthenticated, controller.getCurrentUser);
router.get("/:id", controller.getUserProfile);
router.patch(
  "/username",
  validateBody(["username", "password"]),
  isAuthenticated,
  controller.changeUsername
);

router.patch(
  "/email",
  validateBody(["email", "password"]),
  isAuthenticated,
  controller.changeEmail
);

router.patch(
  "/password",
  validateBody(["currentPassword", "newPassword"]),
  isAuthenticated,
  controller.changePassword
);

router.post(
  "/avatar",
  isAuthenticated,
  imageUpload("avatar"),
  controller.uploadAvatar
);

export default router;
