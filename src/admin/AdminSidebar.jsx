import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div>
          {/* Brand header */}
          <Link to="/admin" className="sidebar-brand" onClick={onClose}>
            <img src="/HoH.jpg" alt="HoH Logo" width="40" height="40" />
            <div>
              <h1>HOUSE OF HUMOUR</h1>
              <span>ORGANIZER CONSOLE</span>
            </div>
          </Link>

          {/* Navigation links */}
          <nav aria-label="Admin Sections">
            <ul className="sidebar-menu">
              <li>
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  <span>DASHBOARD</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/events"
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined">theater_comedy</span>
                  <span>EVENTS MANAGER</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/applications"
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined">how_to_reg</span>
                  <span>APPLICATIONS</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/videos"
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined">smart_display</span>
                  <span>VIDEOS &amp; TAPES</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/talent"
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined">groups</span>
                  <span>TALENT ROSTER</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/guests"
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined">workspace_premium</span>
                  <span>GUESTS &amp; JURY</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/sponsors"
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined">handshake</span>
                  <span>SPONSORS</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined">settings</span>
                  <span>SETTINGS</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* User profile footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">HOH</div>
            <div className="user-meta">
              <span className="user-name">Show Producer</span>
              <span className="user-role">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
