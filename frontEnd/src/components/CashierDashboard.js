import React, { useState, useEffect } from "react";
import CashierSideBar from "./CashierSideBar";
import "./Transactions.css";
import "./CashierDashboard.css";

const Transactions = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [transactions] = useState([
    {
      name: "Alexander",
      taskId: "AL12345",
      phone: "+237 6 99 88 77 66",
      description: "Printing, Design",
      amount: "1,200",
    },
    {
      name: "Felix",
      taskId: "AL12309",
      phone: "+237 6 99 88 77 66",
      description: "Editing, Printing",
      amount: "700",
    },
    {
      name: "Kemi",
      taskId: "AL12389",
      phone: "+237 6 99 88 77 66",
      description: "Photocopy",
      amount: "300",
    },
    {
      name: "Mohammed",
      taskId: "AL12333",
      phone: "+237 6 99 88 77 66",
      description: "Design",
      amount: "2,000",
    },
  ]);

  // Update time every second
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

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="transactions-container">
      <CashierSideBar />
      <div className="transactions-content">
        {/* Header Section */}
        <header className="header">
          <h6>
            Transaction &gt; <span className="activeStatus"> Incoming </span>
          </h6>
          <div className="time-display">
            <span>Time:</span>
            {currentTime}
          </div>
          <div className="notification-bell">
            <i className="fas fa-bell"></i>
          </div>
        </header>
        <h2>Tasks</h2>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Enter name or task ID" />
          <i className="fas fa-search"></i>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <p className="active-tab">Incoming</p>
          <p>Approved</p>
          <p>Suspended</p>
        </div>

        {/* Transactions Table */}
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Task ID</th>
                <th>Phone Number</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.name}</td>
                  <td>{transaction.taskId}</td>
                  <td>{transaction.phone}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <button className="approve-btn">Approve</button>
                    <button className="suspend-btn">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button>&laquo;</button>
          <button className="active-page">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>...</button>
          <button>10</button>
          <button>&raquo;</button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
