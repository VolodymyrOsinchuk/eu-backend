const Advert = require("../models/advertModel");

const createAdvert = async (req, res) => {
  try {
    const advert = await Advert.create(req.body);

   return res.status(201).json({
      status: "success",
      advert,
    });
  } catch (err) {
    console.log("create advert error is: ", err);
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

const getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find().lean().exec();
    return res.status(200).json({
      status: "success",
      adverts,
    });
  } catch (err) {
    console.log("get all adverts error is: ", err.message);
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

module.exports = {
  createAdvert,
  getAllAdverts,
};
