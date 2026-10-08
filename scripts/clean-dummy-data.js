import 'dotenv/config';
import mongoose from 'mongoose';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Import Mongoose models
import Application from '../server/models/Application.js';
import Event from '../server/models/Event.js';
import FeaturedVideo from '../server/models/FeaturedVideo.js';
import TicketSettings from '../server/models/TicketSettings.js';
import SiteSettings from '../server/models/SiteSettings.js';
import AdminSession from '../server/models/AdminSession.js';

// Signatures of known synthetic/seed records
const DUMMY_APPLICATION_IDS = ['HOH-8420', 'HOH-8421'];
const DUMMY_EMAILS = ['arjun@comedy.in', 'ridhima@standup.in'];
const DUMMY_TAPES = ['https://youtube.com/watch?v=sample1', 'https://youtube.com/watch?v=sample2'];
const DUMMY_EVENT_IDS = ['ev-kolkata-2026', 'ev-mumbai-2026', 'ev-delhi-2026'];
const DUMMY_VIDEO_URLS = ['https://www.youtube.com/watch?v=5qap5aO4i9A'];

function classifyApplication(app) {
  const appId = (app.applicationId || app.id || '').toUpperCase();
  const name = (app.name || '').toLowerCase();
  const email = (app.email || '').toLowerCase();
  const tape = (app.performanceVideo || app.tape || '').toLowerCase();

  if (DUMMY_APPLICATION_IDS.includes(appId)) return 'Known seed application ID';
  if (DUMMY_EMAILS.includes(email)) return 'Known seed applicant email';
  if (DUMMY_TAPES.includes(tape)) return 'Known sample performance video URL';
  if (name.includes('john doe') || name.includes('jane doe') || name.includes('test user')) return 'Placeholder name';
  if (email.endsWith('@example.com') || email.endsWith('@test.com') || email.includes('test@')) return 'Test domain email';
  if (tape.includes('sample1') || tape.includes('sample2')) return 'Sample video placeholder';

  return null; // Genuine record
}

function classifyEvent(ev) {
  const eventId = ev.eventId || ev.id || '';
  const title = (ev.title || '').toLowerCase();

  if (DUMMY_EVENT_IDS.includes(eventId)) return 'Known seed event ID';
  if (title === 'kolkata chapter finals' || title === 'mumbai stand-up qualifier' || title === 'delhi ncr roast special') return 'Known seed event title';
  if (title.startsWith('test event') || title.includes('dummy event') || title.includes('sample event')) return 'Test event title';

  return null; // Genuine record
}

function classifyVideo(vid) {
  const url = vid.youtubeUrl || '';
  const title = (vid.title || '').toLowerCase();

  if (DUMMY_VIDEO_URLS.includes(url)) return 'Known template placeholder video URL';
  if (title.includes('test video') || title.includes('sample video')) return 'Test video title';

  return null; // Genuine record
}

function classifyTicketSettings(ticket) {
  // If tickets have no bookingUrl and match exact placeholder defaults
  if (!ticket.bookingUrl && ticket.generalPrice === 399 && ticket.vipPrice === 699) {
    return 'Default unconfigured placeholder pricing';
  }
  return null;
}

function askConfirmation(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim().toLowerCase());
    });
  });
}

