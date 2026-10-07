/**
 * HOUSE OF HUMOUR (HoH) - API Service Layer
 * Clean asynchronous interface that wraps the underlying storage provider.
 * When the backend (Express + MongoDB) is connected, only this file needs to update its fetch URLs.
 */

import { storage } from './storage.js';

// Helper to simulate network latency if needed (currently minimal for fast UX)
const delay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // EVENTS
  async getEvents() {
    await delay();
    return storage.getEvents();
  },

  async getEvent(id) {
    await delay();
    const list = storage.getEvents();
    return list.find((e) => e.id === id) || storage.getEvent();
  },

  async getActiveEvent() {
    await delay();
    return storage.getEvent();
  },

  async updateActiveEvent(data) {
    await delay();
    const updated = { ...storage.getEvent(), ...data };
    storage.saveEvent(updated);
    // Also update in all events list
    const list = storage.getEvents();
    const idx = list.findIndex((e) => e.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
    } else {
      list.unshift(updated);
    }
    storage.saveEvents(list);
    return updated;
  },

  async createEvent(data) {
    await delay();
    const newEvent = {
      id: `ev-${Date.now().toString(36)}`,
      ...data
    };
    const list = storage.getEvents();
    list.unshift(newEvent);
    storage.saveEvents(list);
    return newEvent;
  },

  // APPLICATIONS / AUDITIONS
  async getApplications() {
    await delay();
    return storage.getApplications();
  },

  async submitApplication(data) {
    await delay(100);
    const existing = storage.getApplications();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newApp = {
      id: `#HOH-${randomNum}`,
      name: data.name || '',
      city: data.city || '',
      phone: data.phone || '',
      email: data.email || '',
      age: data.age || '',
      instagram: data.instagram || '',
      youtube: data.youtube || '',
      exp: data.exp || data.comedyExperience || '',
      tape: data.tape || data.performanceVideo || '',
      bio: data.bio || data.shortIntroduction || '',
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    const updatedList = [newApp, ...existing];
    storage.saveApplications(updatedList);
    return newApp;
  },

  async updateApplication(id, updates) {
    await delay();
    const existing = storage.getApplications();
    const idx = existing.findIndex((app) => app.id === id);
    if (idx === -1) {
      throw new Error(`Application ${id} not found`);
    }
    existing[idx] = { ...existing[idx], ...updates };
    storage.saveApplications(existing);
    return existing[idx];
  },

  async deleteApplication(id) {
    await delay();
    const existing = storage.getApplications();
    const filtered = existing.filter((app) => app.id !== id);
    storage.saveApplications(filtered);
    return { success: true, id };
  },

  // VIDEOS
  async getFeaturedVideo() {
    await delay();
    return storage.getFeaturedVideo();
  },

  async updateFeaturedVideo(data) {
    await delay();
    const updated = { ...storage.getFeaturedVideo(), ...data };
    storage.saveFeaturedVideo(updated);
    return updated;
  },

  async getVideos() {
    await delay();
    return storage.getVideos();
  },

  async addVideo(data) {
    await delay();
    const newVideo = {
      id: `vid-${Date.now().toString(36)}`,
      ...data
    };
    const list = storage.getVideos();
    list.unshift(newVideo);
    storage.saveVideos(list);
    return newVideo;
  },

  async deleteVideo(id) {
    await delay();
    const list = storage.getVideos();
    const filtered = list.filter((v) => v.id !== id);
    storage.saveVideos(filtered);
    return { success: true, id };
  },

  // TALENT
  async getTalent() {
    await delay();
    return storage.getTalent();
  },

  async updateTalent(id, data) {
    await delay();
    const list = storage.getTalent();
    const idx = list.findIndex((t) => t.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...data };
      storage.saveTalent(list);
      return list[idx];
    }
    throw new Error(`Talent ${id} not found`);
  },

  async addTalent(data) {
    await delay();
    const newTalent = {
      id: `talent-${Date.now().toString(36)}`,
      rank: `#${storage.getTalent().length + 1}`,
      ...data
    };
    const list = storage.getTalent();
    list.push(newTalent);
    storage.saveTalent(list);
    return newTalent;
  },

  async deleteTalent(id) {
    await delay();
    const list = storage.getTalent();
    const filtered = list.filter((t) => t.id !== id);
    storage.saveTalent(filtered);
    return { success: true, id };
  },

  // GUESTS
  async getGuests() {
    await delay();
    return storage.getGuests();
  },

  async updateGuests(guestsList) {
    await delay();
    storage.saveGuests(guestsList);
    return guestsList;
  },

  // SPONSORS
  async getSponsors() {
    await delay();
    return storage.getSponsors();
  },

  async updateSponsors(sponsorsList) {
    await delay();
    storage.saveSponsors(sponsorsList);
    return sponsorsList;
  },

  // SETTINGS
  async getSettings() {
    await delay();
    return storage.getSettings();
  },

  async updateSettings(data) {
    await delay();
    const updated = { ...storage.getSettings(), ...data };
    storage.saveSettings(updated);
    return updated;
  }
};
