const db = require("../config/db");
const path = require("path");
const submitApplication = async (req, res) => {
  try {
    const { name, email, contactNumber, job_id } = req.body;

    // Validate required fields
    if (!name || !email || !job_id) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and job ID are required fields",
      });
    }

    // Get user ID if authenticated (optional)
    const applicant_id = req.user ? req.user.id : null;

    // Check if job exists
    const jobQuery = "SELECT * FROM jobs WHERE job_id = $1 AND status = $2";
    const jobResult = await db.query(jobQuery, [job_id, "active"]);

    if (jobResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found or is no longer active",
      });
    }
    // Check if the user has already applied for this job based on email and job_id
    const checkExistingQuery = `
    SELECT * FROM job_applications 
    WHERE job_id = $1 AND email = $2
  `;
    const checkParams = [job_id, email];
    const existingApplication = await db.query(checkExistingQuery, checkParams);

    if (existingApplication.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
        data: {
          application_id: existingApplication.rows[0].application_id,
          applied_at: existingApplication.rows[0].applied_at,
        },
      });
    }
    // Process resume file if uploaded
    let resume_url = null;
    if (req.file) {
      // Create URL path for the resume
      resume_url = `/uploads/${req.file.filename}`;
    }

    // Insert application into database
    const insertQuery = `
        INSERT INTO job_applications (job_id, applicant_id, name, email, resume_url, applied_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        RETURNING application_id, applied_at
      `;

    const values = [job_id, applicant_id, name, email, resume_url];
    const result = await db.query(insertQuery, values);

    console.log(`Job application submitted: ${result.rows[0].application_id}`);

    // Return success
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        application_id: result.rows[0].application_id,
        job_id,
        name,
        email,
        resume_url,
        applied_at: new Date(),
      },
    });
  } catch (error) {
    console.error(`Error submitting job application: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error: error.message,
    });
  }
};

module.exports = {
  submitApplication,
};
