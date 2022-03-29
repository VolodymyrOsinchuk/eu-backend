const City = require("../models/cityModel");
const catchAsync = require("../utils/catchAsync");

const createCity = catchAsync(async (req, res, next) => {
  const city = await City.create(req.body);

  return res.status(201).json({
    status: "success",
    city,
  });
});

const getAllCity = catchAsync(async (req, res, next) => {
  const cities = await City.find()
    .select("-__v")
    .populate("country", "_id name");

  return res.status(201).json({
    status: "success",
    cities,
  });
});

module.exports = {
  createCity,
  getAllCity,
};
