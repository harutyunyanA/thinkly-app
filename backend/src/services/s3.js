// utils/s3.ts
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import uniqid from "uniqid";
import { env } from "../config/env.js";

// ✅ Инициализация S3
const s3 = new AWS.S3({
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});

// ✅ Multer + S3 для аватаров
export const uploadToS3 = multer({
  storage: multerS3({
    s3,
    bucket: env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      const uniqueName = `avatar-${Date.now()}-${uniqid()}.${ext}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG or WEBP images are allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
