/**
 * Global Error Handler Middleware
 * Formats all uncaught errors to consistent API error structure
 */
export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  const message = err.message || 'An unexpected server error occurred.';
  const code = err.code || (statusCode === 503 ? 'DATABASE_UNAVAILABLE' : 'SERVER_ERROR');

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  res.status(statusCode).json({
    success: false,
    message,
    code
  });
}
