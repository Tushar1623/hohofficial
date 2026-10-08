import { Router } from 'express';
import FeaturedVideo from '../models/FeaturedVideo.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET single featured video (Public)
router.get('/', async (req, res) => {
  try {
    const video = await FeaturedVideo.findOne({ key: 'featured_video' });
    res.json(video || null);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch featured video: ' + err.message });
  }
});

// PUT update featured video (Admin only)
router.put('/', requireAuth, async (req, res) => {
  try {
    const { title, youtubeUrl, thumbnail } = req.body;
    if (!title || !youtubeUrl) {
      return res.status(400).json({ error: 'Title and YouTube URL are required' });
    }

    const updated = await FeaturedVideo.findOneAndUpdate(
      { key: 'featured_video' },
      { $set: { title: title.trim(), youtubeUrl: youtubeUrl.trim(), thumbnail: thumbnail?.trim() || '' } },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update featured video: ' + err.message });
  }
});

export default router;
