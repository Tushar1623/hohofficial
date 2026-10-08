import { Router } from 'express';
import mongoose from 'mongoose';
import Sponsor from '../models/Sponsor.js';
import { requireAuth } from '../middleware/auth.js';
import { requireDatabase } from '../middleware/database.js';

const router = Router();

function buildSponsorIdQuery(idParam) {
  if (idParam && mongoose.Types.ObjectId.isValid(idParam)) {
    return { _id: idParam };
  }
  return { _id: null };
}

// GET /api/sponsors (Public: list active sponsors sorted by sortOrder ASC)
router.get('/', requireDatabase, async (req, res, next) => {
  try {
    const sponsors = await Sponsor.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    res.json(sponsors);
  } catch (err) {
    next(err);
  }
});

// GET /api/sponsors/admin (Admin only: list all sponsors including inactive)
router.get('/admin', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const sponsors = await Sponsor.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json(sponsors);
  } catch (err) {
    next(err);
  }
});

// POST /api/sponsors (Admin only: create sponsor)
router.post('/', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const { name, logo, website, description, isActive, sortOrder } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Sponsor name is required',
        code: 'VALIDATION_ERROR'
      });
    }

    const created = await Sponsor.create({
      name: name.trim(),
      logo: (logo || '').trim(),
      website: (website || '').trim(),
      description: (description || '').trim(),
      isActive: isActive !== false,
      sortOrder: Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PUT /api/sponsors/:id (Admin only: update sponsor)
router.put('/:id', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const idParam = req.params.id;
    const updateData = { ...req.body };

    if (updateData.name !== undefined) {
      if (!updateData.name?.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Sponsor name is required',
          code: 'VALIDATION_ERROR'
        });
      }
      updateData.name = updateData.name.trim();
    }

    if (updateData.logo !== undefined) {
      updateData.logo = (updateData.logo || '').trim();
    }

    if (updateData.website !== undefined) {
      updateData.website = (updateData.website || '').trim();
    }

    if (updateData.description !== undefined) {
      updateData.description = (updateData.description || '').trim();
    }

    if (updateData.sortOrder !== undefined) {
      updateData.sortOrder = Number.isFinite(Number(updateData.sortOrder)) ? Number(updateData.sortOrder) : 0;
    }

    if (updateData.isActive !== undefined) {
      updateData.isActive = Boolean(updateData.isActive);
    }

    const updated = await Sponsor.findOneAndUpdate(
      buildSponsorIdQuery(idParam),
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Sponsor not found',
        code: 'NOT_FOUND'
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/sponsors/:id (Admin only: delete sponsor)
router.delete('/:id', requireAuth, requireDatabase, async (req, res, next) => {
  try {
    const idParam = req.params.id;
    const deleted = await Sponsor.findOneAndDelete(buildSponsorIdQuery(idParam));

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Sponsor not found',
        code: 'NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Sponsor deleted successfully',
      id: idParam
    });
  } catch (err) {
    next(err);
  }
});

export default router;
