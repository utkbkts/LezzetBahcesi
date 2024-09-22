import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transport.sendMail(message);
};
export default sendEmail;
