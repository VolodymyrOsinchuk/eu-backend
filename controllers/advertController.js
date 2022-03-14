const Advert = require("../models/advertModel");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) advenced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // let query = Advert.find(JSON.parse(queryStr))
    this.query.find(JSON.parse(queryStr));
  }

  sort() {
    if (this.quetyString.sort) {
      const sortBy = this.quetyString.sort.split(",").join(" ");
      console.log("sortBy", sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
  }
}

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
    // // 1A) Filtering
    //   console.log("req.query", req.query);
    //   const queryObj = { ...req.query };
    //   const excludedFields = ["page", "sort", "limit", "fields"];
    //   excludedFields.forEach((el) => delete queryObj[el]);
    //   // console.log("queryObj", queryObj);

    //   // 1B) advenced filtering
    //   let queryStr = JSON.stringify(queryObj);
    //   console.log("queryStr", queryStr);
    //   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //   console.log("queryStr parse", JSON.parse(queryStr));
    // { price: { gte: '5' } }
    // { price: { $gte: 5}}
    // 1 methode
    // let query = Advert.find(JSON.parse(queryStr))
    //   .populate("user", "username email")
    //   .populate("category", "name");

    // 2) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   console.log("sortBy", sortBy);
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("-createdAt");
    // }

    // 3) Field limiting
    if (req.query.sort) {
      const fields = req.query.fields.split(",").join(" ");
      console.log("sortBy", sortBy);
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numAdvert = await Advert.countDocuments();
      if (skip >= numAdvert) throw new Error("Ця сторінка не існує");
    }

    // EXECUTE QUERY
    const features = new APIFeatures(
      Advert.find()
        .populate("user", "username email")
        .populate("category", "name"),
      req.query
    )
      .filter()
      .sort();
    const adverts = await features.query;

    // 2 mathode
    // const adverts = await Advert.find().where("title").equals("advert one");

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
      message: err.message,
      error: err,
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
