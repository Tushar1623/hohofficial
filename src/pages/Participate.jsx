import React, { useState } from 'react';
import { api } from '../services/api.js';

export const Participate = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    tape: '',
    bio: '',
    instagram: '',
    youtube: '',
    exp: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedApp, setSubmittedApp] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.name.trim()) return setError('Please enter your full name.');
    if (!formData.phone.trim()) return setError('Please enter your phone number.');
    if (!formData.email.trim()) return setError('Please enter a valid email address.');
    if (!formData.city.trim()) return setError('Please enter your city.');
    if (!formData.tape.trim()) return setError('Please provide a performance video link (YouTube, Drive, or Reel).');
    if (!formData.bio.trim()) return setError('Please provide a short introduction about yourself.');

    try {
      setLoading(true);
      const res = await api.submitApplication(formData);
      if (res && res.id) {
        setSubmittedApp(res);
      } else {
        throw new Error('Server did not return confirmation. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Unable to submit application. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedApp(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      tape: '',
      bio: '',
      instagram: '',
      youtube: '',
      exp: ''
    });
  };

  return (
    <div className="page-wrapper participate-page">
      <div className="container">
        <header className="page-header text-center">
          <span className="section-eyebrow">AUDITION CALL</span>
          <h1 className="page-title">PARTICIPATE IN HOH</h1>
          <p className="page-subtitle">
            Think you're funny? Prove it on stage.
          </p>
        </header>

        {submittedApp ? (
          <div className="submission-success-card text-center">
            <div className="success-icon-badge">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <h2>APPLICATION SUBMITTED</h2>
            <p className="success-msg">Your application has been received.</p>
            <div className="app-id-pill">
              <span className="app-id-label">Application ID:</span>
              <span className="app-id-val">{submittedApp.applicationId || submittedApp.id}</span>
            </div>
            <p className="success-subtext">
              The HoH selection team reviews submissions on a rolling basis. If shortlisted, you will receive venue schedule and timing via WhatsApp or email.
            </p>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              SUBMIT ANOTHER APPLICATION
            </button>
          </div>
        ) : (
          <div className="form-container">
            {error && (
              <div className="form-error-banner" role="alert">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="participate-form" noValidate>
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="req">*</span></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="req">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="city">City / Circuit Zone <span className="req">*</span></label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="e.g. Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tape">Performance Video URL <span className="req">*</span></label>
                <input
                  id="tape"
                  name="tape"
                  type="url"
                  required
                  placeholder="https://youtube.com/watch?v=... or Google Drive / Reel"
                  value={formData.tape}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="field-hint">A 3–5 minute unedited stand-up clip, open mic video, or phone recording.</span>
              </div>

              <div className="form-group">
                <label htmlFor="bio">Short Introduction &amp; Style <span className="req">*</span></label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  required
                  placeholder="Tell us about your comedy style (crowd work, observational, dark humor, storytelling)..."
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-divider">
                <span>OPTIONAL SOCIAL &amp; EXPERIENCE</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="instagram">Instagram Handle (Optional)</label>
                  <input
                    id="instagram"
                    name="instagram"
                    type="text"
                    placeholder="@yourhandle"
                    value={formData.instagram}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="youtube">YouTube Channel (Optional)</label>
                  <input
                    id="youtube"
                    name="youtube"
                    type="text"
                    placeholder="Channel link or handle"
                    value={formData.youtube}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="exp">Comedy Experience (Optional)</label>
                <input
                  id="exp"
                  name="exp"
                  type="text"
                  placeholder="e.g. 1st time audition, 6 months open mics, touring comic"
                  value={formData.exp}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span>Submitting application...</span>
                ) : (
                  <>
                    <span className="material-symbols-outlined">send</span>
                    <span>SUBMIT APPLICATION</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participate;
