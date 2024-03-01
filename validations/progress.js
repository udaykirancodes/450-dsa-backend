const { body } = require("express-validator");

const progressValidation = [
  body("questionPosition").isNumeric(),
  body("mark").isBoolean(),
  body("topic").isLength({ min: 3 }),
];

module.exports = {
  progressValidation,
};
