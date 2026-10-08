import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import models
import Application from '../server/models/Application.js';
import Event from '../server/models/Event.js';
import FeaturedVideo from '../server/models/FeaturedVideo.js';
import TicketSettings from '../server/models/TicketSettings.js';
import Settings from '../server/models/Settings.js';

// Seed / Dummy identification signatures
const KNOWN_DUMMY_APP_IDS = ['HOH-8420', 'HOH-8421'];
const KNOWN_DUMMY_EVENT_IDS = ['ev-kolkata-2026', 'ev-mumbai-2026', 'ev-delhi-2026'];
const KNOWN_DUMMY_VIDEO_URLS = ['https://www.youtube.com/watch?v=5qap5aO4i9A'];

function isDummyApplication(app) {
  if (KNOWN_DUMMY_APP_IDS.includes(app.id)) return true;
  const name = (app.name || '').toLowerCase();
  const email = (app.email || '').toLowerCase();
  const tape = (app.tape || '').toLowerCase();
  if (name.includes('john doe') || name.includes('jane doe') || name.includes('test user')) return true;
  if (email.includes('@example.com') || email.includes('@test.com') || email === 'arjun@comedy.in' || email === 'ridhima@standup.in') return true;
  if (tape === 'https://youtube.com/watch?v=sample1' || tape === 'https://youtube.com/watch?v=sample2') return true;
  return false;
}

function isDummyEvent(ev) {
  if (KNOWN_DUMMY_EVENT_IDS.includes(ev.id)) return true;
  const title = (ev.title || '').toLowerCase();
  if (title.startsWith('test event') || title.includes('dummy event') || title.includes('sample event')) return true;
  return false;
}

function isDummyVideo(vid) {
  if (KNOWN_DUMMY_VIDEO_URLS.includes(vid.youtubeUrl)) return true;
  if ((vid.title || '').toLowerCase().includes('sample video') || (vid.title || '').toLowerCase().includes('test video')) return true;
  return false;
}

export async function runCleanup(customUriOrPass) {
  let uri = customUriOrPass || process.argv[2] || process.env.MONGODB_URI;

  if (uri && !uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    // Treat as password to replace <db_password>
    const baseUri = process.env.MONGODB_URI || '';
    uri = baseUri.replace('<db_password>', encodeURIComponent(uri)).replace('<password>', encodeURIComponent(uri));
  }

  if (!uri) {
    console.error('❌ MONGODB_URI is not set in environment or .env');
    return { success: false, reason: 'missing_uri' };
  }

  if (uri.includes('<db_password>') || uri.includes('<password>')) {
    console.error('⚠️  MONGODB_URI contains password placeholder <db_password>.');
    return { success: false, reason: 'placeholder_password' };
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log('Connected to MongoDB successfully.');

  // Step 1: Audit all collections
  const allApps = await Application.find().lean();
  const allEvents = await Event.find().lean();
  const allVideos = await FeaturedVideo.find().lean();
  const allTickets = await TicketSettings.find().lean();
  const allSettings = await Settings.find().lean();

  console.log('\n--- COLLECTION AUDIT ---');
  console.log(`Applications: ${allApps.length} records`);
  console.log(`Events: ${allEvents.length} records`);
  console.log(`Featured Videos: ${allVideos.length} records`);
  console.log(`Ticket Settings: ${allTickets.length} records`);
  console.log(`Site Settings: ${allSettings.length} records`);

  // Step 2: Create a complete pre-cleanup backup
  const backupDir = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFilePath = path.join(backupDir, `db-backup-${timestamp}.json`);
  const backupPayload = {
    createdAt: new Date().toISOString(),
    collections: {
      applications: allApps,
      events: allEvents,
      featuredVideos: allVideos,
      ticketSettings: allTickets,
      settings: allSettings
    }
  };

  fs.writeFileSync(backupFilePath, JSON.stringify(backupPayload, null, 2), 'utf-8');
  console.log(`\n💾 Pre-cleanup backup created at: ${backupFilePath}`);

  // Step 3: Classify records
  const dummyApps = allApps.filter(isDummyApplication);
  const realApps = allApps.filter(a => !isDummyApplication(a));

  const dummyEvents = allEvents.filter(isDummyEvent);
  const realEvents = allEvents.filter(e => !isDummyEvent(e));

  const dummyVideos = allVideos.filter(isDummyVideo);
  const realVideos = allVideos.filter(v => !isDummyVideo(v));

  console.log('\n--- CLASSIFICATION SUMMARY ---');
  console.log(`Applications: ${dummyApps.length} dummy / ${realApps.length} real`);
  console.log(`Events: ${dummyEvents.length} dummy / ${realEvents.length} real`);
  console.log(`Featured Videos: ${dummyVideos.length} dummy / ${realVideos.length} real`);

  // Step 4: Perform surgical deletions (only confirmed dummy IDs)
  let deletedCount = 0;

  for (const app of dummyApps) {
    await Application.deleteOne({ _id: app._id });
    console.log(`Deleted dummy application: ${app.id} (${app.name})`);
    deletedCount++;
  }

  for (const ev of dummyEvents) {
    await Event.deleteOne({ _id: ev._id });
    console.log(`Deleted dummy event: ${ev.id} (${ev.title})`);
    deletedCount++;
  }

  for (const vid of dummyVideos) {
    await FeaturedVideo.deleteOne({ _id: vid._id });
    console.log(`Deleted dummy video: ${vid.title}`);
    deletedCount++;
  }

  // Clean Settings if it contains dummy phone or adminPasscode
  for (const s of allSettings) {
    const updates = {};
    if (s.contactNumber === '+91 98301 22345') {
      updates.contactNumber = '';
    }
    if (s.adminPasscode) {
      updates.$unset = { adminPasscode: 1 };
    }
    if (Object.keys(updates).length > 0) {
      await Settings.updateOne({ _id: s._id }, updates);
      console.log('Sanitized Site Settings to remove dummy contact number & adminPasscode.');
    }
  }

  console.log(`\n✅ Cleanup complete. Total dummy records deleted: ${deletedCount}`);
  await mongoose.disconnect();

  return {
    success: true,
    backupFile: backupFilePath,
    deletedCount,
    preserved: {
      applications: realApps.length,
      events: realEvents.length,
      featuredVideos: realVideos.length,
      ticketSettings: allTickets.length,
      settings: allSettings.length
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCleanup()
    .then(res => {
      console.log('Result:', res);
      process.exit(res.success ? 0 : 1);
    })
    .catch(err => {
      console.error('Error during cleanup:', err);
      process.exit(1);
    });
}
