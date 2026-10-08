import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, getDbStatus } from './db.js';
import eventsRouter from './routes/events.js';
import applicationsRouter from './routes/applications.js';
import videoRouter from './routes/video.js';
import ticketsRouter from './routes/tickets.js';
import settingsRouter from './routes/settings.js';
import authRouter from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health status check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: getDbStatus() });
});

// Database check: fail fast if MongoDB is not connected
app.use('/api', (req, res, next) => {
  if (req.path === '/health' || req.path.startsWith('/auth')) return next();
  const db = getDbStatus();
  if (!db.connected) {
    return res.status(503).json({
      error: 'Database connection unavailable',
      details: db.error
    });
  }
  next();
});

// API Routes
app.use('/api/events', eventsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/video', videoRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await connectDB();
});
