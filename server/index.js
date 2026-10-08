import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load environment variables BEFORE accessing process.env (Section 2 & 6)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import app from './app.js';
import { connectDB, getDatabaseStatus } from './db.js';

const PORT = parseInt(process.env.PORT, 10) || 5000;

// 2. Validate environment variables
function validateEnvironment() {
  const missing = [];
  if (!process.env.MONGODB_URI || !process.env.MONGODB_URI.trim()) {
    missing.push('MONGODB_URI');
  }
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_PASSWORD.trim()) {
    missing.push('ADMIN_PASSWORD');
  }

  if (missing.length > 0) {
    console.warn(`[Warning] Missing environment variables: ${missing.join(', ')}`);
  }
}

// 3. Connect MongoDB, then start Express server (Section 6)
async function startServer() {
  validateEnvironment();

  console.log('\n========================================');
  console.log('House of Humour — Backend Server Startup');
  console.log('========================================');

  // Establish connection BEFORE starting server
  const connected = await connectDB();

  if (!connected) {
    console.error('MongoDB connection failed: Database is currently unavailable.');
    console.warn('⚠️  Server starting in degraded mode: database-dependent endpoints will return HTTP 503.');
  }

  app.listen(PORT, () => {
    console.log(`HoH API running on http://localhost:${PORT}`);
    console.log(`Database state: ${getDatabaseStatus().toUpperCase()}\n`);
  });
}

startServer();
