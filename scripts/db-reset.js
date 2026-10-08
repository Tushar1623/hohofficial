import 'dotenv/config';
import mongoose from 'mongoose';
import Application from '../server/models/Application.js';
import Event from '../server/models/Event.js';
import FeaturedVideo from '../server/models/FeaturedVideo.js';
import TicketSettings from '../server/models/TicketSettings.js';
import SiteSettings from '../server/models/SiteSettings.js';
import AdminSession from '../server/models/AdminSession.js';

export async function resetDatabase(customUriOrPass) {
  let uri = customUriOrPass || process.argv[2] || process.env.MONGODB_URI;

  if (uri && !uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    // Treat as password if raw password provided
    const baseUri = process.env.MONGODB_URI || '';
    uri = baseUri.replace('<db_password>', encodeURIComponent(uri)).replace('<password>', encodeURIComponent(uri));
  }

  if (!uri) {
    console.error('❌ MONGODB_URI is not set in environment or .env');
    return { success: false, reason: 'missing_uri' };
  }

  if (uri.includes('<db_password>') || uri.includes('<password>')) {
    console.error('⚠️  MONGODB_URI contains password placeholder <db_password>. Update .env with real credentials.');
    return { success: false, reason: 'placeholder_password' };
  }

  console.log('Connecting to MongoDB for safe reset...');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  const dbName = mongoose.connection.name;
  console.log(`\n========================================`);
  console.log(`TARGET DATABASE TO RESET: [${dbName}]`);
  console.log(`========================================\n`);

  const models = [
    { name: 'applications', model: Application },
    { name: 'events', model: Event },
    { name: 'featured_videos', model: FeaturedVideo },
    { name: 'ticket_settings', model: TicketSettings },
    { name: 'site_settings', model: SiteSettings },
    { name: 'admin_sessions', model: AdminSession }
  ];

  console.log('Clearing HoH application collections...');
  for (const item of models) {
    const countBefore = await item.model.countDocuments();
    await item.model.deleteMany({});
    await item.model.syncIndexes();
    const countAfter = await item.model.countDocuments();
    console.log(`• Collection [${item.name}]: Cleared ${countBefore} records. Remaining: ${countAfter}. Indexes synchronized.`);
  }

  console.log('\n✅ All HoH collections have been reset and are completely empty.');
  console.log('Zero dummy records inserted. The database is in a clean production state.\n');

  await mongoose.disconnect();
  console.log('MongoDB disconnected cleanly.');

  return { success: true, database: dbName };
}

import { fileURLToPath } from 'url';

// Direct execution from command line
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  resetDatabase()
    .then((res) => {
      process.exit(res.success ? 0 : 1);
    })
    .catch((err) => {
      console.error('Reset failed with error:', err.message);
      process.exit(1);
    });
}
