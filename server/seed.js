import Event from './models/Event.js';
import Application from './models/Application.js';
import FeaturedVideo from './models/FeaturedVideo.js';
import TicketSettings from './models/TicketSettings.js';
import Settings from './models/Settings.js';

import {
  DEFAULT_EVENTS,
  DEFAULT_FEATURED_VIDEO,
  DEFAULT_TICKETS,
  DEFAULT_SETTINGS,
  DEFAULT_APPLICATIONS
} from '../src/data/defaults.js';

export async function seedDatabaseIfEmpty() {
  try {
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      console.log('Seeding initial Events into MongoDB...');
      await Event.insertMany(DEFAULT_EVENTS);
    }

    const hasVideo = await FeaturedVideo.findOne({ key: 'featured_video' });
    if (!hasVideo) {
      console.log('Seeding initial Featured Video into MongoDB...');
      await FeaturedVideo.create({ key: 'featured_video', ...DEFAULT_FEATURED_VIDEO });
    }

    const hasTickets = await TicketSettings.findOne({ key: 'ticket_settings' });
    if (!hasTickets) {
      console.log('Seeding initial Ticket Settings into MongoDB...');
      await TicketSettings.create({ key: 'ticket_settings', ...DEFAULT_TICKETS });
    }

    const appCount = await Application.countDocuments();
    if (appCount === 0) {
      console.log('Seeding initial Applications into MongoDB...');
      await Application.insertMany(DEFAULT_APPLICATIONS);
    }

    const hasSettings = await Settings.findOne({ key: 'site_settings' });
    if (!hasSettings) {
      console.log('Seeding initial Settings into MongoDB...');
      await Settings.create({ key: 'site_settings', ...DEFAULT_SETTINGS });
    }

    console.log('✅ HoH database seed check completed.');
  } catch (err) {
    console.warn('Seed notice (non-fatal):', err.message);
  }
}
