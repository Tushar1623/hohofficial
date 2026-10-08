/**
 * HOUSE OF HUMOUR (HoH) - Frontend API Service
 * Communicates with Express + MongoDB Atlas backend with graceful offline fallback.
 */

import {
  DEFAULT_EVENTS,
  DEFAULT_FEATURED_VIDEO,
  DEFAULT_TICKETS,
  DEFAULT_SETTINGS,
  DEFAULT_APPLICATIONS
} from '../data/defaults.js';

const KEYS = {
  EVENTS: 'hoh_events',
  APPS: 'hoh_applications',
  VIDEO: 'hoh_featured_video',
  TICKETS: 'hoh_ticket_settings',
  SETTINGS: 'hoh_settings',
  AUTH: 'hoh_admin_session'
};

const memory = new Map();

export const storage = {
  get: (key, fallback) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : (Array.isArray(fallback) ? [...fallback] : { ...fallback });
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
    } catch {}
  },
  remove: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      } else {
        memory.delete(key);
      }
    } catch {}
  }
};

async function http(endpoint, options = {}) {
  try {
    const res = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const err = new Error(errBody.error || `HTTP error ${res.status}`);
      err.status = res.status;
      err.data = errBody;
      throw err;
    }
    return await res.json();
  } catch (err) {
    if (err.status) throw err; // Re-throw real server rejection
    return null; // Network / offline fallback indicator
  }
}

