import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const list = await api.getEvents();
    setEvents(list);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingEvent.title || !editingEvent.city) return;

    if (editingEvent.id) {
      await api.saveEvent(editingEvent);
    } else {
      await api.createEvent(editingEvent);
    }
    setEditingEvent(null);
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event?')) {
      await api.deleteEvent(id);
      load();
    }
  };

  const startNew = () => {
    setEditingEvent({
      title: '',
      city: '',
      date: '',
      time: '6:30 PM ONWARDS',
      venue: '',
      prize: '₹15,000',
      genCost: 399,
      vipCost: 699,
      seatsLeft: 50,
      totalCapacity: 100,
      description: '',
      published: true
    });
  };

  return (
    <div>
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>TOUR EVENTS ({events.length})</h3>
            <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Manage tour chapters, ticket prices, and show dates</p>
          </div>
          <button type="button" className="btn btn-primary btn-sm" onClick={startNew}>
            + Add New Chapter
          </button>
        </div>

        {/* Edit / Create Form */}
        {editingEvent && (
          <form onSubmit={handleSave} style={{ background: '#0A0A0A', border: '1px solid var(--orange)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFF', marginBottom: '16px' }}>
              {editingEvent.id ? 'EDIT EVENT' : 'CREATE NEW EVENT'}
            </h4>

            <div className="form-row form-row-2">
              <div className="form-group">
                <label className="form-label">Event Title *</label>
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  value={editingEvent.city}
                  onChange={(e) => setEditingEvent({ ...editingEvent, city: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row form-row-2">
              <div className="form-group">
                <label className="form-label">Display Date *</label>
                <input
                  type="text"
                  placeholder="e.g. 24 OCTOBER 2026"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Venue Name *</label>
                <input
                  type="text"
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row form-row-2">
              <div className="form-group">
                <label className="form-label">General Cost (₹)</label>
                <input
                  type="number"
                  value={editingEvent.genCost}
                  onChange={(e) => setEditingEvent({ ...editingEvent, genCost: Number(e.target.value) })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">VIP Cost (₹)</label>
                <input
                  type="number"
                  value={editingEvent.vipCost}
                  onChange={(e) => setEditingEvent({ ...editingEvent, vipCost: Number(e.target.value) })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Event Description</label>
              <textarea
                rows="2"
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                className="form-textarea"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Event
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingEvent(null)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Events Table */}
        {loading ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--gray)' }}>Loading events...</div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>CITY</th>
                  <th>DATE</th>
                  <th>VENUE</th>
                  <th>GEN / VIP</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt) => (
                  <tr key={evt.id}>
                    <td><strong style={{ color: '#FFF' }}>{evt.title}</strong></td>
                    <td>{evt.city}</td>
                    <td>{evt.date}</td>
                    <td>{evt.venue}</td>
                    <td>₹{evt.genCost} / ₹{evt.vipCost}</td>
                    <td>
                      <span className="status-badge status-approved">
                        {evt.published !== false ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', minHeight: '30px' }}
                          onClick={() => setEditingEvent(evt)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#ff6b6b', padding: '4px 8px', minHeight: '30px' }}
                          onClick={() => handleDelete(evt.id)}
                        >
                          Delete
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
    </div>
  );
};
