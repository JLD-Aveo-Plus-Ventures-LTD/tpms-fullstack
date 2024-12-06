const express = require('express');
const paymentController = require('../controllers/paymentController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a payment (cashier only)
router.post('/', authenticate, authorizeRole(['cashier']), paymentController.createPayment);

// Route to get all payments (cashier only)
router.get('/', authenticate, authorizeRole(['cashier']), paymentController.getAllPayments);

module.exports = router;
