const { validationResult } = require("express-validator");

exports.modelValidator = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array();
    return res.status(422).json({
      message: "Validation failed. Entered data are incorrect.",
      errorr: error,
    });
  }
  next();
};
