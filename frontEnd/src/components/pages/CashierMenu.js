import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../stylings/Transactions.css"; // Ensure the styling file is included
import "../stylings/CashierDashboard.css";

const CashierMenu = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/")[1];

  const getActiveClass = (tab) => (currentTab === tab ? "active-tab" : "");

  return (
    <div className="tabs">
      <Link to="/CashierIncoming">
        <p className={getActiveClass("CashierIncoming")}>Incoming</p>
      </Link>
      <Link to="/CashierApproved">
        <p className={getActiveClass("CashierApproved")}>Approved</p>
      </Link>
      <Link to="/CashierSuspended">
        <p className={getActiveClass("CashierSuspended")}>Suspended</p>
      </Link>
      <Link to="/CashierQueried">
        <p className={getActiveClass("CashierQueried")}>Queried</p>
      </Link>
    </div>
  );
};

export default CashierMenu;
