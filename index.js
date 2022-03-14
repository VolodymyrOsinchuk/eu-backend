require("dotenv").config({ path: "./config.env" });
const express = require("express");
const morgan = require("morgan");
// const {
//   countries,
//   continents,
//   languages,
//   languagesAll,
// } = require("countries-list");

const connectDB = require("./database/db");
const advertRouter = require("./routes/advertRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRouter");

const app = express();
// console.log(app.get("env"));
// console.log(process.env.NODE_ENV);
// console.log("countries", countries);
// console.log("continents", continents.EU);
// console.log("languages", languages);
// console.log("languagesAll", languagesAll);
// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.send("Hello from back! 👍");
});

// ROUTES
app.use("/api/v1/adverts", advertRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
// START SERVER
const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server sterted on port ${port}`);
});
connectDB();
