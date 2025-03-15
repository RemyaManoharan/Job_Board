const { body, validationResult } = require("express-validator");

// Validation rules for user registration
exports.registerValidationRules = [
  body("f_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("First name must be between 2 and 100 characters"),

  body("l_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Last name must be between 1 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email cannot exceed 255 characters"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];

// Validation rules for user login
exports.loginValidationRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

// Middleware to validate request and handle errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Extract error messages and group by field
  const extractedErrors = {};
  errors.array().forEach((err) => {
    if (!extractedErrors[err.path]) {
      extractedErrors[err.path] = [];
    }
    extractedErrors[err.path].push(err.msg);
  });

  return res.status(400).json({
    errors: extractedErrors,
  });
};

// Custom validation middleware to check if a user with the email already exists
exports.checkUserExists = async (req, res, next) => {
  try {
    const { query } = require("../config/db");
    const { email } = req.body;

    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({
        errors: {
          email: ["User with this email already exists"],
        },
      });
    }

    next();
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return res.status(500).json({ message: "Server error during validation" });
  }
};
