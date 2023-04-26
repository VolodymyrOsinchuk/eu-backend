const mongoose = require("mongoose");
const slugify = require("slugify");

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
  slug: String,
});

citySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const City = mongoose.model("City", citySchema);

module.exports = City;
