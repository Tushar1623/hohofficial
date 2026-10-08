import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

import { connectDB, getDbStatus } from './db.js';
import eventsRouter from './routes/events.js';
import applicationsRouter from './routes/applications.js';
import videosRouter from './routes/videos.js';
import talentRouter from './routes/talent.js';
import guestsRouter from './routes/guests.js';
import sponsorsRouter from './routes/sponsors.js';
import settingsRouter from './routes/settings.js';
import authRouter from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health / Status Check
app.get('/api/health', (req, res) => {
  const db = getDbStatus();
  res.json({
    status: 'ok',
    service: 'House of Humour API Server',
    database: db
  });
});

// Database readiness check middleware
app.use('/api', (req, res, next) => {
  if (req.path === '/health') return next();
  const db = getDbStatus();
  if (!db.connected) {
    return res.status(503).json({
      error: 'Database unavailable: ' + (db.error || 'Connecting to MongoDB Atlas...'),
      status: 'database_unavailable'
    });
  }
  next();
});

// API Routes
app.use('/api/events', eventsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/videos', videosRouter);
app.use('/api/talent', talentRouter);
app.use('/api/guests', guestsRouter);
app.use('/api/sponsors', sponsorsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/auth', authRouter);

// Start Server and connect Database
app.listen(PORT, async () => {
  console.log(`🚀 HoH API Server running on http://localhost:${PORT}`);
  await connectDB();
});
