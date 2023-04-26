class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // console.log("statusCode >>>>>> ", statusCode);
    // console.log("message  >>>>> ", message);
    // console.log("AppError this  >>>>> ", this);

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
