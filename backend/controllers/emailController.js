import nodemailer from "nodemailer";
import contactModel from "../models/contactModel.js";
const sendReply = async (req, res) => {
  try {
    const { email, message, id } = req.body;
    if (!email || !message || !id) {
      return res.json({
        success: false,
        message: "Email, message and id are required",
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Reply from BazarioX Support",
      text: message,
    };
    await transporter.sendMail(mailOptions);
    await contactModel.findByIdAndUpdate(id, { status: "replied" });
    return res.json({
      success: true,
      message: "Reply sent and status updated",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to send email" });
  }
};
export { sendReply };
