import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-link">
              <img
                src="/HoH.jpg"
                alt="House of Humour"
                className="footer-logo-img"
                width="44"
                height="44"
              />
              <div className="footer-brand-text">
                <span className="footer-title">HOUSE OF <span>HUMOUR</span></span>
                <span className="footer-tagline">INDIA'S BIGGEST STAND-UP HUNT</span>
              </div>
            </Link>
            <p className="footer-desc">
              One Stage. Raw Microphones. Uncensored Audiences. Finding India's next breakout comedy stars across 6 regional circuits.
            </p>
            <div className="footer-socials">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube Channel">
                <span className="material-symbols-outlined">smart_display</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <span className="material-symbols-outlined">photo_camera</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="X Twitter">
                <span className="material-symbols-outlined">chat</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Arena</Link></li>
              <li><Link to="/events">Tour Schedule</Link></li>
              <li><Link to="/apply">Audition Portal</Link></li>
              <li><Link to="/watch">Watch 4K Tapes</Link></li>
              <li><Link to="/talent">Talent Leaderboard</Link></li>
              <li><Link to="/about">About HoH</Link></li>
            </ul>
          </div>

          {/* Tour Circuits */}
          <div className="footer-col">
            <h4 className="footer-col-title">TOUR CIRCUITS</h4>
            <ul className="footer-links">
              <li><span>Kolkata Chapter (East)</span></li>
              <li><span>Mumbai Circuit (West)</span></li>
              <li><span>Delhi NCR Arena (North)</span></li>
              <li><span>Bengaluru Club (South)</span></li>
              <li><span>Pune Open Stage</span></li>
            </ul>
          </div>

          {/* Admin & Legal */}
          <div className="footer-col">
            <h4 className="footer-col-title">ORGANIZERS</h4>
            <ul className="footer-links">
              <li><Link to="/admin">Admin Control Panel</Link></li>
              <li><a href="mailto:auditions@houseofhumour.in">Partner With Us</a></li>
              <li><a href="mailto:auditions@houseofhumour.in">Curator Inquiries</a></li>
              <li><span className="text-dim">GST &amp; Compliance Verified</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} HOUSE OF HUMOUR (HoH). ALL RIGHTS RESERVED. CRAFTED FOR INDIAN STAND-UP COMEDY.
            </p>
            <div className="footer-meta-tags">
              <span className="meta-badge">LIVE CIRCUIT 2026</span>
              <span className="meta-badge">UNCENSORED</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
