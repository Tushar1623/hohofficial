import React, { useState } from 'react';
import { api } from '../services/api.js';

export const ContestantForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    city: '',
    exp: 'Open micer',
    tape: '',
    bio: '',
    instagram: '',
    youtube: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [createdPass, setCreatedPass] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.phone.trim() || form.phone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Valid 10-digit mobile number required.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Valid email address required.';
    }
    const ageNum = parseInt(form.age, 10);
    if (!form.age || isNaN(ageNum) || ageNum < 16 || ageNum > 80) {
      errs.age = 'Age must be between 16 and 80.';
    }
    if (!form.city.trim()) errs.city = 'City is required.';
    if (!form.tape.trim() || !/^https?:\/\/.+/i.test(form.tape)) {
      errs.tape = 'A valid performance video link (URL) is required.';
    }
    if (!form.bio.trim() || form.bio.trim().length < 10) {
      errs.bio = 'Brief style summary required (at least 10 characters).';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('submitting');
    try {
      const result = await api.submitApplication(form);
      setCreatedPass(result);
      setStatus('success');
      if (onSuccess) onSuccess(result);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success' && createdPass) {
    return (
      <div style={{ background: 'var(--surface-1)', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: 'var(--radius)', padding: '28px', textAlign: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#22c55e', marginBottom: '12px' }}>
          check_circle
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#FFF', marginBottom: '8px' }}>
          APPLICATION RECEIVED
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '20px' }}>
          Your audition details have been registered in the curatorial queue.
        </p>

        {/* Clean, realistic badge pass */}
        <div style={{ background: '#111', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px', maxWidth: '360px', margin: '0 auto 20px auto', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--yellow)' }}>REGISTRATION ID</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--orange)' }}>{createdPass.id}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', color: 'var(--gray)', display: 'block', fontFamily: 'var(--font-mono)' }}>NAME</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#FFF' }}>{createdPass.name}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--gray)', display: 'block', fontFamily: 'var(--font-mono)' }}>CITY</span>
              <span style={{ color: '#FFF' }}>{createdPass.city}</span>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--gray)', display: 'block', fontFamily: 'var(--font-mono)' }}>STATUS</span>
              <span style={{ color: 'var(--yellow)', textTransform: 'uppercase', fontWeight: '700' }}>{createdPass.status}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setStatus('idle');
            setCreatedPass(null);
            setForm({ name: '', phone: '', email: '', age: '', city: '', exp: 'Open micer', tape: '', bio: '', instagram: '', youtube: '' });
          }}
        >
          Submit Another Entry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 'clamp(20px, 4vw, 32px)' }} noValidate>
      {status === 'error' && (
        <div style={{ background: 'rgba(229,57,53,0.15)', border: '1px solid var(--red)', color: '#ff6b6b', padding: '12px', borderRadius: 'var(--radius)', marginBottom: '16px', fontSize: '13px' }}>
          Could not submit application. Please check your connection and try again.
        </div>
      )}

      <div className="form-row form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="app-name">Full Name *</label>
          <input
            id="app-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Arjun Sharma"
            className="form-input"
            required
          />
          {errors.name && <span className="field-error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="app-phone">WhatsApp Phone *</label>
          <input
            id="app-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98301 00000"
            className="form-input"
            required
          />
          {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="app-email">Email Address *</label>
          <input
            id="app-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="comic@example.com"
            className="form-input"
            required
          />
          {errors.email && <span className="field-error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="app-age">Age *</label>
          <input
            id="app-age"
            type="number"
            name="age"
            min="16"
            max="80"
            value={form.age}
            onChange={handleChange}
            placeholder="e.g. 24"
            className="form-input"
            required
          />
          {errors.age && <span className="field-error-msg">{errors.age}</span>}
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="app-city">City / Circuit *</label>
          <input
            id="app-city"
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Kolkata, Mumbai"
            className="form-input"
            required
          />
          {errors.city && <span className="field-error-msg">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="app-exp">Comedy Experience</label>
          <select
            id="app-exp"
            name="exp"
            value={form.exp}
            onChange={handleChange}
            className="form-select"
          >
            <option value="First Timer">First Timer / Passionate Comic</option>
            <option value="Open micer">Open micer (0-1 yr)</option>
            <option value="1+ year spots">1+ year regular spots</option>
            <option value="Touring comic">Touring comic</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="app-tape">Performance Video Link (YouTube, Drive, or Reel) *</label>
        <input
          id="app-tape"
          type="url"
          name="tape"
          value={form.tape}
          onChange={handleChange}
          placeholder="https://youtube.com/... or Google Drive link"
          className="form-input"
          required
        />
        {errors.tape && <span className="field-error-msg">{errors.tape}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="app-bio">Style &amp; Short Introduction *</label>
        <textarea
          id="app-bio"
          name="bio"
          rows="3"
          value={form.bio}
          onChange={handleChange}
          placeholder="Briefly describe your genre (crowd work, dark comedy, deadpan, observational)..."
          className="form-textarea"
          required
        />
        {errors.bio && <span className="field-error-msg">{errors.bio}</span>}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block btn-lg"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Submitting Application...' : 'Submit Contestant Application'}
      </button>
    </form>
  );
};
