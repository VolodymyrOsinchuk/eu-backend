const Country = require("../models/countryModel");
const catchAsync = require("../utils/catchAsync");

const createCountry = catchAsync(async (req, res, next) => {
  const country = await Country.create(req.body);

  return res.status(201).json({
    status: "success",
    country,
  });
});

const getAllCountry = catchAsync(async (req, res, next) => {
  const countries = await Country.find().select("-__v");

  return res.status(201).json({
    status: "success",
    countries,
  });
});

const getCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findById(id).lean().exec();
  return res.status(200).json({
    status: "success",
    country,
  });
});

module.exports = {
  createCountry,
  getAllCountry,
  getCountry,
};
