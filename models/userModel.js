const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Ім'я користувача обовязкова"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Введіть електорну адресу"],
    },
    password: {
      type: String,
      required: [true, "Введіть пароль"],
    },
    image: {
      type: String,
      default: "degault.jpg",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
