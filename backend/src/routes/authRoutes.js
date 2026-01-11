import express from "express";
import controller from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/index.js";
const router = express.Router();

router.post("/signup", controller.signup);
router.post("/verify", controller.verify);
router.post("/signin", controller.signin);
// router.post("/send-verification-code", controller.sendVerificationCode)
// router.post("/isAuthenticated", isAuthenticated, controller.isAuthenticated);
router.post("/send-verification", controller.sendVerificationEmail);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);
router.get("/user", isAuthenticated, controller.getUser);

export default router;
