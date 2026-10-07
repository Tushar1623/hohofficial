import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportApplicationsToCSV } from '../utils/exportCsv';
import { formatRelativeTime } from '../utils/formatDate';

export const ApplicationManagement = () => {
  const { applications, updateApplicationStatus, deleteApplication, showToast } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = applications.filter((app) => {
    const matchesFilter = filter === 'all' ? true : app.status === filter;
    const matchesSearch =
      searchTerm.trim() === '' ||
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete application ${id} for ${name}?`)) {
      deleteApplication(id);
    }
  };

  return (
    <div className="admin-applications-view">
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>AUDITION SUBMISSIONS &amp; COMEDY TAPES ({applications.length})</h3>
            <p>Filter candidates, watch their submitted sets, and update roster qualification.</p>
          </div>
          <button
            type="button"
            className="btn-action-secondary"
            onClick={() => exportApplicationsToCSV(applications)}
          >
            <span className="material-symbols-outlined">download</span>
            <span>DOWNLOAD CSV</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="table-filter-bar">
          <div className="filter-pills">
            {['all', 'pending', 'shortlisted', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                type="button"
                className={`filter-pill ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status.toUpperCase()} (
                {status === 'all'
                  ? applications.length
                  : applications.filter((a) => a.status === status).length}
                )
              </button>
            ))}
          </div>

          <div style={{ minWidth: '220px' }}>
            <input
              type="text"
              placeholder="Search by name, city, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ padding: '8px 12px', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="table-responsive-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>CONTESTANT ID</th>
                <th>NAME &amp; AGE</th>
                <th>CITY</th>
                <th>WHATSAPP / CONTACT</th>
                <th>STAGE EXP</th>
                <th>AUDITION TAPE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: '#888' }}>
                    No applications match the current filter.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#FF8A00' }}>
                      {app.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{app.name}</div>
                      <div style={{ fontSize: '11px', color: '#888' }}>
                        Age: {app.age} • {app.email}
                      </div>
                    </td>
                    <td>{app.city}</td>
                    <td>
                      <a
                        href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#22c55e', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat</span>
                        <span>{app.phone}</span>
                      </a>
                    </td>
                    <td style={{ fontSize: '12px' }}>{app.exp || app.comedyExperience}</td>
                    <td>
                      {app.tape || app.performanceVideo ? (
                        <a
                          href={app.tape || app.performanceVideo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-icon-action"
                          title="Watch audition video tape"
                        >
                          <span className="material-symbols-outlined" style={{ color: '#FF8A00' }}>
                            play_circle
                          </span>
                        </a>
                      ) : (
                        <span style={{ color: '#666', fontSize: '11px' }}>No link</span>
                      )}
                    </td>
                    <td>
                      <select
                        value={app.status || 'pending'}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className={`status-badge status-${app.status || 'pending'}`}
                        style={{ background: 'transparent', cursor: 'pointer', border: '1px solid currentColor' }}
                      >
                        <option value="pending" style={{ background: '#111', color: '#FFB000' }}>Pending</option>
                        <option value="shortlisted" style={{ background: '#111', color: '#60a5fa' }}>Shortlisted</option>
                        <option value="approved" style={{ background: '#111', color: '#22c55e' }}>Approved</option>
                        <option value="rejected" style={{ background: '#111', color: '#ef4444' }}>Rejected</option>
                      </select>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="btn-icon-action btn-icon-danger"
                          onClick={() => handleDelete(app.id, app.name)}
                          title="Delete application"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
