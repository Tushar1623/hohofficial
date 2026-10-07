/**
 * HOUSE OF HUMOUR (HoH) - Date & Time Formatting Utilities
 */

export const calculateCountdown = (targetEpoch) => {
  if (!targetEpoch) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true };
  }

  // Ensure targetEpoch is a valid number timestamp
  let epoch = targetEpoch;
  if (typeof epoch === 'string') {
    epoch = new Date(epoch).getTime();
  }
  if (isNaN(epoch)) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true };
  }

  const now = Date.now();
  const diff = epoch - now;

  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    isExpired: false
  };
};

export const formatRelativeTime = (isoString) => {
  if (!isoString) return 'Just now';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
};
