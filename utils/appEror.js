class AppError extends Error {
  constructor(message, statusCode) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'невдача' : 'помилка'
    this.isOperational = true

    // console.log("код статусу >>>>>> ", statusCode);
    // console.log("повідомлення  >>>>> ", message);
    // console.log("AppError це  >>>>> ", this);

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
