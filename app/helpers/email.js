import { createTransport } from "nodemailer";
import { GMAIL_EMAIL, GMAIL_PASSWORD } from "./constant.js";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_EMAIL, // replace with your Gmail email
    pass: GMAIL_PASSWORD, // replace with your Gmail password
  },
});

export function sendEmail(email, content) {
  return transporter.sendMail({
    from: `"L'equipe support 💌" <support@collock-easy.com>`,
    to: email,
    subject: "Récupération de mot de passe",
    html: content,
  });
}
