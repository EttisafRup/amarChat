const { check, validationResult } = require("express-validator");
const loginValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Username or Phone Number is required")
    .trim(),

  check("pw").isLength({ min: 1 }).withMessage("Password is not correct!"),
];

const errorLoginValidator = (req, res, next) => {
  const errors = validationResult(req);
  const decorateErrors = errors.mapped();

  if (Object.keys(decorateErrors).length === 0) {
    next();
  } else {
    res.json({
      error: decorateErrors,
    });
  }
};

module.exports = { loginValidator, errorLoginValidator };
