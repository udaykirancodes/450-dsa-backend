const express = require("express");
const router = express.Router();

// import controllers
const { handleCreateUser } = require("../controllers/user.controller");

router.get("/", handleCreateUser);

module.exports = router;
