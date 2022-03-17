const City = require("../models/cityModel");

const createCity = async (req, res) => {
  try {
    const city = await City.create(req.body);

    return res.status(201).json({
      status: "success",
      city,
    });
  } catch (err) {
    console.log("create city error is: ", err);
    res.status(400).json({
      status: "fail",
      message: "надіслані недійсні дані",
      error: err,
    });
  }
};

const getAllCity = async (req, res) => {
  try {
    const cities = await City.find()
      .select("-__v")
      .populate("country", "_id name");

    return res.status(201).json({
      status: "success",
      cities,
    });
  } catch (err) {
    console.log("all cities error is: ", err);
    res.status(400).json({
      status: "fail",
      message: "надіслані недійсні дані",
      error: err,
    });
  }
};

module.exports = {
  createCity,
  getAllCity,
};
