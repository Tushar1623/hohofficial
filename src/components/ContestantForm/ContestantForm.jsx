import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateApplicationForm } from '../../utils/validation';
import { ContestantPass } from '../ContestantPass/ContestantPass';

export const ContestantForm = () => {
  const { submitApplication, activeEvent } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    city: '',
    instagram: '',
    youtube: '',
    comedyExperience: 'Open micer (0-1 yr)',
    performanceVideo: '',
    shortIntroduction: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedPass, setSubmittedPass] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    setErrorMessage('');

    // Validation
    const { isValid, errors: validationErrors } = validateApplicationForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.focus();
      return;
    }

    setSubmitting(true);
    try {
      const createdPass = await submitApplication(formData);
      setSubmittedPass(createdPass);
    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMessage(
        'Audition submission failed. Please check your network connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedPass(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      age: '',
      city: '',
      instagram: '',
      youtube: '',
      comedyExperience: 'Open micer (0-1 yr)',
      performanceVideo: '',
      shortIntroduction: ''
    });
    setErrors({});
  };

  // SUCCESS STATE
  if (submittedPass) {
    return (
      <div className="contestant-success-container" role="status" aria-live="polite">
        <div className="success-banner">
          <span className="material-symbols-outlined success-icon">check_circle</span>
          <h2 className="success-title">AUDITION APPLICATION CONFIRMED!</h2>
          <p className="success-desc">
            Your entry has been assigned to our editorial jury queue. Present your official digital pass below at the venue door during registration.
          </p>
        </div>

        <ContestantPass application={submittedPass} eventTitle={activeEvent?.title} />

        <div className="success-actions">
          <button type="button" className="btn btn-outline" onClick={handleReset}>
            <span className="material-symbols-outlined">restart_alt</span>
            <span>SUBMIT ANOTHER COMEDIAN ENTRY</span>
          </button>
        </div>
      </div>
    );
  }

  // FORM STATE
  return (
    <div className="contestant-form-wrapper">
      {errorMessage && (
        <div className="form-error-alert" role="alert">
          <span className="material-symbols-outlined">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contestant-form" noValidate>
        {/* Row 1: Name and Phone */}
        <div className="form-row form-row-2">
          <div className="form-group">
            <label htmlFor="field-name" className="form-label">
              Full Name / Stage Name <span className="req">*</span>
            </label>
            <input
              id="field-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Arjun Sharma"
              className={`form-input ${errors.name ? 'has-error' : ''}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'err-name' : undefined}
              required
            />
            {errors.name && (
              <span id="err-name" className="field-error-msg">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="field-phone" className="form-label">
              WhatsApp Phone Number <span className="req">*</span>
            </label>
            <input
              id="field-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98301 00000"
              className={`form-input ${errors.phone ? 'has-error' : ''}`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'err-phone' : undefined}
              required
            />
            {errors.phone && (
              <span id="err-phone" className="field-error-msg">
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Email and Age */}
        <div className="form-row form-row-2">
          <div className="form-group">
            <label htmlFor="field-email" className="form-label">
              Email Address <span className="req">*</span>
            </label>
            <input
              id="field-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="comic@example.com"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
              required
            />
            {errors.email && (
              <span id="err-email" className="field-error-msg">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="field-age" className="form-label">
              Age <span className="req">*</span>
            </label>
            <input
              id="field-age"
              type="number"
              name="age"
              min="16"
              max="85"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 23"
              className={`form-input ${errors.age ? 'has-error' : ''}`}
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? 'err-age' : undefined}
              required
            />
            {errors.age && (
              <span id="err-age" className="field-error-msg">
                {errors.age}
              </span>
            )}
          </div>
        </div>

        {/* Row 3: City and Comedy Experience */}
        <div className="form-row form-row-2">
          <div className="form-group">
            <label htmlFor="field-city" className="form-label">
              Current City / Circuit <span className="req">*</span>
            </label>
            <input
              id="field-city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Kolkata, Mumbai, Delhi"
              className={`form-input ${errors.city ? 'has-error' : ''}`}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? 'err-city' : undefined}
              required
            />
            {errors.city && (
              <span id="err-city" className="field-error-msg">
                {errors.city}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="field-exp" className="form-label">
              Comedy Experience Level <span className="req">*</span>
            </label>
            <select
              id="field-exp"
              name="comedyExperience"
              value={formData.comedyExperience}
              onChange={handleChange}
              className="form-select"
            >
              <option value="First Timer / Passionate Comic">First Timer / Passionate Comic</option>
              <option value="Open micer (0-1 yr)">Open micer (0-1 yr)</option>
              <option value="1+ year regular club spots">1+ year regular club spots</option>
              <option value="Touring comic / Feature act">Touring comic / Feature act</option>
              <option value="3+ years veteran comic">3+ years veteran comic</option>
            </select>
          </div>
        </div>

        {/* Row 4: Instagram and YouTube Handles */}
        <div className="form-row form-row-2">
          <div className="form-group">
            <label htmlFor="field-instagram" className="form-label">
              Instagram Profile / Handle
            </label>
            <input
              id="field-instagram"
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@yourhandle"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="field-youtube" className="form-label">
              YouTube Channel (Optional)
            </label>
            <input
              id="field-youtube"
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/@channel"
              className="form-input"
            />
          </div>
        </div>

        {/* Row 5: Performance Video / Audition Link */}
        <div className="form-group">
          <label htmlFor="field-video" className="form-label">
            Performance Video Link (YouTube, Drive, or Reel) <span className="req">*</span>
          </label>
          <input
            id="field-video"
            type="url"
            name="performanceVideo"
            value={formData.performanceVideo}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=... or Google Drive link"
            className={`form-input ${errors.performanceVideo ? 'has-error' : ''}`}
            aria-invalid={!!errors.performanceVideo}
            aria-describedby={errors.performanceVideo ? 'err-video' : undefined}
            required
          />
          {errors.performanceVideo && (
            <span id="err-video" className="field-error-msg">
              {errors.performanceVideo}
            </span>
          )}
          <span className="field-help-text">
            Upload an uncut 2-5 min set. Drive links must be set to "Anyone with the link can view".
          </span>
        </div>

        {/* Row 6: Short Introduction */}
        <div className="form-group">
          <label htmlFor="field-intro" className="form-label">
            Short Introduction &amp; Style Summary <span className="req">*</span>
          </label>
          <textarea
            id="field-intro"
            name="shortIntroduction"
            rows="3"
            value={formData.shortIntroduction}
            onChange={handleChange}
            placeholder="Tell us about your genre (crowd work, dark comedy, deadpan, observational) and why you want to step on the HoH stage..."
            className={`form-textarea ${errors.shortIntroduction ? 'has-error' : ''}`}
            aria-invalid={!!errors.shortIntroduction}
            aria-describedby={errors.shortIntroduction ? 'err-intro' : undefined}
            required
          />
          {errors.shortIntroduction && (
            <span id="err-intro" className="field-error-msg">
              {errors.shortIntroduction}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-submit-row">
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-inline" />
                <span>GENERATING DIGITAL BADGE PASS...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">send</span>
                <span>SUBMIT APPLICATION &amp; GENERATE PASS</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
