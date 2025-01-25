import React from "react";
import CashierSideBar from "./CashierSideBar";
import CashierHeader from "./CashierHeader";
import { useTransactions } from "./TransactionsContext";
import CashierMenu from "./CashierMenu";
import "../stylings/Transactions.css";
import "../stylings/CashierDashboard.css";

const CashierSuspended = () => {
  const { suspendedTasks } = useTransactions();

  return (
    <div className="transactions-container">
      <CashierSideBar />
      <div className="transactions-content">
        <CashierHeader />
        <h2>Suspended Transactions</h2>
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {suspendedTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.client}</td>
                  <td>{task.taskId}</td>
                  <td>{task.phone}</td>
                  <td>{task.services}</td>
                  <td>{task.amount}</td>
                  <td className="cashier-suspend">{task.status}</td>
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

export default CashierSuspended;
