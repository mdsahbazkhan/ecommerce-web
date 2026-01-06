import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  bestseller: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  highlights: {
    type: [String],
    required: true,
  },
});
const productModel =
  mongoose.models.product || mongoose.model("Product", productSchema);
export default productModel;
