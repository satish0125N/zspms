import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("user_role");
    
    if (token && userRole) {
      if (userRole === "administrator") {
        navigate("/admin");
      } else if (userRole === "subscriber") {
        navigate("/user");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post(
        "http://localhost/zspms/wordpress/wp-json/custom/v1/login",
        { username, password }
      );

      if (!response.data || !response.data.user_id) {
        throw new Error("Invalid response from server");
      }

      const { user_id, roles, token = response.data.jwt } = response.data;

      // Save authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("user_role", roles[0]);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("username", username);

      // Set axios default header for future requests
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      // Redirect based on role
      if (roles.includes("administrator")) {
        navigate("/admin");
      } else if (roles.includes("subscriber")) {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
