import React, { useState, useEffect, useCallback } from "react";
import { getTickets, createPayment } from "../services/apiService";
import Sidebar from "./Sidebar";
import "../styles/CashierDashboard.css";

const CashierDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentModal, setPaymentModal] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discrepancyReason, setDiscrepancyReason] = useState("");
  const [filter, setFilter] = useState("Pending"); // Default filter

  // Fetch tickets function with memoization
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTickets(filter);
      setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setError("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Fetch tickets whenever the filter changes
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const openPaymentModal = (ticket) => {
    if (!ticket || !ticket.ticket_id) {
      console.error("Invalid ticket passed to payment modal:", ticket);
      setError("Invalid ticket data. Please try again.");
      return;
    }
    setPaymentModal(ticket);
    setPaymentAmount("");
    setPaymentMethod("");
    setDiscrepancyReason("");
  };

  const handlePayment = async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    try {
      const isExactAmount = parseFloat(paymentAmount) === parseFloat(paymentModal.price);

      if (!paymentMethod) throw new Error("Please select a payment method");
      if (!isExactAmount && !discrepancyReason) throw new Error("Please provide a discrepancy reason");

      const paymentData = {
        ticket_id: paymentModal.ticket_id,
        amount: paymentAmount,
        payment_method: paymentMethod,
        discrepancy_reason: isExactAmount ? null : discrepancyReason,
      };

      await createPayment(paymentData);
      setPaymentModal(null);
      fetchTickets(); // Refresh tickets after payment
    } catch (err) {
      console.error("Payment Error:", err);
      setError(err.response?.data?.error || "Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setFilter={setFilter} />
      <div className="dashboard-content">
        <header>
          <h2>Cashier Dashboard</h2>
        </header>

        {loading ? (
          <p>Loading tickets...</p>
        ) : (
          <>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>Ticket Code</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.ticket_id}>
                      <td>{ticket.ticket_code}</td>
                      <td>{ticket.client_name}</td>
                      <td>{ticket.client_phone}</td>
                      <td>{ticket.service_details}</td>
                      <td>₦{ticket.price}</td>
                      <td>{ticket.status}</td>
                      <td>
                        {ticket.status === "Pending" && (
                          <button onClick={() => openPaymentModal(ticket)}>Process Payment</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {paymentModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Process Payment</h3>
              <p><strong>Ticket Code:</strong> {paymentModal.ticket_code}</p>
              <p><strong>Price:</strong> ₦{paymentModal.price}</p>
              <label>
                Payment Amount:
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </label>
              <label>
                Payment Method:
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </label>
              {parseFloat(paymentAmount) !== parseFloat(paymentModal.price) && (
                <label>
                  Discrepancy Reason:
                  <input
                    type="text"
                    value={discrepancyReason}
                    onChange={(e) => setDiscrepancyReason(e.target.value)}
                  />
                </label>
              )}
              <div className="modal-buttons">
                <button onClick={handlePayment} className="btn-primary">
                  Submit
                </button>
                <button onClick={() => setPaymentModal(null)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashierDashboard;
