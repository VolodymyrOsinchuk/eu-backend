const Category = require("../models/categoryModele");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appEror");

const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  return res.status(201).json({
    status: "success",
    category,
  });
});

const getAllCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.find().select("-__v");

  return res.status(201).json({
    status: "success",
    categories,
  });
});

const getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id).select("-__v");

  if (!category) {
    return next(
      new AppError("Категорія з цим ідентифікатором не знайдено", 404)
    );
  }

  res.status(201).json({
    status: "success",
    category,
  });
});

module.exports = {
  createCategory,
  getAllCategory,
  getCategory,
};
