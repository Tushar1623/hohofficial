const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = sessionStorage.getItem('hoh_admin_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.code = data?.code;
    throw err;
  }

  return data;
}

export const api = {
  // Public Events
  getNextEvent() {
    return request('/events/next');
  },

  getEvents() {
    return request('/events');
  },

  // Public Featured Video
  getFeaturedVideo() {
    return request('/video');
  },

  // Public Ticket Settings
  getTicketSettings() {
    return request('/tickets');
  },
  getTickets() {
    return request('/tickets');
  },

  // Public Site Settings
  getSettings() {
    return request('/settings');
  },

  // Public Sponsors
  getSponsors() {
    return request('/sponsors');
  },

  // Public Contestant Application
  submitApplication(formData) {
    return request('/applications', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },

  // Admin Events
  createEvent(eventData) {
    return request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  },

  updateEvent(id, eventData) {
    return request(`/events/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    });
  },

  deleteEvent(id) {
    return request(`/events/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  },

  // Admin Applications
  getApplications(search = '') {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return request(`/applications${query}`);
  },

  updateApplication(id, appData) {
    return request(`/applications/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(appData)
    });
  },

  deleteApplication(id) {
    return request(`/applications/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  },

  // Admin Featured Video
  updateFeaturedVideo(videoData) {
    return request('/video', {
      method: 'PUT',
      body: JSON.stringify(videoData)
    });
  },

  // Admin Tickets
  updateTicketSettings(ticketData) {
    return request('/tickets', {
      method: 'PUT',
      body: JSON.stringify(ticketData)
    });
  },
  updateTickets(ticketData) {
    return request('/tickets', {
      method: 'PUT',
      body: JSON.stringify(ticketData)
    });
  },

  // Admin Sponsors
  getAdminSponsors() {
    return request('/sponsors/admin');
  },

  createSponsor(sponsorData) {
    return request('/sponsors', {
      method: 'POST',
      body: JSON.stringify(sponsorData)
    });
  },

  updateSponsor(id, sponsorData) {
    return request(`/sponsors/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(sponsorData)
    });
  },

  deleteSponsor(id) {
    return request(`/sponsors/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  },

  // Admin Settings
  updateSettings(settingsData) {
    return request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData)
    });
  },

  // Authentication
  async login(password) {
    const result = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password })
    });
    if (result?.token) {
      sessionStorage.setItem('hoh_admin_token', result.token);
      return true;
    }
    return false;
  },

  async logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    } finally {
      sessionStorage.removeItem('hoh_admin_token');
    }
  },

  async verifyAuth() {
    try {
      const res = await request('/auth/verify');
      return Boolean(res?.authenticated);
    } catch {
      return false;
    }
  },

  isAuthenticated() {
    return Boolean(sessionStorage.getItem('hoh_admin_token'));
  }
};

export default api;
