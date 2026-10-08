import crypto from 'crypto';
import Application from '../models/Application.js';

/**
 * Generate a collision-resistant unique application ID on the backend.
 * Format: HOH-2026-XXXXXX (6 alphanumeric hex characters)
 * Checks MongoDB to prevent collisions.
 */
export async function generateApplicationId() {
  const prefix = 'HOH-2026';
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    const candidateId = `${prefix}-${randomHex}`;

    try {
      const exists = await Application.findOne({ applicationId: candidateId }).select('_id').lean();
      if (!exists) {
        return candidateId;
      }
    } catch {
      // If DB check fails during generation, still return collision-resistant candidate
      return candidateId;
    }

    attempts++;
  }

  // Fallback with millisecond timestamp component if multiple collisions occur
  const timestampPart = Date.now().toString(36).toUpperCase().slice(-4);
  const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${timestampPart}${randomPart}`;
}

export default generateApplicationId;
