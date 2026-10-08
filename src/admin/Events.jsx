import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveMsg, setSaveMsg] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setLoading(true);
      const data = await api.getEvents();
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateNew = () => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 14);
    nextDate.setHours(19, 0, 0, 0);

    setEditingEvent({
      id: '',
      title: '',
      city: '',
      venue: '',
      dateTime: nextDate.toISOString().slice(0, 16), // Format for datetime-local
      prize: '₹20,000',
      generalPrice: 399,
      vipPrice: 699,
      bookingUrl: '',
      published: true,
      status: 'UPCOMING',
      description: ''
    });
    setSaveMsg(null);
  };

  const handleEdit = (ev) => {
    // Format ISO string to datetime-local format YYYY-MM-DDTHH:mm
    let dt = '';
    try {
      dt = new Date(ev.dateTime).toISOString().slice(0, 16);
    } catch {
      dt = '';
    }

    setEditingEvent({
      ...ev,
      dateTime: dt
    });
    setSaveMsg(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      if (editingEvent?.id === id) setEditingEvent(null);
    } catch (err) {
      alert('Failed to delete event: ' + err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveMsg(null);

    const payload = {
      ...editingEvent,
      generalPrice: Number(editingEvent.generalPrice) || 399,
      vipPrice: Number(editingEvent.vipPrice) || 699,
      dateTime: new Date(editingEvent.dateTime).toISOString()
    };

    try {
      if (editingEvent.id) {
        await api.updateEvent(editingEvent.id, payload);
      } else {
        await api.createEvent(payload);
      }
      setSaveMsg('Event saved successfully.');
      setEditingEvent(null);
      await loadEvents();
    } catch (err) {
      alert('Failed to save event: ' + err.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Event Management</h1>
          <p className="admin-page-desc">Create and edit tour dates, prize pools, venues, and ticket pricing.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleCreateNew}>
          <span className="material-symbols-outlined">add</span>
          <span>ADD NEW EVENT</span>
        </button>
      </div>

      {saveMsg && (
        <div className="admin-success-box">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Editor Modal / Drawer */}
      {editingEvent && (
        <div className="admin-modal-backdrop" onClick={() => setEditingEvent(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingEvent.id ? 'Edit Event' : 'Create New Event'}</h2>
              <button type="button" className="btn-icon" onClick={() => setEditingEvent(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-form">
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kolkata Chapter Finals"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kolkata"
                    value={editingEvent.city}
                    onChange={(e) => setEditingEvent({ ...editingEvent, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Date &amp; Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={editingEvent.dateTime}
                    onChange={(e) => setEditingEvent({ ...editingEvent, dateTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Venue Name &amp; Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Satire Club, Park Street"
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prize Purse</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹20,000"
                    value={editingEvent.prize}
                    onChange={(e) => setEditingEvent({ ...editingEvent, prize: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="LIVE">LIVE NOW</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>General Ticket Price (₹)</label>
                  <input
                    type="number"
                    value={editingEvent.generalPrice}
                    onChange={(e) => setEditingEvent({ ...editingEvent, generalPrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>VIP Ticket Price (₹)</label>
                  <input
                    type="number"
                    value={editingEvent.vipPrice}
                    onChange={(e) => setEditingEvent({ ...editingEvent, vipPrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Custom Booking URL (Optional)</label>
                <input
                  type="url"
                  placeholder="Leave empty to use default WhatsApp reservation flow"
                  value={editingEvent.bookingUrl}
                  onChange={(e) => setEditingEvent({ ...editingEvent, bookingUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Show highlights and format details..."
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                />
              </div>

              <div className="form-group form-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={editingEvent.published !== false}
                    onChange={(e) => setEditingEvent({ ...editingEvent, published: e.target.checked })}
                  />
                  <span>Published on Public Website</span>
                </label>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingEvent(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events Table / List */}
      {loading ? (
        <div className="admin-card text-center"><p>Loading events...</p></div>
      ) : events.length === 0 ? (
        <div className="admin-card text-center">
          <p>No events found. Click "Add New Event" to create your first event.</p>
        </div>
      ) : (
        <div className="admin-card table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>City &amp; Title</th>
                <th>Date &amp; Time</th>
                <th>Venue</th>
                <th>Status</th>
                <th>Pricing</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td>
                    <strong>{ev.city}</strong>
                    <div style={{ fontSize: '13px', color: 'var(--gray)' }}>{ev.title}</div>
                  </td>
                  <td style={{ fontSize: '13px' }}>
                    {new Date(ev.dateTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ fontSize: '13px' }}>{ev.venue}</td>
                  <td>
                    <span className={`status-pill pill-${ev.status?.toLowerCase()}`}>{ev.status}</span>
                  </td>
                  <td style={{ fontSize: '13px' }}>
                    Gen: ₹{ev.generalPrice} | VIP: ₹{ev.vipPrice}
                  </td>
                  <td>
                    <span style={{ color: ev.published !== false ? 'var(--green, #22c55e)' : 'var(--gray)' }}>
                      {ev.published !== false ? 'YES' : 'NO'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="btn-icon" onClick={() => handleEdit(ev)} title="Edit">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button type="button" className="btn-icon danger" onClick={() => handleDelete(ev.id)} title="Delete">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Events;
