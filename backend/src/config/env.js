import dotenv from "dotenv";
dotenv.config();

export const env = {
  SERVER_EMAIL: process.env.SERVER_EMAIL,
  MAIL_PASS: process.env.MAIL_PASS,
  SECRET_KEY: process.env.SECRET_KEY,
  // VERIFY_LINK: process.env.VERIFY_LINK,
  BASE_URL: process.env.BASE_URL,
  ACCESS_KEY: process.env.ACCESS_KEY,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  BASE_PORT: process.env.BASE_PORT,
};
