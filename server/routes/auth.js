import { Router } from 'express';
import { createAdminSession, revokeAdminSession, requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const password = req.body.password || req.body.passcode;
    const configuredPassword = process.env.ADMIN_PASSWORD;

    if (!configuredPassword) {
      return res.status(500).json({
        success: false,
        error: 'ADMIN_PASSWORD is not configured on the server',
        code: 'MISSING_CONFIG'
      });
    }

    if (!password || password !== configuredPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin password.',
        code: 'UNAUTHORIZED'
      });
    }

    const token = await createAdminSession();
    res.json({ success: true, token });
  } catch (err) {
    console.error('Login processing error:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to process login',
      code: 'SERVER_ERROR'
    });
  }
});

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      await revokeAdminSession(authHeader.slice(7).trim());
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to process logout',
      code: 'SERVER_ERROR'
    });
  }
});

// GET /api/auth/verify
router.get('/verify', requireAuth, (req, res) => {
  res.json({ success: true, authenticated: true });
});

export default router;
