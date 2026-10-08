import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api.js';

export const AdminLayout = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthed = api.isAuthenticated();
    if (!isAuthed) {
      navigate('/admin/login', { replace: true });
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const handleLogout = async () => {
    await api.logout();
    navigate('/admin/login', { replace: true });
  };

  if (!authChecked) {
    return (
      <div className="admin-loading-screen">
        <p>Checking admin authorization...</p>
      </div>
    );
  }

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-root">
      {/* Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-sidebar-brand" target="_blank" title="Preview Public Site">
            <img src="/HoH.jpg" alt="HoH" width="32" height="32" />
            <div>
              <span className="brand-name">HOH ADMIN</span>
              <span className="brand-tag">CMS PANEL</span>
            </div>
          </Link>
          <button
            type="button"
            className="btn-icon mobile-only"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/events" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="material-symbols-outlined">event</span>
            <span>Events</span>
          </NavLink>
          <NavLink to="/admin/applications" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="material-symbols-outlined">description</span>
            <span>Applications</span>
          </NavLink>
          <NavLink to="/admin/video" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="material-symbols-outlined">smart_display</span>
            <span>Featured Video</span>
          </NavLink>
          <NavLink to="/admin/tickets" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="material-symbols-outlined">confirmation_number</span>
            <span>Tickets</span>
          </NavLink>
          <NavLink to="/admin/sponsors" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="material-symbols-outlined">handshake</span>
            <span>Sponsors</span>
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" target="_blank" className="btn btn-secondary btn-sm btn-block" style={{ marginBottom: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
            <span>View Public Site</span>
          </Link>
          <button type="button" className="btn btn-outline-danger btn-sm btn-block" onClick={handleLogout}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="admin-main-wrapper">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="btn-icon mobile-only"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="topbar-title">HOUSE OF HUMOUR ADMIN</h2>
          </div>

          <div className="topbar-actions">
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div className="admin-mobile-backdrop" onClick={closeSidebar} aria-hidden="true" />
      )}
    </div>
  );
};

export default AdminLayout;
