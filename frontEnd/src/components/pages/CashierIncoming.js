import React from "react";
import CashierSideBar from "./CashierSideBar";
import CashierHeader from "./CashierHeader";
import CashierMenu from "./CashierMenu";
import { useTransactions } from "./TransactionsContext";
import "../stylings/Transactions.css";
import "../stylings/CashierDashboard.css";

const CashierIncoming = () => {
  const { pendingTasks, handleProcess } = useTransactions();

  return (
    <div className="transactions-container">
      <CashierSideBar />
      <div className="transactions-content">
        <CashierHeader />
        <h2>Incoming Transactions</h2>
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Enter name or task ID" />
          <i className="fas fa-search"></i>
        </div>
        <CashierMenu />
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Task ID</th>
                <th>Phone Number</th>
                <th>Services</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.client}</td>
                  <td>{task.taskId}</td>
                  <td>{task.phone}</td>
                  <td>{task.services}</td>
                  <td>{task.amount}</td>
                  <td>
                    <button
                      className="btn-action approve"
                      onClick={() => handleProcess(task.taskId, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn-action suspend"
                      onClick={() => handleProcess(task.taskId, "Suspended")}
                    >
                      Suspend
                    </button>
                    <button
                      className="btn-action query"
                      onClick={() => handleProcess(task.taskId, "Queried")}
                    >
                      Query
                    </button>
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

export default CashierIncoming;
