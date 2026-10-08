import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

// Public Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Public Pages (Direct Imports for Instant Rendering)
import Home from './pages/Home.jsx';
import Participate from './pages/Participate.jsx';
import Tickets from './pages/Tickets.jsx';
import NotFound from './pages/NotFound.jsx';

// Admin Routes (Lazy-loaded for Performance)
const AdminLogin = lazy(() => import('./admin/Login.jsx'));
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./admin/Dashboard.jsx'));
const AdminEvents = lazy(() => import('./admin/Events.jsx'));
const AdminApplications = lazy(() => import('./admin/Applications.jsx'));
const AdminVideo = lazy(() => import('./admin/Video.jsx'));
const AdminTickets = lazy(() => import('./admin/Tickets.jsx'));
const AdminSettings = lazy(() => import('./admin/Settings.jsx'));

// Public Layout Wrapper with Navbar & Footer
const PublicLayout = () => (
  <div className="site-wrapper">
    <Navbar />
    <main className="site-main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Scroll to top helper on route change
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
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/tickets" element={<Tickets />} />

          {/* Legacy route redirects */}
          <Route path="/apply" element={<Navigate to="/participate" replace />} />
          <Route path="/events" element={<Navigate to="/tickets" replace />} />
          <Route path="/events/:id" element={<Navigate to="/tickets" replace />} />
          <Route path="/watch" element={<Navigate to="/" replace />} />
          <Route path="/talent" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />

          {/* 404 within public layout */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<div className="admin-loading-screen"><p>Loading Admin Login...</p></div>}>
              <AdminLogin />
            </Suspense>
          }
        />

        {/* Admin CMS (Protected behind passkey gate) */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="admin-loading-screen"><p>Loading Admin Panel...</p></div>}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="video" element={<AdminVideo />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
