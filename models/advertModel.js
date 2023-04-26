const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Назва оголошення обовязкова"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Додайте опис"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    images: [String],
    status: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    country: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
    },
    city: {
      type: mongoose.Schema.ObjectId,
      ref: "City",
    },
  },
  { timestamps: true }
);

const Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
