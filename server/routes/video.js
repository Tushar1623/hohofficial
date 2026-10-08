import { Router } from 'express';
import FeaturedVideo from '../models/FeaturedVideo.js';
import { requireAuth } from '../middleware/auth.js';
import { requireDatabase } from '../middleware/database.js';
import { isValidUrl } from '../utils/validation.js';

const router = Router();

function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// GET /api/video (Public: single featured video or null)
router.get('/', requireDatabase, async (req, res, next) => {
  try {
    const video = await FeaturedVideo.findOne({ key: 'featured_video', isActive: true });
    if (!video) {
      return res.json({
        success: true,
        video: null
      });
    }

    return res.json({
      success: true,
      video,
      // Top-level aliases for compatibility
      title: video.title,
      youtubeUrl: video.youtubeUrl,
      thumbnail: video.thumbnail,
      isActive: video.isActive,
      id: video._id
    });
  } catch (err) {
    next(err);
  }
});

// PATCH & PUT /api/video (Admin only: update featured video)
const updateVideoHandler = async (req, res, next) => {
  try {
    const { title, youtubeUrl, thumbnail } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Video title is required',
        code: 'VALIDATION_ERROR'
      });
    }

    if (!youtubeUrl?.trim() || !isValidUrl(youtubeUrl)) {
      return res.status(400).json({
        success: false,
        message: 'A valid YouTube URL is required',
        code: 'VALIDATION_ERROR'
      });
    }

    const videoId = extractYouTubeId(youtubeUrl.trim());
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid YouTube URL format. Please provide a standard watch or share link.',
        code: 'VALIDATION_ERROR'
      });
    }

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

    res.json({
      success: true,
      message: 'Featured video updated successfully',
      video: updated
    });
  } catch (err) {
    next(err);
  }
};

router.patch('/', requireAuth, requireDatabase, updateVideoHandler);
router.put('/', requireAuth, requireDatabase, updateVideoHandler);

export default router;
