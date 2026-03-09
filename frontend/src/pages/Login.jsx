import React, { useEffect, useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { token, setToken, navigate, backendUrl, setUser } =
    useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          toast.success("Logged in Successfully");
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      const response = await axios.post(`${backendUrl}/api/user/google-login`, {
        token: googleToken,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        toast.success("Logged in with Google ");
      } else {
        toast.error(response.data.message || "Google login failed");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        "Google login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-24 gap-5 text-slate-900 animate-fadeIn"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-3 mb-4 animate-fadeInUp">
        <p className="prata-regular text-4xl text-slate-900">{currentState}</p>
        <hr
          className="border-none h-[2px] w-10 bg-gradient-to-r from-cyan-500 to-cyan-600 animate-scaleIn rounded-full"
          style={{ animationDelay: "200ms" }}
        />
      </div>

      {/* Name (Signup only) */}
      {currentState === "Sign Up" && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-2 border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 animate-fadeInUp bg-slate-50 focus:bg-white text-slate-900 font-medium"
          style={{ animationDelay: "200ms" }}
          type="text"
          placeholder="Full Name"
          required
        />
      )}

      {/* Email */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border-2 border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 animate-fadeInUp bg-slate-50 focus:bg-white text-slate-900 font-medium"
        style={{ animationDelay: "300ms" }}
        type="email"
        placeholder="Email Address"
        required
      />

      {/* Password */}
      <div
        className="relative w-full animate-fadeInUp"
        style={{ animationDelay: "400ms" }}
      >
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 pr-12 bg-slate-50 focus:bg-white text-slate-900 font-medium"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 transform transition-all duration-300 hover:scale-110 hover:text-cyan-600"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </span>
      </div>

      {/* Remember Me (Login only) */}
      {currentState === "Login" && (
        <div
          className="w-full flex items-center justify-between text-sm animate-fadeInUp"
          style={{ animationDelay: "500ms" }}
        >
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer transform transition-all duration-300 hover:text-cyan-600 font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 accent-cyan-600 cursor-pointer"
            />
            Remember me
          </label>
          <p className="cursor-pointer hover:underline text-cyan-600 transform transition-all duration-300 hover:scale-105 font-bold">
            Forgot Password?
          </p>
        </div>
      )}

      {/* Toggle Login / Signup */}
      {currentState === "Sign Up" && (
        <p
          onClick={() => setCurrentState("Login")}
          className="text-sm cursor-pointer text-slate-600 hover:text-cyan-600 transform transition-all duration-300 hover:translate-x-1 animate-fadeIn font-medium"
          style={{ animationDelay: "500ms" }}
        >
          Already have an account? <span className="font-bold text-cyan-600">Login here</span>
        </p>
      )}

      {currentState === "Login" && (
        <p
          onClick={() => setCurrentState("Sign Up")}
          className="text-sm cursor-pointer text-slate-600 hover:text-cyan-600 transform transition-all duration-300 hover:translate-x-1 animate-fadeIn font-medium"
          style={{ animationDelay: "500ms" }}
        >
          Don't have an account? <span className="font-bold text-cyan-600">Create one</span>
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm text-center animate-shake font-bold">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        disabled={loading}
        className={`w-full py-4 px-8 rounded-xl font-bold text-white transition-all duration-300 animate-fadeInUp shadow-lg ${
          loading
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
        }`}
        style={{ animationDelay: "600ms" }}
      >
        {loading
          ? "Please wait..."
          : currentState === "Login"
            ? "Sign In"
            : "Sign Up"}
      </button>

      {/* Terms & Privacy (Signup only) */}
      {currentState === "Sign Up" && (
        <p
          onClick={() => navigate("/privacy")}
          className="text-xs text-slate-500 text-center mt-1 animate-fadeIn"
          style={{ animationDelay: "700ms" }}
        >
          By signing up, you agree to our{" "}
          <span className="text-cyan-600 cursor-pointer hover:underline transform transition-all duration-300 hover:scale-105 inline-block font-bold">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-cyan-600 cursor-pointer hover:underline transform transition-all duration-300 hover:scale-105 inline-block font-bold">
            Privacy Policy
          </span>
          .
        </p>
      )}

      {/* Divider */}
      <div
        className="w-full flex items-center gap-4 my-2 animate-fadeIn"
        style={{ animationDelay: "800ms" }}
      >
        <hr className="flex-1 border-slate-300" />
        <p className="text-sm text-slate-500 font-bold">OR</p>
        <hr className="flex-1 border-slate-300" />
      </div>

      {/* Google Login */}
      <div className="animate-fadeInUp w-full flex justify-center" style={{ animationDelay: "900ms" }}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Google Login Failed")}
          theme="outline"
          size="large"
          width="100%"
        />
      </div>
    </form>
  );
};

export default Login;
