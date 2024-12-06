const db = require('../config/db');

const Ticket = {
  findAll: (callback) => {
    db.query('SELECT * FROM tickets', callback);
  },
  findById: (id, callback) => {
    db.query('SELECT * FROM tickets WHERE ticket_id = ?', [id], callback);
  },
  updateStatus: (ticket_id, status, discrepancy_reason, callback) => {
    db.query(
      'UPDATE tickets SET status = ?, discrepancy_reason = ? WHERE ticket_id = ?',
      [status, discrepancy_reason, ticket_id],
      callback
    );
  },
};

module.exports = Ticket;
