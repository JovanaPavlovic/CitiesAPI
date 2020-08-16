const { body, validationResult } = require("express-validator");

exports.cities = [
  body("name")
    .isLength({ min: 2, max: 30 })
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("City name must be alphabetic."),

  body("country")
    .trim()
    .isLength({ min: 3, max: 20 })
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Country name must be alphabetic."),
];

exports.cityValidationResult = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const error = result.array();
    return res.status(422).json({
      message: "Validation failed. Entered data are incorrect.",
      error: error,
    });
  }
  next();
};
