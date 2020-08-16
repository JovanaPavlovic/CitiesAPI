const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users");

const usersValidation = require("../validators/user");

const validation = require("../middleware/validation");

router.post(
  "/login",
  usersValidation.userLogModelValidator,
  validation.modelValidator,
  usersController.logUser
);

router.post(
  "/register",
  usersValidation.userRegModelValidator,
  validation.modelValidator,
  usersController.regUser
);

module.exports = router;
