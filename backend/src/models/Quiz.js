import { Schema, Types, model } from "mongoose";

const quizSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: { type: String, trim: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
  imageURL: { type: String, default: null },
  // isPublic: { type: Boolean, default: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  questions: [{ type: Types.ObjectId, ref: "Question" }],
  completions: { type: Number, default: 0 },
  // averageRating: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  topScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default model("Quiz", quizSchema);
