const Country = require("../models/countryModel");

const createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);

    return res.status(201).json({
      status: "success",
      country,
    });
  } catch (err) {
    console.log("create country error is: ", err);
    res.status(400).json({
      status: "fail",
      message: "надіслані недійсні дані",
      error: err,
    });
  }
};

const getAllCountry = async (req, res) => {
  try {
    const countries = await Country.find().select("-__v");

    return res.status(201).json({
      status: "success",
      countries,
    });
  } catch (err) {
    console.log("all countries error is: ", err);
    res.status(400).json({
      status: "fail",
      message: "надіслані недійсні дані",
      error: err,
    });
  }
};

const getCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findById(id).lean().exec();
    return res.status(200).json({
      status: "success",
      country,
    });
  } catch (err) {
    console.log("get one country error is: ", err.message);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  createCountry,
  getAllCountry,
  getCountry,
};
