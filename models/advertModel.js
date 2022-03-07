const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is require"],
    unique: true,
  },
});

const Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