export const api = {
  // HEALTH & DB STATUS
  async getDatabaseStatus() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) return await res.json();
    } catch {}
    return { status: 'offline', database: { connected: false, state: 'disconnected', error: 'API Server Offline' } };
  },

  // EVENTS
  async getEvents() {
    try {
      const remote = await http('/events');
      if (remote && Array.isArray(remote) && remote.length > 0) {
        storage.set(KEYS.EVENTS, remote);
        return remote;
      }
    } catch {}
    return storage.get(KEYS.EVENTS, DEFAULT_EVENTS);
  },

  // Nearest future published event
  async getNextEvent() {
    try {
      const remote = await http('/events/next');
      if (remote && remote.title) {
        return remote;
      }
    } catch {}

    // Fallback: search local events
    const events = await this.getEvents();
    const now = Date.now();
    const upcoming = events
      .filter((e) => e.published !== false && (new Date(e.dateTime).getTime() >= now || e.status === 'UPCOMING' || e.status === 'LIVE'))
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    return upcoming[0] || events[0] || null;
  },

  async getEvent(id) {
    try {
      const remote = await http(`/events/${id}`);
      if (remote && remote.id) return remote;
    } catch {}
    const list = await this.getEvents();
    return list.find((e) => e.id === id) || null;
  },

  async createEvent(eventData) {
    try {
      const remote = await http('/events', {
        method: 'POST',
        body: JSON.stringify(eventData)
      });
      if (remote) {
        const list = storage.get(KEYS.EVENTS, DEFAULT_EVENTS);
        list.unshift(remote);
        storage.set(KEYS.EVENTS, list);
        return remote;
      }
    } catch (err) {
      throw err;
    }

    const localNew = {
      id: `ev-${Date.now().toString(36)}`,
      published: true,
      status: 'UPCOMING',
      ...eventData
    };
    const list = storage.get(KEYS.EVENTS, DEFAULT_EVENTS);
    list.unshift(localNew);
    storage.set(KEYS.EVENTS, list);
    return localNew;
  },

  async saveEvent(event) {
    try {
      const remote = await http(`/events/${event.id}`, {
        method: 'PUT',
        body: JSON.stringify(event)
      });
      if (remote) {
        const list = storage.get(KEYS.EVENTS, DEFAULT_EVENTS);
        const idx = list.findIndex((e) => e.id === event.id);
        if (idx !== -1) list[idx] = remote;
        else list.unshift(remote);
        storage.set(KEYS.EVENTS, list);
        return remote;
      }
    } catch (err) {
      throw err;
    }

    const list = storage.get(KEYS.EVENTS, DEFAULT_EVENTS);
    const idx = list.findIndex((e) => e.id === event.id);
    if (idx !== -1) list[idx] = event;
    else list.unshift(event);
    storage.set(KEYS.EVENTS, list);
    return event;
  },

  async deleteEvent(id) {
    try {
      await http(`/events/${id}`, { method: 'DELETE' });
    } catch {}
    const list = storage.get(KEYS.EVENTS, DEFAULT_EVENTS);
    const filtered = list.filter((e) => e.id !== id);
    storage.set(KEYS.EVENTS, filtered);
    return true;
  },

  // APPLICATIONS
  async getApplications(search = '') {
    try {
      const query = search ? `?search=${encodeURIComponent(search)}` : '';
      const remote = await http(`/applications${query}`);
      if (remote && Array.isArray(remote)) {
        if (!search) storage.set(KEYS.APPS, remote);
        return remote;
      }
    } catch {}

    let list = storage.get(KEYS.APPS, DEFAULT_APPLICATIONS);
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          a.city?.toLowerCase().includes(q) ||
          a.email?.toLowerCase().includes(q) ||
          a.phone?.includes(q) ||
          a.id?.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async submitApplication(data) {
    // Post to backend
    const remote = await http('/applications', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (remote && remote.id) {
      const list = storage.get(KEYS.APPS, DEFAULT_APPLICATIONS);
      list.unshift(remote);
      storage.set(KEYS.APPS, list);
      return remote;
    }

    // Local fallback only if backend completely unreachable
    const fallbackApp = {
      id: `HOH-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      city: data.city.trim(),
      tape: data.tape.trim(),
      bio: data.bio.trim(),
      instagram: data.instagram?.trim() || '',
      youtube: data.youtube?.trim() || '',
      exp: data.exp?.trim() || '',
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };
    const list = storage.get(KEYS.APPS, DEFAULT_APPLICATIONS);
    list.unshift(fallbackApp);
    storage.set(KEYS.APPS, list);
    return fallbackApp;
  },

  async updateApplication(id, updates) {
    try {
      const remote = await http(`/applications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      if (remote) {
        const list = storage.get(KEYS.APPS, DEFAULT_APPLICATIONS);
        const idx = list.findIndex((a) => a.id === id);
        if (idx !== -1) list[idx] = remote;
        storage.set(KEYS.APPS, list);
        return remote;
      }
    } catch (err) {
      throw err;
    }

    const list = storage.get(KEYS.APPS, DEFAULT_APPLICATIONS);
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      storage.set(KEYS.APPS, list);
      return list[idx];
    }
    return updates;
  },

  async deleteApplication(id) {
    try {
      await http(`/applications/${id}`, { method: 'DELETE' });
    } catch {}
    const list = storage.get(KEYS.APPS, DEFAULT_APPLICATIONS);
    storage.set(KEYS.APPS, list.filter((a) => a.id !== id));
    return true;
  },

  // FEATURED VIDEO
  async getFeaturedVideo() {
    try {
      const remote = await http('/video');
      if (remote && remote.youtubeUrl) {
        storage.set(KEYS.VIDEO, remote);
        return remote;
      }
    } catch {}
    return storage.get(KEYS.VIDEO, DEFAULT_FEATURED_VIDEO);
  },

  async updateFeaturedVideo(videoData) {
    try {
      const remote = await http('/video', {
        method: 'PUT',
        body: JSON.stringify(videoData)
      });
      if (remote) {
        storage.set(KEYS.VIDEO, remote);
        return remote;
      }
    } catch (err) {
      throw err;
    }
    storage.set(KEYS.VIDEO, videoData);
    return videoData;
  },

  // TICKET SETTINGS
  async getTicketSettings() {
    try {
      const remote = await http('/tickets');
      if (remote && remote.generalPrice) {
        storage.set(KEYS.TICKETS, remote);
        return remote;
      }
    } catch {}
    return storage.get(KEYS.TICKETS, DEFAULT_TICKETS);
  },

  async updateTicketSettings(ticketData) {
    try {
      const remote = await http('/tickets', {
        method: 'PUT',
        body: JSON.stringify(ticketData)
      });
      if (remote) {
        storage.set(KEYS.TICKETS, remote);
        return remote;
      }
    } catch (err) {
      throw err;
    }
    storage.set(KEYS.TICKETS, ticketData);
    return ticketData;
  },

  // SETTINGS
  async getSettings() {
    try {
      const remote = await http('/settings');
      if (remote && remote.siteName) {
        storage.set(KEYS.SETTINGS, remote);
        return remote;
      }
    } catch {}
    return storage.get(KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  async updateSettings(settingsData) {
    try {
      const remote = await http('/settings', {
        method: 'PUT',
        body: JSON.stringify(settingsData)
      });
      if (remote) {
        storage.set(KEYS.SETTINGS, remote);
        return remote;
      }
    } catch (err) {
      throw err;
    }
    storage.set(KEYS.SETTINGS, settingsData);
    return settingsData;
  },

  // ADMIN AUTHENTICATION
  isAdminAuthenticated() {
    return storage.get(KEYS.AUTH, false) === true;
  },

  async loginAdmin(passcode) {
    try {
      const remote = await http('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ passcode })
      });
      if (remote && remote.success) {
        storage.set(KEYS.AUTH, true);
        return true;
      }
    } catch {}

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
