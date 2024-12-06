const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const { authenticate } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const adminTicketRoutes = require('./routes/adminTicketRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Admin ticket routes
app.use('/api/tickets/admin', authenticate, adminTicketRoutes);

// Non-admin ticket routes
app.use('/api/tickets', authenticate, ticketRoutes);

// Payment routes
app.use('/api/payments', authenticate, paymentRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Ticket and Payment Management System API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
