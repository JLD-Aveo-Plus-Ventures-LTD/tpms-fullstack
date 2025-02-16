import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import CashierSideBar from "./CashierSideBar";
import "../stylings/Transactions.css";
import "../stylings/CashierDashboard.css";
import { useTransactions } from "./TransactionsContext";
import axios from "axios";
import API_URL from "../../config";

const CashierIncoming = () => {
  const { pendingTasks } = useTransactions();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [currentTime, setCurrentTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "Cash",
    discrepancyReason: "",
  });

  // Update the current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  // Open modal and set the selected transaction
  const handleOpenModal = (task) => {
    console.log("Opening Modal for Task:", task);
    setSelectedTask(task);
    setShowModal(true);
    setFormData({
      amount: "",
      paymentMethod: "Cash",
      discrepancyReason: "",
    });
  };

  // Handle input changes in the modal
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Process payment function
  const processPayment = async (status) => {
    const { amount, paymentMethod, discrepancyReason } = formData;

    // Extract price safely
    const expectedAmount = parseFloat((selectedTask?.amount || selectedTask?.price || "0").replace("₦", "").replace(",", ""));
    const numericAmount = parseFloat(amount);

    if (!numericAmount || !paymentMethod) {
      alert("Please enter the amount and select a payment method.");
      return;
    }

    if (isNaN(numericAmount)) {
      alert("Please enter a valid numeric amount.");
      return;
    }

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
          ticket_id: selectedTask?.ticket_id,
          amount: numericAmount,
          payment_method: paymentMethod,
          discrepancy_reason: isDiscrepancy ? discrepancyReason : null,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Payment submitted successfully!");
      setShowModal(false);
      setSelectedTask(null);
      setFormData({ amount: "", paymentMethod: "Cash", discrepancyReason: "" });
    } catch (err) {
      console.error("Error submitting payment:", err);
      alert("Failed to submit payment. Please try again.");
    }
  };

  return (
    <div className="transactions-container">
      <CashierSideBar />
      <div className="transactions-content">
        {/* Header */}
        <header className="header">
          <h6>Transaction &gt; <span className="activeStatus">Incoming</span></h6>
          <div className="time-display"><span>Time:</span> {currentTime}</div>
          <div className="notification-bell"><i className="fas fa-bell"></i></div>
        </header>

        <h2>Tasks</h2>

        {/* Tabs - Navigating to correct pages */}
        <div className="tabs">
          <p className="tab active-tab">Incoming</p> {/* Stay on this page */}
          <p className="tab" onClick={() => navigate("/CashierApproved")}>Approved</p> {/* Go to Approved Transactions */}
          <p className="tab" onClick={() => navigate("/CashierSuspended")}>Suspended</p> {/* Go to Suspended Transactions */}
          <p className="tab" onClick={() => navigate("/CashierQueried")}>Queried</p> {/* Go to Queried Transactions */}
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter name or task ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search"></i>
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
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.client_name || task.client}</td>
                    <td>{task.taskId || task.ticket_code}</td>
                    <td>{task.client_phone || task.phone}</td>
                    <td>{task.service_details || task.services}</td>
                    <td>₦{task.amount || task.price}</td>
                    <td>
                      <button className="btn-process" onClick={() => handleOpenModal(task)}>
                        Process Payment
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No transactions available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Payment Modal */}
        {showModal && selectedTask && (
          <>
            {/* Dark overlay */}
            <div className="modal-overlay" onClick={() => setShowModal(false)}></div>

            <div className="modal show">
              <div className="modal-content">
                <h3>Processing Payment for {selectedTask.taskId || selectedTask.ticket_code || "Unknown Ticket"}</h3>

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

                {/* Show discrepancy reason only when amount mismatches */}
                {formData.amount &&
                  selectedTask?.amount &&
                  parseFloat(formData.amount) !== parseFloat((selectedTask.amount || selectedTask.price).replace("₦", "").replace(",", "")) && (
                    <div className="form-group">
                      <label>Reason for Discrepancy:</label>
                      <textarea
                        value={formData.discrepancyReason}
                        onChange={(e) => handleInputChange("discrepancyReason", e.target.value)}
                        placeholder="Enter reason for discrepancy"
                      />
                    </div>
                )}

                <div className="modal-actions">
                  <button className="btn-success" onClick={() => processPayment("Approved")}>Approve Payment</button>
                  <button className="btn-danger" onClick={() => processPayment("Suspended")}>Suspend Payment</button>
                  <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CashierIncoming;
