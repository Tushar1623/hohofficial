import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import Application from '../models/Application.js';
import Event from '../models/Event.js';
import FeaturedVideo from '../models/FeaturedVideo.js';
import TicketSettings from '../models/TicketSettings.js';
import SiteSettings from '../models/SiteSettings.js';
import AdminSession from '../models/AdminSession.js';

function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function resetDatabase() {
  console.log('\n=============================================');
  console.log('House of Humour — Database Reset Script');
  console.log('=============================================\n');

  const uri = process.env.MONGODB_URI;
  if (!uri || !uri.trim()) {
    console.error('Error: MONGODB_URI is not configured in .env');
    process.exit(1);
  }

  // 1. Ask for explicit user confirmation
  const confirmation = await askConfirmation(
    'WARNING: This will permanently delete ALL data from HoH collections.\nAre you sure you want to proceed? Type "yes" to confirm: '
  );

  if (confirmation !== 'yes') {
    console.log('Reset aborted. No collections were modified.\n');
    process.exit(0);
  }

  // 2. Connect to MongoDB
  try {
    console.log('\nConnecting to MongoDB...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB.\n');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }

  // 3. Delete only HoH collections and report counts
  try {
    console.log('Deleting data from HoH collections...');

    const appResult = await Application.deleteMany({});
    console.log(`- Applications deleted: ${appResult.deletedCount}`);

    const eventResult = await Event.deleteMany({});
    console.log(`- Events deleted: ${eventResult.deletedCount}`);

    const videoResult = await FeaturedVideo.deleteMany({});
    console.log(`- Featured Videos deleted: ${videoResult.deletedCount}`);

    const ticketResult = await TicketSettings.deleteMany({});
    console.log(`- Ticket Settings deleted: ${ticketResult.deletedCount}`);

    const siteResult = await SiteSettings.deleteMany({});
    console.log(`- Site Settings deleted: ${siteResult.deletedCount}`);

    const sessionResult = await AdminSession.deleteMany({});
    console.log(`- Admin Sessions deleted: ${sessionResult.deletedCount}`);

    console.log('\n✅ Database reset complete. All HoH collections are now clean and empty.');
  } catch (err) {
    console.error('\nError during reset:', err.message);
  } finally {
    // 5. Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.\n');
  }
}

resetDatabase();
