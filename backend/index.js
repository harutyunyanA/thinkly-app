import express, { json, urlencoded } from "express";
import "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import quizRoutes from "./src/routes/quizRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import attemptRoutes from "./src/routes/attemptRoutes.js";
import cors from "cors";
import { env } from "./src/config/env.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://thinkly.fun",
  "https://www.thinkly.fun",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("CORS origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/user", userRoutes);
app.use("/attempt", attemptRoutes);

const PORT = process.env.PORT || env.BASE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
