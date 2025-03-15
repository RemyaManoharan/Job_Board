const { body, param, validationResult } = require("express-validator");

// Validation rules for submitting a job application
exports.applicationSubmitRules = [
  body("job_id")
    .notEmpty()
    .withMessage("Job ID is required")
    .isInt()
    .withMessage("Job ID must be an integer"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email cannot exceed 255 characters"),

  body("contact_number")
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage("Please provide a valid phone number"),
];

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
