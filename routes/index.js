const express = require("express");
const router = express.Router();

// auth routes
const authRoutes = require("./auth");

router.use("/auth", authRoutes);

module.exports = router;
