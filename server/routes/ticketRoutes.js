const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const ticketController = require('../controllers/ticketController');

// Operation staff can create tickets
router.post('/', authenticate, authorizeRole(['operations']), ticketController.createTicket);

// Both cashiers and operation staff can view tickets
router.get('/', authenticate, authorizeRole(['cashier', 'operations']), ticketController.getTickets);

// Cashiers can update ticket status
router.put('/status', authenticate, authorizeRole(['cashier']), ticketController.updateTicketStatus);

// Add a new service to a ticket
router.post('/service', authenticate, authorizeRole(['operations']), ticketController.addServiceToTicket);

// Get all services for a ticket
router.get('/:ticket_id/services', authenticate, authorizeRole(['operations', 'cashier', 'admin']), ticketController.getServicesForTicket);

module.exports = router;
