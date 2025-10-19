import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper"

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      // Simulate login success (replace with your API call)
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      {/* Heading */}
      <h3 className="text-2xl font-bold text-gray-900">Welcome Back 👋</h3>
      <p className="text-sm text-gray-600 mt-2 mb-6">
        Log in to continue building your dream resume.
      </p>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            type="email"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full mt-3 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-green-400 text-white font-semibold text-sm shadow-md hover:scale-105 transition-transform duration-300"
        >
          LOGIN
        </button>

        {/* Signup Link */}
        <p className="text-sm text-gray-700 mt-3 text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            className="font-medium text-indigo-500 hover:underline"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </>
  );
};

export default Login;