export async function runCleanup() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run') || args.includes('-d');
  const nonFlagArgs = args.filter((a) => !a.startsWith('-'));

  let uri = nonFlagArgs[0] || process.env.MONGODB_URI;

  if (uri && !uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    // Passed password as CLI argument
    const baseUri = process.env.MONGODB_URI || '';
    uri = baseUri.replace('<db_password>', encodeURIComponent(uri)).replace('<password>', encodeURIComponent(uri));
  }

  if (!uri) {
    console.error('❌ MONGODB_URI is not configured in .env or arguments.');
    return { success: false, reason: 'missing_uri' };
  }

  if (uri.includes('<db_password>') || uri.includes('<password>')) {
    console.error('\n⚠️  MongoDB connection string in .env contains placeholder "<db_password>".');
    console.error('   Please provide your MongoDB Atlas password to connect:');
    console.error('   node scripts/clean-dummy-data.js <your_db_password>\n');
    return { success: false, reason: 'placeholder_password' };
  }

  console.log(`\n========================================`);
  console.log(`HOH MONGODB DUMMY DATA CLEANUP ${isDryRun ? '[DRY-RUN MODE]' : '[LIVE MODE]'}`);
  console.log(`========================================\n`);

  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    return { success: false, error: err.message };
  }

  const dbName = mongoose.connection.name;
  console.log(`✅ Connected successfully to database: [${dbName}]\n`);

  // Query all collections
  const applications = await Application.find();
  const events = await Event.find();
  const videos = await FeaturedVideo.find();
  const tickets = await TicketSettings.find();
  const settings = await SiteSettings.find();
  const sessions = await AdminSession.find();

  // Classify records
  const toDeleteApps = [];
  applications.forEach((a) => {
    const reason = classifyApplication(a);
    if (reason) toDeleteApps.push({ doc: a, reason });
  });

  const toDeleteEvents = [];
  events.forEach((e) => {
    const reason = classifyEvent(e);
    if (reason) toDeleteEvents.push({ doc: e, reason });
  });

  const toDeleteVideos = [];
  videos.forEach((v) => {
    const reason = classifyVideo(v);
    if (reason) toDeleteVideos.push({ doc: v, reason });
  });

  const toDeleteTickets = [];
  tickets.forEach((t) => {
    const reason = classifyTicketSettings(t);
    if (reason) toDeleteTickets.push({ doc: t, reason });
  });

  const now = new Date();
  const toDeleteSessions = sessions.filter((s) => s.expiresAt < now);

  // Settings hygiene: check placeholder contact phone
  const settingsToSanitize = settings.filter((s) => s.contactNumber === '+91 98301 22345');

  console.log('RECORDS AUDIT:');
  console.log(`• Applications:     ${applications.length} total | ${toDeleteApps.length} dummy detected | ${applications.length - toDeleteApps.length} genuine to keep`);
  console.log(`• Events:           ${events.length} total | ${toDeleteEvents.length} dummy detected | ${events.length - toDeleteEvents.length} genuine to keep`);
  console.log(`• Featured Videos:  ${videos.length} total | ${toDeleteVideos.length} dummy detected | ${videos.length - toDeleteVideos.length} genuine to keep`);
  console.log(`• Ticket Settings:  ${tickets.length} total | ${toDeleteTickets.length} placeholder detected | ${tickets.length - toDeleteTickets.length} genuine to keep`);
  console.log(`• Site Settings:    ${settings.length} total | ${settingsToSanitize.length} needing phone sanitization`);
  console.log(`• Admin Sessions:   ${sessions.length} total | ${toDeleteSessions.length} expired to prune\n`);

  if (toDeleteApps.length > 0) {
    console.log('--- DUMMY APPLICATIONS TO REMOVE ---');
    toDeleteApps.forEach(({ doc, reason }) => {
      console.log(`  [ID: ${doc.applicationId || doc.id}] ${doc.name} (${doc.email}) — Reason: ${reason}`);
    });
    console.log('');
  }

  if (toDeleteEvents.length > 0) {
    console.log('--- DUMMY EVENTS TO REMOVE ---');
    toDeleteEvents.forEach(({ doc, reason }) => {
      console.log(`  [ID: ${doc.eventId || doc.id}] "${doc.title}" in ${doc.city} — Reason: ${reason}`);
    });
    console.log('');
  }

  if (toDeleteVideos.length > 0) {
    console.log('--- DUMMY VIDEOS TO REMOVE ---');
    toDeleteVideos.forEach(({ doc, reason }) => {
      console.log(`  "${doc.title}" (${doc.youtubeUrl}) — Reason: ${reason}`);
    });
    console.log('');
  }

  const totalToDelete = toDeleteApps.length + toDeleteEvents.length + toDeleteVideos.length + toDeleteTickets.length + toDeleteSessions.length;

  if (totalToDelete === 0 && settingsToSanitize.length === 0) {
    console.log('🎉 No dummy or test records found! The database is already clean.');
    await mongoose.disconnect();
    return { success: true, deleted: 0 };
  }

  if (isDryRun) {
    console.log(`[DRY-RUN] ${totalToDelete} dummy/placeholder records would be deleted.`);
    console.log('[DRY-RUN] No records were modified or deleted.');
    await mongoose.disconnect();
    return { success: true, dryRun: true, wouldDelete: totalToDelete };
  }

  // Live mode: Ask for explicit user confirmation unless --yes flag passed
  const autoConfirm = args.includes('--yes') || args.includes('-y');
  if (!autoConfirm) {
    const answer = await askConfirmation(`Are you sure you want to permanently delete these ${totalToDelete} dummy records? (yes/no): `);
    if (answer !== 'yes' && answer !== 'y') {
      console.log('\n❌ Operation cancelled by user. Nothing was deleted.');
      await mongoose.disconnect();
      return { success: false, reason: 'cancelled_by_user' };
    }
  }

  console.log('\nPerforming targeted deletions...');

  // Delete applications
  for (const { doc } of toDeleteApps) {
    await Application.deleteOne({ _id: doc._id });
  }

  // Delete events
  for (const { doc } of toDeleteEvents) {
    await Event.deleteOne({ _id: doc._id });
  }

  // Delete videos
  for (const { doc } of toDeleteVideos) {
    await FeaturedVideo.deleteOne({ _id: doc._id });
  }

  // Delete tickets
  for (const { doc } of toDeleteTickets) {
    await TicketSettings.deleteOne({ _id: doc._id });
  }

  // Delete expired sessions
  for (const s of toDeleteSessions) {
    await AdminSession.deleteOne({ _id: s._id });
  }

  // Sanitize site settings placeholder phone
  for (const s of settingsToSanitize) {
    await SiteSettings.updateOne({ _id: s._id }, { $set: { contactNumber: '' } });
  }

  console.log('\n✅ Targeted cleanup complete:');
  console.log(`• Deleted ${toDeleteApps.length} dummy applications`);
  console.log(`• Deleted ${toDeleteEvents.length} dummy events`);
  console.log(`• Deleted ${toDeleteVideos.length} dummy videos`);
  console.log(`• Deleted ${toDeleteTickets.length} placeholder ticket records`);
  console.log(`• Pruned ${toDeleteSessions.length} expired admin sessions`);
  if (settingsToSanitize.length > 0) {
    console.log(`• Sanitized placeholder contact number in Site Settings`);
  }

  await mongoose.disconnect();
  console.log('\nDatabase connection closed cleanly.');
  return {
    success: true,
    deleted: totalToDelete,
    preserved: {
      applications: applications.length - toDeleteApps.length,
      events: events.length - toDeleteEvents.length,
      videos: videos.length - toDeleteVideos.length,
      tickets: tickets.length - toDeleteTickets.length,
      settings: settings.length
    }
  };
}

// Direct execution from CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  runCleanup()
    .then((res) => {
      process.exit(res.success ? 0 : 1);
    })
    .catch((err) => {
      console.error('Cleanup execution failed:', err);
      process.exit(1);
    });
}
