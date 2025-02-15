import React, { useState, useEffect } from "react";
import CashierHeader from "./CashierHeader";
import TransactionMenu from "./TransactionMenu";
import Sidebar from "./Sidebar";
import "../stylings/Transactions.css";
import "../stylings/CashierDashboard.css";
import axios from "axios"; // Import Axios to fetch data from the backend
import API_URL from "../../config"; // Import API URL from the config file

const TransactionApproved = () => {
  const [approvedTasks, setApprovedTasks] = useState([]); // State to store approved transactions

  // Fetch approved transactions from the backend when the component mounts
  useEffect(() => {
    const fetchApprovedTransactions = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get authentication token
        const response = await axios.get(`${API_URL}/tickets?status=completed`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token for authorization
        });

        // Map backend response to match frontend structure
        const formattedTasks = response.data.map((task) => ({
          client: task.client_name || "N/A", // Map client_name from backend to client
          taskId: task.ticket_code || "N/A", // Map ticket_code from backend to taskId
          phone: task.client_phone || "N/A", // Map client_phone from backend to phone
          services: task.service_details || "N/A", // Map service_details from backend to services
          amount: task.price ? `₦${task.price.toLocaleString()}` : "N/A", // Format price with currency symbol
          status: task.status || "N/A", // Map status from backend
        }));

        // Ensure newest transactions appear first
        const sortedTasks = formattedTasks.sort((a, b) => b.taskId.localeCompare(a.taskId));

        setApprovedTasks(sortedTasks); // Update state with formatted transactions
      } catch (error) {
        console.error("Error fetching approved transactions:", error);
        alert("Failed to fetch approved transactions. Please try again."); // Show error message to user
      }
    };

    fetchApprovedTransactions();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="transactions-container">
      <Sidebar />
      <div className="transactions-content">
        <CashierHeader />
        <h2>Approved Transactions</h2>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Enter name or task ID" />
          <i className="fas fa-search"></i>
        </div>

        <TransactionMenu />

        {/* Transactions Table */}
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
              {approvedTasks.length > 0 ? (
                approvedTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.client}</td>
                    <td>{task.taskId}</td>
                    <td>{task.phone}</td>
                    <td>{task.services}</td>
                    <td>{task.amount}</td>
                    <td className="cashier-approved">{task.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No approved transactions found.
                  </td>
                </tr>
              )}
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

export default TransactionApproved;
