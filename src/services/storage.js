/**
 * HOUSE OF HUMOUR (HoH) - Storage Service
 * LocalStorage wrapper with safe JSON serialization, error handling,
 * memory store fallback for SSR/testing, and initial demo data fallbacks.
 * Keeps storage interactions isolated from React components.
 */

import {
  DEFAULT_EVENT,
  FEATURED_VIDEO,
  LATEST_VIDEOS,
  TALENT_ROSTER,
  JURY_GUESTS,
  SPONSORS_LIST,
  INITIAL_SUBMISSIONS
} from '../data/demoData.js';

const STORAGE_KEYS = {
  EVENT: 'hoh_active_event_v2',
  ALL_EVENTS: 'hoh_events_list_v2',
  APPLICATIONS: 'hoh_audition_submissions_v2',
  FEATURED_VIDEO: 'hoh_featured_video_v2',
  VIDEOS: 'hoh_videos_list_v2',
  TALENT: 'hoh_talent_roster_v2',
  GUESTS: 'hoh_jury_guests_v2',
  SPONSORS: 'hoh_sponsors_list_v2',
  SETTINGS: 'hoh_site_settings_v2'
};

const memoryStore = new Map();

const safeGetItem = (key, fallback) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    }
    if (memoryStore.has(key)) {
      return memoryStore.get(key);
    }
    return fallback;
  } catch {
    return fallback;
  }
};

const safeSetItem = (key, value) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    memoryStore.set(key, value);
    return true;
  } catch {
    return false;
  }
};

export const storage = {
  // Active Event
  getEvent: () => safeGetItem(STORAGE_KEYS.EVENT, DEFAULT_EVENT),
  saveEvent: (event) => safeSetItem(STORAGE_KEYS.EVENT, event),

  // All Events
  getEvents: () => {
    const defaultList = [
      DEFAULT_EVENT,
      {
        id: 'ev-mumbai-2026',
        title: 'Mumbai Stand-Up Qualifier',
        date: '18 OCTOBER',
        time: '7:00 PM ONWARDS',
        venue: 'CANVAS LAUGH CLUB',
        city: 'MUMBAI',
        prize: '₹20,000',
        prizeLabel: 'WINNER CASH PURSE',
        genCost: 499,
        vipCost: 799,
        seatsLeft: 34,
        totalCapacity: 120,
        targetEpoch: new Date('2026-10-18T19:00:00+05:30').getTime() || (Date.now() + 18 * 86400000),
        bookingUrl: '',
        announcement: 'MUMBAI QUALIFIER: 18 OCT • CANVAS LAUGH CLUB • ₹20,000 CASH PRIZE',
        urgencyTag: 'ALMOST FULL',
        circuitCities: 'Mumbai, Pune, Goa',
        description: 'West zone comedy clash featuring high-octane crowd work and roast masters.'
      },
      {
        id: 'ev-delhi-2026',
        title: 'Delhi NCR Roast Special',
        date: '28 OCTOBER',
        time: '6:00 PM ONWARDS',
        venue: 'HABITAT CENTRE AUDITORIUM',
        city: 'DELHI NCR',
        prize: '₹25,000',
        prizeLabel: 'WINNER CASH PURSE',
        genCost: 449,
        vipCost: 849,
        seatsLeft: 52,
        totalCapacity: 150,
        targetEpoch: new Date('2026-10-28T18:00:00+05:30').getTime() || (Date.now() + 28 * 86400000),
        bookingUrl: '',
        announcement: 'DELHI NCR ROAST SPECIAL: 28 OCT • ₹25,000 CASH PRIZE',
        urgencyTag: 'EARLY BIRD',
        circuitCities: 'Delhi, Gurgaon, Noida, Chandigarh',
        description: 'North zone comedy battle where no topic is taboo and crowd interaction is relentless.'
      }
    ];
    return safeGetItem(STORAGE_KEYS.ALL_EVENTS, defaultList);
  },
  saveEvents: (events) => safeSetItem(STORAGE_KEYS.ALL_EVENTS, events),

  // Applications
  getApplications: () => safeGetItem(STORAGE_KEYS.APPLICATIONS, INITIAL_SUBMISSIONS),
  saveApplications: (apps) => safeSetItem(STORAGE_KEYS.APPLICATIONS, apps),

  // Videos
  getFeaturedVideo: () => safeGetItem(STORAGE_KEYS.FEATURED_VIDEO, FEATURED_VIDEO),
  saveFeaturedVideo: (video) => safeSetItem(STORAGE_KEYS.FEATURED_VIDEO, video),
  getVideos: () => safeGetItem(STORAGE_KEYS.VIDEOS, LATEST_VIDEOS),
  saveVideos: (videos) => safeSetItem(STORAGE_KEYS.VIDEOS, videos),

  // Talent
  getTalent: () => safeGetItem(STORAGE_KEYS.TALENT, TALENT_ROSTER),
  saveTalent: (talent) => safeSetItem(STORAGE_KEYS.TALENT, talent),

  // Guests
  getGuests: () => safeGetItem(STORAGE_KEYS.GUESTS, JURY_GUESTS),
  saveGuests: (guests) => safeSetItem(STORAGE_KEYS.GUESTS, guests),

  // Sponsors
  getSponsors: () => safeGetItem(STORAGE_KEYS.SPONSORS, SPONSORS_LIST),
  saveSponsors: (sponsors) => safeSetItem(STORAGE_KEYS.SPONSORS, sponsors),

  // Settings
  getSettings: () => {
    const defaultSettings = {
      siteName: 'House of Humour',
      tagline: "India's Biggest Stand-Up Comedy Talent Hunt",
      contactEmail: 'auditions@houseofhumour.in',
      supportPhone: '+91 98301 22345',
      circuitCities: 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune',
      instagramHandle: '@houseofhumour',
      youtubeHandle: '@HouseOfHumourOfficial',
      auditionStatus: 'OPEN',
      maintenanceMode: false
    };
    return safeGetItem(STORAGE_KEYS.SETTINGS, defaultSettings);
  },
  saveSettings: (settings) => safeSetItem(STORAGE_KEYS.SETTINGS, settings)
};
