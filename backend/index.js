import express, { json, urlencoded } from "express";
import "./src/config/db.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import authRoutes from "./src/routes/authRoutes.js";
import quizRoutes from "./src/routes/quizRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import attemptRoutes from "./src/routes/attemptRoutes.js";
import cors from "cors";
import { env } from "./src/config/env.js";

const app = express();
const swaggerDocument = YAML.load("./src/docs/api.yaml");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://thinkly.fun"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/user", userRoutes);
app.use("/attempt", attemptRoutes);

app.listen(env.BASE_PORT, () => console.log(`${env.BASE_URL}${env.BASE_PORT}`));
