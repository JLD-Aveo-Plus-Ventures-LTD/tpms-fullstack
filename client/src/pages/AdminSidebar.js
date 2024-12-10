import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/assets/jldlogo.png" alt="JLD Ventures" />
      </div>

      <ul className="sidebar-menu">
        <li className="nav-item">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin-tickets"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Manage Tickets
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin-users"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Manage Users
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <img src="/assets/profile_pix.svg" alt="Profile" className="profile-img" />
          <div className="profile-details">
            <p className="profile-name">Admin</p>
            <p className="profile-email">admin@jld.com</p>
          </div>
        </div>
        <div className="sidebar-signout">
          <button className="btn-logout">Sign Out</button>
        </div>
      </div>
    </div>
  );
}
