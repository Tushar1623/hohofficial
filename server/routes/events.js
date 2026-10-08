import { Router } from 'express';
import crypto from 'crypto';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/events/next (Public: nearest published upcoming event)
router.get('/next', async (req, res) => {
  try {
    const nowIso = new Date().toISOString();
    const nextEvent = await Event.findOne({
      published: true,
      status: { $ne: 'COMPLETED' },
      dateTime: { $gte: nowIso }
    }).sort({ dateTime: 1 });

    res.json(nextEvent || null);
  } catch (err) {
    console.error('Failed to query next event:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch next event',
      code: 'SERVER_ERROR'
    });
  }
});

// GET /api/events (Public / Admin: list events)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: 1, createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events',
      code: 'SERVER_ERROR'
    });
  }
});

// GET /api/events/:id (Public: get event by ID)
router.get('/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const event = await Event.findOne({
      $or: [{ eventId: idParam }, { _id: idParam }]
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
        code: 'NOT_FOUND'
      });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event',
      code: 'SERVER_ERROR'
    });
  }
});

// POST /api/events (Admin only: create event)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, city, venue, dateTime, prize, generalPrice, vipPrice, bookingUrl, description, status, published } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Event title is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!city?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'City is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!venue?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Venue is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!dateTime) {
      return res.status(400).json({
        success: false,
        error: 'Date and time is required',
        code: 'VALIDATION_ERROR'
      });
    }

    const eventId = req.body.eventId || `ev-${Date.now().toString(36)}-${crypto.randomBytes(2).toString('hex')}`;

    const created = await Event.create({
      eventId,
      title: title.trim(),
      city: city.trim(),
      venue: venue.trim(),
      dateTime: new Date(dateTime).toISOString(),
      prize: prize?.trim() || '',
      generalPrice: Number(generalPrice) || 0,
      vipPrice: Number(vipPrice) || 0,
      bookingUrl: bookingUrl?.trim() || '',
      description: description?.trim() || '',
      status: status || 'UPCOMING',
      published: published !== false
    });

    res.status(201).json(created);
  } catch (err) {
    console.error('Failed to create event:', err.message);
    res.status(400).json({
      success: false,
      error: 'Failed to create event: ' + err.message,
      code: 'SERVER_ERROR'
    });
  }
});

// PUT /api/events/:id (Admin only: update event)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const idParam = req.params.id;
    const updateData = { ...req.body };

    if (updateData.dateTime) {
      updateData.dateTime = new Date(updateData.dateTime).toISOString();
    }
    if (updateData.generalPrice !== undefined) {
      updateData.generalPrice = Number(updateData.generalPrice) || 0;
    }
    if (updateData.vipPrice !== undefined) {
      updateData.vipPrice = Number(updateData.vipPrice) || 0;
    }

    const updated = await Event.findOneAndUpdate(
      { $or: [{ eventId: idParam }, { _id: idParam }] },
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
        code: 'NOT_FOUND'
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Failed to update event: ' + err.message,
      code: 'SERVER_ERROR'
    });
  }
});

// DELETE /api/events/:id (Admin only: delete event)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const idParam = req.params.id;
    const deleted = await Event.findOneAndDelete({
      $or: [{ eventId: idParam }, { _id: idParam }]
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
        code: 'NOT_FOUND'
      });
    }

    res.json({ success: true, id: idParam });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete event',
      code: 'SERVER_ERROR'
    });
  }
});

export default router;
