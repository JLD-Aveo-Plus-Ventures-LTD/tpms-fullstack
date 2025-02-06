import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/apiService"; // Using the API service for login

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await loginUser(email, password);
  
      console.log("Full API Response:", response); // Debug full response
      console.log("Extracted Role:", response?.data?.role); // Fix role extraction
  
      const { token, role } = response.data; // Correct way to extract role
  
      if (!role) {
        setError("Received undefined role. Please contact support.");
        return;
      }
  
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
  
      if (role === "cashier") {
        navigate("/CashierIncoming");
      } else if (role === "operator") {
        navigate("/OperatorDashboard");
      } else {
        console.error("Unhandled role received:", role);
        setError("Unexpected role received. Please contact support.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="loginWrapper">
      {/* Decorative corner patterns */}
      <div className="corner top-left"></div>
      <div className="corner bottom-right"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>

      {/* Login form */}
      <div className="loginContainer">
        <img src="jldlogo.png" alt="jldlogo" />
        <p>Please enter your login information</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="youremail@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

        {/* Forgotten Password Link */}
        <Link to="/ForgetPassword">
          <p className="forgot-password">Forgotten Password?</p>
        </Link>
      </div>
    </div>
  );
}
