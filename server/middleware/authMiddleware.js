const { verifyToken } = require('../config/jwtConfig');

/**
 * Middleware to authenticate requests using JWT.
 * Validates the token and attaches the decoded user information to the request object.
 */
exports.authenticate = (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No or invalid Authorization header provided.');
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Extract token and verify it
    const token = authHeader.split(' ')[1];
    req.user = verifyToken(token); // Decode and attach user info to the request
    console.log('Token successfully verified:', req.user);

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

/**
 * Middleware to authorize specific roles for a route.
 * Ensures that only users with allowed roles can access the route.
 * 
 * @param {Array<string>} roles - List of roles allowed to access the route.
 */
exports.authorizeRole = (roles) => (req, res, next) => {
  try {
    // Ensure user object exists and extract the role
    const userRole = req.user?.role;

    if (!userRole) {
      console.error("No role found in the decoded token.");
      return res.status(403).json({ error: "Forbidden: Insufficient privileges." });
    }

    // Transform the role to ensure consistency
    const normalizedRole = userRole === "operator" ? "operations" : userRole;

    console.log(`Normalized Role: '${normalizedRole}', Allowed Roles: ${roles}`);

    // Check if the normalized role is allowed
    if (!roles.includes(normalizedRole)) {
      console.error(`Access denied. Role '${normalizedRole}' is not authorized.`);
      return res.status(403).json({ error: "Forbidden: Insufficient privileges." });
    }

    console.log(`Access granted to role: '${normalizedRole}'.`);
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Role authorization error:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

