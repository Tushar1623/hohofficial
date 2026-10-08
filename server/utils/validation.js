/**
 * Validation and sanitization utilities for HoH API
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim().toLowerCase());
}

export function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

export function normalizePhone(phone) {
  return typeof phone === 'string' ? phone.trim() : '';
}

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidUrl(urlStr) {
  if (!urlStr || typeof urlStr !== 'string') return false;
  try {
    const parsed = new URL(urlStr.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates application submission payload according to Section 10
 */
export function validateApplicationInput(body = {}) {
  const name = (body.name || '').trim();
  const phone = normalizePhone(body.phone || '');
  const email = normalizeEmail(body.email || '');
  const city = (body.city || '').trim();
  const performanceVideo = (body.performanceVideo || body.tape || '').trim();
  const shortIntroduction = (body.shortIntroduction || body.bio || '').trim();
  const instagram = (body.instagram || '').trim();
  const youtube = (body.youtube || '').trim();
  const experience = (body.experience || body.exp || '').trim();

  const errors = [];

  if (!name) {
    errors.push('Full name is required');
  }

  if (!phone || !isValidPhone(phone)) {
    errors.push('A valid phone number with at least 10 digits is required');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('A valid email address is required');
  }

  if (!city) {
    errors.push('City is required');
  }

  if (!performanceVideo || !isValidUrl(performanceVideo)) {
    errors.push('A valid performance video URL (YouTube, Drive, or Reel) is required');
  }

  if (!shortIntroduction) {
    errors.push('Short introduction is required');
  }

  if (instagram && !isValidUrl(instagram) && !instagram.startsWith('@')) {
    // allow @handle or full URL
    if (instagram.length < 2) {
      errors.push('Please provide a valid Instagram handle or URL');
    }
  }

  if (youtube && !isValidUrl(youtube) && !youtube.startsWith('@')) {
    if (youtube.length < 2) {
      errors.push('Please provide a valid YouTube channel or URL');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name,
      phone,
      email,
      city,
      performanceVideo,
      shortIntroduction,
      instagram,
      youtube,
      experience
    }
  };
}

/**
 * Escapes characters for safe regular expression querying (Section 26)
 */
export function escapeRegex(text = '') {
  if (typeof text !== 'string') return '';
  return text.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const VALID_APPLICATION_STATUSES = ['PENDING', 'SHORTLISTED', 'APPROVED', 'REJECTED'];
export const VALID_EVENT_STATUSES = ['UPCOMING', 'LIVE', 'COMPLETED'];
