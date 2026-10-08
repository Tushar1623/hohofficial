/**
 * HOUSE OF HUMOUR (HoH) - Service Layer
 * Clean async API interface with simple storage persistence.
 * Ready for drop-in Express + MongoDB backend swap in Phase 3.
 */

import {
  DEFAULT_EVENTS,
  DEFAULT_VIDEOS,
  DEFAULT_TALENT,
  DEFAULT_GUESTS,
  DEFAULT_SPONSORS,
  DEFAULT_APPLICATIONS,
  DEFAULT_SETTINGS
} from '../data/defaults.js';

// Simple storage helper
const memory = new Map();

export const storage = {
  get: (key, fallback) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      }
      return memory.has(key) ? memory.get(key) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, val) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(val));
      } else {
        memory.set(key, val);
      }
    } catch { }
  },
  remove: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      } else {
        memory.delete(key);
      }
    } catch { }
  }
};

const KEYS = {
  EVENTS: 'hoh_events',
  APPS: 'hoh_applications',
  VIDEOS: 'hoh_videos',
  TALENT: 'hoh_talent',
  GUESTS: 'hoh_guests',
  SPONSORS: 'hoh_sponsors',
  SETTINGS: 'hoh_settings',
  AUTH: 'hoh_admin_auth'
};

export const api = {
  // EVENTS
  async getEvents() {
    return storage.get(KEYS.EVENTS, DEFAULT_EVENTS);
  },

  async getEvent(id) {
    const events = await this.getEvents();
    return events.find((e) => e.id === id) || null;
  },

  // Automatically selects nearest upcoming published event (Phase 14)
  async getNearestUpcomingEvent() {
    const events = await this.getEvents();
    const now = Date.now();
    const upcoming = events
      .filter((e) => (e.published !== false) && (!e.targetEpoch || e.targetEpoch >= now - (4 * 3600000))) // within 4h of event or future
      .sort((a, b) => (a.targetEpoch || 0) - (b.targetEpoch || 0));

    return upcoming[0] || null;
  },

  async saveEvent(updatedEvent) {
    const list = await this.getEvents();
    const idx = list.findIndex((e) => e.id === updatedEvent.id);
    if (idx !== -1) {
      list[idx] = updatedEvent;
    } else {
      list.unshift(updatedEvent);
    }
    storage.set(KEYS.EVENTS, list);
    return updatedEvent;
  },

  async createEvent(eventData) {
    const list = await this.getEvents();
    const newEvent = {
      id: `ev-${Date.now().toString(36)}`,
      published: true,
      ...eventData
    };
    list.unshift(newEvent);
    storage.set(KEYS.EVENTS, list);
    return newEvent;
  },

  async deleteEvent(id) {
    const list = await this.getEvents();
    const filtered = list.filter((e) => e.id !== id);
    storage.set(KEYS.EVENTS, filtered);
    return true;
  },

  // APPLICATIONS
  async getApplications() {
    return storage.get(KEYS.APPS, DEFAULT_APPLICATIONS);
  },

  async submitApplication(data) {
    const list = await this.getApplications();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newApp = {
      id: `#HOH-${randomSuffix}`,
      name: data.name?.trim() || '',
      phone: data.phone?.trim() || '',
      email: data.email?.trim() || '',
      age: data.age || '',
      city: data.city?.trim() || '',
      tape: data.tape?.trim() || data.performanceVideo?.trim() || '',
      bio: data.bio?.trim() || data.shortIntroduction?.trim() || '',
      instagram: data.instagram?.trim() || '',
      youtube: data.youtube?.trim() || '',
      exp: data.exp || data.comedyExperience || 'Audition',
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    list.unshift(newApp);
    storage.set(KEYS.APPS, list);
    return newApp;
  },

  async updateApplication(id, updates) {
    const list = await this.getApplications();
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      storage.set(KEYS.APPS, list);
      return list[idx];
    }
    throw new Error('Application not found');
  },

  async deleteApplication(id) {
    const list = await this.getApplications();
    const filtered = list.filter((a) => a.id !== id);
    storage.set(KEYS.APPS, filtered);
    return true;
  },

  // VIDEOS
  async getVideos() {
    return storage.get(KEYS.VIDEOS, DEFAULT_VIDEOS);
  },

  async addVideo(videoData) {
    const list = await this.getVideos();
    const newVideo = {
      id: `vid-${Date.now().toString(36)}`,
      ...videoData
    };
    list.unshift(newVideo);
    storage.set(KEYS.VIDEOS, list);
    return newVideo;
  },

  async deleteVideo(id) {
    const list = await this.getVideos();
    storage.set(KEYS.VIDEOS, list.filter((v) => v.id !== id));
    return true;
  },

  // TALENT
  async getTalent() {
    return storage.get(KEYS.TALENT, DEFAULT_TALENT);
  },

  async saveTalent(talentList) {
    storage.set(KEYS.TALENT, talentList);
    return talentList;
  },

  // GUESTS
  async getGuests() {
    return storage.get(KEYS.GUESTS, DEFAULT_GUESTS);
  },

  async saveGuests(guestsList) {
    storage.set(KEYS.GUESTS, guestsList);
    return guestsList;
  },

  // SPONSORS
  async getSponsors() {
    return storage.get(KEYS.SPONSORS, DEFAULT_SPONSORS);
  },

  async saveSponsors(sponsorsList) {
    storage.set(KEYS.SPONSORS, sponsorsList);
    return sponsorsList;
  },

  // SETTINGS
  async getSettings() {
    return storage.get(KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  async saveSettings(settingsData) {
    storage.set(KEYS.SETTINGS, settingsData);
    return settingsData;
  },

  // SIMPLE ADMIN AUTH
  isAdminAuthenticated() {
    return storage.get(KEYS.AUTH, false) === true;
  },

  loginAdmin(passcode) {
    // Simple admin passcode (default: hoh2026 or admin)
    if (passcode === 'hoh2026' || passcode === 'admin') {
      storage.set(KEYS.AUTH, true);
      return true;
    }
    return false;
  },

  logoutAdmin() {
    storage.remove(KEYS.AUTH);
  }
};
