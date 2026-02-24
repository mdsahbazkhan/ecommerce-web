import contactModel from "../models/contactModel.js";

const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const contact = new contactModel({
      name,
      email,
      subject,
      message,
    });
    await contact.save();
    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};
const listContacts = async (req, res) => {
  try {
    const message = await contactModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching messages",
    });
  }
};

export { sendContact, listContacts };
