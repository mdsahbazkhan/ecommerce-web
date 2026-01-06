import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  googleLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleLogin);
userRouter.post("/register", registerUser);
userRouter.post("/admin-login", adminLogin);

export default userRouter;
