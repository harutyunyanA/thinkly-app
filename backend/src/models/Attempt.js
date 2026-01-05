import { Schema, model, Types } from "mongoose";

const attemptSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  quiz: { type: Types.ObjectId, ref: "Quiz", required: true },

  answers: [
    {
      questionId: { type: Types.ObjectId, ref: "Question", required: true },
      selectedAnswers: [{ type: Types.ObjectId, required: true }],
      isCorrect: { type: Boolean, default: null },
    },
  ],

  status: {
    type: String,
    enum: ["in_progress", "finished"],
    default: "in_progress",
  },
  score: { type: Number, default: 0 },

  correctCount: { type: Number, default: 0 },
  finishedAt: { type: Date },

  createdAt: { type: Date, default: Date.now },
});

export default model("Attempt", attemptSchema);
