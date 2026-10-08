import { Router } from 'express';
import TicketSettings from '../models/TicketSettings.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/tickets (Public: get ticket settings or null)
router.get('/', async (req, res) => {
  try {
    const tickets = await TicketSettings.findOne({ key: 'ticket_settings' });
    res.json(tickets || null);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ticket settings',
      code: 'SERVER_ERROR'
    });
  }
});

// PUT /api/tickets (Admin only: update ticket settings)
router.put('/', requireAuth, async (req, res) => {
  try {
    const { generalPrice, vipPrice, bookingUrl, availability } = req.body;

    const updated = await TicketSettings.findOneAndUpdate(
      { key: 'ticket_settings' },
      {
        $set: {
          generalPrice: Number(generalPrice) || 0,
          vipPrice: Number(vipPrice) || 0,
          bookingUrl: bookingUrl?.trim() || '',
          availability: availability || 'OPEN'
        }
      },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Failed to update ticket settings: ' + err.message,
      code: 'SERVER_ERROR'
    });
  }
});

export default router;
