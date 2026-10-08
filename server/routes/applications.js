import { Router } from 'express';
import Application from '../models/Application.js';
import { requireAuth } from '../middleware/auth.js';
import { requireDatabase } from '../middleware/database.js';
import { generateApplicationId } from '../utils/applicationId.js';
import { validateApplicationInput, escapeRegex, VALID_APPLICATION_STATUSES } from '../utils/validation.js';

const router = Router();

// GET /api/applications (Admin only, safe search)
router.get('/', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (status && VALID_APPLICATION_STATUSES.includes(status)) {
      query.status = status;
    }

    if (search && typeof search === 'string' && search.trim()) {
      const safeSearch = escapeRegex(search);
      const regex = new RegExp(safeSearch, 'i');
      query.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { applicationId: regex },
        { city: regex },
        { status: regex }
      ];
    }

    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    next(err);
  }
});

// GET /api/applications/:id (Admin only: fetch single application)
router.get('/:id', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const idParam = req.params.id;
    const application = await Application.findOne({
      $or: [{ applicationId: idParam }, { _id: idParam }]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
        code: 'NOT_FOUND'
      });
    }

    res.json(application);
  } catch (err) {
    next(err);
  }
});

// POST /api/applications (Public contestant audition submission)
router.post('/', requireDatabase, async (req, res, next) => {
  // 1. Validate request body and extract sanitized fields (Section 9 & 10)
  const { isValid, errors, sanitized } = validateApplicationInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      code: 'VALIDATION_ERROR',
      errors
    });
  }

  try {
    // 2. Prevent duplicate pending applications from the same email
    const existing = await Application.findOne({
      email: sanitized.email,
      status: 'PENDING'
    }).select('applicationId');

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An application with this email address has already been submitted and is currently under review.',
        code: 'DUPLICATE'
      });
    }

    // 3. Generate collision-resistant unique application ID on the backend
    const applicationId = await generateApplicationId();

    // 4. Save using Mongoose and wait for MongoDB confirmation
    const saved = await Application.create({
      applicationId,
      ...sanitized,
      status: 'PENDING'
    });

    // 5. Return confirmed saved applicationId (Section 9)
    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: saved.applicationId,
      id: saved.applicationId,
      data: saved
    });
  } catch (err) {
    console.error('Error saving application to MongoDB:', err.message);
    return res.status(503).json({
      success: false,
      message: 'Application could not be saved.',
      code: 'APPLICATION_SAVE_FAILED'
    });
  }
});

// PATCH & PUT /api/applications/:id (Admin only: update status)
const updateApplicationHandler = async (req, res, next) => {
  try {
    const idParam = req.params.id;
    const { status } = req.body;

    if (status && !VALID_APPLICATION_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid application status: ${status}. Allowed: ${VALID_APPLICATION_STATUSES.join(', ')}`,
        code: 'VALIDATION_ERROR'
      });
    }

    const updated = await Application.findOneAndUpdate(
      { $or: [{ applicationId: idParam }, { _id: idParam }] },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
        code: 'NOT_FOUND'
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

router.patch('/:id', requireAuth, requireDatabase, updateApplicationHandler);
router.put('/:id', requireAuth, requireDatabase, updateApplicationHandler);

// DELETE /api/applications/:id (Admin only: delete application)
router.delete('/:id', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const idParam = req.params.id;
    const deleted = await Application.findOneAndDelete({
      $or: [{ applicationId: idParam }, { _id: idParam }]
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
        code: 'NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully',
      id: idParam
    });
  } catch (err) {
    next(err);
  }
});

export default router;
