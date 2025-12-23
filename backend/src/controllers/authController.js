import signupTools from "../utils/signup-validations.js";
import { User, UserVerification } from "../models/index.js";
import bcrypt from "bcrypt";
import { env } from "../config/env.js";
import { mailer } from "../services/mailer.js";
import { verificationCode } from "../services/verification.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResponse } from "../utils/sendResponse.js";

class AuthController {
  async signup(req, res) {
    try {
      const data = req.body;
      // Проверка наличия всех данных
      const availability = signupTools.availabilityOfCredentials(data);
      if (!availability.valid)
        return sendResponse(res, 400, false, availability.message);

      const validation = signupTools.credentialsValidation(data);
      if (!validation.valid)
        return sendResponse(res, 400, false, validation.message);

      const usernameCheck = await signupTools.usernameValidation(data);
      if (!usernameCheck.valid)
        return sendResponse(res, 400, false, usernameCheck.message);

      const emailCheck = await signupTools.emailValidation(data);
      if (!emailCheck.valid)
        return sendResponse(res, 400, false, emailCheck.message);

      const passwordCheck = await signupTools.passwordValidation(data);
      if (!passwordCheck.valid)
        return sendResponse(res, 400, false, passwordCheck.message);

      const hashedPassword = await bcrypt.hash(data.password.trim(), 10);

      const newUser = new User({
        name: data.name.trim(),
        username: data.username.trim().toLowerCase(),
        email: data.email.trim().toLowerCase(),
        password: hashedPassword,
      });

      await newUser.save();

      // Отправляем письмо подтверждения
      const verifyCode = await verificationCode(newUser);
      mailer.sendVerificationCode(verifyCode, newUser.email);

      return sendResponse(res, 201, true, "User created successfully");
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async verify(req, res) {
    try {
      let { code, email } = req.body || {};

      if (!code?.trim() || !email?.trim())
        return sendResponse(res, 400, false, "Please fill all fields");

      email = email.trim().toLowerCase();

      const user = await User.findOne({ email });
      if (!user) return sendResponse(res, 404, false, "User not found");

      if (user.isVerified)
        return sendResponse(res, 200, true, "Account already verified");

      const record = await UserVerification.findOne({ userId: user._id });
      if (!record)
        return sendResponse(res, 400, false, "Verification record not found");

      if (record.expiresAt < Date.now()) {
        await UserVerification.deleteOne({ _id: record._id });
        return sendResponse(res, 400, false, "Verification code expired");
      }

      if (Number(code) !== record.code)
        return sendResponse(res, 400, false, "Wrong verification code");

      await UserVerification.deleteOne({ _id: record._id });
      await User.updateOne({ email }, { $set: { isVerified: true } });

      return sendResponse(res, 200, true, "User account verified successfully");
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async signin(req, res) {
    console.log("hello");
    try {
      let { username, password } = req.body || {};
      if (!username?.trim() || !password?.trim())
        return sendResponse(res, 400, false, "Please fill all the fields");

      username = username.trim().toLowerCase();

      const user = await User.findOne({ username });
      if (!user) return sendResponse(res, 404, false, "User not found");

      if (!user.isVerified)
        return sendResponse(
          res,
          403,
          false,
          "Please verify your account first"
        );

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return sendResponse(res, 400, false, "Wrong credentials");

      const token = jwt.sign(
        { _id: user._id, username: user.username },
        env.SECRET_KEY,
        { expiresIn: "7d" }
      );

      return sendResponse(res, 200, true, "Signin successful", null, token);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findById(req.user._id, {
        password: 0,
        isVerified: 0,
      });
      if (!user) return sendResponse(res, 404, false, "User not found");

      return sendResponse(res, 200, true, "User fetched successfully", user);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async resendVerificationEmail(req, res) {
    try {
      let { email } = req.body || {};
      if (!email?.trim())
        return sendResponse(res, 400, false, "Please provide email");

      email = email.trim().toLowerCase();
      const user = await User.findOne({ email });

      if (!user) return sendResponse(res, 404, false, "User not found");
      if (user.isVerified)
        return sendResponse(res, 200, true, "User already verified");

      await UserVerification.deleteMany({ userId: user._id });

      const code = await verificationCode(user);
      await mailer.sendVerificationCode(code, email);

      return sendResponse(res, 200, true, "New verification code sent");
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async forgotPassword(req, res) {
    try {
      let { email } = req.body || {};
      if (!email?.trim())
        return sendResponse(res, 400, false, "Please provide email");

      email = email.trim().toLowerCase();
      const user = await User.findOne({ email });
      if (!user) return sendResponse(res, 404, false, "User not found");

      const token = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordTokenExp = Date.now() + 15 * 60 * 1000;
      await user.save();

      await mailer.sendResetPassword(token, email);
      return sendResponse(res, 200, true, "Reset email sent");
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, password } = req.body || {};

      if (!token?.trim() || !password?.trim())
        return sendResponse(res, 400, false, "Token and password are required");

      const user = await User.findOne({ resetPasswordToken: token });
      if (!user) return sendResponse(res, 404, false, "Invalid reset token");

      if (user.resetPasswordTokenExp < Date.now())
        return sendResponse(res, 400, false, "Reset token has expired");

      if (await bcrypt.compare(password, user.password))
        return sendResponse(
          res,
          400,
          false,
          "New password cannot match old one"
        );

      const validation = signupTools.passwordValidation(req.body);
      if (!validation.valid)
        return sendResponse(res, 400, false, validation.message);

      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExp = undefined;
      await user.save();

      return sendResponse(res, 200, true, "Password reset successfully");
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }
}

export default new AuthController();
