import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import signupTools from "../utils/signup-validations.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

class UserController {
  async getUserProfile(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: "id required" });
      }

      const user = await User.findById(id, {
        password: 0,
        isVerified: 0,
        createdAt: 0,
        results: 0,
      }).populate({
        path: "quizzes",
        select: "title description category difficulty",
      });

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send({ payload: user });
    } catch (err) {
      res
        .status(500)
        .send({ message: `Internal server error. ${err.message}` });
    }
  }

  async getCurrentUser(req, res) {
    const { _id } = req.user;
    const user = await User.findById(_id, { password: 0 });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ payload: user });
  }

  async changeUsername(req, res) {
    let { username, password } = req.body;
    username = username.trim().toLowerCase();
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(403).send({ message: "Wrong password" });
    }

    if (user.username === username) {
      return res.send({ message: "username is available" });
    }

    const usernameValidation = await signupTools.usernameValidation(req.body);

    if (!usernameValidation.valid) {
      return res.status(400).send({ message: usernameValidation.message });
    }

    user.username = username;

    const newToken = jwt.sign(
      { _id: user._id, username: user.username },
      env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    await user.save();
    res.send({
      message: "Username was successfully changed",
      payload: username,
      token: newToken,
    });
  }

  /////////DO NOT USE//////////////////
  async changeEmail(req, res) {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password.trim(), user.password))) {
      return res.status(403).send({ message: "Wrong password" });
    }

    if (user.email === email) {
      return res.send({ message: "email is available" });
    }

    const emailValidation = await signupTools.emailValidation(req.body);

    if (!emailValidation.valid) {
      return res.status(400).send({ message: emailValidation.message });
    }
    res.send({ message: "email successfully changed. Verify your email" });
  } ////////////////////////////////////////

  async changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    console.log(req.user);
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ message: "User not found" });

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(403).send({ message: "Wrong password" });
    }

    const passwordValidation = signupTools.passwordValidation(req.body);
    if (!passwordValidation.valid) {
      return res.status(400).send({ message: passwordValidation.message });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.send({ message: "Password successfullu changed" });
  }

  async uploadAvatar(req, res) {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.avatar = req.file.location;

    await user.save();
    res.send(req.file);
  }
}

export default new UserController();
