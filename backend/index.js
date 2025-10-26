import express, { json, urlencoded } from "express";
import "./src/config/db.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import authRoutes from "./src/routes/authRoutes.js";
import quizRoutes from "./src/routes/quizRoutes.js";
import cors from "cors";
const app = express();
const swaggerDocument = YAML.load("./src/docs/api.yaml");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://brainteaser.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);

app.listen(4002, () => console.log("http://localhost:4002"));
