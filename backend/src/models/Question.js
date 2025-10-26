import { Schema, Types, model } from "mongoose";


const answerSchema = new Schema({
  text: { type: String, required: true, trim: true },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new Schema({
  quiz: { type: Types.ObjectId, ref: "Quiz", required: true },
  text: { type: String, required: true, trim: true },
  answers: [
    answerSchema
  ],
  multipleAnswers: { type: Boolean, default: false },
  imageUrl: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export default model("Question", questionSchema);
