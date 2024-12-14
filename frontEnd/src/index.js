import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./components/LoginPage";
import ForgetPassword from "./components/ForgetPassword";
import OperatorDashboard from "./components/OperatorDashboard";
import CashierDashboard from "./components/CashierDashboard";
import Transactions from "./components/Transactions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/ForgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/OperatorDashboard",
    element: <OperatorDashboard />,
  },
  {
    path: "/CashierDashboard",
    element: <CashierDashboard />,
  },
  {
    path: "/Transactions",
    element: <Transactions />,
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
