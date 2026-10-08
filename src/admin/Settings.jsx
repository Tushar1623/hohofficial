import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'House of Humour',
    tagline: "India's Biggest Stand-Up Comedy Talent Hunt",
    contactNumber: '',
    email: '',
    instagram: '',
    youtube: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await api.getSettings();
      if (data) setSettings(data);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      setSaving(true);
      await api.updateSettings(settings);
      setMessage('Site settings updated successfully.');
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Global Brand &amp; Site Settings</h1>
          <p className="admin-page-desc">Configure brand identity and official contact channels.</p>
        </div>
      </div>

      {message && (
        <div className="admin-success-box">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="admin-card text-center"><p>Loading settings...</p></div>
      ) : (
        <div className="admin-card" style={{ maxWidth: '640px' }}>
          <form onSubmit={handleSave} className="admin-form">
            <div className="form-group">
              <label>Brand Name</label>
              <input
                type="text"
                required
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                disabled={saving}
              />
            </div>

            <div className="form-group">
              <label>Brand Tagline</label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                disabled={saving}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contact Phone / WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98301 22345"
                  value={settings.contactNumber}
                  onChange={(e) => setSettings({ ...settings, contactNumber: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label>Audition Support Email</label>
                <input
                  type="email"
                  required
                  placeholder="auditions@houseofhumour.in"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  disabled={saving}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Instagram URL</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  value={settings.instagram || ''}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label>YouTube Channel URL</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/..."
                  value={settings.youtube || ''}
                  onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                  disabled={saving}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'SAVE SETTINGS'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
