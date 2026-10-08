import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const SponsorManagement = () => {
  const [sponsors, setSponsors] = useState([]);
  const [form, setForm] = useState({ name: '', tier: 'Official Partner', website: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const list = await api.getSponsors();
    setSponsors(list);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name) return;

    const updated = [...sponsors, { ...form, id: `sp-${Date.now()}` }];
    await api.saveSponsors(updated);
    setForm({ name: '', tier: 'Official Partner', website: '' });
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove sponsor?')) {
      const updated = sponsors.filter((s) => s.id !== id);
      await api.saveSponsors(updated);
      load();
    }
  };

  return (
    <div>
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>ADD BRAND SPONSOR / PARTNER</h3>
            <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Ecosystem partners supporting tour chapters</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Brand Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Partnership Tier *</label>
            <input
              type="text"
              placeholder="e.g. Official Audio Partner"
              value={form.tier}
              onChange={(e) => setForm({ ...form, tier: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Website (Optional)</label>
            <input
              type="url"
              placeholder="https://brand.com"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Add Partner
            </button>
          </div>
        </form>
      </div>

      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>CURRENT SPONSORS ({sponsors.length})</h3>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '20px', color: 'var(--gray)' }}>Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>BRAND</th>
                  <th>TIER</th>
                  <th>WEBSITE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {sponsors.map((s) => (
                  <tr key={s.id}>
                    <td><strong style={{ color: '#FFF' }}>{s.name}</strong></td>
                    <td><span style={{ color: 'var(--yellow)' }}>{s.tier}</span></td>
                    <td style={{ fontSize: '12px', color: 'var(--gray)' }}>{s.website || '—'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#ff6b6b', padding: '4px 8px', minHeight: '30px' }}
                        onClick={() => handleDelete(s.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
