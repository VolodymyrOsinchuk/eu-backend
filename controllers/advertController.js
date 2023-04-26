const Advert = require("../models/advertModel");
const APIFeatures = require("../utils/apiFeatures.js");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appEror");

const createAdvert = catchAsync(async (req, res, next) => {
  const advert = await Advert.create(req.body);

  return res.status(201).json({
    status: "success",
    advert,
  });
});

const getAllAdverts = catchAsync(async (req, res, next) => {
  // BUILD QUERY
  // // 1A) Filtering
  // console.log("req.query", req.query);
  // const queryObj = { ...req.query };
  // const excludedFields = ["page", "sort", "limit", "fields"];
  // excludedFields.forEach((el) => delete queryObj[el]);
  // console.log("queryObj", queryObj);

  //   // 1B) advenced filtering
  // let queryStr = JSON.stringify(queryObj);
  // console.log("queryStr", queryStr);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // console.log("queryStr parse", JSON.parse(queryStr));
  // { price: { gte: '5' } }
  // { price: { $gte: 5}}
  // 1 methode
  // let query = Advert.find(JSON.parse(queryStr))
  //   .populate("user", "username email")
  //   .populate("category", "name")
  //   .populate("country", "_id name");

  // 2) Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   console.log("sortBy", sortBy);
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort("-createdAt");
  // }

  // 3) Field limiting
  // if (req.query.sort) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   console.log("sortBy", sortBy);
  //   query = query.select(fields);
  // } else {
  //   query = query.select("-__v");
  // }

  // 4) Pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 10;
  // const skip = (page - 1) * limit;

  // query = query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const numAdvert = await Advert.countDocuments();
  //   if (skip >= numAdvert) throw new Error("Ця сторінка не існує");
  // }

  // EXECUTE QUERY
  const features = new APIFeatures(
    Advert.find()
      .populate("user", "username email")
      .populate("category", "name"),
    req.query
  )
    .filter()
    .sort()
    .limitFirlds()
    .paginate();

  // const adverts = await query;
  const adverts = await features.query;

  // 2 mathode
  // const adverts = await Advert.find().where("title").equals("advert one");

  // SEND RESPONSE
  return res.status(200).json({
    status: "success",
    results: adverts.length,
    adverts,
  });
});

const getAdvertStats = catchAsync(async (req, res, next) => {
  const stats = await Advert.aggregate([
    {
      $match: { price: { $gte: 10 } },
    },
    {
      $group: {
        _id: null,
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { city: 1 },
    },
  ]);
  console.log("stats", stats);
  return res.status(200).json({
    status: "success",
    results: stats.length,
    stats,
  });
});

const getAdvert = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const advert = await Advert.findById(id)
    .populate("user", "username email")
    .populate("category", "name")
    .populate("country", "name")
    .lean()
    .exec();

  if (!advert) {
    return next(
      new AppError("Оголошення з цим ідентифікатором не знайдено", 404)
    );
  }

  res.status(200).json({
    status: "success",
    advert,
  });
});

const getByCountry = catchAsync(async (req, res, next) => {
  const advertByCountry = await Advert.find({ country: req.params.countryId })
    .populate("user", "username email")
    .populate("category", "name")
    .populate("country", "_id name")
    .populate("city", "_id name")
    .lean()
    .exec();
  console.log("advertByCountry", advertByCountry);
  return res.status(200).json({
    status: "success",
    results: advertByCountry.length,
    advertByCountry,
  });
});

const updateAdvert = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const advert = await Advert.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .lean()
    .exec();

  if (!advert) {
    return next(
      new AppError("Оголошення з цим ідентифікатором не знайдено", 404)
    );
  }

  return res.status(200).json({
    status: "success",
    advert,
  });
});

const deleteAdvert = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const advert = await Advert.findByIdAndDelete(id).lean().exec();

  if (!advert) {
    return next(new AppError("Оголошення з цим ідентифікатором не знайдено", 404));
   }

  return res.status(200).json({
    status: "success",
    message: "Avert deleted",
  });
});

module.exports = {
  createAdvert,
  getAllAdverts,
  getAdvert,
  updateAdvert,
  deleteAdvert,
  getByCountry,
  getAdvertStats,
};
