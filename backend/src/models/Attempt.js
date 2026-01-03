import { Schema, model, Types } from "mongoose";

const attemptSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  quiz: { type: Types.ObjectId, ref: "Quiz", required: true },
  answers: [
    {
      questionId: { type: Types.ObjectId, ref: "Question", required: true },
      isCorrect: { type: Boolean, required: true },
      selectedAnswers: [
        {
          type: Types.ObjectId,
          required: true,
        },
      ],
    },
  ],
  status: { type: Number, required: true },
  // score: { type: Number, required: true },
  correctCount: { type: Number, required: true },
  // totalQuestions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Attempt", attemptSchema);
