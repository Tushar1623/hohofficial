import mongoose from 'mongoose';

// Disable query buffering so database-dependent calls fail fast when disconnected
mongoose.set('bufferCommands', false);

let isConnected = false;
let connectionError = null;

// Connection event listeners
mongoose.connection.on('connected', () => {
  isConnected = true;
  connectionError = null;
  console.log('MongoDB connected successfully.');
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  connectionError = err.message;
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('MongoDB disconnected.');
});

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
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    connectionError = null;
    return true;
  } catch (err) {
    isConnected = false;
    connectionError = err.message;
    console.error('Initial MongoDB connection failed:', err.message);
    return false;
  }
}

export function getDbStatus() {
  const ready = mongoose.connection.readyState === 1;
  return {
    connected: ready,
    state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    error: ready ? null : connectionError
  };
}
