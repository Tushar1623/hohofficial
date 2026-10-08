/**
 * 404 Not Found Middleware
 */
export default function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
    code: 'NOT_FOUND'
  });
}
