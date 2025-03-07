const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const routes = require("./src/routes");
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // HTTP request logger

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", routes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Job Board API" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
