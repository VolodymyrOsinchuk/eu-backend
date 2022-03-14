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
      message: "надіслані недійсні дані",
      error: err,
    });
  }
};

const getAllAdverts = async (req, res) => {
  try {
    // BUILD QUERY
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log("req.query", req.query);
    // console.log("queryObj", queryObj);

    // { price: { gte: '5' } }
    // { price: { $gte: 5}}
    // 1 methode
    const query = await Advert.find(queryObj)
      .populate("user", "username email")
      .populate("category", "name");
    // EXECUTE QUERY
    const adverts = query;

    // 2 mathode
    // const adverts = await Advert.find().where("title").equals("advert one");

    // advenced filtering
    let queryStr = JSON.stringify(queryObj);
    console.log("queryStr", queryStr);
    // queryStr = queryStr.replace(/\/)

    // SEND RESPONSE
    return res.status(200).json({
      status: "success",
      results: adverts.length,
      adverts,
    });
  } catch (err) {
    console.log("get all adverts error is: ", err.message);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getAdvert = async (req, res) => {
  const { id } = req.params;
  try {
    const advert = await Advert.findById(id).lean().exec();
    return res.status(200).json({
      status: "success",
      advert,
    });
  } catch (err) {
    console.log("get one advert error is: ", err.message);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateAdvert = async (req, res) => {
  const { id } = req.params;
  try {
    const advert = await Advert.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();
    return res.status(200).json({
      status: "success",
      advert,
    });
  } catch (err) {
    console.log("update advert error is: ", err.message);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteAdvert = async (req, res) => {
  const { id } = req.params;
  try {
    await Advert.findByIdAndDelete(id).lean().exec();
    return res.status(200).json({
      status: "success",
      message: "Avert deleted",
    });
  } catch (err) {
    console.log("update advert error is: ", err.message);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  createAdvert,
  getAllAdverts,
  getAdvert,
  updateAdvert,
  deleteAdvert,
};
