import { Router } from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { requireAuth } from '../middleware/auth.js';
import { requireDatabase } from '../middleware/database.js';

const router = Router();

// Default public brand identity if database has no record yet
const DEFAULT_BRAND_IDENTITY = {
  siteName: 'House of Humour',
  tagline: "India's Biggest Stand-Up Comedy Talent Hunt",
  contactNumber: '',
  email: '',
  instagram: '',
  youtube: ''
};

// GET /api/settings (Public: returns public brand and contact settings)
router.get('/', async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOne({ key: 'site_settings' });
    if (!settings) {
      return res.json(DEFAULT_BRAND_IDENTITY);
    }

    res.json({
      siteName: settings.siteName || DEFAULT_BRAND_IDENTITY.siteName,
      tagline: settings.tagline || DEFAULT_BRAND_IDENTITY.tagline,
      contactNumber: settings.contactNumber || '',
      email: settings.email || '',
      instagram: settings.instagram || '',
      youtube: settings.youtube || ''
    });
  } catch (err) {
    // If database is disconnected, fallback to default brand identity
    res.json(DEFAULT_BRAND_IDENTITY);
  }
});

// PATCH & PUT /api/settings (Admin only: update site settings)
const updateSettingsHandler = async (req, res, next) => {
  try {
    const { siteName, tagline, contactNumber, email, instagram, youtube } = req.body;

    const updated = await SiteSettings.findOneAndUpdate(
      { key: 'site_settings' },
      {
        $set: {
          siteName: siteName?.trim() || 'House of Humour',
          tagline: tagline?.trim() || "India's Biggest Stand-Up Comedy Talent Hunt",
          contactNumber: contactNumber?.trim() || '',
          email: email?.trim() || '',
          instagram: instagram?.trim() || '',
          youtube: youtube?.trim() || ''
        }
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Site settings updated successfully',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

router.patch('/', requireAuth, requireDatabase, updateSettingsHandler);
router.put('/', requireAuth, requireDatabase, updateSettingsHandler);

export default router;
