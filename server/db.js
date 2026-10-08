import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure dotenv is loaded
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Disable Mongoose command buffering so queries fail immediately if disconnected
mongoose.set('bufferCommands', false);

let connectionError = null;

// Track Mongoose connection events (Section 18)
mongoose.connection.on('connected', () => {
  connectionError = null;
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  connectionError = err.message;
  console.error(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

/**
 * Returns clean database status based on mongoose.connection.readyState
 * readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
 */
export function getDatabaseStatus() {
  const state = mongoose.connection.readyState;
  if (state === 1) return 'connected';
  if (state === 2) return 'connecting';
  return 'disconnected';
}

/**
 * Helper returning boolean connection state
 */
export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * Helper returning last connection error message
 */
export function getDbError() {
  return connectionError;
}

/**
 * Extracts and logs safe URI details without credentials (Section 3)
 */
function logSafeUriDetails(uri) {
  try {
    const atIndex = uri.indexOf('@');
    if (atIndex !== -1) {
      const hostPart = uri.slice(atIndex + 1).split('/')[0].split('?')[0];
      console.log('MongoDB URI configured: YES');
      console.log(`MongoDB URI host: ${hostPart}`);
    } else {
      console.log('MongoDB URI configured: YES');
    }
  } catch {
    console.log('MongoDB URI configured: YES');
  }
}

/**
 * Connect to MongoDB Atlas (Section 5)
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || !uri.trim()) {
    connectionError = 'MONGODB_URI is not set in environment';
    console.error(`MongoDB connection failed: ${connectionError}`);
    return false;
  }

  logSafeUriDetails(uri);

  // Check for unpopulated template placeholder password
  const placeholderPatterns = ['<password>', '<db_password>', 'YOUR_PASSWORD', 'PASSWORD'];
  if (placeholderPatterns.some((p) => uri.includes(p))) {
    connectionError = 'MONGODB_URI contains unpopulated placeholder password. Please configure actual MongoDB Atlas credentials in .env.';
    console.error(`MongoDB connection failed: ${connectionError}`);
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
    connectionError = null;
    return true;
  } catch (err) {
    connectionError = err.message;
    console.error(`MongoDB connection failed: ${err.message}`);
    return false;
  }
}

/**
 * Gracefully close database connection
 */
export async function disconnectDB() {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err.message);
  }
}

export default {
  connectDB,
  getDatabaseStatus,
  isDbConnected,
  getDbError,
  disconnectDB
};
