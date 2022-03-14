const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log("create user error is: ", err);
    res.status(400).json({
      status: "fail",
      message: "надіслані недійсні дані",
      error: err,
    });
  }
};

module.exports = {
  createUser,
};
