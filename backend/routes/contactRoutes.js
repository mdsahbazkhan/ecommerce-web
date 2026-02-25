import express from "express";
import { sendContact, listContacts,deleteContact } from "../controllers/contactController.js";
import { sendReply } from "../controllers/emailController.js";
const contactRouter = express.Router();

contactRouter.post("/send", sendContact);
contactRouter.get("/list", listContacts);
contactRouter.post("/reply", sendReply);
contactRouter.delete("/:id", deleteContact);

export default contactRouter;
