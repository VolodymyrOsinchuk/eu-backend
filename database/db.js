const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  await mongoose
    .connect(DB)
    .then((con) => {
      console.log(`DB connection successful in host ${con.connection.host}`);
    })
    .catch((err) => {
      console.log("DB connection error: " + err.message);
    });
};

module.exports = connectDB;
