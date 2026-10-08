import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';
import { api } from '../services/api';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [bookingEvent, setBookingEvent] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.getEvents().then((data) => {
      if (mounted) {
        setEvents(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const cities = ['ALL', ...Array.from(new Set(events.map((e) => e.city.toUpperCase())))];

  const filteredEvents = selectedCity === 'ALL'
    ? events
    : events.filter((e) => e.city.toUpperCase() === selectedCity);

  return (
    <div>
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-badge">TOUR CALENDAR 2026</span>
            <h1 className="section-title">
              LIVE TOUR <span className="text-gradient">SCHEDULE</span>
            </h1>
            <p className="section-subtitle">
              Regional Qualifiers. Packed Comedy Clubs. Instant decibel voting.
            </p>
          </div>

          {/* City Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                className={`btn btn-sm ${selectedCity === city ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>Loading tour schedule...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {filteredEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} onBook={(e) => setBookingEvent(e)} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={!!bookingEvent}
        onClose={() => setBookingEvent(null)}
        title={bookingEvent ? `Reserve Passes: ${bookingEvent.title}` : 'Reserve Passes'}
      >
        {bookingEvent && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '14px' }}>
              {bookingEvent.venue}, {bookingEvent.city} • {bookingEvent.date}
            </p>
            <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--radius)', marginBottom: '16px', fontSize: '13px', lineHeight: '1.6' }}>
              <div>General Entry: ₹{bookingEvent.genCost || 399}</div>
              <div>VIP Front Row: ₹{bookingEvent.vipCost || 699}</div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--yellow)', marginBottom: '16px' }}>
              To reserve tickets, contact the tour desk via WhatsApp: +91 98301 22345 or purchase directly at the venue gate on show day.
            </p>
            <a
              href={`https://wa.me/919830122345?text=Hi%20HoH,%20I%20would%20like%20to%20reserve%20passes%20for%20the%20${bookingEvent.city}%20show`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-block"
            >
              Reserve via WhatsApp
            </a>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};
