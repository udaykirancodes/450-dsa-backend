const express = require("express");
const router = express.Router();

// auth routes
const userRoutes = require("./user");
const progressRoutes = require("./progress");

router.use("/user", userRoutes);
router.use("/progress", progressRoutes);

module.exports = router;
