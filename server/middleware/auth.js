import crypto from 'crypto';

const activeTokens = new Set();

export function createSessionToken() {
  const token = crypto.randomBytes(32).toString('hex');
  activeTokens.add(token);
  return token;
}

export function revokeSessionToken(token) {
  if (token) activeTokens.delete(token);
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
  }

  const token = header.slice(7).trim();
  if (!activeTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
  }

  next();
}
