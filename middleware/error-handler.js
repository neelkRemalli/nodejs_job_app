import CustomAPIError from './custom-error.js';
const errorHandlerMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);
  if (err.code === 11000) {
    const message = `duplicate key value entered for ${Object.keys(
      err.keyValue
    )}`;
    error = new CustomAPIError(message, 400);
  }

  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new CustomAPIError(message, 400);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new CustomAPIError(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ msg: error.message || 'Server Error Please Try Again Later' });
};

export default errorHandlerMiddleware;
