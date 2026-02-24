import express from "express";
import { sendContact, listContacts } from "../controllers/contactController.js";
const contactRouter = express.Router();

contactRouter.post("/send", sendContact);
contactRouter.get("/list", listContacts);

export default contactRouter;
