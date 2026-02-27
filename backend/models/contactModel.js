import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }, 
    status: {
      type: String,
      enum: ["pending", "replied"],
      default: "pending",
    },
    
  },
  { timestamps: true },
);
const contactModel =
  mongoose.models.contact || mongoose.model("Contact", contactSchema);
export default contactModel;
