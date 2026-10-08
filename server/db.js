import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

let isConnected = false;
let connectionError = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    connectionError = 'MONGODB_URI environment variable is missing';
    console.error(connectionError);
    return false;
  }

  if (uri.includes('<db_password>') || uri.includes('<password>')) {
    connectionError = 'MongoDB URI contains placeholder <db_password>. Update .env with real credentials.';
    console.error(connectionError);
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    isConnected = true;
    connectionError = null;
    console.log('Connected to MongoDB');
    return true;
  } catch (err) {
    isConnected = false;
    connectionError = err.message;
    console.error('MongoDB connection error:', err.message);
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
