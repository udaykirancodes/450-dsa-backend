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

const validateUserId = [param("id").isLength({ min: 10 })];

const validateUserTokenQuery = [param("token").isLength({ min: 5 })];

module.exports = {
  validateUserDetails,
  validateUserDetailsWhileLogin,
  validateUserId,
  validateUserTokenQuery,
};