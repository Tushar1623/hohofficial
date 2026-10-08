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

// Load .env reliably from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Configurable CORS origins
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: 'ok',
    database: {
      connected: dbStatus.connected,
      state: dbStatus.state
    }
  });
});

// Database readiness check: fail fast on database-dependent requests if MongoDB is offline
app.use('/api', (req, res, next) => {
  // Allow health checks and authentication to pass through
  if (req.path === '/health' || req.path.startsWith('/auth')) {
    return next();
  }

  const dbStatus = getDbStatus();
  if (!dbStatus.connected) {
    return res.status(503).json({
      success: false,
      error: 'Database connection unavailable',
      code: 'DATABASE_UNAVAILABLE'
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

// Global 404 handler for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    code: 'NOT_FOUND'
  });
});

// Global Express error handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    code: err.code || 'SERVER_ERROR'
  });
});

// Orderly startup: load environment -> connect MongoDB -> verify -> start Express
async function startServer() {
  const uri = process.env.MONGODB_URI;
  const isUriConfigured = Boolean(uri);
  const hasPlaceholder = isUriConfigured && (uri.includes('<password>') || uri.includes('<db_password>'));

  console.log('\n========================================');
  console.log('House of Humour — Backend Server Startup');
  console.log('========================================');
  console.log(`Port: ${PORT}`);
  console.log(`MONGODB_URI configured: ${!isUriConfigured ? 'NO (missing in .env)' : hasPlaceholder ? 'PLACEHOLDER DETECTED (<db_password>)' : 'YES'}`);
  console.log(`ADMIN_PASSWORD configured: ${process.env.ADMIN_PASSWORD ? 'YES' : 'NO'}`);

  console.log('Connecting to MongoDB...');
  const connected = await connectDB();

  if (!connected) {
    console.warn('\n⚠️  MongoDB connection failed.');
    console.warn('   Server cannot start database-dependent application.');
    console.warn('   Running in maintenance mode — health and authentication endpoints active.\n');
  } else {
    console.log('MongoDB connection: CONNECTED\n');
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
