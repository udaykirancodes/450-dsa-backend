const { body } = require("express-validator");

const progressValidation = [
  body("position").isNumeric(),
  body("questionPosition").isNumeric(),
  body("mark").isBoolean(),
];

module.exports = {
  progressValidation,
};
