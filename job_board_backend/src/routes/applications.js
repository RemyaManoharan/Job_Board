const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobApplicationController");
const upload = require("../middlewares/fileUpload");
// POST /api/applications - Submit a job application with resume upload
router.post('/', 
  upload.single('resume'), // Handle resume file upload
  jobApplicationController.submitApplication
);

router.get("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});
// Protected routes (for employers/admins)
router.post("/", (req, res) => {
  // Create job
  res.status(501).json({ message: "Not implemented yet" });
});

module.exports = router;
