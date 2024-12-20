import React from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom"; // Added: Imported `useNavigate` for programmatic navigation after logout.

export default function Sidebar() {
  const navigate = useNavigate(); // Added: Hook for redirecting users to the login page after logout.

  // Logout Functionality
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("authToken"); // Added: Removes the user's authentication token from localStorage.
    localStorage.removeItem("userRole"); // Added: Removes the user's role from localStorage.

    // Redirect to login page
    navigate("/"); // Added: Redirects the user to the login page.
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to="/">
          <img src="jldlogo.png" alt="JLD Ventures" />
        </Link>
      </div>

      <nav className="navbar">
        <div className="container-fluid">
          <ul className="navbar-nav sidebar-menu">
            {/* Transaction Menu */}
            <li className="nav-item">
              <a
                className="nav-link transaction-nav"
                href="#transaction"
                role="button"
                data-bs-toggle="collapse"
                data-bs-target="#transactionMenu"
                aria-expanded="false"
              >
                Transaction <span className="dropdown-arrow">&gt;</span>
              </a>

              {/* Task Menu */}
              <div className="collapse" id="transactionMenu">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="dropdown-item" href="#tasks">
                      Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item" href="#status">
                      Status
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item" href="#suspended">
                      Suspended
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item" href="#query">
                      Query
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <img
            src="profile_pix.svg"
            alt="Profile Pix"
            className="profile-img"
          />
          <div className="profile-details">
            <p className="profile-name">Ayo Dare</p>
            <p className="profile-email">ayo@jld.com</p>
          </div>
        </div>
        <div className="sidebar-signout">
          {/* Changed from <a> to <button> for accessibility and to attach logout logic */}
          <button onClick={handleLogout} className="signout-link">
            Sign out <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
