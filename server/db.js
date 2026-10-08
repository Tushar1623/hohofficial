import mongoose from 'mongoose';
import { seedDatabaseIfEmpty } from './seed.js';

// Disable buffering so unhandled database queries fail fast when disconnected
mongoose.set('bufferCommands', false);

let isConnected = false;
let connectionError = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    connectionError = 'MONGODB_URI environment variable is missing in .env';
    console.error('❌ MongoDB Error: ' + connectionError);
    return false;
  }

  if (uri.includes('<db_password>') || uri.includes('<password>')) {
    connectionError = 'MongoDB connection URI contains placeholder "<db_password>". Please replace it with your actual MongoDB Atlas database user password in .env';
    console.error('⚠️  ' + connectionError);
    return false;
  }

  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000
    });
    isConnected = true;
    connectionError = null;
    console.log('✅ Connected to MongoDB Atlas successfully!');

    // Check and seed defaults if first time
    await seedDatabaseIfEmpty();
    return true;
  } catch (err) {
    isConnected = false;
    connectionError = err.message;
    console.error('❌ MongoDB Connection Error:', err.message);
    return false;
  }
}

export function getDbStatus() {
  return {
    connected: isConnected && mongoose.connection.readyState === 1,
    state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    error: connectionError
  };
}
