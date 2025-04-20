"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rememberMe: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setApiError("");

        const response = await fetch("https://nham-ey.istad.co/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "Login failed. Please try again."
          );
        }

        setLoginSuccess(true);

        if (data.token) {
          localStorage.setItem("token", data.token);
        } else if (data.access_token) {
          localStorage.setItem("token", data.access_token);
        }

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        setApiError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mx-4">
        <div className="w-full md:w-1/2 p-8 md:p-10">
          {loginSuccess ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600 dark:text-green-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Login Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                You are now being redirected to your dashboard.
              </p>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="text-center md:text-left">
                <h1 className="font-bold text-2xl mb-2 text-gray-800 dark:text-white">
                  Welcome back!
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  Login to access your account.
                </p>
              </div>

              {apiError && (
                <div className="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-300 rounded-lg text-sm">
                  {apiError}
                </div>
              )}

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
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } text-gray-900 dark:text-white dark:bg-gray-700 text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}
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
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`w-full border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } text-gray-900 dark:text-white dark:bg-gray-700 text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Remember Me & Forgot */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="w-4 h-4 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-sm text-gray-900 dark:text-gray-200"
                  >
                    Remember me
                  </label>
                </div>
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium"
                >
                  Forgot Password?
                </NavLink>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 text-base font-medium rounded-lg py-3 px-4 transition duration-200 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-6">
                Don&apos;t have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-green-600 dark:text-green-400 hover:underline font-medium"
                >
                  Register
                </NavLink>
              </p>
            </form>
          )}
        </div>

        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 items-center justify-center p-8">
          <img
            src="/Assets/Mobile login-bro (1).png"
            alt="Login Illustration"
            className="object-contain h-full max-h-[32rem]"
          />
        </div>
      </div>
    </div>
  );
}
