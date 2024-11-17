import nodemailer from "nodemailer";
import process from "process";
import { forgotPasswordTemplate } from "../utils/email.template";

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

// 1) CREATE A TRANSPORTER
const transporter = nodemailer.createTransport(config);

async function sendEmail(to: string, content: string) {
  // 2) Define an email options
  const mailOptions = {
    from: '"Adarsh | buss-tracking-system" <officialadarsh2021@gmial.com>', // sender address
    to,
    subject: "You got a mail from the adarsh",
    html: forgotPasswordTemplate(content),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("email sent successfully");
    return { status: "success", message: "email sent successfully" };
  } catch (err) {
    console.log("failed to send the email", err);
    return { status: "failed", message: "failed to send the email" };
  }
}

export default sendEmail;
