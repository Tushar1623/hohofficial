import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const EventManagement = () => {
  const { activeEvent, updateEvent } = useApp();

  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    city: '',
    prize: '',
    genCost: 399,
    vipCost: 699,
    seatsLeft: 18,
    totalCapacity: 100,
    targetDateStr: '2026-10-02T18:30',
    description: '',
    announcement: '',
    urgencyTag: 'FAST FILLING'
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeEvent) {
      setForm({
        title: activeEvent.title || '',
        date: activeEvent.date || '',
        time: activeEvent.time || '',
        venue: activeEvent.venue || '',
        city: activeEvent.city || '',
        prize: activeEvent.prize || '',
        genCost: activeEvent.genCost || 399,
        vipCost: activeEvent.vipCost || 699,
        seatsLeft: activeEvent.seatsLeft || 18,
        totalCapacity: activeEvent.totalCapacity || 100,
        targetDateStr: activeEvent.targetEpoch
          ? new Date(activeEvent.targetEpoch).toISOString().slice(0, 16)
          : '2026-10-02T18:30',
        description: activeEvent.description || '',
        announcement: activeEvent.announcement || '',
        urgencyTag: activeEvent.urgencyTag || 'FAST FILLING'
      });
    }
  }, [activeEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const epoch = new Date(form.targetDateStr).getTime() || Date.now() + 86400000;
      await updateEvent({
        ...form,
        genCost: Number(form.genCost),
        vipCost: Number(form.vipCost),
        seatsLeft: Number(form.seatsLeft),
        totalCapacity: Number(form.totalCapacity),
        targetEpoch: epoch
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-events-view">
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>CONFIGURING ACTIVE SHOWCASE</h3>
            <p>Updates will reflect immediately on the hero section, countdown, and pass checkout.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">EVENT / CHAPTER TITLE</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">CITY</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">DISPLAY DATE</label>
            <input
              type="text"
              name="date"
              placeholder="e.g. 2 OCTOBER"
              value={form.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">SHOW TIME</label>
            <input
              type="text"
              name="time"
              placeholder="e.g. 6:30 PM ONWARDS"
              value={form.time}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">VENUE NAME</label>
            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">WINNER CASH PURSE</label>
            <input
              type="text"
              name="prize"
              value={form.prize}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">GENERAL PASS PRICE (₹)</label>
            <input
              type="number"
              name="genCost"
              value={form.genCost}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">VIP PASS PRICE (₹)</label>
            <input
              type="number"
              name="vipCost"
              value={form.vipCost}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">REMAINING SEATS</label>
            <input
              type="number"
              name="seatsLeft"
              value={form.seatsLeft}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">TOTAL ROOM CAPACITY</label>
            <input
              type="number"
              name="totalCapacity"
              value={form.totalCapacity}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">COUNTDOWN TARGET (DATE &amp; TIME)</label>
            <input
              type="datetime-local"
              name="targetDateStr"
              value={form.targetDateStr}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">URGENCY BADGE TEXT</label>
            <input
              type="text"
              name="urgencyTag"
              value={form.urgencyTag}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">EVENT DESCRIPTION</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group form-full">
            <button
              type="submit"
              className="btn-action-primary"
              disabled={saving}
            >
              <span className="material-symbols-outlined">save</span>
              <span>{saving ? 'SAVING CHANGES...' : 'SAVE EVENT SETTINGS'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
