const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Назва міста обовязкова"],
    unique: true,
  },
  country: {
    type: mongoose.Schema.ObjectId,
    ref: "Country",
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
