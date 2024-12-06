import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {userRole === 'operations' && <Link to="/staff-dashboard">Staff Dashboard</Link>}
      {userRole === 'cashier' && <Link to="/cashier-dashboard">Cashier Dashboard</Link>}
      {userRole === 'admin' && (
        <>
          <Link to="/admin-dashboard">Admin Dashboard</Link>
          <Link to="/admin-tickets">Manage Tickets</Link>
        </>
      )}
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
