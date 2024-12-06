const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const ticketController = require('../controllers/ticketController');

// Admin-only routes
router.get('/', authenticate, authorizeRole(['admin']), ticketController.getAllTicketsForAdmin);
router.put('/status', authenticate, authorizeRole(['admin']), ticketController.updateTicketStatusForAdmin);

module.exports = router;
