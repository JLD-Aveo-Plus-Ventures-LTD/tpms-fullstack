import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/apiService"; // Added: Importing the login API function to handle the backend login process.

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Added: State for displaying error messages when login fails or input is invalid.
  const [error, setError] = useState("");

  // Added: State for showing a loading spinner or disabling the login button during the login process.
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Added: Clear any previous error messages.

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields."); // Added: Display a message prompting the user to complete the form.
      return; // Added: Exit the function to prevent further processing.
    }

    setLoading(true); // Added: Start the loading state to indicate processing.

    try {
      const response = await loginUser(email, password); // Added: Call the login API to validate credentials.
      const { token, role } = response.data; // Added: Extract token and role from the backend response.

      // Added: Save the authentication token to localStorage for subsequent authenticated requests.
      localStorage.setItem("authToken", token);

      // Added: Save the user's role to localStorage to manage role-based access.
      localStorage.setItem("userRole", role);

      // Added: Redirect the user based on their role.
      if (role === "cashier") {
        navigate("/CashierDashboard"); // Redirect cashier to their dashboard.
      } else if (role === "operator") {
        navigate("/OperatorDashboard"); // Redirect operator to their dashboard.
      } else {
        setError("Unexpected role received. Please contact support."); // Handle unrecognized roles gracefully.
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data?.error || err.message); // Added: Log the error to help with debugging.
      setError(err.response?.data?.error || "Login failed. Please try again."); // Added: Display an error message to the user.
    } finally {
      setLoading(false); // Added: End the loading state, regardless of success or failure.
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
          {error && <p className="error">{error}</p>} {/* Added: Display error messages when login fails */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login →"} {/* Added: Show "Logging in..." when processing */}
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
