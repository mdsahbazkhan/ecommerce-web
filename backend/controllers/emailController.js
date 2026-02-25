import nodemailer from "nodemailer";
const sendReply = async (req, res) => {
  try {
    const { email, message } = req.body;
    if (!email || !message) {
      return res.json({
        success: false,
        message: "Email and message are required",
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
      subject: "Reply from Bazario Support",
      text: message,
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Reply sent successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to send email" });
  }
};
export { sendReply };
