import { UserVerification } from "../models/index.js";

export async function verificationCode(user) {
  const { _id } = user;
  const code = Math.floor(100000 + Math.random() * 900000);
  await UserVerification.create({
    userId: _id,
    code: code,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });
  return code;
}
