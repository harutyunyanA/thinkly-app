import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  email: { type: String, required: true, unique: true, lowerCase: true },
  avatar: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  googleId: { type: String, unique: true, sparse: true },
  avgScore: { type: Number, default: 0 },
  provider: { type: String, enum: ["local", "google"], default: "local" },
  createdAt: { type: Date, default: Date.now },
  quizzes: [{ type: Types.ObjectId, ref: "Quiz" }],
  results: [{ type: Types.ObjectId, ref: "Attempt" }],
  resetPasswordToken: { type: String },
  resetPasswordTokenExp: { type: Date },
});

export default model("User", userSchema);
