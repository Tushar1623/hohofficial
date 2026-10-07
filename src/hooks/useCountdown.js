import { useState, useEffect } from 'react';
import { calculateCountdown } from '../utils/formatDate';

export const useCountdown = (targetEpoch) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateCountdown(targetEpoch));

  useEffect(() => {
    // Immediately calculate
    setTimeLeft(calculateCountdown(targetEpoch));

    const interval = setInterval(() => {
      setTimeLeft(calculateCountdown(targetEpoch));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetEpoch]);

  return timeLeft;
};
