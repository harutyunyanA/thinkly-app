import sgMail from "@sendgrid/mail";
import { env } from "../config/env.js";

sgMail.setApiKey(env.SENDGRID_API_KEY);

class Mailer {
  async send({ to, subject, html }) {
    try {
      const msg = {
        to,
        from: env.SERVER_EMAIL,
        subject,
        html,
      };
      const res = await sgMail.send(msg);
      console.log("📧 Email sent:", res[0].statusCode);
    } catch (err) {
      console.error("❌ Mail send error:", err.response?.body || err);
      throw err;
    }
  }

  async sendVerificationCode(code, email) {
    const html = `
      <div style="font-family: sans-serif; line-height: 1.6">
        <h2>Hello!</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 4px; color: #0070f3;">${code}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `;
    await this.send({ to: email, subject: "Verify your account", html });
    console.log("📧 Verification email sent to", email);
  }

  async sendResetPassword(token, email) {
    const resetLink = `${env.BASE_URL}/reset-password?token=${token}`;
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Reset your password</h2>
        <p>You requested to reset your password. Click the link below:</p>
        <a href="${resetLink}" 
           style="display: inline-block; margin: 16px 0; padding: 10px 16px; 
                  background-color: #007bff; color: white; text-decoration: none; 
                  border-radius: 5px;">Reset Password</a>
        <p>If you didn’t request this, just ignore this email.</p>
      </div>
    `;
    await this.send({ to: email, subject: "Password Reset Request", html });
    console.log(`📧 Reset password email sent to ${email}`);
  }
}

export const mailer = new Mailer();
