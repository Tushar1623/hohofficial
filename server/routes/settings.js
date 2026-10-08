import { Router } from 'express';
import Settings from '../models/Settings.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET settings (Public, no sensitive fields)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ key: 'site_settings' });
    if (!settings) {
      return res.json({
        siteName: 'House of Humour',
        tagline: "India's Biggest Stand-Up Comedy Talent Hunt",
        contactNumber: '',
        email: '',
        instagram: '',
        youtube: ''
      });
    }

    // Exclude any internal credentials from public view
    res.json({
      siteName: settings.siteName,
      tagline: settings.tagline,
      contactNumber: settings.contactNumber,
      email: settings.email,
      instagram: settings.instagram,
      youtube: settings.youtube
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings: ' + err.message });
  }
});

// PUT update settings (Admin only)
router.put('/', requireAuth, async (req, res) => {
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
