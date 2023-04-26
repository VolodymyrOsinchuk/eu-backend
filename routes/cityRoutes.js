const express = require("express");
const { createCity, getAllCity } = require("../controllers/cityController");
const router = express.Router();

router.route("/").post(createCity).get(getAllCity);

module.exports = router;
