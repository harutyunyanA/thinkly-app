import signupTools from "../utils/signup-validations.js";
import { User, UserVerification } from "../models/index.js";
import bcrypt from "bcrypt";
import { env } from "../config/env.js";
import { mailer } from "../services/mailer.js";
import { verificationCode } from "../services/verification.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

class AuthController {
  async signup(req, res) {
    const data = req.body;

    ////////////////CREDENTIALS AVAILABILITY CHECK///////////////////////////////
    const credentialsAvailability = signupTools.availabilityOfCredentials(data);

    if (!credentialsAvailability.valid) {
      return res.status(400).send(credentialsAvailability);
    }

    ////////////////CREDENTIAL CONTENT VALIDATION////////////////////////////////////////////
    const credentialsContentValidation =
      signupTools.credentialsValidation(data);
    if (!credentialsContentValidation.valid) {
      return res.status(400).send(credentialsContentValidation);
    }

    ////////////////USERNAME VALIDATION////////////////////////////////////////////

    const usernameValidation = await signupTools.usernameValidation(data);
    if (!usernameValidation.valid) {
      return res.status(400).send(usernameValidation);
    }

    ////////////////EMAIL VALIDATION///////////////////////////////////////

    const emailValidation = await signupTools.emailValidation(data);
    if (!emailValidation.valid) {
      return res.status(400).send(emailValidation);
    }

    ////////////////PASSWORD VALIDATION///////////////////////////////////////

    const passwordValidation = await signupTools.passwordValidation(data);
    if (!passwordValidation.valid) {
      return res.status(400).send(passwordValidation);
    }

    const hashedPassword = await bcrypt.hash(data.password.trim(), 10);

    //////////////CREATING AND SAVING NEW USER IN DB///////////////////
    const newUser = new User({
      name: data.name.trim(),
      username: data.username.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
    });

    try {
      await newUser.save();

      res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async verify(req, res) {
    if (!req.body?.code.trim() || !req.body?.username.trim().toLowerCase()) {
      return res.status(400).send({ message: "please fill all the fields" });
    }

    let { code, username } = req.body;
    username = username.trim().toLowerCase();

    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Wrong username. User not found" });
    }

    if (user.isVerified) {
      return res.send({ message: "Account already verifed" });
    }
    const userVerificationRecord = await UserVerification.findOne({
      userId: user._id,
    });

    if (userVerificationRecord.expiresAt < Date.now()) {
      await UserVerification.deleteOne({ _id: userVerificationRecord._id });
      return res.status(400).send({ message: "Verification code expired" });
    }

    if (Number(code) !== userVerificationRecord.code) {
      console.log(code, userVerificationRecord.code);
      return res.status(400).send({ message: "Wrong verification code" });
    }

    await UserVerification.deleteOne({ _id: userVerificationRecord._id });
    await User.updateOne(
      { username: username },
      { $set: { isVerified: true } }
    );
    res.send({ message: "User account verified successfully" });
  }

  async signin(req, res) {
    if (!req.body?.username?.trim() || !req.body.password?.trim()) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    let { username, password } = req.body;
    username = username.trim().toLowerCase();

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).send({ message: "Wrong Credentials" });
    }
    if (!user.isVerified) {
      ///////////SENDING VERIFICATION EMAIL//////////
      const verifyCode = await verificationCode(user);
      mailer.sendVerificationCode(verifyCode, user.email);
      return res
        .status(403)
        .send({ message: "Please verify your account first" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: "Wrong Credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      env.SECRET_KEY
    );
    res.send({ message: "signin successfully", token: token });
  }

  async getUser(req, res) {
    const user = await User.findById(req.user._id, {
      password: 0,
      isVerified: 0,
    });
    res.send({ message: "ok", payload: user });
  }

  async resendVerificationEmail(req, res) {
    if (!req.body?.email.trim()) {
      return res.status(400).send({ message: "Please provide email" });
    }
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.send({ message: "User already verified" });
    }

    await UserVerification.deleteMany({ userId: user._id });

    try {
      const code = await verificationCode(user);
      await mailer.sendVerificationCode(code, email);
      res.send({ message: "New verification code send" });
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async forgotPassword(req, res) {
    if (!req.body?.email.trim()) {
      return res.status(400).send({ message: "Please input your email" });
    }
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "some error message " });
    }

    try {
      const token = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordTokenExp = Date.now() + 15 * 60 * 1000;

      await user.save();
      await mailer.sendResetPassword(token, email);
      return res.send({ message: "Email was sent" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, password } = req.body || {};

      if (!token?.trim() || !password?.trim()) {
        return res
          .status(400)
          .send({ message: "Token and new password are required" });
      }

      const user = await User.findOne({ resetPasswordToken: token });
      if (!user) {
        return res.status(400).send({ message: "Invalid reset token" });
      }

      if (user.resetPasswordTokenExp < Date.now()) {
        return res.status(400).send({ message: "Reset token has expired" });
      }

      if (await bcrypt.compare(password, user.password)) {
        return res.status(400).send({
          message: "New password cannot be the same as the old password",
        });
      }

      const passwordValidation = signupTools.passwordValidation(req.body);
      if (!passwordValidation.valid) {
        return res.status(400).send(passwordValidation);
      }

      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExp = undefined;
      await user.save();

      return res
        .status(200)
        .send({ message: "Password has been reset successfully" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}

export default new AuthController();
