const express = require("express");
const {
  createCategory,
  getAllCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/").post(createCategory).get(getAllCategory);

module.exports = router;
