import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Settings = () => {
  const { settings, updateSettings, showToast } = useApp();

  const [form, setForm] = useState({
    siteName: settings?.siteName || 'House of Humour',
    tagline: settings?.tagline || "India's Biggest Stand-Up Comedy Talent Hunt",
    contactEmail: settings?.contactEmail || 'auditions@houseofhumour.in',
    supportPhone: settings?.supportPhone || '+91 98301 22345',
    circuitCities: settings?.circuitCities || 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune',
    auditionStatus: settings?.auditionStatus || 'OPEN'
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-settings-view">
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>GLOBAL SHOWCASE &amp; PORTAL CONFIGURATION</h3>
            <p>Manage tour circuits, contact endpoints, and registration status.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">ORGANIZATION / BRAND NAME</label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">OFFICIAL TAGLINE</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">EDITORIAL INBOX EMAIL</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">STAGE MANAGER PHONE</label>
            <input
              type="tel"
              value={form.supportPhone}
              onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">ACTIVE CIRCUIT CITIES</label>
            <input
              type="text"
              value={form.circuitCities}
              onChange={(e) => setForm({ ...form, circuitCities: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">AUDITION REGISTRATION PORTAL STATUS</label>
            <select
              value={form.auditionStatus}
              onChange={(e) => setForm({ ...form, auditionStatus: e.target.value })}
              className="form-select"
            >
              <option value="OPEN">OPEN (Accepting Applications)</option>
              <option value="WAITLIST">WAITLIST ONLY</option>
              <option value="CLOSED">CLOSED (Auditions Suspended)</option>
            </select>
          </div>

          <div className="form-group form-full">
            <button
              type="submit"
              className="btn-action-primary"
              disabled={saving}
            >
              <span className="material-symbols-outlined">save</span>
              <span>{saving ? 'SAVING CONFIGURATION...' : 'SAVE GLOBAL SETTINGS'}</span>
            </button>
          </div>
        </form>
      </div>

      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>DEVELOPER &amp; BACKEND INTEGRATION READINESS</h3>
            <p>Phase 3 &amp; 4 Architecture Specifications</p>
          </div>
        </div>
        <div style={{ background: '#090909', padding: '16px', borderRadius: '6px', fontSize: '13px', lineHeight: '1.7', color: '#AAA' }}>
          <p>
            <strong style={{ color: '#FFF' }}>Current Mode:</strong> React Service Abstraction via <code>src/services/api.js</code> wrapping <code>src/services/storage.js</code>.
          </p>
          <p>
            <strong style={{ color: '#FFF' }}>Express API Endpoints:</strong> Ready for <code>/api/events</code>, <code>/api/applications</code>, <code>/api/videos</code>, <code>/api/talent</code>, <code>/api/settings</code>. Zero component rewrites will be required when connecting to Node/Express/MongoDB in Phase 3.
          </p>
        </div>
      </div>
    </div>
  );
};
