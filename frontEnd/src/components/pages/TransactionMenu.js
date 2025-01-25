import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../stylings/Transactions.css"; // Ensure the styling file is included
import "../stylings/CashierDashboard.css";

const TransactionMenu = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/")[1];

  const getActiveClass = (tab) => (currentTab === tab ? "active-tab" : "");

  return (
    <div className="tabs">
      <Link to="/TransactionApproved">
        <p className={getActiveClass("TransactionApproved")}>Approved</p>
      </Link>
      <Link to="/TransactionSuspended">
        <p className={getActiveClass("TransactionSuspended")}>Suspended</p>
      </Link>
      <Link to="/TransactionQueried">
        <p className={getActiveClass("TransactionQueried")}>Queried</p>
      </Link>
    </div>
  );
};

export default TransactionMenu;
