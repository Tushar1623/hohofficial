import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export const Tickets = () => {
  const [tickets, setTickets] = useState({
    generalPrice: 399,
    vipPrice: 699,
    bookingUrl: '',
    availability: 'OPEN'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      setLoading(true);
      const data = await api.getTicketSettings();
      if (data) setTickets(data);
    } catch (err) {
      console.error('Failed to load tickets settings:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      setSaving(true);
      await api.updateTicketSettings({
        ...tickets,
        generalPrice: Number(tickets.generalPrice) || 399,
        vipPrice: Number(tickets.vipPrice) || 699
      });
      setMessage('Ticket settings saved successfully.');
    } catch (err) {
      alert('Failed to save ticket settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Ticket &amp; Pricing Management</h1>
          <p className="admin-page-desc">Configure default pass prices, booking links, and ticket availability flags.</p>
        </div>
      </div>

      {message && (
        <div className="admin-success-box">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="admin-card text-center"><p>Loading ticket settings...</p></div>
      ) : (
        <div className="admin-card" style={{ maxWidth: '640px' }}>
          <form onSubmit={handleSave} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Default General Pass Price (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={tickets.generalPrice}
                  onChange={(e) => setTickets({ ...tickets, generalPrice: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label>Default VIP Pass Price (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={tickets.vipPrice}
                  onChange={(e) => setTickets({ ...tickets, vipPrice: e.target.value })}
                  disabled={saving}
                />
              </div>
            </div>

            <div className="form-group">
              <label>External Ticket Booking URL (Optional)</label>
              <input
                type="url"
                placeholder="https://insider.in/... or BookMyShow (leave blank for WhatsApp reservation)"
                value={tickets.bookingUrl || ''}
                onChange={(e) => setTickets({ ...tickets, bookingUrl: e.target.value })}
                disabled={saving}
              />
              <span className="field-hint">
                When specified, users clicking "BOOK NOW" on the tickets page are directed to this link.
              </span>
            </div>

            <div className="form-group">
              <label>Ticket Availability Status</label>
              <select
                value={tickets.availability}
                onChange={(e) => setTickets({ ...tickets, availability: e.target.value })}
                disabled={saving}
              >
                <option value="OPEN">REGISTRATIONS OPEN</option>
                <option value="FAST_FILLING">FAST FILLING</option>
                <option value="SOLD_OUT">SOLD OUT</option>
                <option value="COMING_SOON">COMING SOON</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'SAVE TICKET SETTINGS'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tickets;
