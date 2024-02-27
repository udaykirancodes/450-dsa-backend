const express = require("express");
const router = express.Router();

// import controllers
const {
  handleRegisterUser,
  handleLoginUser,
  handleGetUserDetails,
  handleVerifyEmail,
  handleRequestForPasswordReset,
  handleChangePassword,
} = require("../controllers/user.controller");

const {
  validateUserDetails,
  validateUserDetailsWhileLogin,
  validateUserId,
  validateUserTokenQuery,
  validateUserEmail,
  validateChangePassword,
} = require("../validations/user");

router.post("/register", validateUserDetails, handleRegisterUser);
router.post("/login", validateUserDetailsWhileLogin, handleLoginUser);
router.get("/", validateUserId, handleGetUserDetails);
router.post("/verify/:token", validateUserTokenQuery, handleVerifyEmail);
router.post("/reset-request", validateUserEmail, handleRequestForPasswordReset);
router.post("/change-password", validateChangePassword, handleChangePassword);
module.exports = router;
