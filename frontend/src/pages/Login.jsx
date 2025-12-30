import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // backend logic later
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

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
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
          type="text"
          placeholder="Full Name"
          required
        />
      )}

      {/* Email */}
      <input
        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
        type="email"
        placeholder="Email Address"
        required
      />

      {/* Password */}
      <div className="relative w-full">
        <input
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
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-sm font-medium text-gray-700">
          Continue with Google
        </span>
      </button>
    </form>
  );
};

export default Login;
