const express = require("express");
const router = express.Router();

// auth routes
const userRoutes = require("./user");

router.use("/user", userRoutes);

module.exports = router;
