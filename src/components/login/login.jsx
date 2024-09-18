// src/components/Login.js
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Login = ({ setIsLoggedIn, setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://inverster-app.vercel.app/api/v1/Auth/login",
        loginDetails
      );

      if (response.status === 200 || response.status === 201) {
        alert("Login successful!");
        setIsLoggedIn(true);
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-md mx-auto p-8 border border-gray-200 rounded-lg shadow-lg bg-white"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter work email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          name="password"
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          type={showPassword ? "text" : "password"}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          {showPassword ? (
            <EyeOff
              onClick={handleTogglePasswordVisibility}
              className="h-5 w-5 text-gray-500 cursor-pointer"
            />
          ) : (
            <Eye
              onClick={handleTogglePasswordVisibility}
              className="h-5 w-5 text-gray-500 cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox" />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <p className="text-sm text-blue-500 hover:underline cursor-pointer">Forgot Password?</p>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <button
        type="button"
        className="w-full py-2 bg-white-600 border-gray-500 border-[2px] text-black mt-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleRegisterClick}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Login;
