const { body } = require("express-validator");

const validateUserDetails = [
  body("name", "Name is too short!").isLength({ min: 3 }),
  body("email", "Invalid Email").isEmail(),
  body("password", "Password is too short!").isLength({ min: 3 }),
];

const validateUserDetailsWhileLogin = [
  body("email", "Invalid Email").isEmail(),
  body("password", "Password is too short!").isLength({ min: 3 }),
];
module.exports = {
  validateUserDetails,
  validateUserDetailsWhileLogin,
};
