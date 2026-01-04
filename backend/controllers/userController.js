import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// Route for user login
const loginUser = async (req, res) => {};

// Route for user register

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password is not strong enough" });
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Route for admin login

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
