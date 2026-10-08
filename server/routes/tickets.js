import { Router } from 'express';
import TicketSettings from '../models/TicketSettings.js';
import { requireAuth } from '../middleware/auth.js';
import { requireDatabase } from '../middleware/database.js';

const router = Router();

// GET /api/tickets (Public: get ticket settings or null)
router.get('/', requireDatabase, async (req, res, next) => {
  try {
    const tickets = await TicketSettings.findOne({ key: 'ticket_settings' });
    res.json(tickets || null);
  } catch (err) {
    next(err);
  }
});

// PATCH & PUT /api/tickets (Admin only: update ticket settings)
const updateTicketHandler = async (req, res, next) => {
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

    res.json({
      success: true,
      message: 'Ticket settings updated successfully',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

router.patch('/', requireAuth, requireDatabase, updateTicketHandler);
router.put('/', requireAuth, requireDatabase, updateTicketHandler);

export default router;
