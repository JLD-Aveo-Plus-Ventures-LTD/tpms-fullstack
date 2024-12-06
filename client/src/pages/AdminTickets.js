import React, { useState, useEffect } from 'react';
import { getTicketsForAdmin, updateTicketStatusForAdmin } from '../services/apiService';

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTicketsForAdmin();
      console.log('Fetched Tickets for Admin:', data); // Debugging
      setTickets(data);
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error('Fetch Tickets Error:', err.response || err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (ticket_id, status) => {
    setError('');
    setSuccess('');
    try {
      await updateTicketStatusForAdmin(ticket_id, status);
      setSuccess('Ticket status updated successfully');
      fetchTickets(); // Refresh ticket list
    } catch (err) {
      setError('Failed to update ticket status');
      console.error('Update Ticket Status Error:', err.response || err);
    }
  };

  return (
    <div className="admin-tickets">
      <h2>Admin: Manage Tickets</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Service</th>
              <th>Price</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td>{ticket.ticket_id}</td>
                <td>{ticket.service_details}</td>
                <td>${ticket.price}</td>
                <td>{ticket.status}</td>
                <td>{ticket.staff_name || 'N/A'}</td>
                <td>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleUpdateStatus(ticket.ticket_id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Discrepancy">Discrepancy</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTickets;
