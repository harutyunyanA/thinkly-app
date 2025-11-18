import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function isAuthenticated(req, res, next) {
  const authHeder = req.headers.authorization;
  if (!authHeder) {
    return res.status(401).send({ message: "No token provided" });
  }
  const token = authHeder.split(" ")[1];
  try {
    const result = jwt.verify(token, env.SECRET_KEY);
    req.user = result;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
}
