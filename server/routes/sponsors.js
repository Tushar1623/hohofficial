import { Router } from 'express';
import Sponsor from '../models/Sponsor.js';

const router = Router();

// GET all sponsors
router.get('/', async (req, res) => {
  try {
    const list = await Sponsor.find().sort({ createdAt: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sponsors: ' + err.message });
  }
});

// PUT / bulk update sponsors list
router.put('/', async (req, res) => {
  try {
    const incoming = Array.isArray(req.body) ? req.body : [req.body];
    await Sponsor.deleteMany({});
    const inserted = await Sponsor.insertMany(incoming);
    res.json(inserted);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update sponsors list: ' + err.message });
  }
});

export default router;
