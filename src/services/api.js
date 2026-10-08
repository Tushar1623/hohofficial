function getAuthHeader() {
  const token = sessionStorage.getItem('hoh_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers
  };

  const response = await fetch(`/api${path}`, { ...options, headers });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Public Data
  getNextEvent() {
    return request('/events/next');
  },

  getEvents() {
    return request('/events');
  },

  getFeaturedVideo() {
    return request('/video');
  },

  getTicketSettings() {
    return request('/tickets');
  },

  getSettings() {
    return request('/settings');
  },

  submitApplication(data) {
    return request('/applications', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Admin Events
  createEvent(data) {
    return request('/events', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateEvent(id, data) {
    return request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  deleteEvent(id) {
    return request(`/events/${id}`, {
      method: 'DELETE'
    });
  },

  // Admin Applications
  getApplications(search = '') {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return request(`/applications${query}`);
  },

  updateApplication(id, updates) {
    return request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  deleteApplication(id) {
    return request(`/applications/${id}`, {
      method: 'DELETE'
    });
  },

  // Admin Featured Video
  updateFeaturedVideo(data) {
    return request('/video', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Admin Tickets
  updateTicketSettings(data) {
    return request('/tickets', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Admin Settings
  updateSettings(data) {
    return request('/settings', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Authentication
  async login(password) {
    const result = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password })
    });
    if (result.token) {
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

  isAuthenticated() {
    return Boolean(sessionStorage.getItem('hoh_admin_token'));
  }
};
