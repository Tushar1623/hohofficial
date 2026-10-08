import { Router } from 'express';
import Guest from '../models/Guest.js';

const router = Router();

// GET all guests
router.get('/', async (req, res) => {
  try {
    const list = await Guest.find().sort({ createdAt: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch guests: ' + err.message });
  }
});

// PUT / bulk update guests list
router.put('/', async (req, res) => {
  try {
    const incoming = Array.isArray(req.body) ? req.body : [req.body];
    await Guest.deleteMany({});
    const inserted = await Guest.insertMany(incoming);
    res.json(inserted);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update guests list: ' + err.message });
  }
});

export default router;
