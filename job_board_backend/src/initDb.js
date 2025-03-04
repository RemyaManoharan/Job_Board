const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const adminPool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: "postgres", // Connect to default postgres database
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT || 5432,
});

// Function to create the job_board database
async function createDatabase() {
  try {
    // Check if database exists
    const checkDbResult = await adminPool.query(
      "SELECT datname FROM pg_catalog.pg_database WHERE datname = 'job_board'"
    );

    if (checkDbResult.rowCount === 0) {
      console.log("Creating job_board database...");
      await adminPool.query("CREATE DATABASE job_board");
      console.log("job_board database created successfully");
    } else {
      console.log("job_board database already exists");
    }
  } catch (err) {
    console.error("Error creating database:", err);
    throw err;
  } finally {
    await adminPool.end();
  }
}

// Function to create tables
async function createTables() {
  // Now connect to the job_board database
  const jobBoardPool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: "job_board", // Now connect to our job_board database
    password: process.env.DB_PASSWORD || "postgres",
    port: process.env.DB_PORT || 5432,
  });

  try {
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Execute the SQL commands
    console.log("Creating tables...");
    await jobBoardPool.query(schema);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
    throw err;
  } finally {
    await jobBoardPool.end();
  }
}

// Main execution
async function initializeDatabase() {
  try {
    await createDatabase();
    await createTables();
    console.log("Database initialization completed successfully");
  } catch (err) {
    console.error("Database initialization failed:", err);
    process.exit(1);
  }
}

initializeDatabase();
