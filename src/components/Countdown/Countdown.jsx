import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

export const Countdown = ({ targetEpoch, label = 'DOORS OPEN IN' }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetEpoch);

  if (isExpired) {
    return (
      <div className="countdown-container expired-box" role="timer" aria-live="polite">
        <span className="live-pulse-dot" />
        <span className="countdown-status-text">EVENT CURRENTLY LIVE ON STAGE</span>
      </div>
    );
  }

  return (
    <div className="countdown-wrapper" role="timer" aria-label="Countdown to live show">
      {label && <span className="countdown-eyebrow">{label}</span>}
      <div className="countdown-grid">
        <div className="countdown-cell">
          <span className="countdown-val">{days}</span>
          <span className="countdown-lbl">DAYS</span>
        </div>
        <span className="countdown-sep" aria-hidden="true">:</span>
        <div className="countdown-cell">
          <span className="countdown-val">{hours}</span>
          <span className="countdown-lbl">HOURS</span>
        </div>
        <span className="countdown-sep" aria-hidden="true">:</span>
        <div className="countdown-cell">
          <span className="countdown-val">{minutes}</span>
          <span className="countdown-lbl">MINS</span>
        </div>
        <span className="countdown-sep" aria-hidden="true">:</span>
        <div className="countdown-cell">
          <span className="countdown-val accent-val">{seconds}</span>
          <span className="countdown-lbl">SECS</span>
        </div>
      </div>
    </div>
  );
};
