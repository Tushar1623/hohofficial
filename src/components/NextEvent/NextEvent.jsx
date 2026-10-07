import React from 'react';
import { Link } from 'react-router-dom';
import { EventCard } from '../EventCard/EventCard';
import { useApp } from '../../context/AppContext';

export const NextEvent = () => {
  const { activeEvent } = useApp();

  return (
    <section className="section next-event-section" id="next-event" aria-labelledby="next-event-title">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <span className="live-dot" />
            <span>TOUR STOP #04</span>
          </div>
          <h2 id="next-event-title" className="section-title">
            NEXT LIVE SHOWCASE
          </h2>
          <p className="section-subtitle">
            Grab passes before tickets sell out. Experience 10 uncensored comedians live in the room.
          </p>
        </div>

        <div className="next-event-wrapper">
          <EventCard event={activeEvent} isFeatured={true} />
        </div>

        <div className="view-all-events-cta">
          <Link to="/events" className="btn btn-outline">
            <span>VIEW FULL 2026 TOUR SCHEDULE (5 CITIES)</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
