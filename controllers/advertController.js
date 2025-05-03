const Advert = require('../models/advertModel')
const APIFeatures = require('../utils/apiFeatures.js')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appEror')

const createAdvert = catchAsync(async (req, res, next) => {
  const advert = await Advert.create(req.body)

  return res.status(201).json({
    status: 'успіх',
    advert,
  })
})

const getAllAdverts = catchAsync(async (req, res, next) => {
  // BUILD QUERY
  // console.log("запит", req.query);
  // console.log("об'єкт запиту", queryObj);
  // console.log("рядок запиту", queryStr);
  // console.log("розбір рядка запиту", JSON.parse(queryStr));

  const features = new APIFeatures(
    Advert.find()
      .populate('user', 'username email')
      .populate('category', 'name'),
    req.query
  )
    .filter()
    .sort()
    .limitFirlds()
    .paginate()

  const adverts = await features.query

  return res.status(200).json({
    status: 'успіх',
    results: adverts.length,
    adverts,
  })
})

const getAdvertStats = catchAsync(async (req, res, next) => {
  const stats = await Advert.aggregate([
    {
      $match: { price: { $gte: 10 } },
    },
    {
      $group: {
        _id: null,
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { city: 1 },
    },
  ])
  console.log('статистика', stats)
  return res.status(200).json({
    status: 'успіх',
    results: stats.length,
    stats,
  })
})

const getAdvert = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const advert = await Advert.findById(id)
    .populate('user', 'username email')
    .populate('category', 'name')
    .populate('country', 'name')
    .lean()
    .exec()

  if (!advert) {
    return next(
      new AppError('Оголошення з цим ідентифікатором не знайдено', 404)
    )
  }

  res.status(200).json({
    status: 'успіх',
    advert,
  })
})

const getByCountry = catchAsync(async (req, res, next) => {
  const advertByCountry = await Advert.find({ country: req.params.countryId })
    .populate('user', 'username email')
    .populate('category', 'name')
    .populate('country', '_id name')
    .populate('city', '_id name')
    .lean()
    .exec()
  console.log('оголошення за країною', advertByCountry)
  return res.status(200).json({
    status: 'успіх',
    results: advertByCountry.length,
    advertByCountry,
  })
})

const updateAdvert = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const advert = await Advert.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .lean()
    .exec()

  if (!advert) {
    return next(
      new AppError('Оголошення з цим ідентифікатором не знайдено', 404)
    )
  }

  return res.status(200).json({
    status: 'успіх',
    advert,
  })
})

const deleteAdvert = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const advert = await Advert.findByIdAndDelete(id).lean().exec()

  if (!advert) {
    return next(
      new AppError('Оголошення з цим ідентифікатором не знайдено', 404)
    )
  }

  return res.status(200).json({
    status: 'успіх',
    message: 'Оголошення видалено',
  })
})

module.exports = {
  createAdvert,
  getAllAdverts,
  getAdvert,
  updateAdvert,
  deleteAdvert,
  getByCountry,
  getAdvertStats,
}
