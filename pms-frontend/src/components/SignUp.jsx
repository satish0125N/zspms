import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost/zspms/wordpress/wp-json/custom/v1/register",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        localStorage.setItem("user_id", response.data.user_id); // Save user ID if needed
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Show WordPress error message
      } else {
        setError("Signup failed, please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Sign Up
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mb-4 bg-green-100 p-2 rounded">
            {successMessage}
          </p>
        )}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300 outline-none text-black"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300 outline-none text-black"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300 outline-none text-black"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
