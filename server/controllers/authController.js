const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { generateToken } = require("../config/jwtConfig");

// Utility: Validate required fields
const validateFields = (fields) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      return `${key} is required`;
    }
  }
  return null;
};

// Register a new user (Admin Only)
exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  const validationError = validateFields({ username, email, password, role });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(query, [username, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: "Failed to create user" });
      }
      res.status(201).json({ message: "User created successfully" });
    });
  } catch (err) {
    console.error("Error during user creation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Login an existing user
exports.login = (req, res) => {
  const { username, email, password } = req.body;

  console.log("Login Request:", { username, email }); // Debug: Log incoming request

  const query = username
    ? "SELECT * FROM users WHERE username = ?"
    : "SELECT * FROM users WHERE email = ?";

  db.query(query, [username || email], async (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const user = results[0];
    if (user) {
      console.log("User Found:", user); // Debug log
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Transform 'operations' role to 'operator' for consistency
        const transformedRole = user.role === "operations" ? "operator" : user.role;

        // Generate a token with the transformed role
        const token = generateToken({ ...user, role: transformedRole });

        console.log("Generated Token:", token); // Debug
        console.log("Role Sent to Frontend:", transformedRole);

        return res.json({ token, role: transformedRole }); // Send transformed role
      }
    }

    console.warn("Invalid Credentials");
    res.status(401).json({ error: "Invalid username/email or password" });
  });
};




// List all users (Admin Only)
exports.getAllUsers = (req, res) => {
  db.query("SELECT user_id, username, role FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.status(200).json(results);
  });
};

// Update a user's role (Admin Only)
exports.updateUserRole = (req, res) => {
  const { user_id, role } = req.body;

  const validationError = validateFields({ user_id, role });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const query = "UPDATE users SET role = ? WHERE user_id = ?";

  db.query(query, [role, user_id], (err, result) => {
    if (err) {
      console.error("Error updating user role:", err);
      return res.status(500).json({ error: "Failed to update user role" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User role updated successfully" });
  });
};

// Delete a user (Admin Only)
exports.deleteUser = (req, res) => {
  const { user_id } = req.params;

  const query = "DELETE FROM users WHERE user_id = ?";

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Failed to delete user" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};
