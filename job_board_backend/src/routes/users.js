const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
// Protected routes (will add auth middleware later)
router.get("/me", authenticate, getCurrentUser);

module.exports = router;
