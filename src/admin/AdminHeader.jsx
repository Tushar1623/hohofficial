import React from 'react';
import { Link } from 'react-router-dom';

export const AdminHeader = ({ title, subtitle, onToggleMobileNav }) => {
  return (
    <header className="admin-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button"
          className="admin-mobile-toggle"
          onClick={onToggleMobileNav}
          aria-label="Toggle admin sidebar"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="topbar-title">
          <h2>{title}</h2>
          <p>{subtitle || 'House of Humour Production & Content Management Console'}</p>
        </div>
      </div>

      <div className="topbar-actions">
        <Link to="/" className="btn-live-site">
          <span className="material-symbols-outlined">visibility</span>
          <span>VIEW LIVE SITE</span>
        </Link>
      </div>
    </header>
  );
};
