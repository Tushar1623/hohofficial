import { Router } from 'express';
import Application from '../models/Application.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET all applications (Admin only, safe search)
router.get('/', requireAuth, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && typeof search === 'string' && search.trim()) {
      // Escape special regex characters to prevent regex injection
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      query = {
        $or: [
          { name: regex },
          { city: regex },
          { email: regex },
          { phone: regex },
          { id: regex }
        ]
      };
    }

    const apps = await Application.find(query).sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications: ' + err.message });
  }
});

// POST submit contestant application (Public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, city, tape, bio, instagram, youtube, exp } = req.body;

    if (!name?.trim()) return res.status(400).json({ error: 'Name is required' });
    if (!phone?.trim()) return res.status(400).json({ error: 'Phone number is required' });
    if (!email?.trim()) return res.status(400).json({ error: 'Email address is required' });
    if (!city?.trim()) return res.status(400).json({ error: 'City is required' });
    if (!tape?.trim()) return res.status(400).json({ error: 'Performance video URL is required' });
    if (!bio?.trim()) return res.status(400).json({ error: 'Short introduction is required' });

    // Server-generated unique ID based on timestamp
    const uniqueId = `HOH-${Date.now().toString(36).toUpperCase()}`;

    const newApp = {
      id: uniqueId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      tape: tape.trim(),
      bio: bio.trim(),
      instagram: instagram?.trim() || '',
      youtube: youtube?.trim() || '',
      exp: exp?.trim() || '',
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };

    const created = await Application.create(newApp);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save application: ' + err.message });
  }
});

// PUT update application status (Admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await Application.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Application not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update application: ' + err.message });
  }
});

// DELETE application (Admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await Application.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete application: ' + err.message });
  }
});

export default router;
