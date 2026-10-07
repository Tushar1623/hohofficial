import React from 'react';
import { Countdown } from '../Countdown/Countdown';
import { useApp } from '../../context/AppContext';

export const EventDetails = ({ event }) => {
  const { openTicketModal } = useApp();

  if (!event) return null;

  return (
    <div className="event-details-container">
      {/* Event Header Banner */}
      <div className="event-details-banner">
        <div className="details-badge-row">
          <span className="badge-city">{event.city} CHAPTER</span>
          <span className="badge-circuit">SEASON 2026 QUALIFIER</span>
          <span className="badge-live-tag">{event.urgencyTag || 'FAST FILLING'}</span>
        </div>

        <h1 className="event-details-h1">{event.title}</h1>
        <p className="event-details-subtitle">{event.announcement || event.description}</p>
      </div>

      {/* Main Grid */}
      <div className="event-details-grid">
        {/* Left Column: Full Schedule & Location */}
        <div className="event-details-main">
          <div className="details-info-card">
            <h2 className="details-card-title">EVENT ESSENTIALS</h2>
            
            <div className="details-meta-list">
              <div className="meta-item">
                <span className="material-symbols-outlined meta-icon">calendar_month</span>
                <div>
                  <span className="meta-label">DATE &amp; DAY</span>
                  <span className="meta-val">{event.date}</span>
                </div>
              </div>

              <div className="meta-item">
                <span className="material-symbols-outlined meta-icon">schedule</span>
                <div>
                  <span className="meta-label">REPORTING TIME</span>
                  <span className="meta-val">{event.time}</span>
                </div>
              </div>

              <div className="meta-item">
                <span className="material-symbols-outlined meta-icon">pin_drop</span>
                <div>
                  <span className="meta-label">VENUE</span>
                  <span className="meta-val">{event.venue}, {event.city}</span>
                </div>
              </div>

              <div className="meta-item">
                <span className="material-symbols-outlined meta-icon">monetization_on</span>
                <div>
                  <span className="meta-label">SPOT CASH PURSE</span>
                  <span className="meta-val text-primary">{event.prize} CASH</span>
                </div>
              </div>
            </div>

            <div className="details-countdown-container">
              <Countdown targetEpoch={event.targetEpoch} label="TIME REMAINING UNTIL SPOTLIGHTS GO LIVE" />
            </div>
          </div>

          <div className="details-info-card">
            <h3 className="details-card-title">SHOW FORMAT &amp; GROUND RULES</h3>
            <ul className="details-rules-list">
              <li><strong>10 Contestants:</strong> Strictly 5 minutes on the live microphone.</li>
              <li><strong>Audience Decibel Meter:</strong> The crowd laughter decibel score decides the podium rank.</li>
              <li><strong>Uncensored Sets:</strong> 18+ content advisory. No political hate speech permitted.</li>
              <li><strong>High Definition Recording:</strong> Multi-camera 4K recording for the official HoH YouTube channel.</li>
              <li><strong>Spot Purse Handover:</strong> ₹15,000 cash disbursed immediately following audience tally.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Pass Options */}
        <div className="event-details-sidebar">
          <div className="pass-selector-box">
            <h3 className="pass-box-title">CHOOSE YOUR PASS</h3>
            <p className="pass-box-sub">Digital tickets with instant QR entry confirmation.</p>

            <div className="pass-tier-card">
              <div className="pass-tier-head">
                <span className="tier-name">GENERAL ENTRY</span>
                <span className="tier-cost">₹{event.genCost}</span>
              </div>
              <ul className="tier-perks">
                <li>Entry to main comedy floor</li>
                <li>Standard seating (first-come first-served)</li>
                <li>Live audience decibel voting participation</li>
              </ul>
              <button
                type="button"
                className="btn btn-outline btn-block"
                onClick={() => openTicketModal(event)}
              >
                SELECT GENERAL
              </button>
            </div>

            <div className="pass-tier-card tier-vip">
              <div className="pass-tier-head">
                <span className="tier-name">VIP STAGE PASS</span>
                <span className="tier-cost">₹{event.vipCost}</span>
              </div>
              <span className="vip-badge">RECOMMENDED FOR FANS</span>
              <ul className="tier-perks">
                <li>Front row reserved seating right next to stage</li>
                <li>1 Complimentary Craft Beverage</li>
                <li>Post-show Green Room meet &amp; greet with judges</li>
              </ul>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => openTicketModal(event)}
              >
                SELECT VIP PASS
              </button>
            </div>

            <div className="event-safety-notice">
              <span className="material-symbols-outlined">verified_user</span>
              <span>100% Verified Entry • Free cancellation up to 24h prior.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
