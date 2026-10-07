import React, { useState } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { EventCard } from '../components/EventCard/EventCard';
import { useApp } from '../context/AppContext';

export const Events = () => {
  const { events } = useApp();
  const [selectedCity, setSelectedCity] = useState('ALL');

  const cities = ['ALL', ...Array.from(new Set(events.map((e) => e.city.toUpperCase())))];

  const filteredEvents = selectedCity === 'ALL'
    ? events
    : events.filter((e) => e.city.toUpperCase() === selectedCity);

  return (
    <div className="page-events-root">
      <Navbar />

      <main className="section page-main-content">
        <div className="container">
          {/* Header Banner */}
          <div className="page-banner">
            <div className="section-badge">
              <span className="material-symbols-outlined">theater_comedy</span>
              <span>2026 TOUR CALENDAR</span>
            </div>
            <h1 className="page-title">
              LIVE TOUR <span className="text-gradient">SCHEDULE</span>
            </h1>
            <p className="page-subtitle">
              5 Regional Qualifiers. Packed Comedy Clubs. Instant decibel voting. Grab passes before venues sell out.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="events-filter-strip">
            <span className="filter-label">FILTER BY CIRCUIT:</span>
            <div className="filter-pills">
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`filter-pill ${selectedCity === city ? 'active' : ''}`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {filteredEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>

          {/* Tour Notice */}
          <div className="tour-circuit-notice">
            <span className="material-symbols-outlined notice-icon">info</span>
            <div>
              <h3 className="notice-title">WANT HOH IN YOUR CITY?</h3>
              <p className="notice-desc">
                We are evaluating venues in Ahmedabad, Chandigarh, Hyderabad, and Guwahati for Season 2026 Phase 2.
                Local promoters and comedy clubs can email <a href="mailto:auditions@houseofhumour.in">auditions@houseofhumour.in</a>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
