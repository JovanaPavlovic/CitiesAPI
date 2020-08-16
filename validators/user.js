const { check, validationResult } = require("express-validator");

exports.userRegModelValidator = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be 3 to 20 characters long"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .not()
    .withMessage("Please provide a valid email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 7 })
    .withMessage("Password must be at least 7 characters long")
    .matches(/\d/)
    .withMessage("Passwor must contain a number"),
];

exports.userLogModelValidator = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .not()
    .withMessage("Please provide a valid email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 7 })
    .withMessage("Password must be at least 7 characters long")
    .matches(/\d/)
    .withMessage("Passwor must contain a number"),
];
