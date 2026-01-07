import express from "express";
import controller from "../controllers/userController.js";
import {
  imageUpload,
  isAuthenticated,
  validateBody,
} from "../middlewares/index.js";

const router = express.Router();

router.get("/me", isAuthenticated, controller.getCurrentUser);
router.patch(
  "/username",
  isAuthenticated,
  validateBody(["username", "password"]),
  controller.changeUsername
);

router.patch(
  "/email",
  isAuthenticated,
  validateBody(["email", "password"]),
  controller.changeEmail
);

router.patch(
  "/password",
  isAuthenticated,
  validateBody(["currentPassword", "newPassword"]),
  controller.changePassword
);

router.patch(
  "/profileInfoUpdate",
  isAuthenticated,
  controller.updateProfileInfo
);

router.post(
  "/avatar",
  isAuthenticated,
  imageUpload("avatar"),
  controller.uploadAvatar
);
router.get("/dashboardStat", isAuthenticated, controller.dashboardStat);
router.get("/:id", controller.getUserProfile);

export default router;
