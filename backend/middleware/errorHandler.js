/**
 * Global error handling middleware
 */

/**
 * Error handler middleware for Express
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  // Default error message
  let statusCode = 500;
  let message = 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Forbidden';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Resource not found';
  }
  
  // Send error response
  res.status(statusCode).json({
    error: message,
    status: statusCode
  });
}

module.exports = errorHandler;