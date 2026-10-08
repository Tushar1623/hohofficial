import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Navbar = ({ onOpenTickets }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = orig; };
    }
  }, [mobileOpen]);

  // Handle ESC & outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="brand-link" onClick={closeMenu} aria-label="House of Humour">
            <img
              src="/HoH.jpg"
              alt="House of Humour Logo"
              className="brand-logo-img"
              width="44"
              height="44"
            />
            <div>
              <span className="brand-title">HOUSE OF <span>HUMOUR</span></span>
              <span className="brand-subtitle">STAND-UP COMEDY HUNT</span>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="nav-menu">
              <li><NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>HOME</NavLink></li>
              <li><NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>EVENTS</NavLink></li>
              <li><NavLink to="/apply" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>CONTESTANT</NavLink></li>
              <li><NavLink to="/watch" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>WATCH</NavLink></li>
              <li><NavLink to="/talent" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>TALENT</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>ABOUT</NavLink></li>
            </ul>
          </nav>

          <div className="header-actions">
            {onOpenTickets ? (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={onOpenTickets}
                aria-label="Get event passes"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>confirmation_number</span>
                <span>GET TICKETS</span>
              </button>
            ) : (
              <Link to="/events" className="btn btn-primary btn-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>confirmation_number</span>
                <span>GET TICKETS</span>
              </Link>
            )}

            <button
              type="button"
              className="mobile-nav-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div>
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-brand">
              <img src="/HoH.jpg" alt="HoH" width="32" height="32" />
              <span>HOUSE OF HUMOUR</span>
            </div>
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <ul className="mobile-nav-list">
            <li><NavLink to="/" end className="mobile-nav-link" onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/events" className="mobile-nav-link" onClick={closeMenu}>Events</NavLink></li>
            <li><NavLink to="/apply" className="mobile-nav-link" onClick={closeMenu}>Apply as Contestant</NavLink></li>
            <li><NavLink to="/watch" className="mobile-nav-link" onClick={closeMenu}>Watch Sets</NavLink></li>
            <li><NavLink to="/talent" className="mobile-nav-link" onClick={closeMenu}>Talent Roster</NavLink></li>
            <li><NavLink to="/about" className="mobile-nav-link" onClick={closeMenu}>About HoH</NavLink></li>
          </ul>
        </div>

        <div>
          {onOpenTickets ? (
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => { closeMenu(); onOpenTickets(); }}
            >
              GET TICKETS
            </button>
          ) : (
            <Link to="/events" className="btn btn-primary btn-block" onClick={closeMenu}>
              GET TICKETS
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
