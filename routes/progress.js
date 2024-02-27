const express = require("express");
const router = express.Router();

// Models
const Progress = require("../models/progress.model");
const { topics } = require("../utils/constants");
const { progressValidation } = require("../validations/progress");
const { isUser } = require("../middlewares/isUser");
const {
  getUserProgress,
  updateUserProgress,
} = require("../controllers/progress.controller");

router.get("/", progressValidation, isUser, getUserProgress);
router.post("/", progressValidation, isUser, updateUserProgress);

module.exports = router;
