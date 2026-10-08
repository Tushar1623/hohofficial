import { Router } from 'express';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/next', async (req, res) => {
  try {
    const nowIso = new Date().toISOString();
    const nextEvent = await Event.findOne({
      published: true,
      $or: [
        { dateTime: { $gte: nowIso } },
        { status: 'LIVE' },
        { status: 'UPCOMING' }
      ]
    }).sort({ dateTime: 1 });

    res.json(nextEvent || null);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch next event: ' + err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: 1, createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events: ' + err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event: ' + err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) {
      data.id = `ev-${Date.now().toString(36)}`;
    }
    const created = await Event.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event: ' + err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await Event.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update event: ' + err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await Event.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event: ' + err.message });
  }
});

export default router;
