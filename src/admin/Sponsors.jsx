import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SponsorManagement = () => {
  const { sponsors, setSponsors, showToast } = useApp();

  const [newSponsor, setNewSponsor] = useState({
    name: '',
    tier: 'Official Partner',
    website: '',
    description: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSponsor.name) {
      alert('Sponsor name is required.');
      return;
    }
    const created = {
      ...newSponsor,
      id: `sp-${Date.now()}`
    };
    setSponsors([...sponsors, created]);
    showToast(`Added ${created.name} to partners list!`, 'success');
    setNewSponsor({
      name: '',
      tier: 'Official Partner',
      website: '',
      description: ''
    });
  };

  const handleDelete = (id) => {
    setSponsors(sponsors.filter((s) => s.id !== id));
    showToast('Sponsor removed', 'info');
  };

  return (
    <div className="admin-sponsors-view">
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>ADD BRAND SPONSOR / VENUE PARTNER</h3>
            <p>Ecosystem supporters shown on the homepage and show posters</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">BRAND / PARTNER NAME</label>
            <input
              type="text"
              value={newSponsor.name}
              onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">SPONSORSHIP TIER</label>
            <input
              type="text"
              placeholder="e.g. Official Audio Partner, Venue Partner"
              value={newSponsor.tier}
              onChange={(e) => setNewSponsor({ ...newSponsor, tier: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">WEBSITE LINK</label>
            <input
              type="url"
              placeholder="https://brand.com"
              value={newSponsor.website}
              onChange={(e) => setNewSponsor({ ...newSponsor, website: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group form-full">
            <button type="submit" className="btn-action-primary">
              <span className="material-symbols-outlined">add</span>
              <span>ADD BRAND PARTNER</span>
            </button>
          </div>
        </form>
      </div>

      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>CURRENT SPONSORS &amp; SUPPORTERS ({sponsors.length})</h3>
          </div>
        </div>

        <div className="table-responsive-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>BRAND NAME</th>
                <th>TIER</th>
                <th>WEBSITE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {sponsors.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: '600' }}>{s.name}</td>
                  <td>
                    <span className="status-badge status-pending">{s.tier}</span>
                  </td>
                  <td>
                    {s.website && s.website !== '#' ? (
                      <a href={s.website} target="_blank" rel="noopener noreferrer" style={{ color: '#FF8A00' }}>
                        {s.website}
                      </a>
                    ) : (
                      <span style={{ color: '#666' }}>—</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-icon-action btn-icon-danger"
                      onClick={() => handleDelete(s.id)}
                      title="Remove partner"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
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
