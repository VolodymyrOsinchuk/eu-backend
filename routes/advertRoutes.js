const express = require("express");
const {
  createAdvert,
  getAllAdverts,
  getAdvert,
  updateAdvert,
  deleteAdvert,
} = require("../controllers/advertController");
const router = express.Router();

router.route("/").post(createAdvert).get(getAllAdverts);
router.route("/:id").get(getAdvert).patch(updateAdvert).delete(deleteAdvert);

module.exports = router;
