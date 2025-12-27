import { User } from "../models/index.js";

class SignupValidation {
  isRequired(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  hasLetter(value) {
    return /\p{L}/u.test(value);
  }

  matchesRegex(value, regex) {
    return regex.test(value);
  }

  availabilityOfCredentials(data) {
    const requiredFields = ["name", "username", "email", "password"];
    for (const field of requiredFields) {
      if (!this.isRequired(data[field])) {
        return { valid: false, message: "All fields are required" };
      }
    }
    return { valid: true };
  }

  credentialsValidation(data) {
    const { name} = data;

    if (!this.hasLetter(name)) {
      return {
        valid: false,
        message: "Name should contain at least one letter",
      };
    }

    return { valid: true };
  }

  async usernameValidation(data) {
    let { username } = data;

    if (!this.isRequired(username)) {
      return { valid: false, message: "Username is required" };
    }

    username = username.trim().toLowerCase();

    const usernameRegExp = /^[a-zA-Z0-9_.-]{3,25}$/;
    if (!this.matchesRegex(username, usernameRegExp)) {
      return {
        valid: false,
        message:
          "Username must be 3-25 characters: letters, numbers, _, -, . only",
      };
    }

    const result = await User.findOne({ username });
    if (result) {
      return { valid: false, message: "Username is not available" };
    }

    return { valid: true, message: "Username is available" };
  }

  async emailValidation(data) {
    let { email } = data;

    if (!this.isRequired(email)) {
      return { valid: false, message: "Email is required" };
    }

    email = email.trim().toLowerCase();

    const emailRegExp = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
    if (!this.matchesRegex(email, emailRegExp)) {
      return { valid: false, message: "Invalid email format" };
    }

    const result = await User.findOne({ email: email });
    if (result) {
      return { valid: false, message: "Email is already registered" };
    }
    return { valid: true };
  }

  passwordValidation(data) {
    const { password } = data;

    if (!this.isRequired(password)) {
      return {
        valid: false,
        message: "Password is required and must be a string",
      };
    }

    const passwordRegExp =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!this.matchesRegex(password.trim(), passwordRegExp)) {
      return {
        valid: false,
        message:
          "Weak password. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character",
      };
    }

    return { valid: true };
  }
}

export default new SignupValidation();
