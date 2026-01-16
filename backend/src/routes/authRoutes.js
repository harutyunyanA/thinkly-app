import express from "express";
import controller from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/index.js";
import passport from "passport";
import JWT from "jsonwebtoken";
import { env } from "../config/env.js";
const router = express.Router();

router.post("/signup", controller.signup);
router.post("/verify", controller.verify);
router.post("/signin", controller.signin);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user;
    const token = JWT.sign(
      { _id: user._id, username: user.username },
      env.SECRET_KEY
    );
    const frontUrl = env.FRONT_URL || "http://localhost:5173";
    console.log(frontUrl)
    res.redirect(`${frontUrl}/auth/success?token=${token}`);
  }
);

// router.post("/send-verification-code", controller.sendVerificationCode)
// router.post("/isAuthenticated", isAuthenticated, controller.isAuthenticated);
router.post("/send-verification", controller.sendVerificationEmail);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);
router.get("/user", isAuthenticated, controller.getUser);

export default router;
