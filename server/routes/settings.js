import { Router } from 'express';
import Settings from '../models/Settings.js';

const router = Router();

// GET settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ key: 'site_settings' });
    if (!settings) {
      settings = await Settings.create({ key: 'site_settings' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings: ' + err.message });
  }
});

// PUT update settings
router.put('/', async (req, res) => {
  try {
    const updated = await Settings.findOneAndUpdate(
      { key: 'site_settings' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save settings: ' + err.message });
  }
});

export default router;
