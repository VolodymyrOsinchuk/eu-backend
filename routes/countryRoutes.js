const express = require("express");
const {
  createCountry,
  getAllCountry,
  getCountry,
} = require("../controllers/countryController");
const router = express.Router();

router.route("/").post(createCountry).get(getAllCountry);
router.route("/:id").get(getCountry);

module.exports = router;
