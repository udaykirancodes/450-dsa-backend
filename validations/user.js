const { body, param } = require("express-validator");

const validateUserDetails = [
  body("name", "Name is too short!").isLength({ min: 3 }),
  body("email", "Invalid Email").isEmail(),
  body("password", "Password is too short!").isLength({ min: 3 }),
];

const validateUserDetailsWhileLogin = [
  body("email", "Invalid Email").isEmail(),
  body("password", "Password is too short!").isLength({ min: 3 }),
];

const validateUserTokenQuery = [param("token").isLength({ min: 5 })];

const validateUserEmail = [body("email").isEmail()];

const validateChangePassword = [
  body("password").isLength({ min: 3 }),
  body("confirmPassword").isLength({ min: 3 }),
  body("token").isLength({ min: 5 }),
];
module.exports = {
  validateUserDetails,
  validateUserDetailsWhileLogin,
  validateUserTokenQuery,
  validateUserEmail,
  validateChangePassword,
};
