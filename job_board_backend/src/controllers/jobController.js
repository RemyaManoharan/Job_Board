const db = require("../config/db");

// Get all jobs with pagination and filtering
exports.getAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minSalary,
      maxSalary,
      isRemote,
      location,
      search, // for job title
    } = req.query;

    const offset = (page - 1) * limit;

    // Start building the query
    let query = `
      SELECT j.*, c.name as company_name 
      FROM jobs j
      JOIN companies c ON j.company_id = c.company_id
      WHERE j.status = 'active'
    `;

    const queryParams = [];
    let paramCount = 1;

    // Add filters to the query
    if (category) {
      query += ` AND j.category = $${paramCount}`;
      queryParams.push(category);
      paramCount++;
    }

    if (minSalary) {
      query += ` AND j.salary >= $${paramCount}`;
      queryParams.push(minSalary);
      paramCount++;
    }

    if (maxSalary) {
      query += ` AND j.salary <= $${paramCount}`;
      queryParams.push(maxSalary);
      paramCount++;
    }

    if (isRemote !== undefined) {
      query += ` AND j.is_remote = $${paramCount}`;
      queryParams.push(isRemote === "true");
      paramCount++;
    }

    if (location) {
      query += ` AND j.location ILIKE $${paramCount}`;
      queryParams.push(`%${location}%`);
      paramCount++;
    }

    if (search) {
      query += ` AND j.title ILIKE $${paramCount}`;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    // Count total matching jobs for pagination
    const countQuery = `SELECT COUNT(*) FROM (${query}) AS filtered_jobs`;
    const countResult = await db.query(countQuery, queryParams);
    const totalJobs = parseInt(countResult.rows[0].count);

    // Add pagination to the main query
    query += ` ORDER BY j.created_at DESC LIMIT $${paramCount} OFFSET $${
      paramCount + 1
    }`;
    queryParams.push(limit, offset);

    const result = await db.query(query, queryParams);

    // Format response
    const jobs = result.rows.map((job) => ({
      id: job.job_id,
      title: job.title,
      location: job.location,
      company: job.company_name,
      category: job.category,
      isRemote: job.is_remote,
      salary: job.salary,
      createdAt: job.created_at,
    }));

    res.status(200).json({
      jobs,
      pagination: {
        total: totalJobs,
        pages: Math.ceil(totalJobs / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT j.*, c.name as company_name, c.description as company_description, 
            c.website_url, c.location as company_location
      FROM jobs j
      JOIN companies c ON j.company_id = c.company_id
      WHERE j.job_id = $1
    `;

    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    const job = result.rows[0];

    // Format the response
    const jobDetails = {
      id: job.job_id,
      title: job.title,
      description: job.description,
      skills: job.skills,
      responsibilities: job.responsibilities,
      location: job.location,
      salary: job.salary,
      category: job.category,
      isRemote: job.is_remote,
      status: job.status,
      createdAt: job.created_at,
      company: {
        id: job.company_id,
        name: job.company_name,
        description: job.company_description,
        websiteUrl: job.website_url,
        location: job.company_location,
      },
    };

    res.status(200).json(jobDetails);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching job details" });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      skills,
      responsibilities,
      location,
      salary,
      category,
      isRemote,
      companyId,
    } = req.body;

    // Check if company exists
    const companyCheck = await db.query(
      "SELECT * FROM companies WHERE company_id = $1",
      [companyId]
    );

    if (companyCheck.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Insert the job
    const result = await db.query(
      `INSERT INTO jobs (
          title, description, skills, responsibilities, 
          location, salary, category, is_remote, company_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *`,
      [
        title,
        description,
        skills,
        responsibilities,
        location,
        salary,
        category,
        isRemote,
        companyId,
      ]
    );

    const newJob = result.rows[0];

    res.status(201).json({
      id: newJob.job_id,
      title: newJob.title,
      description: newJob.description,
      message: "Job created successfully",
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Server error while creating job" });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      skills,
      responsibilities,
      location,
      salary,
      category,
      isRemote,
      status,
    } = req.body;

    // Check if job exists
    const jobCheck = await db.query("SELECT * FROM jobs WHERE job_id = $1", [
      id,
    ]);

    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Update the job
    const result = await db.query(
      `UPDATE jobs SET 
          title = COALESCE($1, title),
          description = COALESCE($2, description),
          skills = COALESCE($3, skills),
          responsibilities = COALESCE($4, responsibilities),
          location = COALESCE($5, location),
          salary = COALESCE($6, salary),
          category = COALESCE($7, category),
          is_remote = COALESCE($8, is_remote),
          status = COALESCE($9, status),
          updated_at = CURRENT_TIMESTAMP
      WHERE job_id = $10
      RETURNING *`,
      [
        title,
        description,
        skills,
        responsibilities,
        location,
        salary,
        category,
        isRemote,
        status,
        id,
      ]
    );

    const updatedJob = result.rows[0];

    res.status(200).json({
      id: updatedJob.job_id,
      title: updatedJob.title,
      message: "Job updated successfully",
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Server error while updating job" });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if job exists
    const jobCheck = await db.query("SELECT * FROM jobs WHERE job_id = $1", [
      id,
    ]);

    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Delete the job
    await db.query("DELETE FROM jobs WHERE job_id = $1", [id]);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error while deleting job" });
  }
};
