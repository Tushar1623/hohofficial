import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import '../styles/admin.css';

export const AdminLayout = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  // Determine section title from pathname
  const path = location.pathname;
  let title = 'ADMIN DASHBOARD';
  let subtitle = 'Live tour metrics, upcoming event countdown & quick actions';

  if (path.includes('/admin/events')) {
    title = 'TOUR EVENT MANAGER';
    subtitle = 'Configure upcoming chapter dates, ticket pricing, and venue locations';
  } else if (path.includes('/admin/applications')) {
    title = 'AUDITION SUBMISSIONS';
    subtitle = 'Review comedian applications, audition tapes, and manage status';
  } else if (path.includes('/admin/videos')) {
    title = 'VIDEO & YOUTUBE MANAGER';
    subtitle = 'Update featured episode and organize published stand-up tapes';
  } else if (path.includes('/admin/talent')) {
    title = 'TALENT ROSTER';
    subtitle = 'Manage comedian rankings, scores, and qualified finalists';
  } else if (path.includes('/admin/guests')) {
    title = 'JURY & GUEST ARTISTS';
    subtitle = 'Configure industry headliners and evaluation panel members';
  } else if (path.includes('/admin/sponsors')) {
    title = 'SPONSOR PARTNERS';
    subtitle = 'Manage brand partnerships and sponsor tiers';
  } else if (path.includes('/admin/settings')) {
    title = 'SITE SETTINGS';
    subtitle = 'Global circuit parameters, contact info, and registration toggles';
  }

  return (
    <div className="admin-layout-root">
      <AdminSidebar
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="admin-main-wrap">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onToggleMobileNav={() => setMobileNavOpen((prev) => !prev)}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
