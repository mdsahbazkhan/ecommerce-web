import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  googleLogin,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleLogin);
userRouter.post("/register", registerUser);
userRouter.post("/admin-login", adminLogin);
userRouter.get("/profile", authUser, getUserProfile);
userRouter.put("/profile", authUser, updateUserProfile);

export default userRouter;
