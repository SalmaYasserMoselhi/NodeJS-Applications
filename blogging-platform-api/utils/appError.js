class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // EX: Invalid path accessed, Invalid user input (validator error from mongoose),  Failed to connect to server or database, ...

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
