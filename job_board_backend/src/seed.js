const { query, pool } = require("../src/config/db"); 
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function seedDatabase() {
  try {
    console.log("Starting to seed database with initial data...");
    
    // Read the SQL seed file
    const seedPath = path.join(__dirname, "seed.sql");
    const seedSql = fs.readFileSync(seedPath, "utf8");
    
    // Execute the SQL commands
    console.log("Running seed SQL script...");
    await query(seedSql);
    
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
  }
}
// Execute if this script is run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };