const db = require('../config/db');

const Payment = {
  create: (data, callback) => {
    const query = "INSERT INTO payments SET ?";
    db.query(query, data, callback);
  },
  findAll: (callback) => {
    const query = "SELECT * FROM payments";
    db.query(query, callback);
  },
  findById: (id, callback) => {
    const query = "SELECT * FROM payments WHERE payment_id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Payment;
