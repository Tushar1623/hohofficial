import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export const Tickets = () => {
  const [event, setEvent] = useState(null);
  const [ticketSettings, setTicketSettings] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const [evRes, tsRes, stRes] = await Promise.allSettled([
          api.getNextEvent(),
          api.getTicketSettings(),
          api.getSettings()
        ]);
        if (mounted) {
          if (evRes.status === 'fulfilled') setEvent(evRes.value);
          if (tsRes.status === 'fulfilled') setTicketSettings(tsRes.value);
          if (stRes.status === 'fulfilled') setSettings(stRes.value);
        }
      } catch (err) {
        console.error('Failed to load tickets data:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => { mounted = false; };
  }, []);

  const generalPrice = event?.generalPrice || ticketSettings?.generalPrice || 399;
  const vipPrice = event?.vipPrice || ticketSettings?.vipPrice || 699;
  const bookingUrl = event?.bookingUrl || ticketSettings?.bookingUrl || '';

  const eventDate = event?.dateTime ? new Date(event.dateTime) : null;
  const formattedDate = eventDate && !isNaN(eventDate.getTime())
    ? eventDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).toUpperCase()
    : 'UPCOMING TOUR DATE';

  const formattedTime = eventDate && !isNaN(eventDate.getTime())
    ? eventDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toUpperCase()
    : '7:00 PM ONWARDS';

  const handleBook = (tier) => {
    if (bookingUrl) {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Direct WhatsApp assistance for genuine ticketing
    const phone = settings?.contactNumber?.replace(/[^0-9]/g, '') || '919230374701';
    const text = encodeURIComponent(
      `Hello House of Humour Team! I would like to reserve a ${tier} pass for "${event?.title || 'Next Event'}" in ${event?.city || 'the tour'}.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="page-wrapper tickets-page">
      <div className="container">
        <header className="page-header text-center">
          <span className="section-eyebrow">LIVE COMEDY AUDIENCE PASS</span>
          <h1 className="page-title">GET YOUR HOH TICKET</h1>
          <p className="page-subtitle">
            Witness raw jokes, live crowd decibel roars, and rising stand-up champions.
          </p>
        </header>

        {loading ? (
          <div className="loading-card text-center">
            <p>Loading tour event pass details...</p>
          </div>
        ) : event ? (
          <div className="tickets-layout">
            {/* Event Summary Box */}
            <div className="ticket-event-summary">
              <div className="summary-badge">{event.city} CHAPTER</div>
              <h2 className="summary-title">{event.title}</h2>
              <div className="summary-meta-grid">
                <div className="meta-item">
                  <span className="material-symbols-outlined">calendar_month</span>
                  <div>
                    <span className="meta-label">DATE</span>
                    <span className="meta-val">{formattedDate}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="material-symbols-outlined">schedule</span>
                  <div>
                    <span className="meta-label">TIME</span>
                    <span className="meta-val">{formattedTime}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <span className="meta-label">VENUE</span>
                    <span className="meta-val">{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Options Grid */}
            <div className="ticket-tiers-grid">
              {/* General Ticket */}
              <div className="tier-card">
                <div className="tier-header">
                  <span className="tier-name">GENERAL</span>
                  <div className="tier-price">
                    <span className="currency">₹</span>
                    <span className="amount">{generalPrice}</span>
                  </div>
                </div>
                <ul className="tier-perks">
                  <li>Standard club seating access</li>
                  <li>Full event view &amp; audience decibel voting</li>
                  <li>1 complimentary beverage coupon</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={() => handleBook('General')}
                >
                  {bookingUrl ? 'BOOK NOW' : 'RESERVE VIA WHATSAPP'}
                </button>
              </div>

              {/* VIP Ticket */}
              <div className="tier-card tier-card-featured">
                <div className="featured-ribbon">POPULAR</div>
                <div className="tier-header">
                  <span className="tier-name">VIP</span>
                  <div className="tier-price">
                    <span className="currency">₹</span>
                    <span className="amount">{vipPrice}</span>
                  </div>
                </div>
                <ul className="tier-perks">
                  <li>Front-row priority table seating</li>
                  <li>Direct comic crowd work proximity</li>
                  <li>Complimentary snacks &amp; beverage pass</li>
                  <li>Post-show headliner meet &amp; greet</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => handleBook('VIP')}
                >
                  {bookingUrl ? 'BOOK NOW' : 'RESERVE VIA WHATSAPP'}
                </button>
              </div>
            </div>

            {/* Honest Payment Status Notice */}
            <div className="booking-notice-box text-center">
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--yellow)', verticalAlign: 'middle', marginRight: '6px' }}>
                info
              </span>
              <span>
                {bookingUrl
                  ? 'Official online booking link configured for this tour chapter.'
                  : 'Ticket booking gateway integration coming soon. Use WhatsApp reservation for instant seat confirmation.'}
              </span>
            </div>
          </div>
        ) : (
          <div className="empty-event-card text-center">
            <h3>Tickets will be available soon.</h3>
            <p>Tour dates and ticket allocations will be announced here shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
