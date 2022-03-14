const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Назва країни обовязкова"],
    unique: true,
  },
  city: {
    type: String,
    required: [true, "Назва міста обовязкова"],
    unique: true,
  },
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;