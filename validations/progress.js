const { body } = require("express-validator");

const progressValidation = [
  body("position").isNumeric(),
  body("questionPosition").isNumeric(),
];

module.exports = {
  progressValidation,
};
