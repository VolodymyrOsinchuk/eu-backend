const mongoose = require("mongoose");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD,
// );

const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB);
    console.log(`Успішне підключення до БД на хості ${con.connection.host}`);
  } catch (err) {
    console.log("Помилка підключення до БД: " + err.message);
    process.exit(1); // бажано завершити процес, якщо БД не підключилась
  }
};

module.exports = connectDB;
