const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");
const {
  registerValidationRules,
  loginValidationRules,
  validate,
  checkUserExists,
} = require("../models/userValidation");

router.post(
  "/register",
  registerValidationRules,
  validate,
  checkUserExists,
  registerUser
);
router.post("/login", loginValidationRules, validate, loginUser);
// Protected routes (will add auth middleware later)
router.get("/me", authenticate, getCurrentUser);

module.exports = router;
