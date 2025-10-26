import dotenv from "dotenv";
dotenv.config();

export const env = {
  SERVER_EMAIL: process.env.SERVER_EMAIL,
  MAIL_PASS: process.env.MAIL_PASS,
  SECRET_KEY: process.env.SECRET_KEY,
  VERIFY_LINK: process.env.VERIFY_LINK,
  BASE_URL: process.env.BASE_URL,
};
