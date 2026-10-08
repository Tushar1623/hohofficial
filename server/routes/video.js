import { Router } from 'express';
import FeaturedVideo from '../models/FeaturedVideo.js';
import { DEFAULT_FEATURED_VIDEO } from '../../src/data/defaults.js';

const router = Router();

// GET single featured video
router.get('/', async (req, res) => {
  try {
    let video = await FeaturedVideo.findOne({ key: 'featured_video' });
    if (!video) {
      video = await FeaturedVideo.create({ key: 'featured_video', ...DEFAULT_FEATURED_VIDEO });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch featured video: ' + err.message });
  }
});

// PUT update featured video
router.put('/', async (req, res) => {
  try {
    const { title, youtubeUrl, thumbnail } = req.body;
    const updated = await FeaturedVideo.findOneAndUpdate(
      { key: 'featured_video' },
      { $set: { title, youtubeUrl, thumbnail: thumbnail || '' } },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update featured video: ' + err.message });
  }
});

export default router;
