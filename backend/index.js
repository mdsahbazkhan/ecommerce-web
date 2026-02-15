import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// App Config
const app = express();
app.use(express.json());
const port = process.env.PORT || 8001;

connectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors());
// Root route
app.get("/", (req, res) => {
  res.send("Bazario Backend is running on Vercel 🚀");
});
// Api EndPoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
