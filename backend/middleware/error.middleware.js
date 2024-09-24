import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  if (err.name === "CastError") {
    const message = `Resource not found  Invalid ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Bu ${Object.keys(err.keyValue)} Kullaniliyor.`;
    error = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid.Try again!!!`;
    error = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired.Try again!!!`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    message: error.message,
  });
};
