import mongoose from "mongoose";
import { env } from "./env.js";


mongoose
  .connect("mongodb://127.0.0.1:27017/quizApp")
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("error" + err));

  