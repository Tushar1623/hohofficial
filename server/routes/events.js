import { Router } from 'express';
import Event from '../models/Event.js';

const router = Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ targetEpoch: 1, createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events: ' + err.message });
  }
});

// GET single event by id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event: ' + err.message });
  }
});

// POST new event
router.post('/', async (req, res) => {
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

// PUT update event by id
router.put('/:id', async (req, res) => {
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

// DELETE event by id
router.delete('/:id', async (req, res) => {
  try {
    await Event.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event: ' + err.message });
  }
});

export default router;
