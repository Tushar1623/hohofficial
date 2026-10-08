import React from 'react';
import { Link } from 'react-router-dom';

export const EventCard = ({ event, onBook }) => {
  if (!event) return null;

  // Simple countdown calc
  const diff = (event.targetEpoch || 0) - Date.now();
  const isPast = diff < 0;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));

  return (
    <article className="event-card">
      <div className="event-card-header">
        <span className="event-city-tag">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
          <span>{event.city}</span>
        </span>
        <span className="event-urgency-badge">
          {isPast ? 'CONCLUDED' : (event.urgencyTag || 'UPCOMING')}
        </span>
      </div>

      <div>
        <div style={{ marginBottom: '6px' }}>
          <span className="event-date-large">{event.date}</span>
          <span className="event-time-sub">{event.time}</span>
        </div>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-venue">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>nightlife</span>
          <span>{event.venue}</span>
        </p>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: '1.5' }}>
        {event.description}
      </p>

      {/* Prize & Status Pill */}
      <div className="event-prize-pill">
        <span style={{ color: 'var(--yellow)', fontWeight: '700' }}>{event.prizeLabel || 'WINNER PURSE'}:</span>
        <span style={{ color: '#FFF', fontWeight: '800' }}>{event.prize} CASH</span>
      </div>

      {/* Countdown strip if upcoming */}
      {!isPast && (
        <div style={{ background: 'var(--surface-2)', padding: '10px 14px', borderRadius: 'var(--radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gray)' }}>SHOWTIME IN</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--orange)' }}>
            {days} DAYS {hours} HOURS
          </span>
        </div>
      )}

      <div className="event-card-footer">
        <div>
          <span style={{ fontSize: '10px', color: 'var(--gray)', display: 'block', fontFamily: 'var(--font-mono)' }}>FROM</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#FFF' }}>₹{event.genCost || 399}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to={`/events/${event.id}`} className="btn btn-secondary btn-sm">
            DETAILS
          </Link>
          {!isPast && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onBook ? onBook(event) : null}
            >
              BOOK PASS
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
