const Category = require("../models/categoryModele");
const catchAsync = require("../utils/catchAsync");

const createCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);

  return res.status(201).json({
    status: "success",
    category,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const categories = await Category.find().select("-__v");

  return res.status(201).json({
    status: "success",
    categories,
  });
});

module.exports = {
  createCategory,
  getAllCategory,
};
