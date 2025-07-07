const { CustomError } = require('../errors');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error response
  const errorResponse = {
    success: false,
    error: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  // Handle different error types
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(errorResponse);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      ...errorResponse,
      error: 'Invalid token'
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      ...errorResponse,
      error: 'Validation failed',
      details: err.errors
    });
  }

  // Fallback to 500 server error
  res.status(500).json(errorResponse);
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Not Found - ${req.method} ${req.originalUrl}`
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};