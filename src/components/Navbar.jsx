import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu on click/tap outside
  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'nav-open' : ''}`}
    >
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

      {/* Mobile Navigation Dropdown — Attached directly below header */}
      {mobileOpen && (
        <nav
          className="mobile-nav-dropdown"
          aria-label="Mobile Navigation"
        >
          <div className="mobile-nav-list">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              HOME
            </NavLink>
            <NavLink
              to="/participate"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              PARTICIPATE
            </NavLink>
            <NavLink
              to="/tickets"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              TICKETS
            </NavLink>
            <NavLink
              to="/sponsors"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              SPONSORS
            </NavLink>
          </div>

          <div className="mobile-nav-cta-wrapper">
            <Link
              to="/tickets"
              className="btn btn-primary btn-block mobile-cta-btn"
              onClick={closeMenu}
            >
              GET TICKETS
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
