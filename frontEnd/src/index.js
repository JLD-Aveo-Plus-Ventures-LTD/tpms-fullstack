import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./components/pages/LoginPage";
import ForgetPassword from "./components/pages/ForgetPassword";
import OperatorDashboard from "./components/pages/OperatorDashboard";
/* import CashierDashboard from "./components/pages/CashierDashboard";
 */ import CashierIncoming from "./components/pages/CashierIncoming";
import CashierApproved from "./components/pages/CashierApproved";
import CashierSuspended from "./components/pages/CashierSuspended";
import CashierQueried from "./components/pages/CashierQueried";
import Transactions from "./components/pages/Transactions";

import CashierHeader from "./components/pages/CashierHeader";
import AllTransactions from "./components/pages/AllTransactions";
import { TransactionsProvider } from "./components/pages/TransactionsContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TransactionApproved from "./components/pages/TransactionApproved";
import TransactionSuspended from "./components/pages/TransactionSuspended";
import TransactionQueried from "./components/pages/TransactionQueried";

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
  /* {
    path: "/CashierDashboard",
    element: <CashierDashboard />,
  }, */
  {
    path: "/Transactions",
    element: <Transactions />,
  },
  {
    path: "/CashierIncoming",
    element: <CashierIncoming />,
  },
  {
    path: "/CashierApproved",
    element: <CashierApproved />,
  },
  {
    path: "/CashierSuspended",
    element: <CashierSuspended />,
  },

  {
    path: "/CashierHeader",
    element: <CashierHeader />,
  },
  {
    path: "/CashierQueried",
    element: <CashierQueried />,
  },
  {
    path: "/AllTransactions",
    element: <AllTransactions />,
  },
  {
    path: "/TransactionApproved",
    element: <TransactionApproved />,
  },
  {
    path: "/TransactionSuspended",
    element: <TransactionSuspended />,
  },
  {
    path: "/TransactionQueried",
    element: <TransactionQueried />,
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <RouterProvider router={router} />
    </TransactionsProvider>
  </React.StrictMode>
);
