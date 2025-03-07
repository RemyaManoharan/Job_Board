const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query, pool } = require("../config/db");

exports.registerUser = async (req, res) => {
  const { f_name, l_name, email, password } = req.body;

  try {
    // Validate input
    if (!f_name || !l_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const userCheck = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user into database
    const newUser = await query(
      "INSERT INTO users (f_name, l_name, email, password ) VALUES ($1, $2, $3, $4 ) RETURNING user_id, f_name, l_name, email, role",
      [f_name, l_name, email, hashedPassword]
    );

    const user = newUser.rows[0];
    // Create JWT token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Return user info and token
    res.status(201).json({
      user: {
        id: user.user_id,
        name: `${user.f_name} ${user.l_name}`,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // Find user
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Create JWT token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Return user info and token
    res.json({
      user: {
        id: user.user_id,
        name: `${user.f_name} ${user.l_name}`,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    // User is already available from auth middleware
    console.log("User from middleware:", req.user);
    res.json({
      id: req.user.user_id,
      name: `${req.user.f_name} ${req.user.l_name}`,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Server error fetching user profile" });
  }
};
