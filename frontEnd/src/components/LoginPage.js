import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Send request to backend
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Redirect based on user role
        if (data.role === "cashier") {
          navigate("/CashierDashboard");
        } else if (data.role === "operator") {
          navigate("/OperatorDashboard");
        } else {
          setError("Unexpected role received. Please contact support.");
        }
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
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
