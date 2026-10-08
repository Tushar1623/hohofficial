import Event from './models/Event.js';
import Application from './models/Application.js';
import Video from './models/Video.js';
import Talent from './models/Talent.js';
import Guest from './models/Guest.js';
import Sponsor from './models/Sponsor.js';
import Settings from './models/Settings.js';

import {
  DEFAULT_EVENTS,
  DEFAULT_VIDEOS,
  DEFAULT_TALENT,
  DEFAULT_GUESTS,
  DEFAULT_SPONSORS,
  DEFAULT_APPLICATIONS,
  DEFAULT_SETTINGS
} from '../src/data/defaults.js';

export async function seedDatabaseIfEmpty() {
  try {
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      console.log('Seeding initial Events into MongoDB...');
      await Event.insertMany(DEFAULT_EVENTS);
    }

    const videoCount = await Video.countDocuments();
    if (videoCount === 0) {
      console.log('Seeding initial Videos into MongoDB...');
      await Video.insertMany(DEFAULT_VIDEOS);
    }

    const talentCount = await Talent.countDocuments();
    if (talentCount === 0) {
      console.log('Seeding initial Talent roster into MongoDB...');
      await Talent.insertMany(DEFAULT_TALENT);
    }

    const guestCount = await Guest.countDocuments();
    if (guestCount === 0) {
      console.log('Seeding initial Guests into MongoDB...');
      await Guest.insertMany(DEFAULT_GUESTS);
    }

    const sponsorCount = await Sponsor.countDocuments();
    if (sponsorCount === 0) {
      console.log('Seeding initial Sponsors into MongoDB...');
      await Sponsor.insertMany(DEFAULT_SPONSORS);
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

    console.log('Database verification and seed check completed.');
  } catch (err) {
    console.warn('Seed notice (non-fatal):', err.message);
  }
}
