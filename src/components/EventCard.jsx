import React from 'react';
import { Link } from 'react-router-dom';

export const EventCard = ({ event }) => {
  if (!event) return null;

  // Format machine-readable dateTime
  const eventDate = new Date(event.dateTime);
  const formattedDate = !isNaN(eventDate.getTime())
    ? eventDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).toUpperCase()
    : 'UPCOMING DATE';

  const formattedTime = !isNaN(eventDate.getTime())
    ? eventDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toUpperCase()
    : '7:00 PM ONWARDS';

  return (
    <article className="next-event-card">
      <div className="next-event-header">
        <span className="event-city-badge">
          <span className="material-symbols-outlined">location_on</span>
          <span>{event.city}</span>
        </span>
        <span className="event-status-badge">{event.status || 'UPCOMING'}</span>
      </div>

      <div className="next-event-body">
        <div className="next-event-timing">
          <span className="event-date-large">{formattedDate}</span>
          <span className="event-time-sub">{formattedTime}</span>
        </div>

        <h3 className="next-event-title">{event.title}</h3>

        <p className="next-event-venue">
          <span className="material-symbols-outlined">nightlife</span>
          <span>{event.venue}</span>
        </p>

        {event.prize && (
          <div className="next-event-prize">
            <span className="prize-label">WINNER PURSE:</span>
            <span className="prize-value">{event.prize} CASH</span>
          </div>
        )}

        {event.description && (
          <p className="next-event-description">{event.description}</p>
        )}
      </div>

      <div className="next-event-actions">
        <Link to="/participate" className="btn btn-secondary">
          PARTICIPATE
        </Link>
        <Link to="/tickets" className="btn btn-primary">
          GET TICKETS
        </Link>
      </div>
    </article>
  );
};

export default EventCard;
