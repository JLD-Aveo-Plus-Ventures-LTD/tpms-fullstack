import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiService";
import "../styles/Login.css"; // Import the CSS file

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(username, password);
      localStorage.setItem("authToken", response.data.token);

      // Navigate based on role
      const role = response.data.role;
      if (role === "admin") navigate("/admin-dashboard");
      else navigate(role === "cashier" ? "/cashier-dashboard" : "/staff-dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="corner top-left"></div>
      <div className="corner bottom-right"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>

      <div className="loginContainer">
        <img src="jldlogo.png" alt="jldlogo" />
        <p>Please enter your login information</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          <a href="/ForgetPassword">Forgotten Password?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
