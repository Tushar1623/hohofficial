import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const ApplicationManagement = () => {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getApplications().then((data) => {
      if (mounted) {
        setApps(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.updateApplication(id, { status });
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Delete application ${id}?`)) {
      await api.deleteApplication(id);
      setApps((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const filtered = apps.filter((a) => {
    const matchFilter = filter === 'all' || a.status === filter;
    const matchSearch =
      !search.trim() ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>AUDITION SUBMISSIONS ({apps.length})</h3>
            <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Review comedy audition tapes and manage qualification</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', 'pending', 'shortlisted', 'approved', 'rejected'].map((s) => (
              <button
                key={s}
                type="button"
                className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(s)}
              >
                {s.toUpperCase()} ({s === 'all' ? apps.length : apps.filter((a) => a.status === s).length})
              </button>
            ))}
          </div>

          <div style={{ minWidth: '220px' }}>
            <input
              type="text"
              placeholder="Search by name, city, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ minHeight: '38px', padding: '8px 12px', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Responsive Table */}
        {loading ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--gray)' }}>Loading applications...</div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME &amp; AGE</th>
                  <th>CITY</th>
                  <th>WHATSAPP</th>
                  <th>EXPERIENCE</th>
                  <th>TAPE LINK</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--gray)' }}>
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((a) => (
                    <tr key={a.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--orange)' }}>
                        {a.id}
                      </td>
                      <td>
                        <strong style={{ color: '#FFF' }}>{a.name}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--gray)', display: 'block' }}>
                          Age: {a.age} • {a.email}
                        </span>
                      </td>
                      <td>{a.city}</td>
                      <td>
                        <a
                          href={`https://wa.me/${a.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#22c55e', textDecoration: 'none' }}
                        >
                          {a.phone}
                        </a>
                      </td>
                      <td style={{ fontSize: '12px' }}>{a.exp}</td>
                      <td>
                        {a.tape ? (
                          <a
                            href={a.tape}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                          >
                            Watch
                          </a>
                        ) : (
                          <span style={{ color: '#666', fontSize: '11px' }}>None</span>
                        )}
                      </td>
                      <td>
                        <select
                          value={a.status || 'pending'}
                          onChange={(e) => handleStatusChange(a.id, e.target.value)}
                          className={`status-badge status-${a.status || 'pending'}`}
                          style={{ background: 'transparent', border: '1px solid currentColor', cursor: 'pointer' }}
                        >
                          <option value="pending" style={{ background: '#111', color: 'var(--yellow)' }}>Pending</option>
                          <option value="shortlisted" style={{ background: '#111', color: '#60a5fa' }}>Shortlisted</option>
                          <option value="approved" style={{ background: '#111', color: '#22c55e' }}>Approved</option>
                          <option value="rejected" style={{ background: '#111', color: '#ef4444' }}>Rejected</option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#ff6b6b', padding: '4px 8px', minHeight: '30px' }}
                          onClick={() => handleDelete(a.id)}
                          title="Delete application"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
