import mongoose from "mongoose";

const dbUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/quizApp";

mongoose
  .connect(dbUrl)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.error("DB CONNECTION ERROR:", err));
