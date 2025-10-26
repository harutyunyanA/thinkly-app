import { User } from "../models/index.js";

class SignupValidation {
  // Check if a value is a non-empty string
  isRequired(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  // Check if a string contains at least one letter (any language)
  hasLetter(value) {
    return /\p{L}/u.test(value);
  }

  // Check if a string matches a regular expression
  matchesRegex(value, regex) {
    return regex.test(value);
  }

  // --- Check that all required fields are present ---
  availabilityOfCredentials(data) {
    const requiredFields = ["name", "surname", "username", "email", "password"];
    for (const field of requiredFields) {
      if (!this.isRequired(data[field])) {
        return { valid: false, message: "All fields are required" };
      }
    }
    return { valid: true };
  }

  // --- General validation for text fields like name and surname ---
  credentialsValidation(data) {
    const { name, surname } = data;

    if (!this.hasLetter(name)) {
      return {
        valid: false,
        message: "Name should contain at least one letter",
      };
    }

    if (!this.hasLetter(surname)) {
      return {
        valid: false,
        message: "Surname should contain at least one letter",
      };
    }

    return { valid: true };
  }

  // --- Validate username---
  async usernameValidation(data) {
    let { username } = data;

    if (!this.isRequired(username)) {
      return { valid: false, message: "Username is required" };
    }

    username = username.toLowerCase();

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
      return { valid: false, message: "Username is already taken" };
    }

    return { valid: true };
  }

  // --- Validate email format ---
  async emailValidation(data) {
    let { email } = data;

    if (!this.isRequired(email)) {
      return { valid: false, message: "Email is required" };
    }

    email = email.toLowerCase();

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

  // --- Validate password strength ---
  passwordValidation(data) {
    const { password } = data;

    if (!this.isRequired(password)) {
      return {
        valid: false,
        message: "Password is required and must be a string",
      };
    }

    // Password must have at least one uppercase letter, one lowercase letter, one number, one special character, and minimum 8 characters
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
