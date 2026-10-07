import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const GuestManagement = () => {
  const { guests, setGuests, showToast } = useApp();

  const [newGuest, setNewGuest] = useState({
    name: '',
    role: '',
    tag: 'JURY HEAD',
    description: '',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyTUWi8ys-8QC7yj-k01pMq4VEb41UgONb7IAe8Z67ZJOIqKtBL978eKAG-2taKUHZDanW4X6wuv7cKVBOOcaxncW2WG64DNO_MFACahph1GTFFfqCOuAMpSmbRrEyzV2K3X2bKmQbdFLhU2oyF2Uo5oewcBYegmtS3iffLOQ4kObRSLNcnH0UwUfPs_kq5EyGfinV7SOKfnty_VJMXsh8-S7xEdL7IGRCv2Dsi4hK'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newGuest.name || !newGuest.role) {
      alert('Name and role are required.');
      return;
    }
    const created = {
      ...newGuest,
      id: `jury-${Date.now()}`
    };
    setGuests([...guests, created]);
    showToast(`Added ${created.name} to jury panel!`, 'success');
    setNewGuest({
      name: '',
      role: '',
      tag: 'JURY HEAD',
      description: '',
      photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyTUWi8ys-8QC7yj-k01pMq4VEb41UgONb7IAe8Z67ZJOIqKtBL978eKAG-2taKUHZDanW4X6wuv7cKVBOOcaxncW2WG64DNO_MFACahph1GTFFfqCOuAMpSmbRrEyzV2K3X2bKmQbdFLhU2oyF2Uo5oewcBYegmtS3iffLOQ4kObRSLNcnH0UwUfPs_kq5EyGfinV7SOKfnty_VJMXsh8-S7xEdL7IGRCv2Dsi4hK'
    });
  };

  const handleDelete = (id) => {
    setGuests(guests.filter((g) => g.id !== id));
    showToast('Jury member removed', 'info');
  };

  return (
    <div className="admin-guests-view">
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>ADD INDUSTRY JURY OR GUEST HEADLINER</h3>
            <p>Industry evaluators who provide feedback on tour sets</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">FULL NAME</label>
            <input
              type="text"
              value={newGuest.name}
              onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">TITLE / ROLE</label>
            <input
              type="text"
              placeholder="e.g. Head of Jury, OTT Producer"
              value={newGuest.role}
              onChange={(e) => setNewGuest({ ...newGuest, role: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">BADGE TAG</label>
            <input
              type="text"
              placeholder="e.g. 14 YRS TOURING"
              value={newGuest.tag}
              onChange={(e) => setNewGuest({ ...newGuest, tag: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">BIO / DESCRIPTION</label>
            <textarea
              rows="2"
              value={newGuest.description}
              onChange={(e) => setNewGuest({ ...newGuest, description: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div className="form-group form-full">
            <button type="submit" className="btn-action-primary">
              <span className="material-symbols-outlined">add</span>
              <span>ADD TO JURY PANEL</span>
            </button>
          </div>
        </form>
      </div>

      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>CURRENT JURY PANEL ({guests.length})</h3>
          </div>
        </div>

        <div className="table-responsive-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>PHOTO</th>
                <th>NAME</th>
                <th>ROLE</th>
                <th>TAG</th>
                <th>DESCRIPTION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr key={g.id}>
                  <td>
                    <img
                      src={g.photo}
                      alt={g.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </td>
                  <td style={{ fontWeight: '600' }}>{g.name}</td>
                  <td>{g.role}</td>
                  <td>
                    <span className="status-badge status-shortlisted">{g.tag}</span>
                  </td>
                  <td style={{ fontSize: '12px', color: '#888', maxWidth: '300px' }}>{g.description}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-icon-action btn-icon-danger"
                      onClick={() => handleDelete(g.id)}
                      title="Remove judge"
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
