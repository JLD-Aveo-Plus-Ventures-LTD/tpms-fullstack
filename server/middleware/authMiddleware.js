// middleware/authMiddleware.js
const { verifyToken } = require('../config/jwtConfig');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token Received:', token);

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    req.user = verifyToken(token);
    console.log('Decoded Token:', req.user); // Log the decoded token
    next();
  } catch (err) {
    console.error('Token Verification Error:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
};



// Middleware to authorize roles
exports.authorizeRole = (roles) => (req, res, next) => {
  console.log('Checking Role Authorization');
  console.log('Decoded User Role:', req.user?.role); // Debug user's role
  console.log('Allowed Roles:', roles); // Debug allowed roles

  if (!req.user || !roles.includes(req.user.role)) {
    console.error(`Access Denied: User role '${req.user?.role}' is not authorized for this route.`);
    return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
  }

  console.log(`Access Granted to Role: ${req.user.role}`);
  next();
};





