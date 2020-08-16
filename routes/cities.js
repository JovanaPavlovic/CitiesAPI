const express = require("express");
const router = express.Router();

const citiesController = require("../controllers/cities");

const cityValidation = require("../validators/cities");

const auth = require("../middleware/auth");

//GET /cities/allCities

router.get("/cities", citiesController.getCities);

//POST /cities/

router.post(
  "/cities",
  auth.authUser,
  cityValidation.cities,
  cityValidation.cityValidationResult,
  citiesController.postCity
);

router.get("/city/:name", citiesController.getCity);

// Add favourite city
router.post("/favourite/:id", auth.authUser, citiesController.addFavourite);

module.exports = router;
