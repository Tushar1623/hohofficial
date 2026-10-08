import React, { useState } from 'react';
import { api } from '../services/api.js';

export const Participate = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    performanceVideo: '',
    shortIntroduction: '',
    instagram: '',
    youtube: '',
    experience: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedAppId, setSubmittedAppId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (loading) return; // Prevent double submission (Section 13)

    setError(null);

    // Validate required fields
    if (!formData.name.trim()) return setError('Please enter your full name.');
    if (!formData.phone.trim()) return setError('Please enter your phone number.');
    if (!formData.email.trim()) return setError('Please enter a valid email address.');
    if (!formData.city.trim()) return setError('Please enter your city / circuit zone.');
    if (!formData.performanceVideo.trim()) return setError('Please provide a performance video URL (YouTube, Drive, or Reel).');
    if (!formData.shortIntroduction.trim()) return setError('Please provide a short introduction about yourself.');

    try {
      setLoading(true);

      // Section 10: Send exact payload
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        performanceVideo: formData.performanceVideo.trim(),
        shortIntroduction: formData.shortIntroduction.trim(),
        instagram: formData.instagram.trim(),
        youtube: formData.youtube.trim(),
        experience: formData.experience.trim()
      };

      const res = await api.submitApplication(payload);

      // If HTTP 201: show success, display real application ID
      const appId = res?.applicationId || res?.id || res?.data?.applicationId;
      if (appId) {
        setSubmittedAppId(appId);
        // Reset form upon success (Section 13)
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          performanceVideo: '',
          shortIntroduction: '',
          instagram: '',
          youtube: '',
          experience: ''
        });
      } else {
        throw new Error('Application could not be saved.');
      }
    } catch (err) {
      // Section 14: If MongoDB is unavailable, show specific honest message
      if (err.code === 'DATABASE_UNAVAILABLE' || err.status === 503) {
        setError('Applications are temporarily unavailable. Please try again later.');
      } else if (err.code === 'DUPLICATE' || err.status === 409) {
        setError(err.message || 'An application with this email address has already been submitted.');
      } else if (err.code === 'VALIDATION_ERROR' || err.status === 400) {
        setError(err.message || 'Please check your form inputs and try again.');
      } else if (!err.status || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setError('Applications are temporarily unavailable. Please try again later.');
      } else {
        setError(err.message || 'Applications are temporarily unavailable. Please try again later.');
      }
      // Note: formData is kept intact on error so user doesn't lose inputs (Section 13)
    } finally {
      setLoading(false);
    }
  };

  const handleResetForNewSubmission = () => {
    setSubmittedAppId(null);
    setError(null);
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

        {submittedAppId ? (
          <div className="submission-success-card text-center">
            <div className="success-icon-badge">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <h2>APPLICATION SUBMITTED</h2>
            <p className="success-msg">Your application has been received and saved.</p>
            <div className="app-id-pill">
              <span className="app-id-label">Application ID:</span>
              <span className="app-id-val">{submittedAppId}</span>
            </div>
            <p className="success-subtext">
              The selection team reviews submissions on a rolling basis. If shortlisted, you will receive venue schedule and timing via WhatsApp or email.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleResetForNewSubmission}
            >
              SUBMIT ANOTHER APPLICATION
            </button>
          </div>
        ) : (
          <div className="form-container">
            {error && (
              <div className="form-error-banner" role="alert" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined">error</span>
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  style={{ alignSelf: 'flex-start', marginTop: '4px' }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  RETRY SUBMISSION
                </button>
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
                <label htmlFor="performanceVideo">Performance Video URL <span className="req">*</span></label>
                <input
                  id="performanceVideo"
                  name="performanceVideo"
                  type="url"
                  required
                  placeholder="https://youtube.com/watch?v=... or Google Drive / Reel"
                  value={formData.performanceVideo}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="field-hint">A stand-up clip, open mic video, or phone recording link.</span>
              </div>

              <div className="form-group">
                <label htmlFor="shortIntroduction">Short Introduction &amp; Style <span className="req">*</span></label>
                <textarea
                  id="shortIntroduction"
                  name="shortIntroduction"
                  rows="3"
                  required
                  placeholder="Tell us about your comedy style (crowd work, observational, dark humor, storytelling)..."
                  value={formData.shortIntroduction}
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
                <label htmlFor="experience">Comedy Experience (Optional)</label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  placeholder="e.g. 1st time audition, 6 months open mics, touring comic"
                  value={formData.experience}
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
                  <span>Submitting...</span>
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
