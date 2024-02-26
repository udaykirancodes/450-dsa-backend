const express = require("express");
const router = express.Router();

// import controllers
const {
  handleRegisterUser,
  handleLoginUser,
} = require("../controllers/user.controller");

const {
  validateUserDetails,
  validateUserDetailsWhileLogin,
} = require("../validations/user");

router.post("/register", validateUserDetails, handleRegisterUser);
router.post("/login", validateUserDetailsWhileLogin, handleLoginUser);

module.exports = router;
