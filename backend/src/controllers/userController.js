import { User } from "../models/index.js";
import bcrypt, { compareSync } from "bcrypt";
import signupTools from "../utils/signup-validations.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { sendResponse } from "../utils/sendResponse.js";

class UserController {
  async getUserProfile(req, res) {
    try {
      const { id } = req.params;

      if (!id) return sendResponse(res, 400, false, "User ID is required");

      const user = await User.findById(id, {
        password: 0,
        isVerified: 0,
        createdAt: 0,
        results: 0,
      }).populate({
        path: "quizzes",
        select: "title description category difficulty",
      });

      if (!user) return sendResponse(res, 404, false, "User not found");

      return sendResponse(res, 200, true, "User profile fetched", user);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async getCurrentUser(req, res) {
    try {
      const { _id } = req.user;

      const user = await User.findById(_id, { password: 0 });
      if (!user) return sendResponse(res, 404, false, "User not found");

      return sendResponse(res, 200, true, "Current user fetched", user);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async changeUsername(req, res) {
    try {
      let { username, password } = req.body;

      username = username?.trim().toLowerCase();
      const user = await User.findById(req.user._id);

      if (!user) return sendResponse(res, 404, false, "User not found");

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return sendResponse(res, 403, false, "Wrong password");

      if (user.username === username)
        return sendResponse(res, 200, true, "Username is available");

      const usernameValidation = await signupTools.usernameValidation({
        username,
      });
      if (!usernameValidation.valid)
        return sendResponse(res, 400, false, usernameValidation.message);

      user.username = username;

      const newToken = jwt.sign(
        { _id: user._id, username: user.username },
        env.SECRET_KEY,
        { expiresIn: "7d" }
      );

      await user.save();

      return sendResponse(
        res,
        200,
        true,
        "Username successfully changed",
        username,
        newToken
      );
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async changeEmail(req, res) {
    try {
      let { email, password } = req.body;
      email = email?.trim().toLowerCase();

      const user = await User.findById(req.user._id);
      if (!user) return sendResponse(res, 404, false, "User not found");

      const isMatch = await bcrypt.compare(password.trim(), user.password);
      if (!isMatch) return sendResponse(res, 403, false, "Wrong password");

      if (user.email === email)
        return sendResponse(res, 200, true, "Email is available");

      const validation = await signupTools.emailValidation({ email });
      if (!validation.valid)
        return sendResponse(res, 400, false, validation.message);

      return sendResponse(
        res,
        200,
        true,
        "Email successfully changed. Please verify your email"
      );
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user._id);
      if (!user) return sendResponse(res, 404, false, "User not found");

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return sendResponse(res, 403, false, "Wrong current password");

      const validation = signupTools.passwordValidation({
        password: newPassword,
      });
      if (!validation.valid)
        return sendResponse(res, 400, false, validation.message);

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      await user.save();

      return sendResponse(res, 200, true, "Password changed successfully");
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async uploadAvatar(req, res) {
    try {
      const user = await User.findById(req.user._id);
      if (!user) return sendResponse(res, 404, false, "User not found");

      user.avatar = req.file.location;
      await user.save();

      return sendResponse(res, 200, true, "Avatar uploaded", req.file);
    } catch (err) {
      return sendResponse(res, 500, false, "Internal server error");
    }
  }

  async updateProfileInfo(req, res) {
    try {
      const { name, email} = req.body;
      // console.log("hello");
      console.log("this is req file");
      console.log("name", name);
      console.log("email", email);
  
      const user = await User.findById(req.user._id);
      if (!user) return sendResponse(res, 404, false, "User not found");
      //name update

      
      if (name) {
        const validName = signupTools.credentialsValidation(req.body);
        if (!validName.valid) {
          return sendResponse(res, 400, false, validName.message);
        }
        user.name = name;
      }

      //email update
      if (email) {
        const validEmail = await signupTools.emailValidation({ email });
        if (!validEmail.valid) {
          return sendResponse(res, 400, false, validEmail.message);
        }
        user.email = email;
      }
      
      await user.save();
      return sendResponse(res, 200, true, "User info updated", user);
    } catch (err) {
      console.log("errrrrror");
      return sendResponse(res, 500, false, "Internal server error");
    }
  }
}
export default new UserController();
