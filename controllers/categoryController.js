const Category = require("../models/categoryModele");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    return res.status(201).json({
      status: "success",
      category,
    });
  } catch (err) {
    console.log("create category error is: ", err);
    res.status(400).json({
      status: "fail",
      message: "надіслані недійсні дані",
      error: err,
    });
  }
};

module.exports = {
  createCategory,
};
