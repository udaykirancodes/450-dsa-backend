const express = require("express");
const router = express.Router();

// import controllers
const {
  handleRegisterUser,
  handleLoginUser,
  handleGetUserDetails,
  handleVerifyEmail,
} = require("../controllers/user.controller");

const {
  validateUserDetails,
  validateUserDetailsWhileLogin,
  validateUserId,
  validateUserTokenQuery,
} = require("../validations/user");

router.post("/register", validateUserDetails, handleRegisterUser);
router.post("/login", validateUserDetailsWhileLogin, handleLoginUser);
router.get("/:id", validateUserId, handleGetUserDetails);
router.get("/verify/:token", validateUserTokenQuery, handleVerifyEmail);

module.exports = router;
