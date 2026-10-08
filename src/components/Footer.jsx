import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img src="/HoH.jpg" alt="HoH" width="36" height="36" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFF' }}>
                HOUSE OF <span style={{ color: 'var(--orange)' }}>HUMOUR</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: '1.6', maxWidth: '300px' }}>
              India’s grassroots stand-up comedy talent hunt. 10 comics. 5-minute sets. Audience decibel scores dictate the champion.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--yellow)', marginBottom: '12px', letterSpacing: '0.08em' }}>
              NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--gray)' }}>
              <li><Link to="/">Home Arena</Link></li>
              <li><Link to="/events">Tour Schedule</Link></li>
              <li><Link to="/apply">Audition Portal</Link></li>
              <li><Link to="/watch">Watch Videos</Link></li>
              <li><Link to="/talent">Talent Roster</Link></li>
              <li><Link to="/about">About HoH</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--yellow)', marginBottom: '12px', letterSpacing: '0.08em' }}>
              CIRCUITS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--gray)' }}>
              <li>Kolkata (East)</li>
              <li>Mumbai (West)</li>
              <li>Delhi NCR (North)</li>
              <li>Bengaluru (South)</li>
              <li>Pune Open Stage</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--yellow)', marginBottom: '12px', letterSpacing: '0.08em' }}>
              CONTACT &amp; ENQUIRIES
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--gray)' }}>
              <li><a href="mailto:auditions@houseofhumour.in">auditions@houseofhumour.in</a></li>
              <li>WhatsApp: +91 98301 22345</li>
              <li><Link to="/admin" style={{ opacity: 0.5, fontSize: '11px' }}>Admin Access</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HOUSE OF HUMOUR (HoH). ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
