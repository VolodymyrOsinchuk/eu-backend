const mongoose = require("mongoose");
const slugify = require("slugify");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Назва країни обовязкова"],
    unique: true,
  },
  slug: String,
});

countrySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
