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
router.get("/:id", validateUserId, handleGetUserDetails);
router.get("/verify/:token", validateUserTokenQuery, handleVerifyEmail);
router.post(
  "/password-reset",
  validateUserEmail,
  handleRequestForPasswordReset
);
router.post("/change-password", validateChangePassword, handleChangePassword);
module.exports = router;
