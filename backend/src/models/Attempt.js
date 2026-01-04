import { Schema, model, Types } from "mongoose";

const attemptSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  quiz: { type: Types.ObjectId, ref: "Quiz", required: true },

  answers: [
    {
      questionId: { type: Types.ObjectId, ref: "Question", required: true },
      selectedAnswers: [{ type: Types.ObjectId, required: true }],
      isCorrect: { type: Boolean, required: true },
    },
  ],

  // status: {
  //   type: String,
  //   enum: ["in_progress", "finished"],
  //   default: "in_progress",
  // },

  correctCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
});

export default model("Attempt", attemptSchema);
