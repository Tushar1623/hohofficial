import { getDatabaseStatus } from '../db.js';

/**
 * Middleware for database-dependent API endpoints (Section 8)
 * Returns HTTP 503 if MongoDB is not in 'connected' state.
 */
export function requireDatabase(req, res, next) {
  if (getDatabaseStatus() !== 'connected') {
    return res.status(503).json({
      success: false,
      message: 'Database unavailable',
      code: 'DATABASE_UNAVAILABLE'
    });
  }
  next();
}

export default requireDatabase;
