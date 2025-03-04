const express = require("express");
const router = express.Router();
// Import Router modules
const userRouter = require("./users");
const jobRoutes = require("./jobs");
const applicationRoutes = require("./applications");

// Mount Router modules
router.use("/users", userRouter);
router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);

module.exports = router;
