import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Public Pages
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Apply } from './pages/Apply';
import { Watch } from './pages/Watch';
import { Talent } from './pages/Talent';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

// Admin Components
import { AdminLayout } from './admin/AdminLayout';
import { Dashboard } from './admin/Dashboard';
import { EventManagement } from './admin/Events';
import { ApplicationManagement } from './admin/Applications';
import { VideoManagement } from './admin/Videos';
import { TalentManagement } from './admin/Talent';
import { GuestManagement } from './admin/Guests';
import { SponsorManagement } from './admin/Sponsors';
import { Settings } from './admin/Settings';

// Global Modals & Notifications
import { TicketModal } from './components/Modal/TicketModal';
import { VideoModal } from './components/VideoModal/VideoModal';
import { Toast } from './components/Toast/Toast';

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
    <AppProvider>
      <ScrollToTop />
      {/* Background grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/talent" element={<Talent />} />
        <Route path="/about" element={<About />} />

        {/* Admin Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
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

      {/* Global Modals & Toasts */}
      <TicketModal />
      <VideoModal />
      <Toast />
    </AppProvider>
  );
};

export default App;
