import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Order Placed",
  },
  payment: {
    type: Boolean,
    required: true,
    default: false,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  date: {
    type: Boolean,
    required: true,
    default: false,
  },

  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
