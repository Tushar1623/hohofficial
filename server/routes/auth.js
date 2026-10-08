import { Router } from 'express';
import { createSessionToken, revokeSessionToken, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res) => {
  const password = req.body.password || req.body.passcode;
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not configured on the server' });
  }

  if (!password || password !== configuredPassword) {
    return res.status(401).json({ error: 'Invalid admin password' });
  }

  const token = createSessionToken();
  res.json({ success: true, token });
});

router.post('/logout', (req, res) => {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    revokeSessionToken(header.slice(7).trim());
  }
  res.json({ success: true });
});

router.get('/verify', requireAuth, (req, res) => {
  res.json({ authenticated: true });
});

export default router;
