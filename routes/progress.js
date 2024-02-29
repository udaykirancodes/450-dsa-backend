const express = require("express");
const router = express.Router();

// Models
const Progress = require("../models/progress.model");
const { topics } = require("../utils/constants");
const { progressValidation } = require("../validations/progress");
const { isUser } = require("../middlewares/isUser");
const {
  getUserProgress,
  handleToogleMarkDone,
  handleToogleBookMark,
  handleUpdateNotes,
} = require("../controllers/progress.controller");

router.get("/", isUser, getUserProgress);

// marking Done | Not Done
router.put("/mark", progressValidation, isUser, handleToogleMarkDone);
router.put("/book-mark", progressValidation, isUser, handleToogleBookMark);
router.put("/update-notes", progressValidation, isUser, handleUpdateNotes);

module.exports = router;
