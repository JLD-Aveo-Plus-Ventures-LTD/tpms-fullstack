import React from "react";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({ setFilter }) {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to="/">
          <img src="jldlogo.png" alt="JLD Ventures" />
        </Link>
      </div>

      <nav className="navbar">
        <ul className="sidebar-menu">
          {/* Transactions Menu */}
          <li className="nav-item">
            <a
              className="nav-link dropdown-toggle"
              href="#transaction"
              role="button"
              data-bs-toggle="collapse"
              data-bs-target="#transactionMenu"
              aria-expanded="false"
            >
              Transactions
            </a>
            <div className="collapse" id="transactionMenu">
              <ul className="dropdown-submenu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilter("All")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilter("Pending")}
                  >
                    Incoming
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilter("Completed")}
                  >
                    Approved
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilter("Discrepancy")}
                  >
                    Queried
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
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
          <button onClick={handleLogout} className="btn-logout">
            Sign Out <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
