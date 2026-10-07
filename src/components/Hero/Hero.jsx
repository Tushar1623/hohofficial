import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BENTO_STATS } from '../../data/demoData';

export const Hero = () => {
  const { activeEvent, openTicketModal } = useApp();

  return (
    <section className="hero-section" aria-label="House of Humour Hero Presentation">
      {/* Background spotlights & ambient glow */}
      <div className="stage-spotlight-beam" aria-hidden="true" />
      <div className="stage-ambient-glow" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">
          {/* Eyebrow Badge */}
          <div className="hero-eyebrow">
            <span className="live-dot" />
            <span className="eyebrow-text">
              {activeEvent?.city || 'KOLKATA'} CHAPTER FINALS • ₹15,000 LIVE SPOT PURSE
            </span>
          </div>

          {/* Central Official Logo Presentation */}
          <div className="hero-logo-centerpiece">
            <div className="hero-logo-frame">
              <img
                src="/HoH.jpg"
                alt="House of Humour"
                className="hero-brand-logo"
                width="140"
                height="140"
                priority="true"
              />
            </div>
            <div className="hero-brand-badge">OFFICIAL BRAND STAGE</div>
          </div>

          {/* Main Cinematic Title */}
          <h1 className="hero-title">
            WHERE NO JOKE <br />
            <span className="text-gradient">IS TOO FAR.</span>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline">
            India’s rawest, most electrifying stand-up comedy talent hunt. 10 handpicked comics take the mic under unforgiving club spotlights. Audience roar dictates who takes home ₹15,000 spot cash.
          </p>

          {/* Dual Primary Action Buttons */}
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-hero"
              onClick={() => openTicketModal(activeEvent)}
              aria-label="Book passes for upcoming live showcase"
            >
              <span className="material-symbols-outlined">confirmation_number</span>
              <span>GET EVENT PASS — ₹{activeEvent?.genCost || 399}</span>
            </button>

            <Link
              to="/apply"
              className="btn btn-secondary btn-hero"
              aria-label="Submit audition for House of Humour"
            >
              <span className="material-symbols-outlined">mic</span>
              <span>APPLY AS CONTESTANT</span>
            </Link>
          </div>

          {/* Fast Information Strip */}
          <div className="hero-metrics-grid" aria-label="Key Showcase Statistics">
            {BENTO_STATS.map((stat, i) => (
              <div key={i} className="metric-card">
                <span className={`metric-number text-${stat.color}`}>{stat.number}</span>
                <span className="metric-title">{stat.title}</span>
                <span className="metric-desc">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
