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
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await contactModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error deleting message",
    });
  }
};

export { sendContact, listContacts, deleteContact };
