import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <div className="corner top-left"></div>
      <div className="corner bottom-right"></div>

      <div className="loginWrapper">
        <div className="loginContainer">
          <img src="jldlogo.png" alt="jldlogo" />
          <p>Reset your password</p>
          <form>
            <label htmlFor="Email">Email</label>
            <input type="email" placeholder="youremail@email.com" />
            <label htmlFor="Password">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="Password">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </form>
          {/* Use Link for navigation */}
          <Link to="/">
            <p>Back to Login</p>
          </Link>
          <button>Reset Password →</button>
        </div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
      </div>
    </div>
  );
}
