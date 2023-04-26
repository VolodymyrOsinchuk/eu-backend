const AppError = require("../utils/appEror");

const handleCastErrorDB = (err) => {
  console.log("handleCastErrorDB >>>>> ", err);
  const message = `недійсний ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  console.log("sendErrorProd", err);
  console.log("isOperational", err.isOperational);

  // операційна, довірена помилка: надіслати повідомлення клієнту
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // програмна чи інша невідома помилка: не повідомляйте деталі помилки
  } else {
    // 1) помилка журналу
    console.error("ПОМИЛКА 💥", err);
    // 2) Надіслати загальне повідомлення
    res.status(500).json({
      status: "error",
      message: "Щось пішло не так",
    });
  }
};

// module.exports = (err, req, res, next) => {
//   console.log("err >>>>>> ", err);
//   console.log("process.env.NODE_ENV", process.env.NODE_ENV);
//   // console.log("err.stack >>>>>> ", err.stack);
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   if (process.env.NODE_ENV === "development") {
//     sendErrorDev(err, res);
//   } else if (process.env.NODE_ENV === "production") {
//     let error = { ...err };
//     if (error.name === "CastError") error = handleCastErrorDB(error);

//     sendErrorProd(error, res);
//   }
// };

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // if (error.name === 'ValidationError')
    //   error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
