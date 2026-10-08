import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const AdminLayout = () => {
  const [auth, setAuth] = useState(() => api.isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (api.loginAdmin(passcode)) {
      setAuth(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    api.logoutAdmin();
    setAuth(false);
    navigate('/');
  };

  // Simple, un-bloated Passcode Gate
  if (!auth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', padding: '20px' }}>
        <form onSubmit={handleLogin} style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '36px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
          <img src="/HoH.jpg" alt="HoH" width="48" height="48" style={{ margin: '0 auto 16px auto' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFF', marginBottom: '8px' }}>
            HOH ORGANIZER CONSOLE
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '20px' }}>
            Enter passkey to manage tour chapters and contestant applications.
          </p>

          {authError && (
            <div style={{ background: 'rgba(229,57,53,0.2)', border: '1px solid var(--red)', color: '#ff6b6b', padding: '8px', borderRadius: '4px', fontSize: '12px', marginBottom: '14px' }}>
              Invalid passcode. (Default: <code>hoh2026</code>)
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Enter passcode (e.g. hoh2026)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="form-input"
              required
              autoFocus
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Access Dashboard
          </button>

          <Link to="/" style={{ display: 'block', marginTop: '16px', fontSize: '12px', color: 'var(--gray)' }}>
            Return to public site
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-layout-root">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
            <img src="/HoH.jpg" alt="HoH" width="36" height="36" />
            <div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFF', display: 'block', lineHeight: '1' }}>
                HOUSE OF <span style={{ color: 'var(--orange)' }}>HUMOUR</span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--yellow)', letterSpacing: '0.1em' }}>
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { to: '/admin', end: true, icon: 'dashboard', label: 'Dashboard' },
                { to: '/admin/events', icon: 'theater_comedy', label: 'Events' },
                { to: '/admin/applications', icon: 'how_to_reg', label: 'Applications' },
                { to: '/admin/videos', icon: 'smart_display', label: 'Videos' },
                { to: '/admin/talent', icon: 'groups', label: 'Talent' },
                { to: '/admin/guests', icon: 'workspace_premium', label: 'Jury & Guests' },
                { to: '/admin/sponsors', icon: 'handshake', label: 'Sponsors' },
                { to: '/admin/settings', icon: 'settings', label: 'Settings' }
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `btn btn-block ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ justifyContent: 'flex-start', padding: '10px 14px', fontSize: '12px' }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <button
            type="button"
            className="btn btn-secondary btn-block btn-sm"
            onClick={handleLogout}
            style={{ color: '#ff6b6b' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrap">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ display: 'inline-flex' }}
              aria-label="Toggle admin menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--yellow)', fontWeight: '700' }}>
              PRODUCER WORKSPACE
            </span>
          </div>

          <Link to="/" className="btn btn-secondary btn-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>visibility</span>
            <span>Live Site</span>
          </Link>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
