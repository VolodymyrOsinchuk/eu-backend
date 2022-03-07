const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "PASSWORD",
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(con.connection.host);
      console.log("DB connection successful");
    })
    .catch((err) => {
      console.log("DB connection error: " + err.message);
    });
};

module.exports = connectDB;
