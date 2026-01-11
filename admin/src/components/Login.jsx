import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "sonner";

const Login = ({ setToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin-login", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Logged in successfully");
      } else {
        toast.error(response.data.message);
      }
      console.log(response);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">
            Login to manage your store
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmitHandler}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2  rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              required
            />
          </div>

          {/* Password with Eye */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2  rounded-lg outline-none pr-10 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-indigo-500 hover:text-indigo-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2.5 rounded-lg font-medium"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          © 2026 Bazario Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Login;
