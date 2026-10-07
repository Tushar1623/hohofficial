import React from 'react';
import { Link } from 'react-router-dom';
import { Countdown } from '../Countdown/Countdown';
import { useApp } from '../../context/AppContext';

export const EventCard = ({ event, isFeatured = false }) => {
  const { openTicketModal } = useApp();

  if (!event) return null;

  const capacityPct = Math.round(
    ((event.totalCapacity - event.seatsLeft) / event.totalCapacity) * 100
  );

  return (
    <article className={`event-card ${isFeatured ? 'event-card-featured' : ''}`}>
      <div className="event-card-header">
        <div className="event-city-tag">
          <span className="material-symbols-outlined">location_on</span>
          <span>{event.city}</span>
        </div>
        <span className="event-urgency-badge">{event.urgencyTag || 'FAST FILLING'}</span>
      </div>

      <div className="event-card-body">
        <div className="event-timing">
          <span className="event-date-large">{event.date}</span>
          <span className="event-time-sub">{event.time}</span>
        </div>

        <h3 className="event-title">{event.title}</h3>
        <p className="event-venue">
          <span className="material-symbols-outlined">nightlife</span>
          <span>{event.venue}</span>
        </p>

        <p className="event-desc">{event.description}</p>

        {/* Live prize callout */}
        <div className="event-prize-pill">
          <span className="prize-label">{event.prizeLabel || 'WINNER PURSE'}:</span>
          <span className="prize-amount">{event.prize} CASH</span>
        </div>

        {/* Real Countdown */}
        <div className="event-countdown-box">
          <Countdown targetEpoch={event.targetEpoch} label="DOORS OPEN IN" />
        </div>

        {/* Capacity / Scarcity bar */}
        <div className="event-scarcity-wrap">
          <div className="scarcity-header">
            <span>SEATS FILLED</span>
            <span className="scarcity-highlight">{event.seatsLeft} SEATS REMAINING</span>
          </div>
          <div className="scarcity-bar" role="progressbar" aria-valuenow={capacityPct} aria-valuemin="0" aria-valuemax="100">
            <div className="scarcity-fill" style={{ width: `${capacityPct}%` }} />
          </div>
        </div>
      </div>

      <div className="event-card-footer">
        <div className="event-price-tag">
          <span className="price-from">FROM</span>
          <span className="price-value">₹{event.genCost}</span>
        </div>

        <div className="event-actions">
          <Link to={`/events/${event.id}`} className="btn btn-outline btn-sm">
            DETAILS
          </Link>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => openTicketModal(event)}
          >
            BOOK PASS
          </button>
        </div>
      </div>
    </article>
  );
};
