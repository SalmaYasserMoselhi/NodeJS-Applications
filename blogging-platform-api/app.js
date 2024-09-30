const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const postRouter = require('./routes/postRoute');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of the express app

// MIDDLEWARES
app.use(express.json()); // Body-Parser, parse JSON bodies

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logger function, log HTTP requests in the console
}

// ROUTES as middleware
app.use('/api/v1/posts', postRouter); // Mount the post routes to the app

// Handle all unknown routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER middleware
app.use(globalErrorHandler);

module.exports = app;
