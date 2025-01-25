import React from "react";
import Sidebar from "./Sidebar";
import "../stylings/Transactions.css";
import { useTransactions } from "./TransactionsContext";

const AllTransactions = () => {
  const { approvedTasks } = useTransactions();

  return (
    <div className="transactions-container">
      <Sidebar />
      <div className="transactions-content">
        <h2>Approved Transactions</h2>
        <div className="table-container">
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
              {approvedTasks.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.client}</td>
                  <td>{task.taskId}</td>
                  <td>{task.phone}</td>
                  <td>{task.services}</td>
                  <td>{task.amount}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;
