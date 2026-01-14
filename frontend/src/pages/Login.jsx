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
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.message);
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
        toast.success("Logged in with Google ");
      } else {
        toast.error(response.data.message || "Google login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
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
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-24 gap-4 text-indigo-800"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-indigo-800" />
      </div>

      {/* Name (Signup only) */}
      {currentState === "Sign Up" && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
          type="text"
          placeholder="Full Name"
          required
        />
      )}

      {/* Email */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
        type="email"
        placeholder="Email Address"
        required
      />

      {/* Password */}
      <div className="relative w-full">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500 pr-10"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-indigo-600"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
      </div>

      {/* Remember Me (Login only) */}
      {currentState === "Login" && (
        <div className="w-full flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-indigo-600 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-indigo-600"
            />
            Remember me
          </label>
          <p className="cursor-pointer hover:underline text-indigo-600">
            Forgot Password?
          </p>
        </div>
      )}

      {/* Toggle Login / Signup */}
      {currentState === "Sign Up" && (
        <p
          onClick={() => setCurrentState("Login")}
          className="text-sm cursor-pointer text-indigo-600 hover:underline"
        >
          Already have an account? Login here
        </p>
      )}

      {currentState === "Login" && (
        <p
          onClick={() => setCurrentState("Sign Up")}
          className="text-sm cursor-pointer text-indigo-600 hover:underline"
        >
          Don’t have an account? Create one
        </p>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Submit */}
      <button
        disabled={loading}
        className={`w-full py-2 px-8 rounded-md font-semibold transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {loading
          ? "Please wait..."
          : currentState === "Login"
          ? "Sign In"
          : "Sign Up"}
      </button>

      {/* Terms & Privacy (Signup only) */}
      {currentState === "Sign Up" && (
        <p className="text-xs text-gray-500 text-center mt-1">
          By signing up, you agree to our{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline">
            Privacy Policy
          </span>
          .
        </p>
      )}

      {/* Divider */}
      <div className="w-full flex items-center gap-3 my-2">
        <hr className="flex-1 border-gray-300" />
        <p className="text-sm text-gray-500">OR</p>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Google Login */}
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => toast.error("Google Login Failed")}
        theme="outline"
        size="large"
        width="100%"
      />
    </form>
  );
};

export default Login;
