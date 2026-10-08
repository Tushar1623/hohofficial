import { Router } from 'express';
import Application from '../models/Application.js';

const router = Router();

// GET all applications with optional search
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && search.trim()) {
      const term = search.trim();
      const regex = new RegExp(term, 'i');
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

// POST submit contestant application
router.post('/', async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.name?.trim() || !data.phone?.trim() || !data.email?.trim() || !data.city?.trim() || !data.tape?.trim() || !data.bio?.trim()) {
      return res.status(400).json({ error: 'Please fill in all required fields: Name, Phone, Email, City, Performance Video, and Short Introduction.' });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newApp = {
      id: `HOH-${randomSuffix}`,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      city: data.city.trim(),
      tape: data.tape.trim(),
      bio: data.bio.trim(),
      instagram: data.instagram?.trim() || '',
      youtube: data.youtube?.trim() || '',
      exp: data.exp?.trim() || '',
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };

    const created = await Application.create(newApp);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit application: ' + err.message });
  }
});

// PUT update status or details
router.put('/:id', async (req, res) => {
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

// DELETE application
router.delete('/:id', async (req, res) => {
  try {
    await Application.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete application: ' + err.message });
  }
});

export default router;
