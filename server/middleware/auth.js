import crypto from 'crypto';
import AdminSession from '../models/AdminSession.js';
import { isDbConnected } from '../db.js';

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Creates an admin session in MongoDB Atlas and returns the raw session token.
 */
export async function createAdminSession() {
  if (!isDbConnected()) {
    const error = new Error('Database is unavailable for admin session creation');
    error.status = 503;
    error.code = 'DATABASE_UNAVAILABLE';
    throw error;
  }

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await AdminSession.create({
    tokenHash,
    expiresAt
  });

  return rawToken;
}

/**
 * Revokes an admin session by deleting it from MongoDB.
 */
export async function revokeAdminSession(rawToken) {
  if (!rawToken || !isDbConnected()) return;
  const tokenHash = hashToken(rawToken);
  try {
    await AdminSession.deleteOne({ tokenHash });
  } catch (err) {
    console.error('Failed to revoke admin session:', err.message);
  }
}

/**
 * Express middleware to enforce admin authentication.
 * Verifies Bearer token hash against active sessions in MongoDB.
 */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin authentication required',
      code: 'UNAUTHORIZED'
    });
  }

  const rawToken = authHeader.slice(7).trim();
  if (!rawToken) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Session token missing',
      code: 'UNAUTHORIZED'
    });
  }

  if (!isDbConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database connection unavailable',
      code: 'DATABASE_UNAVAILABLE'
    });
  }

  try {
    const tokenHash = hashToken(rawToken);
    const session = await AdminSession.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Session expired or invalid',
        code: 'UNAUTHORIZED'
      });
    }

    req.adminSession = session;
    next();
  } catch (err) {
    console.error('Error verifying admin session:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to verify admin credentials',
      code: 'SERVER_ERROR'
    });
  }
}
