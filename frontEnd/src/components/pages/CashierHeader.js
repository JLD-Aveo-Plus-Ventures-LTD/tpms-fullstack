import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../stylings/Transactions.css";
import "../stylings/CashierDashboard.css";
const CashierHeader = () => {
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();
  const currentTab = location.pathname.split("/")[1]; // Determine active tab from route

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    const interval = setInterval(updateCurrentTime, 1000);
    updateCurrentTime();

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <h6>
        Transaction &gt;{" "}
        <span className="activeStatus">
          {currentTab.replace("Cashier", "")}
        </span>
      </h6>
      <div className="time-display">
        <span>Time:</span> {currentTime}
      </div>
      <div className="notification-bell">
        <i className="fas fa-bell"></i>
      </div>
    </header>
  );
};

export default CashierHeader;
