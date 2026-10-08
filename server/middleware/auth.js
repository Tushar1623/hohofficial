import crypto from 'crypto';
import AdminSession from '../models/AdminSession.js';

// Active in-memory session cache for fast lookup and server resilience
const activeSessions = new Map();

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function createAdminSession() {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24-hour expiration

  // Cache in memory
  activeSessions.set(tokenHash, expiresAt);

  // Persist in MongoDB admin_sessions collection if database is connected
  try {
    if (AdminSession.db.readyState === 1) {
      await AdminSession.create({ tokenHash, expiresAt });
    }
  } catch (err) {
    console.warn('MongoDB session persist notice (session kept in memory):', err.message);
  }

  return rawToken;
}

export async function revokeAdminSession(rawToken) {
  if (!rawToken) return;
  const tokenHash = hashToken(rawToken);
  activeSessions.delete(tokenHash);

  try {
    if (AdminSession.db.readyState === 1) {
      await AdminSession.deleteOne({ tokenHash });
    }
  } catch (err) {
    console.warn('MongoDB session revoke notice:', err.message);
  }
}

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Admin authentication required',
      code: 'UNAUTHORIZED'
    });
  }

  const rawToken = authHeader.slice(7).trim();
  if (!rawToken) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing session token',
      code: 'UNAUTHORIZED'
    });
  }

  const tokenHash = hashToken(rawToken);
  const now = new Date();

  // Fast check in memory cache
  const cachedExpiry = activeSessions.get(tokenHash);
  if (cachedExpiry && cachedExpiry > now) {
    req.adminTokenHash = tokenHash;
    return next();
  }

  // Check MongoDB admin_sessions if connected
  try {
    if (AdminSession.db.readyState === 1) {
      const session = await AdminSession.findOne({
        tokenHash,
        expiresAt: { $gt: now }
      });

      if (session) {
        activeSessions.set(tokenHash, session.expiresAt);
        req.adminSession = session;
        return next();
      }
    }
  } catch (err) {
    console.error('Session verification database error:', err.message);
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized: Invalid or expired session',
    code: 'UNAUTHORIZED'
  });
}
