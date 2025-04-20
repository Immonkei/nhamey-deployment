"use client";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { username, email, password, confirmPassword } = formData;

      const response = await fetch("https://nham-ey.istad.co/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSuccessMsg("Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center md:text-left">
              <h1 className="font-bold text-2xl mb-2 text-gray-800 dark:text-white">
                Register Now!
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Create your personal account to get started.
              </p>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={`w-full border ${
                  error && !formData.username
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full border ${
                  error && !formData.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`w-full border ${
                    error && !formData.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-300"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`w-full border ${
                    error && !formData.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-300"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="text-green-600 dark:text-green-400 text-sm text-center">
                {successMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-hover-primary hover:bg-primary text-base font-medium rounded-lg py-3 px-4 transition duration-200"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-6">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Log in
              </NavLink>
            </p>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 items-center justify-center p-8">
          <img
            src="/Assets/Mobile login-rafiki.png"
            alt="register"
            className="object-contain h-full max-h-[32rem]"
          />
        </div>
      </div>
    </div>
  );
}
