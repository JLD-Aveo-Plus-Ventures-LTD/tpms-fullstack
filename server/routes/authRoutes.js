const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

// Admin-only routes
router.get('/users', authenticate, authorizeRole(['admin']), authController.getAllUsers);
router.post('/register', authenticate, authorizeRole(['admin']), authController.createUser);
router.put('/users/role', authenticate, authorizeRole(['admin']), authController.updateUserRole);
router.delete('/users/:user_id', authenticate, authorizeRole(['admin']), authController.deleteUser);

// Login route (accessible to all roles)
router.post('/login', authController.login);

module.exports = router;
