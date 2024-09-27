import catchAsyncError from "../middleware/catch.middleware.js";
import { getContactHtmlTemplate } from "../utils/contactTemplate.js";
import nodemailer from "nodemailer";

const sendMessage = catchAsyncError(async (req, res, next) => {
  const { email, message } = req.body;

  const messageHtml = getContactHtmlTemplate(email, message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const messageTemplate = {
    from: `<${email}>`,
    to: process.env.SMTP_TO_EMAIL,
    subject: "Lezzet Bahçesi Mesajı",
    html: messageHtml,
  };

  await transporter.sendMail(messageTemplate);

  res.status(201).json({
    message: "Mesaj başarıyla gönderildi",
  });
});

export default { sendMessage };
