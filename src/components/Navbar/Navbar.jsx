import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openTicketModal } = useApp();
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);
  const navigate = useNavigate();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Handle ESC key and outside clicks to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleTicketClick = () => {
    closeMenu();
    openTicketModal();
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          {/* Official Brand Logo */}
          <Link to="/" className="brand-link" onClick={closeMenu} aria-label="House of Humour Home">
            <img
              src="/HoH.jpg"
              alt="House of Humour Official Logo"
              className="brand-logo-img"
              width="48"
              height="48"
              loading="eager"
            />
            <div className="brand-text">
              <span className="brand-title">
                HOUSE OF <span>HUMOUR</span>
              </span>
              <span className="brand-subtitle">INDIA'S COMEDY TALENT HUNT</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="nav-menu">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  EVENTS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/apply"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  CONTESTANT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/watch"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  WATCH
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/talent"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  TALENT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  className="nav-link admin-pill"
                  title="Admin Dashboard"
                >
                  ADMIN
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Desktop Action Button */}
          <div className="header-actions">
            <button
              type="button"
              className="btn btn-primary btn-ticket-nav"
              onClick={() => openTicketModal()}
              aria-label="Book Tickets for Upcoming Show"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                confirmation_number
              </span>
              <span>GET TICKETS</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              ref={triggerRef}
              type="button"
              className="mobile-nav-toggle"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}

      {/* Accessible Mobile Drawer */}
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-brand">
            <img src="/HoH.jpg" alt="HoH" width="36" height="36" />
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

        <nav className="mobile-drawer-nav">
          <ul className="mobile-nav-list">
            <li>
              <NavLink to="/" className="mobile-nav-link" onClick={closeMenu} end>
                <span className="material-symbols-outlined">home</span>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className="mobile-nav-link" onClick={closeMenu}>
                <span className="material-symbols-outlined">theater_comedy</span>
                <span>Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/apply" className="mobile-nav-link" onClick={closeMenu}>
                <span className="material-symbols-outlined">mic</span>
                <span>Contestant Application</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/watch" className="mobile-nav-link" onClick={closeMenu}>
                <span className="material-symbols-outlined">smart_display</span>
                <span>Watch Videos</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/talent" className="mobile-nav-link" onClick={closeMenu}>
                <span className="material-symbols-outlined">groups</span>
                <span>Talent Roster</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="mobile-nav-link" onClick={closeMenu}>
                <span className="material-symbols-outlined">info</span>
                <span>About HoH</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" className="mobile-nav-link admin-highlight" onClick={closeMenu}>
                <span className="material-symbols-outlined">admin_panel_settings</span>
                <span>Admin Panel</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="btn btn-primary btn-block btn-drawer-ticket"
            onClick={handleTicketClick}
          >
            <span className="material-symbols-outlined">confirmation_number</span>
            <span>GET TICKETS</span>
          </button>
          <p className="mobile-drawer-note">India's Biggest Stand-Up Comedy Hunt</p>
        </div>
      </div>
    </header>
  );
};
