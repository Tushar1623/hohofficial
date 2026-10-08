import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

import Home from './pages/Home.jsx';
import Participate from './pages/Participate.jsx';
import Tickets from './pages/Tickets.jsx';
import Sponsors from './pages/Sponsors.jsx';
import NotFound from './pages/NotFound.jsx';

const AdminLogin = lazy(() => import('./admin/Login.jsx'));
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./admin/Dashboard.jsx'));
const AdminEvents = lazy(() => import('./admin/Events.jsx'));
const AdminApplications = lazy(() => import('./admin/Applications.jsx'));
const AdminVideo = lazy(() => import('./admin/Video.jsx'));
const AdminTickets = lazy(() => import('./admin/Tickets.jsx'));
const AdminSponsors = lazy(() => import('./admin/Sponsors.jsx'));
const AdminSettings = lazy(() => import('./admin/Settings.jsx'));

const PublicLayout = () => (
  <div className="site-wrapper">
    <Navbar />
    <main className="site-main">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

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
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<div className="admin-loading-screen"><p>Loading...</p></div>}>
              <AdminLogin />
            </Suspense>
          }
        />

        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="admin-loading-screen"><p>Loading...</p></div>}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="video" element={<AdminVideo />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="sponsors" element={<AdminSponsors />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
