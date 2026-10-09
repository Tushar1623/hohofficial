import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { getDatabaseStatus } from './db.js';

import applicationsRouter from './routes/applications.js';
import eventsRouter from './routes/events.js';
import videoRouter from './routes/video.js';
import ticketsRouter from './routes/tickets.js';
import settingsRouter from './routes/settings.js';
import sponsorsRouter from './routes/sponsors.js';
import authRouter from './routes/auth.js';

import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();

// Allowed CORS origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || !process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint (Section 7)
app.get('/api/health', (req, res) => {
  const dbStatus = getDatabaseStatus();
  if (dbStatus === 'connected') {
    return res.status(200).json({
      success: true,
      server: 'ok',
      database: 'connected'
    });
  } else {
    return res.status(503).json({
      success: false,
      server: 'ok',
      database: 'disconnected',
      code: 'DATABASE_UNAVAILABLE'
    });
  }
});

// Mount Routes (Section 4)
app.use('/api/applications', applicationsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/video', videoRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/sponsors', sponsorsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/auth', authRouter);

// 404 Handler for API endpoints — MUST be mounted before static & SPA fallback
app.use('/api', notFound);

// Serve static assets from production Vite build directory (dist)
app.use(express.static(distPath));

// SPA Fallback: serve index.html for all non-API GET routes to support React Router
app.get('{*splat}', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  const indexPath = path.resolve(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  next();
});

// Global Error Handler
app.use(errorHandler);

export default app;
