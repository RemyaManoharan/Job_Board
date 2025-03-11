const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, "resume-" + uniqueSuffix + fileExtension);
  },
});

// File filter to only allow PDFs and DOCs
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [".pdf", ".doc", ".docx"];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedFileTypes.includes(fileExtension)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"), false);
  }
};

// Configure multer with 5MB file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

module.exports = upload;
