import React, { useState, useEffect } from "react";
import CashierSideBar from "./CashierSideBar";
import "./Transactions.css";
import "./CashierDashboard.css";
import axios from "axios";
import API_URL from "../config";

const Transactions = () => {
  // State for current time
  const [currentTime, setCurrentTime] = useState("");

  // Transactions fetched from the backend
  const [transactions, setTransactions] = useState([]);

  // Control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Selected transaction for approval
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Form data for payment approval modal
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "Cash",
    discrepancyReason: "",
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState("Incoming");

  // Update the current time every second
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };

    const interval = setInterval(updateCurrentTime, 1000);
    updateCurrentTime();

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data); // Populate transactions
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  // Handle input changes in the modal form
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Show modal for approving a transaction
  const handleApprove = (transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      amount: "",
      paymentMethod: "Cash",
      discrepancyReason: "",
    });
    setShowModal(true);
  };

  // Submit payment approval
  const submitApproval = async () => {
    const { amount, paymentMethod, discrepancyReason } = formData;
    const expectedAmount = parseFloat(selectedTransaction.price.replace(",", ""));
  
    // Validate form inputs
    if (!amount || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const numericAmount = parseFloat(amount);
  
    if (isNaN(numericAmount)) {
      alert("Please enter a valid numeric amount.");
      return;
    }
  
    // Require discrepancy reason if amounts don't match
    const isDiscrepancy = numericAmount !== expectedAmount;
    if (isDiscrepancy && !discrepancyReason) {
      alert("Please provide a reason for the discrepancy.");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${API_URL}/payments`,
        {
          ticket_id: selectedTransaction.ticket_id, // Use ticket_id to match backend expectation
          amount: numericAmount,
          payment_method: paymentMethod,
          discrepancy_reason: isDiscrepancy ? discrepancyReason : null, // Include discrepancy_reason only if needed
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      alert("Payment submitted successfully!");
      setShowModal(false); // Close modal
      setSelectedTransaction(null); // Clear selection
      setFormData({ amount: "", paymentMethod: "Cash", discrepancyReason: "" }); // Reset form
    } catch (err) {
      console.error("Error submitting payment:", err);
      alert("Failed to submit payment. Please try again.");
    }
  };
  
  

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "Incoming") {
      return transaction.status === "Pending";
    } else if (activeTab === "Approved") {
      return transaction.status === "Completed";
    } else if (activeTab === "Suspended") {
      return transaction.status === "Discrepancy";
    }
    return false;
  });

  return (
    <div className="transactions-container">
      <CashierSideBar />
      <div className="transactions-content">
        {/* Header Section */}
        <header className="header">
          <h6>
            Transaction &gt; <span className="activeStatus">{activeTab}</span>
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

        {/* Tabs for filtering */}
        <div className="tabs">
          <p
            className={`tab ${activeTab === "Incoming" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("Incoming")}
          >
            Incoming
          </p>
          <p
            className={`tab ${activeTab === "Approved" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("Approved")}
          >
            Approved
          </p>
          <p
            className={`tab ${activeTab === "Suspended" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("Suspended")}
          >
            Suspended
          </p>
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
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.client_name}</td>
                  <td>{transaction.ticket_code}</td>
                  <td>{transaction.client_phone}</td>
                  <td>{transaction.service_details}</td>
                  <td>{transaction.price}</td>
                  <td>
                    {activeTab === "Incoming" && (
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(transaction)}
                      >
                        Approve
                      </button>
                    )}
                    <button className="suspend-btn">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Non-functional) */}
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

        {/* Payment Modal */}
        {showModal && selectedTransaction && (
          <>
            <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
            <div className={`modal ${showModal ? "show" : ""}`}>
              <div className="modal-content">
                <h3>Approve Transaction for {selectedTransaction.client_name}</h3>
                <div className="form-group">
                  <label>Amount Received:</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Payment Method:</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                  >
                    <option value="Cash">Cash</option>
                    <option value="POS">POS</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Reason for Discrepancy:</label>
                  <textarea
                    value={formData.discrepancyReason}
                    onChange={(e) => handleInputChange("discrepancyReason", e.target.value)}
                    disabled={
                      parseFloat(formData.amount) ===
                      parseFloat(selectedTransaction?.price?.replace(",", ""))
                    }
                    placeholder="Enter reason for discrepancy (if any)"
                  />
                </div>
                <button className="btn-primary" onClick={submitApproval}>
                  Submit
                </button>
                <button className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
