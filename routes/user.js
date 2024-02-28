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
  validateUserTokenQuery,
  validateUserEmail,
  validateChangePassword,
} = require("../validations/user");
const { isUser } = require("../middlewares/isUser");

router.post("/register", validateUserDetails, handleRegisterUser);
router.post("/login", validateUserDetailsWhileLogin, handleLoginUser);
router.get("/", isUser, handleGetUserDetails);
router.post("/verify/:token", validateUserTokenQuery, handleVerifyEmail);
router.post("/reset-request", validateUserEmail, handleRequestForPasswordReset);
router.post("/change-password", validateChangePassword, handleChangePassword);
module.exports = router;
