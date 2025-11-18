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

// ✅ Конфигурация Multer + S3
export const uploadToS3 = multer({
  storage: multerS3({
    s3,
    bucket: env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 🔹 Автоматически проставляет правильный Content-Type
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      // 🔹 Разные директории для разных типов загрузок (quiz vs avatar)
      let folder = "uploads";
      if (file.fieldname === "avatar") folder = "avatars";
      if (file.fieldname === "quizImage") folder = "quiz-covers";
      if (file.fieldname === "questionImages") folder = "quiz-questions";

      const ext = file.originalname.split(".").pop();
      const uniqueName = `${folder}/${Date.now()}-${uniqid()}.${ext}`;
      cb(null, uniqueName);
    },
  }),

  // ✅ Фильтр по типу файлов
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG or WEBP images are allowed"));
    }
  },

  // ✅ Лимит размера файла — 5MB
  limits: { fileSize: 5 * 1024 * 1024 },
});
