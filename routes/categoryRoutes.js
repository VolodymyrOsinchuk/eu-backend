const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/").post(createCategory).get(getAllCategory);
router.route("/:id").get(getCategory);

module.exports = router;
