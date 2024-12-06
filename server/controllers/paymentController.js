const db = require('../config/db');

exports.createPayment = (req, res) => {
  const { ticket_id, amount, payment_method, discrepancy_reason } = req.body;

  if (!ticket_id) {
    return res.status(400).json({ error: "ticket_id is required" });
  }

  db.query('SELECT * FROM tickets WHERE ticket_id = ?', [ticket_id], (err, ticketResults) => {
    if (err) {
      console.error("Error fetching ticket from database:", err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (ticketResults.length === 0) {
      console.error("Ticket not found for ticket_id:", ticket_id);
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const ticket = ticketResults[0];
    const isExactAmount = parseFloat(amount) === parseFloat(ticket.price);

    const paymentData = {
      ticket_id,
      amount,
      payment_method,
      status: isExactAmount ? 'Success' : 'Discrepancy',
    };

    db.query('INSERT INTO payments SET ?', paymentData, (err, paymentResult) => {
      if (err) {
        console.error("Error creating payment record:", err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const newStatus = isExactAmount ? 'Completed' : 'Discrepancy';
      db.query(
        'UPDATE tickets SET status = ?, discrepancy_reason = ? WHERE ticket_id = ?',
        [newStatus, isExactAmount ? null : discrepancy_reason, ticket_id],
        (err) => {
          if (err) {
            console.error("Error updating ticket status:", err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          res.status(201).json({
            message: 'Payment processed successfully',
            paymentId: paymentResult.insertId,
            ticketStatus: newStatus,
          });
        }
      );
    });
  });
};


// Get all payments (Cashier Only)
exports.getAllPayments = (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
