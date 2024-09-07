import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,

    pass: process.env.NODEMAILER_EMAIL_PASS,
  },
});

transporter.verify(function (_error, success) {
  if (success) {
    console.log("Node mailer is ready to take our messages");
  }
});
export async function sendResetEmail(email: string, token: string) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Groomme - Password Reset Link",
    text: `You requested a password reset. Please use the following link to reset your password: ${resetLink}`,
    html: `<p>You requested a password reset. Please use the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
}
