const db = require('../config/db');
const crypto = require("crypto");


// Create a new ticket (Operation Staff Only)
exports.createTicket = (req, res) => {
  const { client_name, client_phone, services } = req.body;
  const staff_id = req.user?.user_id;

  if (!services || services.length === 0) {
    return res.status(400).json({ error: "At least one service is required." });
  }

  const ticketCode = crypto.randomBytes(2).toString("hex").toUpperCase();
  const total_price = services.reduce((sum, service) => sum + parseFloat(service.price), 0);

  const query = `
    INSERT INTO tickets (ticket_code, service_details, staff_id, client_name, client_phone, price, status)
    VALUES (?, ?, ?, ?, ?, ?, "Pending")
  `;
  const params = [ticketCode, client_name, staff_id, client_name, client_phone, total_price];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Failed to create ticket." });
    }

    const ticket_id = result.insertId;

    const serviceInserts = services.map((service) => [
      ticket_id,
      service.name,
      service.price,
      1,
    ]);

    const serviceQuery = `
      INSERT INTO services (ticket_id, service_name, price, render_count)
      VALUES ?
    `;
    db.query(serviceQuery, [serviceInserts], (serviceErr) => {
      if (serviceErr) {
        console.error("Failed to insert services:", serviceErr);
        return res.status(500).json({ error: "Failed to associate services with ticket." });
      }

      res.status(201).json({
        message: "Ticket created successfully",
        ticket_id,
        ticket_code: ticketCode,
        total_price,
      });
    });
  });
};


// Get all tickets (Accessible to both Cashiers and Operation Staff)
exports.getTickets = (req, res) => {
  const { user_id, role } = req.user;
  const { status } = req.query;

  let query = "SELECT ticket_id, ticket_code, service_details, price, status, client_name, client_phone FROM tickets";
  const queryParams = [];

  if (role === "operations") {
    query += " WHERE staff_id = ?";
    queryParams.push(user_id);
  }

  if (status) {
    query += role === "operations" ? " AND status = ?" : " WHERE status = ?";
    queryParams.push(status);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Failed to fetch tickets" });
    }
    res.status(200).json(results);
  });
};






// Update ticket status (Cashier Only)
exports.updateTicketStatus = (req, res) => {
  const { ticket_id, status } = req.body;
  
  db.query('UPDATE tickets SET status = ? WHERE ticket_id = ?', [status, ticket_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Ticket not found' });
    res.status(200).json({ message: 'Ticket status updated successfully' });
  });
};


exports.getAllTicketsForAdmin = (req, res) => {
  console.log('Admin Access Attempt:', req.user); 
  const query = `
    SELECT tickets.*, users.username AS staff_name 
    FROM tickets 
    LEFT JOIN users ON tickets.staff_id = users.user_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Failed to fetch tickets' });
    }
    console.log('Fetched Tickets for Admin:', results);
    res.status(200).json(results);
  });
};


exports.updateTicketStatusForAdmin = (req, res) => {
  const { ticket_id, status } = req.body;

  if (!ticket_id || !status) {
    return res.status(400).json({ error: 'Ticket ID and status are required' });
  }

  const query = 'UPDATE tickets SET status = ? WHERE ticket_id = ?';
  db.query(query, [status, ticket_id], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Failed to update ticket status' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket status updated successfully' });
  });
};



// Add a new service for a ticket
exports.addServiceToTicket = (req, res) => {
  const { ticket_id, service_name } = req.body;

  if (!ticket_id || !service_name) {
    return res.status(400).json({ error: 'Ticket ID and service name are required' });
  }

  // Check if service already exists for the ticket
  const checkQuery = `
    SELECT * FROM services WHERE ticket_id = ? AND service_name = ?
  `;
  db.query(checkQuery, [ticket_id, service_name], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (results.length > 0) {
      // If service exists, update render count
      const updateQuery = `
        UPDATE services SET render_count = render_count + 1 WHERE service_id = ?
      `;
      db.query(updateQuery, [results[0].service_id], (updateErr) => {
        if (updateErr) {
          console.error('Update Error:', updateErr);
          return res.status(500).json({ error: 'Failed to update service render count' });
        }
        res.status(200).json({ message: 'Service render count updated' });
      });
    } else {
      // Insert a new service for the ticket
      const insertQuery = `
        INSERT INTO services (ticket_id, service_name, render_count) VALUES (?, ?, 1)
      `;
      db.query(insertQuery, [ticket_id, service_name], (insertErr, result) => {
        if (insertErr) {
          console.error('Insert Error:', insertErr);
          return res.status(500).json({ error: 'Failed to add new service' });
        }
        res.status(201).json({ message: 'Service added successfully', service_id: result.insertId });
      });
    }
  });
};

// Get all services for a ticket
exports.getServicesForTicket = (req, res) => {
  const { ticket_id } = req.params;

  if (!ticket_id) {
    return res.status(400).json({ error: 'Ticket ID is required' });
  }

  const query = `
    SELECT * FROM services WHERE ticket_id = ?
  `;
  db.query(query, [ticket_id], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
    res.status(200).json(results);
  });
};