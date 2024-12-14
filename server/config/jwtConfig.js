const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
