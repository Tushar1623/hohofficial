import { Router } from 'express';
import TicketSettings from '../models/TicketSettings.js';
import { DEFAULT_TICKETS } from '../../src/data/defaults.js';

const router = Router();

// GET ticket settings
router.get('/', async (req, res) => {
  try {
    let tickets = await TicketSettings.findOne({ key: 'ticket_settings' });
    if (!tickets) {
      tickets = await TicketSettings.create({ key: 'ticket_settings', ...DEFAULT_TICKETS });
    }
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ticket settings: ' + err.message });
  }
});

// PUT update ticket settings
router.put('/', async (req, res) => {
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
