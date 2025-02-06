import React from "react";
import "../stylings/Sidebar.css";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection

export default function Sidebar() {
  const navigate = useNavigate(); // Hook for navigating after logout

  //  Logout function: Clears auth data and redirects user
  const handleLogout = (e) => {
    e.preventDefault(); // Prevents default link behavior
    localStorage.removeItem("authToken"); // Clears auth token
    localStorage.removeItem("userRole"); // Clears user role

    navigate("/"); // Redirects user to login page
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
                    <Link className="dropdown-item" to="/Transactions">
                      All
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/TransactionApproved">
                      Approved
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/TransactionSuspended">
                      Suspended
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/CashierIncoming">
                      Query
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <img src="profile_pix.svg" alt="Profile Pix" className="profile-img" />
          <div className="profile-details">
            <p className="profile-name">Ayo Dare</p>
            <p className="profile-email">ayo@jld.com</p>
          </div>
        </div>
        <div className="sidebar-signout">
          {/* Logout link triggers handleLogout function */}
          <a href="/" onClick={handleLogout} className="signout-link">
            Sign out <i className="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
