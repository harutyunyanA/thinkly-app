import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  // surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowerCase: true },
  avatar: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  results: [{ type: Schema.Types.ObjectId, ref: "Result" }],
  resetPasswordToken: { type: String },
  resetPasswordTokenExp: { type: Date },
});

export default model("User", userSchema);
