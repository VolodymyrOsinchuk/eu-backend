const express = require("express");
const {
  createAdvert,
  getAllAdverts,
  getAdvert,
  updateAdvert,
  deleteAdvert,
  getByCountry,
  getAdvertStats,
} = require("../controllers/advertController");
const router = express.Router();

//stats
router.route("/stats").get(getAdvertStats);
router.route("/").post(createAdvert).get(getAllAdverts);
router.route("/:id").get(getAdvert).patch(updateAdvert).delete(deleteAdvert);

// par country
router.route("/country/:countryId").get(getByCountry);
module.exports = router;
