import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-simple-content">
          <div className="footer-brand">
            <img src="/HoH.jpg" alt="HoH" width="32" height="32" className="footer-logo-img" />
            <span className="footer-title">
              HOUSE OF <span style={{ color: 'var(--orange)' }}>HUMOUR</span>
            </span>
          </div>

          <nav className="footer-nav" aria-label="Footer Navigation">
            <Link to="/">Home</Link>
            <span className="footer-nav-divider">|</span>
            <Link to="/participate">Participate</Link>
            <span className="footer-nav-divider">|</span>
            <Link to="/tickets">Tickets</Link>
            <span className="footer-nav-divider">|</span>
            <Link to="/sponsors">Sponsors</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HOUSE OF HUMOUR (HoH). India’s Biggest Stand-Up Comedy Talent Hunt.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
