import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'House of Humour',
    contactEmail: 'auditions@houseofhumour.in',
    supportPhone: '+91 98301 22345',
    circuitCities: 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune',
    auditionStatus: 'OPEN'
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getSettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>SHOWCASE &amp; CIRCUIT SETTINGS</h3>
            <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Manage contact channels, active cities, and audition state</p>
          </div>
        </div>

        {saved && (
          <div style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', color: '#22c55e', padding: '10px 14px', borderRadius: 'var(--radius)', marginBottom: '16px', fontSize: '13px' }}>
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Brand Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Audition Inbox Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tour Manager Phone</label>
            <input
              type="tel"
              value={settings.supportPhone}
              onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Audition Portal Status</label>
            <select
              value={settings.auditionStatus}
              onChange={(e) => setSettings({ ...settings, auditionStatus: e.target.value })}
              className="form-select"
            >
              <option value="OPEN">OPEN (Accepting Applications)</option>
              <option value="WAITLIST">WAITLIST ONLY</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Active Tour Cities</label>
            <input
              type="text"
              value={settings.circuitCities}
              onChange={(e) => setSettings({ ...settings, circuitCities: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
