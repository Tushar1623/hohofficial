import { Router } from 'express';
import FeaturedVideo from '../models/FeaturedVideo.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Validate and extract YouTube Video ID
function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// GET /api/video (Public: single featured video or null)
router.get('/', async (req, res) => {
  try {
    const video = await FeaturedVideo.findOne({ key: 'featured_video', isActive: true });
    res.json(video || null);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured video',
      code: 'SERVER_ERROR'
    });
  }
});

// PUT /api/video (Admin only: update featured video)
router.put('/', requireAuth, async (req, res) => {
  try {
    const { title, youtubeUrl, thumbnail } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Video title is required',
        code: 'VALIDATION_ERROR'
      });
    }

    if (!youtubeUrl?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'YouTube URL is required',
        code: 'VALIDATION_ERROR'
      });
    }

    const videoId = extractYouTubeId(youtubeUrl.trim());
    if (!videoId) {
      return res.status(400).json({
        success: false,
        error: 'Invalid YouTube URL. Please provide a standard YouTube video link.',
        code: 'VALIDATION_ERROR'
      });
    }

    // Default to official YouTube HQ thumbnail if custom thumbnail is omitted
    const effectiveThumb = thumbnail?.trim() || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const updated = await FeaturedVideo.findOneAndUpdate(
      { key: 'featured_video' },
      {
        $set: {
          title: title.trim(),
          youtubeUrl: youtubeUrl.trim(),
          thumbnail: effectiveThumb,
          isActive: true
        }
      },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Failed to update featured video: ' + err.message,
      code: 'SERVER_ERROR'
    });
  }
});

export default router;
