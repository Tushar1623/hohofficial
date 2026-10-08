import { Router } from 'express';
import Video from '../models/Video.js';

const router = Router();

// GET all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos: ' + err.message });
  }
});

// POST add new video
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) {
      data.id = `vid-${Date.now().toString(36)}`;
    }
    const created = await Video.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create video: ' + err.message });
  }
});

// DELETE video
router.delete('/:id', async (req, res) => {
  try {
    await Video.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete video: ' + err.message });
  }
});

export default router;
