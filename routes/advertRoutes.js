const express = require("express");
const {createAdvert, getAllAdverts} = require("../controllers/advertController")
const router = express.Router();

router.route("/").post(createAdvert).get(getAllAdverts);

module.exports = router;