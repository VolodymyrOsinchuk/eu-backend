require("dotenv").config({ path: "./config.env" });
const express = require("express");
const morgan = require("morgan");

const connectDB = require("./database/db");
const advertRouter = require("./routes/advertRoutes");

const app = express();
// console.log(app.get("env"));
// console.log(process.env.NODE_ENV);
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
app.use("/api/v1/adverts", advertRouter)
// START SERVER
const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server sterted on port ${port}`);
});
connectDB();
