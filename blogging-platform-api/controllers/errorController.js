const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
  // Send as many details as possible to the client (developer)
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted errors: send message to client, EX: Invalid input data, Trying to access a route that doesn't exist, etc.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown errors: don't leak error details
  else {
    // 1) Log error
    console.log('ERROR', err);

    // 2) Send generic error message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  // err object is the error returned into next function from the last middleware exected
  err.statusCode = err.statusCode || 500; // 500 means internal server error
  err.message = err.message || 'Something went wrong!';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};

module.exports = globalErrorHandler;
