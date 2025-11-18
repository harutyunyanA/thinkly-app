import multer from "multer";
import { uploadToS3 } from "../services/s3.js";

export const imageUpload = (fields) => {
  let upload;

  if (typeof fields === "string") {
    upload = uploadToS3.single(fields);
  } else if (Array.isArray(fields)) {
    upload = uploadToS3.fields(fields);
  } else {
    throw new Error(
      "Invalid argument for imageUpload middleware — expected string or array"
    );
  }

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .send({ message: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).send({ message: err.message });
      }
      next();
    });
  };
};
