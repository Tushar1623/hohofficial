import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export const Dashboard = () => {
  const [apps, setApps] = useState([]);
  const [events, setEvents] = useState([]);
  const [videos, setVideos] = useState([]);
  const [talent, setTalent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.getApplications(),
      api.getEvents(),
      api.getVideos(),
      api.getTalent()
    ]).then(([a, e, v, t]) => {
      if (mounted) {
        setApps(a);
        setEvents(e);
        setVideos(v);
        setTalent(t);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const pendingCount = apps.filter((a) => a.status === 'pending').length;
  const approvedCount = apps.filter((a) => a.status === 'approved').length;

  if (loading) {
    return <div style={{ padding: '40px', color: 'var(--gray)' }}>Loading dashboard...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#FFF' }}>
          TOUR DASHBOARD
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--gray)' }}>
          High-level overview of contestant applications, tour events, and published content.
        </p>
      </div>

      {/* Clean Stat Cards */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <span className="stat-card-label">APPLICATIONS</span>
          <div className="stat-card-value">{apps.length}</div>
          <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>
            {pendingCount} pending review • {approvedCount} approved
          </p>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">TOUR CHAPTERS</span>
          <div className="stat-card-value" style={{ color: 'var(--yellow)' }}>
            {events.length}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>Active regional stops</p>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">QUALIFIED TALENT</span>
          <div className="stat-card-value" style={{ color: '#22c55e' }}>
            {talent.length}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>Comedians on leaderboard</p>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">VIDEO TAPES</span>
          <div className="stat-card-value" style={{ color: '#60a5fa' }}>
            {videos.length}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>Published sets</p>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>RECENT AUDITION APPLICATIONS</h3>
            <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Newest submissions awaiting assessment</p>
          </div>
          <Link to="/admin/applications" className="btn btn-secondary btn-sm">
            View All ({apps.length})
          </Link>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CITY</th>
                <th>PHONE</th>
                <th>TAPE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {apps.slice(0, 5).map((app) => (
                <tr key={app.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--orange)' }}>
                    {app.id}
                  </td>
                  <td style={{ fontWeight: '600' }}>{app.name}</td>
                  <td>{app.city}</td>
                  <td>
                    <a
                      href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#22c55e', textDecoration: 'none' }}
                    >
                      {app.phone}
                    </a>
                  </td>
                  <td>
                    {app.tape ? (
                      <a href={app.tape} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)', fontSize: '12px' }}>
                        Watch Set
                      </a>
                    ) : (
                      <span style={{ color: '#666' }}>No link</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge status-${app.status || 'pending'}`}>
                      {app.status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
