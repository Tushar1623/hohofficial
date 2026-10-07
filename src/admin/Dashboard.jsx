import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { exportApplicationsToCSV } from '../utils/exportCsv';
import { formatRelativeTime } from '../utils/formatDate';

export const Dashboard = () => {
  const { applications, activeEvent, videos, talent } = useApp();

  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const approvedCount = applications.filter((a) => a.status === 'approved').length;
  const shortlistedCount = applications.filter((a) => a.status === 'shortlisted').length;

  return (
    <div className="admin-dashboard-view">
      {/* 4 Stat Cards */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <span className="stat-card-label">TOTAL APPLICATIONS</span>
          <div className="stat-card-value">{applications.length}</div>
          <p className="stat-card-sub">{pendingCount} pending jury review</p>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">APPROVED STAGE SLOTS</span>
          <div className="stat-card-value" style={{ color: '#22c55e' }}>
            {approvedCount}
          </div>
          <p className="stat-card-sub">{shortlistedCount} shortlisted</p>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">SEATS AVAILABLE</span>
          <div className="stat-card-value" style={{ color: '#FFB000' }}>
            {activeEvent?.seatsLeft || 18}
          </div>
          <p className="stat-card-sub">Out of {activeEvent?.totalCapacity || 100} capacity</p>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">WINNER SPOT PURSE</span>
          <div className="stat-card-value">{activeEvent?.prize || '₹15,000'}</div>
          <p className="stat-card-sub">{activeEvent?.city || 'KOLKATA'} Chapter</p>
        </div>
      </div>

      {/* Active Event Banner & Quick Actions */}
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>CURRENT ACTIVE TOUR CHAPTER</h3>
            <p>Configured as the primary showcase on the website homepage</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/admin/events" className="btn-action-primary">
              <span className="material-symbols-outlined">edit</span>
              <span>EDIT EVENT DETAILS</span>
            </Link>
            <button
              type="button"
              className="btn-action-secondary"
              onClick={() => exportApplicationsToCSV(applications)}
            >
              <span className="material-symbols-outlined">download</span>
              <span>EXPORT APPLICATIONS (CSV)</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: '#0A0A0A', padding: '16px', borderRadius: '6px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#888', fontFamily: 'var(--font-mono)' }}>CHAPTER TITLE</span>
            <div style={{ fontWeight: '700', fontSize: '16px', marginTop: '2px' }}>{activeEvent?.title}</div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#888', fontFamily: 'var(--font-mono)' }}>VENUE &amp; CITY</span>
            <div style={{ fontSize: '14px', marginTop: '2px' }}>{activeEvent?.venue}, {activeEvent?.city}</div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#888', fontFamily: 'var(--font-mono)' }}>SHOW DATE &amp; TIME</span>
            <div style={{ fontSize: '14px', marginTop: '2px' }}>{activeEvent?.date} • {activeEvent?.time}</div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#888', fontFamily: 'var(--font-mono)' }}>TICKET PRICES</span>
            <div style={{ fontSize: '14px', marginTop: '2px' }}>Gen: ₹{activeEvent?.genCost} | VIP: ₹{activeEvent?.vipCost}</div>
          </div>
        </div>
      </div>

      {/* Recent Applications Preview */}
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>RECENT AUDITION SUBMISSIONS</h3>
            <p>Comedians awaiting curatorial assessment</p>
          </div>
          <Link to="/admin/applications" className="btn-action-secondary">
            <span>VIEW ALL ({applications.length})</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="table-responsive-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>COMIC NAME</th>
                <th>CITY</th>
                <th>PHONE / WHATSAPP</th>
                <th>EXPERIENCE</th>
                <th>STATUS</th>
                <th>APPLIED</th>
              </tr>
            </thead>
            <tbody>
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#FF8A00' }}>
                    {app.id}
                  </td>
                  <td style={{ fontWeight: '600' }}>{app.name}</td>
                  <td>{app.city}</td>
                  <td>
                    <a
                      href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#22c55e', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>chat</span>
                      <span>{app.phone}</span>
                    </a>
                  </td>
                  <td>{app.exp || app.comedyExperience}</td>
                  <td>
                    <span className={`status-badge status-${app.status || 'pending'}`}>
                      {app.status || 'pending'}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: '#888' }}>
                    {formatRelativeTime(app.timestamp)}
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
