const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Назва категорії обовязкова"],
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
