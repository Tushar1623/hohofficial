import { Router } from 'express';
import Application from '../models/Application.js';

const router = Router();

// GET all applications
router.get('/', async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications: ' + err.message });
  }
});

// POST submit new contestant application
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newApp = {
      id: `#HOH-${randomSuffix}`,
      name: data.name?.trim() || '',
      phone: data.phone?.trim() || '',
      email: data.email?.trim() || '',
      age: data.age || '',
      city: data.city?.trim() || '',
      tape: data.tape?.trim() || data.performanceVideo?.trim() || '',
      bio: data.bio?.trim() || data.shortIntroduction?.trim() || '',
      instagram: data.instagram?.trim() || '',
      youtube: data.youtube?.trim() || '',
      exp: data.exp || data.comedyExperience || 'Audition',
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    const created = await Application.create(newApp);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit application: ' + err.message });
  }
});

// PUT update application status or notes
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
