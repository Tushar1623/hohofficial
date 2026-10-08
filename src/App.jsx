import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Public Pages (Direct Imports for Instant First Load)
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Apply } from './pages/Apply';
import { Watch } from './pages/Watch';
import { Talent } from './pages/Talent';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

// Admin Routes (Lazy-loaded for Performance - Phase 11)
const AdminLayout = lazy(() => import('./admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const Dashboard = lazy(() => import('./admin/Dashboard').then(m => ({ default: m.Dashboard })));
const EventManagement = lazy(() => import('./admin/Events').then(m => ({ default: m.EventManagement })));
const ApplicationManagement = lazy(() => import('./admin/Applications').then(m => ({ default: m.ApplicationManagement })));
const VideoManagement = lazy(() => import('./admin/Videos').then(m => ({ default: m.VideoManagement })));
const TalentManagement = lazy(() => import('./admin/Talent').then(m => ({ default: m.TalentManagement })));
const GuestManagement = lazy(() => import('./admin/Guests').then(m => ({ default: m.GuestManagement })));
const SponsorManagement = lazy(() => import('./admin/Sponsors').then(m => ({ default: m.SponsorManagement })));
const Settings = lazy(() => import('./admin/Settings').then(m => ({ default: m.Settings })));

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/talent" element={<Talent />} />
        <Route path="/about" element={<About />} />

        {/* Admin Protected Routes (Code-split) */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray)' }}>Loading Admin Console...</div>}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="applications" element={<ApplicationManagement />} />
          <Route path="videos" element={<VideoManagement />} />
          <Route path="talent" element={<TalentManagement />} />
          <Route path="guests" element={<GuestManagement />} />
          <Route path="sponsors" element={<SponsorManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
