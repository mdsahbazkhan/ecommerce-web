import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import contactRouter from "./routes/contactRoutes.js";

// App Config
const app = express();
app.use(express.json());
const port = 8000;

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
app.use("/api/contact", contactRouter);
app.listen(port, () => console.log("Server Started on PORT : ", port));
export default app;
