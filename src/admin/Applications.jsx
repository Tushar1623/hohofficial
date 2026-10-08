import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export const Applications = () => {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApps(search);
  }, []);

  async function loadApps(searchTerm = '') {
    try {
      setLoading(true);
      const data = await api.getApplications(searchTerm);
      setApps(data || []);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadApps(search);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateApplication(id, { status: newStatus });
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      if (selectedApp?.id === id) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contestant application?')) return;
    try {
      await api.deleteApplication(id);
      setApps((prev) => prev.filter((a) => a.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
    } catch (err) {
      alert('Failed to delete application: ' + err.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Contestant Applications</h1>
          <p className="admin-page-desc">Review contestant audition submissions, performance videos, and set qualification status.</p>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="admin-search-bar">
        <div className="search-input-wrap">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search by name, city, email, phone, or application ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          SEARCH
        </button>
        {search && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setSearch('');
              loadApps('');
            }}
          >
            CLEAR
          </button>
        )}
      </form>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedApp(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2>{selectedApp.name}</h2>
                <span className="text-muted" style={{ fontSize: '13px' }}>{selectedApp.id} • {selectedApp.city}</span>
              </div>
              <button type="button" className="btn-icon" onClick={() => setSelectedApp(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="app-detail-body">
              <div className="detail-row">
                <strong>Status:</strong>
                <span className={`status-pill pill-${selectedApp.status?.toLowerCase()}`}>{selectedApp.status}</span>
              </div>
              <div className="detail-row">
                <strong>Phone:</strong>
                <a href={`tel:${selectedApp.phone}`}>{selectedApp.phone}</a>
              </div>
              <div className="detail-row">
                <strong>Email:</strong>
                <a href={`mailto:${selectedApp.email}`}>{selectedApp.email}</a>
              </div>
              {selectedApp.instagram && (
                <div className="detail-row">
                  <strong>Instagram:</strong>
                  <span>{selectedApp.instagram}</span>
                </div>
              )}
              {selectedApp.youtube && (
                <div className="detail-row">
                  <strong>YouTube:</strong>
                  <span>{selectedApp.youtube}</span>
                </div>
              )}
              {selectedApp.exp && (
                <div className="detail-row">
                  <strong>Experience:</strong>
                  <span>{selectedApp.exp}</span>
                </div>
              )}
              <div className="detail-box">
                <strong>Performance Video:</strong>
                <div style={{ marginTop: '4px' }}>
                  <a
                    href={selectedApp.tape}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
                    <span>Watch Audition Tape</span>
                  </a>
                </div>
              </div>
              <div className="detail-box">
                <strong>Introduction &amp; Style:</strong>
                <p style={{ marginTop: '6px', fontSize: '14px', lineHeight: '1.6', color: 'var(--gray)' }}>
                  {selectedApp.bio}
                </p>
              </div>
            </div>

            <div className="admin-modal-actions" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(selectedApp.id)}
              >
                Delete Application
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleStatusChange(selectedApp.id, 'SHORTLISTED')}
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleStatusChange(selectedApp.id, 'APPROVED')}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleStatusChange(selectedApp.id, 'REJECTED')}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applications Table */}
      {loading ? (
        <div className="admin-card text-center"><p>Loading applications...</p></div>
      ) : apps.length === 0 ? (
        <div className="admin-card text-center">
          <p>No applications match your search or filter.</p>
        </div>
      ) : (
        <div className="admin-card table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID &amp; Name</th>
                <th>Contact</th>
                <th>City</th>
                <th>Audition Video</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id}>
                  <td>
                    <strong>{a.name}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}>{a.id}</div>
                  </td>
                  <td style={{ fontSize: '13px' }}>
                    <div>{a.phone}</div>
                    <div className="text-muted" style={{ fontSize: '12px' }}>{a.email}</div>
                  </td>
                  <td style={{ fontSize: '13px' }}>{a.city}</td>
                  <td>
                    {a.tape ? (
                      <a
                        href={a.tape}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="video-link-tag"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>play_circle</span>
                        <span>View Tape</span>
                      </a>
                    ) : (
                      <span className="text-muted">None</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-pill pill-${a.status?.toLowerCase()}`}>{a.status}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={() => setSelectedApp(a)}
                        title="View Full Application"
                      >
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button
                        type="button"
                        className="btn-icon success"
                        onClick={() => handleStatusChange(a.id, 'APPROVED')}
                        title="Approve"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button
                        type="button"
                        className="btn-icon danger"
                        onClick={() => handleDelete(a.id)}
                        title="Delete"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Applications;
