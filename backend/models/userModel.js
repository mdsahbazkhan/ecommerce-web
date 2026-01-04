import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        // password required only for normal login
        return this.authProvider === "local";
      },
    },
     // ✅ Google login support
    googleId: {
      type: String,
      default: null,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false,timestamps: true }
);
const user = mongoose.models.user || mongoose.model("User", userSchema);
export default user;
