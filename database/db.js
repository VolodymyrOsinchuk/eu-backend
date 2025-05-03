const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  await mongoose
    .connect(DB)
    .then((con) => {
      console.log(`Успішне підключення до БД на хості ${con.connection.host}`);
    })
    .catch((err) => {
      console.log("Помилка підключення до БД: " + err.message);
    });
};

module.exports = connectDB;
