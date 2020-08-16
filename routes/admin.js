const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

const { authAdmin } = require("../middleware/auth");

router.put("/admin", authAdmin, adminController.updateCity);

router.delete("/admin/:id", authAdmin, adminController.deleteCity);

module.exports = router;
