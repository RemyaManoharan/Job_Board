// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const { query } = require("../config/db"); // Assuming you have a db connection setup

const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    // Check if user exists in database
    const result = await query(
      "SELECT user_id, f_name, l_name, email, role FROM users WHERE user_id = $1",
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }
   
    // Add user to request object
    req.user = result.rows[0];
    console.log('User ID from database:', req.user.user_id);
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Optional: Role-based authorization middleware
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Convert single role to array
    const roleArray = Array.isArray(roles) ? roles : [roles];

    if (roleArray.length && !roleArray.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions" });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
