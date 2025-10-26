import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function optionalAuthentication(req, res, next) {
  const authHeder = req.headers?.authorization;
  let token = null;
  if (authHeder) {
    token = authHeder.split(" ")[1];
  }
  if (!token) return next();
  
  try {
    const result = jwt.verify(token, env.SECRET_KEY);
    req.user = result;
  } catch (err) {
    console.log("Invalid token, continuing as anonymous user.");
  }
  next();
}
