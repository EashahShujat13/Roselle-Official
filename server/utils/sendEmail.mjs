import nodemailer from "nodemailer";
import { EMAIL, APP_PASSWORD } from "../config/environment.mjs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: APP_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Roselle Official" <${EMAIL}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);

    return info;
  } catch (error) {
    console.log("Email error:", error);
    throw error;
  }
};