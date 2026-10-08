import { Router } from 'express';
import crypto from 'crypto';
import Application from '../models/Application.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Basic email regex validator
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic URL validator
function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// GET /api/applications (Admin only, safe search)
router.get('/', requireAuth, async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (status && ['PENDING', 'SHORTLISTED', 'APPROVED', 'REJECTED'].includes(status)) {
      query.status = status;
    }

    if (search && typeof search === 'string' && search.trim()) {
      // Escape special characters to prevent regex injection / ReDoS
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      query.$or = [
        { name: regex },
        { city: regex },
        { email: regex },
        { phone: regex },
        { applicationId: regex }
      ];
    }

    const apps = await Application.find(query).sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    console.error('Failed to query applications:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch applications',
      code: 'SERVER_ERROR'
    });
  }
});

// POST /api/applications (Public contestant audition submission)
router.post('/', async (req, res) => {
  try {
    const name = (req.body.name || '').trim();
    const phone = (req.body.phone || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const city = (req.body.city || '').trim();
    const performanceVideo = (req.body.performanceVideo || req.body.tape || '').trim();
    const shortIntroduction = (req.body.shortIntroduction || req.body.bio || '').trim();
    const instagram = (req.body.instagram || '').trim();
    const youtube = (req.body.youtube || '').trim();
    const experience = (req.body.experience || req.body.exp || '').trim();

    // Field validations
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Full name is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Valid phone number with at least 10 digits is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email address is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!city) {
      return res.status(400).json({
        success: false,
        error: 'City is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!performanceVideo || !isValidUrl(performanceVideo)) {
      return res.status(400).json({
        success: false,
        error: 'Valid performance video URL (YouTube, Drive, or Reel) is required',
        code: 'VALIDATION_ERROR'
      });
    }
    if (!shortIntroduction) {
      return res.status(400).json({
        success: false,
        error: 'Short introduction is required',
        code: 'VALIDATION_ERROR'
      });
    }

    // Duplicate submission check: prevent spamming duplicate pending applications
    const existingPending = await Application.findOne({
      email,
      status: 'PENDING'
    });

    if (existingPending) {
      return res.status(409).json({
        success: false,
        error: 'An application with this email has already been submitted and is currently under review.',
        code: 'DUPLICATE'
      });
    }

    // Generate collision-resistant unique application ID on the server
    const suffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const applicationId = `HOH-2026-${suffix}`;

    const created = await Application.create({
      applicationId,
      name,
      phone,
      email,
      city,
      performanceVideo,
      shortIntroduction,
      instagram,
      youtube,
      experience,
      status: 'PENDING'
    });

    res.status(201).json({
      success: true,
      applicationId: created.applicationId,
      id: created.applicationId,
      application: created
    });
  } catch (err) {
    console.error('Failed to save application to MongoDB:', err.message);
    res.status(500).json({
      success: false,
      error: 'Unable to submit your application. Please try again.',
      code: 'SERVER_ERROR'
    });
  }
});

// PUT /api/applications/:id (Admin only: update status)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const idParam = req.params.id;
    const { status } = req.body;

    if (status && !['PENDING', 'SHORTLISTED', 'APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid application status',
        code: 'VALIDATION_ERROR'
      });
    }

    const updated = await Application.findOneAndUpdate(
      { $or: [{ applicationId: idParam }, { _id: idParam }] },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
        code: 'NOT_FOUND'
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Failed to update application: ' + err.message,
      code: 'SERVER_ERROR'
    });
  }
});

// DELETE /api/applications/:id (Admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const idParam = req.params.id;
    const deleted = await Application.findOneAndDelete({
      $or: [{ applicationId: idParam }, { _id: idParam }]
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
        code: 'NOT_FOUND'
      });
    }

    res.json({ success: true, id: idParam });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete application',
      code: 'SERVER_ERROR'
    });
  }
});

export default router;
