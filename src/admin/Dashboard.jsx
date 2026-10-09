import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

export const Dashboard = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [apps, setApps] = useState([]);
  const [video, setVideo] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [evRes, appRes, vidRes, sponsorsRes, healthRes] = await Promise.allSettled([
          api.getNextEvent(),
          api.getApplications(),
          api.getFeaturedVideo(),
          api.getAdminSponsors(),
          api.getHealth()
        ]);
        if (mounted) {
          if (evRes.status === 'fulfilled') setNextEvent(evRes.value);
          if (appRes.status === 'fulfilled') setApps(appRes.value || []);
          if (vidRes.status === 'fulfilled') setVideo(vidRes.value);
          if (sponsorsRes.status === 'fulfilled') setSponsors(sponsorsRes.value || []);
          if (healthRes.status === 'fulfilled') setDbStatus(healthRes.value);
        }
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const pendingApps = apps.filter((a) => a.status === 'PENDING').length;
  const shortlistedApps = apps.filter((a) => a.status === 'SHORTLISTED').length;
  const approvedApps = apps.filter((a) => a.status === 'APPROVED').length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard Overview</h1>
          <p className="admin-page-desc">Summary of live events, applicant auditions, and featured content.</p>
        </div>
      </div>

      {/* Database Connection Banner */}
      {dbStatus && (
        <div className={`db-status-banner ${dbStatus.database === 'connected' ? 'connected' : 'disconnected'}`}>
          <span className="material-symbols-outlined">
            {dbStatus.database === 'connected' ? 'cloud_done' : 'cloud_off'}
          </span>
          <div>
            <strong>MongoDB Status: </strong>
            <span>{dbStatus.database === 'connected' ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="admin-card text-center"><p>Loading dashboard overview...</p></div>
      ) : (
        <>
          {/* Quick Stats Grid */}
          <div className="admin-stats-grid">
            <div className="stat-card">
              <span className="stat-label">NEXT LIVE EVENT</span>
              <span className="stat-val">{nextEvent ? nextEvent.city : 'None Set'}</span>
              <span className="stat-sub">{nextEvent ? nextEvent.title : 'No upcoming event'}</span>
              <Link to="/admin/events" className="stat-link">Manage Events &rarr;</Link>
            </div>

            <div className="stat-card">
              <span className="stat-label">PENDING AUDITIONS</span>
              <span className="stat-val stat-warning">{pendingApps}</span>
              <span className="stat-sub">{apps.length} Total Submissions</span>
              <Link to="/admin/applications" className="stat-link">Review Applications &rarr;</Link>
            </div>

            <div className="stat-card">
              <span className="stat-label">SHORTLISTED COMICS</span>
              <span className="stat-val stat-success">{shortlistedApps}</span>
              <span className="stat-sub">{approvedApps} Approved</span>
              <Link to="/admin/applications" className="stat-link">View Roster &rarr;</Link>
            </div>

            <div className="stat-card">
              <span className="stat-label">FEATURED VIDEO</span>
              <span className="stat-val" style={{ fontSize: '18px' }}>
                {video?.title ? video.title.slice(0, 22) + '...' : 'None'}
              </span>
              <span className="stat-sub">Homepage Highlight</span>
              <Link to="/admin/video" className="stat-link">Update Video &rarr;</Link>
            </div>

            <div className="stat-card">
              <span className="stat-label">BRAND SPONSORS</span>
              <span className="stat-val stat-success">
                {sponsors.filter((s) => s.isActive !== false).length}
              </span>
              <span className="stat-sub">{sponsors.length} Total Partners</span>
              <Link to="/admin/sponsors" className="stat-link">Manage Sponsors &rarr;</Link>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="admin-grid-2">
            <div className="admin-card">
              <h3 className="card-section-title">Next Scheduled Tour Event</h3>
              {nextEvent ? (
                <div className="overview-item-details">
                  <p><strong>Title:</strong> {nextEvent.title}</p>
                  <p><strong>City &amp; Venue:</strong> {nextEvent.city} • {nextEvent.venue}</p>
                  <p><strong>Status:</strong> <span className="status-badge-inline">{nextEvent.status}</span></p>
                  <p><strong>Prize Purse:</strong> {nextEvent.prize}</p>
                  <div style={{ marginTop: '12px' }}>
                    <Link to="/admin/events" className="btn btn-secondary btn-sm">Edit Event Details</Link>
                  </div>
                </div>
              ) : (
                <p className="text-muted">No upcoming event is currently published.</p>
              )}
            </div>

            <div className="admin-card">
              <h3 className="card-section-title">Recent Audition Submissions</h3>
              {apps.length > 0 ? (
                <div className="recent-apps-list">
                  {apps.slice(0, 4).map((a) => (
                    <div key={a.id} className="recent-app-row">
                      <div>
                        <strong>{a.name}</strong>
                        <span className="text-muted" style={{ marginLeft: '8px', fontSize: '12px' }}>({a.city})</span>
                      </div>
                      <span className={`status-pill pill-${a.status?.toLowerCase()}`}>{a.status}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: '12px' }}>
                    <Link to="/admin/applications" className="btn btn-secondary btn-sm">View All Applications</Link>
                  </div>
                </div>
              ) : (
                <p className="text-muted">No applications submitted yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
