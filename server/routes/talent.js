import { Router } from 'express';
import Talent from '../models/Talent.js';

const router = Router();

// GET all talent
router.get('/', async (req, res) => {
  try {
    const list = await Talent.find().sort({ rank: 1, createdAt: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch talent: ' + err.message });
  }
});

// PUT / bulk update talent list
router.put('/', async (req, res) => {
  try {
    const incoming = Array.isArray(req.body) ? req.body : [req.body];
    // Replace collection with new list
    await Talent.deleteMany({});
    const inserted = await Talent.insertMany(incoming);
    res.json(inserted);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update talent list: ' + err.message });
  }
});

export default router;
