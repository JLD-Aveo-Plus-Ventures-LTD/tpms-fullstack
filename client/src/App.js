import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OperationStaffDashboard from './pages/OperationStaffDashboard';
import CashierDashboard from './pages/CashierDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminTickets from './pages/AdminTickets';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';

function App() {
  const location = useLocation();

  // Define paths where Navigation should not be displayed
  const hideNavigationRoutes = [
    '/staff-dashboard',
    '/cashier-dashboard',
    '/admin-dashboard',
    '/admin-tickets',
  ];

  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <div>
      {/* Conditionally render Navigation */}
      {!shouldHideNavigation && <Navigation />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute allowedRoles={['operations']}>
              <OperationStaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cashier-dashboard"
          element={
            <ProtectedRoute allowedRoles={['cashier']}>
              <CashierDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-tickets"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminTickets />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
