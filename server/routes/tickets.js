import { Router } from 'express';
import TicketSettings from '../models/TicketSettings.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET ticket settings (Public)
router.get('/', async (req, res) => {
  try {
    const tickets = await TicketSettings.findOne({ key: 'ticket_settings' });
    res.json(tickets || { generalPrice: 399, vipPrice: 699, bookingUrl: '', availability: 'OPEN' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ticket settings: ' + err.message });
  }
});

// PUT update ticket settings (Admin only)
router.put('/', requireAuth, async (req, res) => {
  try {
    const updated = await TicketSettings.findOneAndUpdate(
      { key: 'ticket_settings' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update ticket settings: ' + err.message });
  }
});

export default router;
