import { Router } from 'express';
import crypto from 'crypto';
import mongoose from 'mongoose';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';
import { requireDatabase } from '../middleware/database.js';
import { VALID_EVENT_STATUSES } from '../utils/validation.js';

const router = Router();

function buildEventIdQuery(idParam) {
  if (idParam && mongoose.Types.ObjectId.isValid(idParam)) {
    return { $or: [{ eventId: idParam }, { _id: idParam }] };
  }
  return { eventId: idParam };
}

// GET /api/events/next (Public: nearest published upcoming event)
router.get('/next', requireDatabase, async (req, res, next) => {
  try {
    const nowIso = new Date().toISOString();
    const nextEvent = await Event.findOne({
      published: true,
      status: { $ne: 'COMPLETED' },
      dateTime: { $gte: nowIso }
    }).sort({ dateTime: 1 });

    res.json(nextEvent || null);
  } catch (err) {
    next(err);
  }
});

// GET /api/events (Public / Admin: list events)
router.get('/', requireDatabase, async (req, res, next) => {
  try {
    const events = await Event.find().sort({ dateTime: 1, createdAt: -1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// GET /api/events/:id (Public: get single event)
router.get('/:id', requireDatabase, async (req, res, next) => {
  try {
    const idParam = req.params.id;
    const event = await Event.findOne(buildEventIdQuery(idParam));

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        code: 'NOT_FOUND'
      });
    }

    res.json(event);
  } catch (err) {
    next(err);
  }
});

// POST /api/events (Admin only: create event)
router.post('/', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const { title, city, venue, dateTime, prize, generalPrice, vipPrice, bookingUrl, description, status, published } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Event title is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!city?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'City is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!venue?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Venue is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!dateTime) {
      return res.status(400).json({
        success: false,
        message: 'Date and time is required',
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
      status: VALID_EVENT_STATUSES.includes(status) ? status : 'UPCOMING',
      published: published !== false
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PATCH & PUT /api/events/:id (Admin only: update event)
const updateEventHandler = async (req, res, next) => {
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
      buildEventIdQuery(idParam),
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        code: 'NOT_FOUND'
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

router.patch('/:id', requireAuth, requireDatabase, updateEventHandler);
router.put('/:id', requireAuth, requireDatabase, updateEventHandler);

// DELETE /api/events/:id (Admin only: delete event)
router.delete('/:id', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const idParam = req.params.id;
    const deleted = await Event.findOneAndDelete(buildEventIdQuery(idParam));

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        code: 'NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully',
      id: idParam
    });
  } catch (err) {
    next(err);
  }
});

export default router;
