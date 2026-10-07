/**
 * HOUSE OF HUMOUR (HoH) - Form Validation Utilities
 */

export const validateApplicationForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Full legal/stage name is required (min 2 chars).';
  }

  // Phone validation (accepts 10-digit Indian numbers with optional country code)
  const cleanPhone = (formData.phone || '').replace(/[\s\-+()]/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.phone = 'Valid 10-digit mobile number required for WhatsApp audition alerts.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.email = 'Valid email address is required.';
  }

  // Age validation
  const ageNum = parseInt(formData.age, 10);
  if (!formData.age || isNaN(ageNum) || ageNum < 16 || ageNum > 85) {
    errors.age = 'Age must be between 16 and 85.';
  }

  // City validation
  if (!formData.city || formData.city.trim().length < 2) {
    errors.city = 'Your home or circuit city is required.';
  }

  // Comedy Experience
  if (!formData.comedyExperience && !formData.exp) {
    errors.comedyExperience = 'Please select your comedy stage experience level.';
  }

  // Performance Video link validation
  const videoUrl = (formData.performanceVideo || formData.tape || '').trim();
  if (!videoUrl) {
    errors.performanceVideo = 'Link to a video set or audition tape is required.';
  } else if (!/^https?:\/\/.+/i.test(videoUrl)) {
    errors.performanceVideo = 'Please provide a valid URL starting with http:// or https://';
  }

  // Bio / Short Introduction validation
  const bio = (formData.shortIntroduction || formData.bio || '').trim();
  if (!bio || bio.length < 15) {
    errors.shortIntroduction = 'Tell us briefly about your comedy style (min 15 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
