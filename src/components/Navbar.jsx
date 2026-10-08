import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Handle ESC
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

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="nav-menu">
              <li><NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>HOME</NavLink></li>
              <li><NavLink to="/participate" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>PARTICIPATE</NavLink></li>
              <li><NavLink to="/tickets" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>TICKETS</NavLink></li>
              <li><NavLink to="/sponsors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>SPONSORS</NavLink></li>
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/tickets" className="btn btn-primary btn-sm nav-cta-desktop">
              GET TICKETS
            </Link>

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
        >
          <div
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div className="mobile-drawer-header">
              <div className="brand-link">
                <img
                  src="/HoH.jpg"
                  alt="HoH Logo"
                  className="brand-logo-img"
                  width="36"
                  height="36"
                />
                <span className="brand-title">HOUSE OF <span>HUMOUR</span></span>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="mobile-nav-links">
              <NavLink to="/" end className="mobile-nav-item" onClick={closeMenu}>
                HOME
              </NavLink>
              <NavLink to="/participate" className="mobile-nav-item" onClick={closeMenu}>
                PARTICIPATE
              </NavLink>
              <NavLink to="/tickets" className="mobile-nav-item" onClick={closeMenu}>
                TICKETS
              </NavLink>
              <NavLink to="/sponsors" className="mobile-nav-item" onClick={closeMenu}>
                SPONSORS
              </NavLink>
            </nav>

            <div className="mobile-drawer-cta">
              <Link to="/tickets" className="btn btn-primary btn-block" onClick={closeMenu}>
                GET TICKETS
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
