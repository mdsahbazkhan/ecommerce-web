import express from "express";
import {
  sendContact,
  listContacts,
  deleteContact,
} from "../controllers/contactController.js";
import { sendReply } from "../controllers/emailController.js";
import adminAuth from "../middleware/adminAuth.js";

const contactRouter = express.Router();

// Public endpoint - for customers to send contact messages
contactRouter.post("/send", sendContact);

// Admin-protected endpoints
contactRouter.get("/list", adminAuth, listContacts);
contactRouter.post("/reply", adminAuth, sendReply);
contactRouter.delete("/:id", adminAuth, deleteContact);

export default contactRouter;
