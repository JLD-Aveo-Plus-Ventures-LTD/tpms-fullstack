import React from "react";
import { Navigate } from "react-router-dom";

// A component to protect routes based on user role and authentication status.
const RoleProtectedRoute = ({ role, children }) => {
  // Retrieve the authentication token from localStorage.
  const token = localStorage.getItem("authToken");

  // Retrieve the user's role from localStorage.
  const storedRole = localStorage.getItem("userRole");

  // Debugging logs to track what is being retrieved and expected.
  console.log("Token from LocalStorage:", token);
  console.log("Role from LocalStorage:", storedRole);
  console.log("Expected Role:", role);

  // If no token is found, redirect to the login page.
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If the user's role does not match the required role, deny access.
  if (storedRole !== role) {
    console.warn(`Access Denied: Expected ${role}, got ${storedRole}`);
    return <div>403 - Forbidden: Insufficient privileges</div>;
  }

  // If all checks pass, render the protected child component.
  return children;
};

export default RoleProtectedRoute;
