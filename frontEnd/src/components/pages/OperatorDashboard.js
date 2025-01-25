import React from "react";
import Sidebar from "./Sidebar";
import Transactions from "./Transactions";
export default function OperatorDashboard() {
  return (
    <div className="dashboardcontainer">
      <div className="operator-dashboard">
        <Sidebar />
        <div className="main-content">
          <Transactions />
        </div>
      </div>
    </div>
  );
}
