const { check, validationResult } = require("express-validator");
const User = require("../../models/people");
const createError = require("http-errors");

const validFields = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Please enter a valid name with no special characters")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Email is not valid")
    .trim()
    .custom(async (v) => {
      email = v;
      try {
        const alreadyUser = await User.findOne({ email: email });
        if (alreadyUser) {
          throw createError("Email is already used!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be a valid Mobile number")
    .custom(async (v) => {
      mobile = v;
      try {
        const alreadyUser = await User.findOne({ mobile: mobile });
        if (alreadyUser) {
          throw createError("Mobile number is already has been used!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be contain 1 lowercase, 1 uppercase, 1 number and 1 symbol with 8 alphabets!"
    ),
];

const errorValidator = (req, res, next) => {
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

module.exports = { validFields, errorValidator };
