import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoInputMode, setLogoInputMode] = useState('upload'); // 'upload' or 'url'

  useEffect(() => {
    loadSponsors();
  }, []);

  async function loadSponsors() {
    try {
      setLoading(true);
      const data = await api.getAdminSponsors();
      setSponsors(data || []);
    } catch (err) {
      console.error('Failed to load sponsors:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateNew = () => {
    const nextSortOrder = sponsors.length > 0
      ? Math.max(...sponsors.map((s) => Number(s.sortOrder) || 0)) + 1
      : 0;

    setEditingSponsor({
      id: '',
      name: '',
      logo: '',
      website: '',
      description: '',
      isActive: true,
      sortOrder: nextSortOrder
    });
    setLogoInputMode('upload');
    setSaveMsg(null);
  };

  const handleEdit = (sponsor) => {
    setEditingSponsor({
      id: sponsor.id || sponsor._id,
      name: sponsor.name || '',
      logo: sponsor.logo || '',
      website: sponsor.website || '',
      description: sponsor.description || '',
      isActive: sponsor.isActive !== false,
      sortOrder: sponsor.sortOrder ?? 0
    });
    setLogoInputMode(sponsor.logo && sponsor.logo.startsWith('http') ? 'url' : 'upload');
    setSaveMsg(null);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the sponsor "${name}"?`)) return;
    try {
      await api.deleteSponsor(id);
      setSponsors((prev) => prev.filter((s) => (s.id || s._id) !== id));
      if (editingSponsor && (editingSponsor.id === id)) setEditingSponsor(null);
      setSaveMsg(`Sponsor "${name}" deleted successfully.`);
      setTimeout(() => setSaveMsg(null), 3000);
    } catch (err) {
      alert('Failed to delete sponsor: ' + err.message);
    }
  };

  const handleToggleActive = async (sponsor) => {
    const id = sponsor.id || sponsor._id;
    const nextActive = !sponsor.isActive;
    try {
      const updated = await api.updateSponsor(id, { isActive: nextActive });
      setSponsors((prev) =>
        prev.map((s) => ((s.id || s._id) === id ? { ...s, isActive: updated.isActive } : s))
      );
      setSaveMsg(`Sponsor "${sponsor.name}" ${nextActive ? 'activated' : 'deactivated'}.`);
      setTimeout(() => setSaveMsg(null), 3000);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleLogoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setEditingSponsor((prev) => ({
        ...prev,
        logo: uploadEvent.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingSponsor.name.trim()) {
      alert('Please enter a sponsor name.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: editingSponsor.name.trim(),
        logo: editingSponsor.logo.trim(),
        website: editingSponsor.website.trim(),
        description: editingSponsor.description.trim(),
        isActive: Boolean(editingSponsor.isActive),
        sortOrder: Number(editingSponsor.sortOrder) || 0
      };

      if (editingSponsor.id) {
        const updated = await api.updateSponsor(editingSponsor.id, payload);
        setSponsors((prev) =>
          prev.map((s) => ((s.id || s._id) === editingSponsor.id ? updated : s))
        );
        setSaveMsg(`Sponsor "${payload.name}" updated successfully!`);
      } else {
        const created = await api.createSponsor(payload);
        setSponsors((prev) => [...prev, created]);
        setSaveMsg(`Sponsor "${payload.name}" created successfully!`);
      }

      setEditingSponsor(null);
      setTimeout(() => setSaveMsg(null), 4000);
    } catch (err) {
      alert('Failed to save sponsor: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredSponsors = sponsors
    .filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        s.name?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.website?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0));

  const activeCount = sponsors.filter((s) => s.isActive !== false).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Sponsor Management</h1>
          <p className="admin-page-desc">
            Manage brand partners, logos, websites, display order, and public visibility.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleCreateNew}>
          <span className="material-symbols-outlined">add</span>
          <span>ADD NEW SPONSOR</span>
        </button>
      </div>

      {saveMsg && (
        <div className="admin-success-box">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="admin-stats-grid" style={{ marginBottom: '20px' }}>
        <div className="stat-card">
          <span className="stat-label">TOTAL SPONSORS</span>
          <span className="stat-val">{sponsors.length}</span>
          <span className="stat-sub">Configured in database</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">ACTIVE / VISIBLE</span>
          <span className="stat-val stat-success">{activeCount}</span>
          <span className="stat-sub">Shown on /sponsors page</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">INACTIVE / HIDDEN</span>
          <span className="stat-val stat-warning">{sponsors.length - activeCount}</span>
          <span className="stat-sub">Hidden from public</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="admin-search-bar">
        <div className="search-input-wrap">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search sponsors by brand name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setSearchQuery('')}
          >
            Clear
          </button>
        )}
      </div>

      {/* Sponsors Table / List */}
      <div className="admin-card">
        {loading ? (
          <div className="text-center" style={{ padding: '32px 0' }}>
            <p>Loading sponsors...</p>
          </div>
        ) : filteredSponsors.length === 0 ? (
          <div className="text-center" style={{ padding: '40px 16px' }}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '48px', color: 'var(--gray)', marginBottom: '12px' }}
            >
              handshake
            </span>
            <h3 style={{ marginBottom: '8px', color: '#FFF' }}>
              {searchQuery ? 'No sponsors match your search' : 'No sponsors added yet'}
            </h3>
            <p style={{ color: 'var(--gray)', marginBottom: '20px', fontSize: '14px' }}>
              {searchQuery
                ? 'Try a different search keyword.'
                : 'Add brand partners and sponsors to display them on the public sponsors page.'}
            </p>
            {!searchQuery && (
              <button type="button" className="btn btn-primary btn-sm" onClick={handleCreateNew}>
                + Add First Sponsor
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>Order</th>
                  <th style={{ width: '80px' }}>Logo</th>
                  <th>Brand Name</th>
                  <th>Website</th>
                  <th>Visibility</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSponsors.map((sponsor) => {
                  const id = sponsor.id || sponsor._id;
                  return (
                    <tr key={id}>
                      <td>
                        <span className="sort-order-pill">#{sponsor.sortOrder ?? 0}</span>
                      </td>
                      <td>
                        <div className="admin-logo-thumb-box">
                          {sponsor.logo ? (
                            <img
                              src={sponsor.logo}
                              alt={sponsor.name}
                              className="admin-logo-thumb"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const fb = e.currentTarget.parentElement.querySelector('.admin-logo-fb');
                                if (fb) fb.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div
                            className="admin-logo-fb"
                            style={{ display: sponsor.logo ? 'none' : 'flex' }}
                          >
                            <span>{sponsor.name.slice(0, 2).toUpperCase()}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#FFF' }}>{sponsor.name}</div>
                        {sponsor.description && (
                          <div
                            style={{
                              fontSize: '12px',
                              color: 'var(--gray)',
                              maxWidth: '360px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {sponsor.description}
                          </div>
                        )}
                      </td>
                      <td>
                        {sponsor.website ? (
                          <a
                            href={sponsor.website.startsWith('http') ? sponsor.website : `https://${sponsor.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-link-tag"
                          >
                            <span>{sponsor.website.replace(/^https?:\/\//, '')}</span>
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                              open_in_new
                            </span>
                          </a>
                        ) : (
                          <span style={{ color: 'var(--gray)', fontSize: '12px' }}>—</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`status-pill ${sponsor.isActive ? 'pill-approved' : 'pill-completed'}`}
                          style={{ cursor: 'pointer', border: 'none' }}
                          onClick={() => handleToggleActive(sponsor)}
                          title="Click to toggle active state"
                        >
                          {sponsor.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </button>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            className="btn-icon"
                            onClick={() => handleToggleActive(sponsor)}
                            title={sponsor.isActive ? 'Deactivate sponsor' : 'Activate sponsor'}
                            aria-label="Toggle status"
                          >
                            <span className="material-symbols-outlined">
                              {sponsor.isActive ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="btn-icon"
                            onClick={() => handleEdit(sponsor)}
                            title="Edit sponsor"
                            aria-label="Edit"
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button
                            type="button"
                            className="btn-icon text-danger"
                            onClick={() => handleDelete(id, sponsor.name)}
                            title="Delete sponsor"
                            aria-label="Delete"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sponsor Add/Edit Modal */}
      {editingSponsor && (
        <div className="admin-modal-backdrop" onClick={() => setEditingSponsor(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingSponsor.id ? 'Edit Sponsor' : 'Add New Sponsor'}</h2>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setEditingSponsor(null)}
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-form">
              {/* Brand Name */}
              <div className="form-group">
                <label>
                  Sponsor / Brand Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red Bull, Spotify, OnePlus"
                  value={editingSponsor.name}
                  onChange={(e) => setEditingSponsor({ ...editingSponsor, name: e.target.value })}
                />
              </div>

              {/* Sponsor Logo Section */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0 }}>Sponsor Logo</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className={`btn btn-xs ${logoInputMode === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setLogoInputMode('upload')}
                    >
                      File Upload
                    </button>
                    <button
                      type="button"
                      className={`btn btn-xs ${logoInputMode === 'url' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setLogoInputMode('url')}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {logoInputMode === 'upload' ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileUpload}
                      style={{
                        padding: '8px',
                        background: 'var(--surface-2)',
                        border: '1px dashed var(--border)',
                        borderRadius: 'var(--radius)',
                        width: '100%',
                        color: 'var(--gray)'
                      }}
                    />
                    <small style={{ color: 'var(--gray)', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                      PNG, JPG, SVG, WebP up to 5MB. Transparent PNG recommended.
                    </small>
                  </div>
                ) : (
                  <input
                    type="url"
                    placeholder="https://example.com/logo.png"
                    value={editingSponsor.logo}
                    onChange={(e) => setEditingSponsor({ ...editingSponsor, logo: e.target.value })}
                  />
                )}

                {/* Logo Preview */}
                {editingSponsor.logo && (
                  <div className="admin-logo-preview-box">
                    <img
                      src={editingSponsor.logo}
                      alt="Logo preview"
                      className="admin-logo-preview-img"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-xs"
                      onClick={() => setEditingSponsor({ ...editingSponsor, logo: '' })}
                    >
                      Remove Logo
                    </button>
                  </div>
                )}
              </div>

              {/* Website & Display Order */}
              <div className="form-row">
                <div className="form-group">
                  <label>Sponsor Website URL</label>
                  <input
                    type="text"
                    placeholder="e.g. https://brand.com"
                    value={editingSponsor.website}
                    onChange={(e) => setEditingSponsor({ ...editingSponsor, website: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Display Order (sortOrder)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={editingSponsor.sortOrder}
                    onChange={(e) => setEditingSponsor({ ...editingSponsor, sortOrder: e.target.value })}
                  />
                  <small style={{ color: 'var(--gray)', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                    Lower numbers appear first (0, 1, 2...).
                  </small>
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Brief tagline or collaboration description (e.g. Official Beverage Partner)"
                  value={editingSponsor.description}
                  onChange={(e) => setEditingSponsor({ ...editingSponsor, description: e.target.value })}
                />
              </div>

              {/* Active Switch */}
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingSponsor.isActive}
                    onChange={(e) =>
                      setEditingSponsor({ ...editingSponsor, isActive: e.target.checked })
                    }
                    style={{ width: '18px', height: '18px', accentColor: 'var(--orange)' }}
                  />
                  <span style={{ fontSize: '14px', color: '#FFF' }}>
                    Active (display publicly on /sponsors page)
                  </span>
                </label>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingSponsor(null)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingSponsor.id ? 'Save Changes' : 'Create Sponsor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsors;
