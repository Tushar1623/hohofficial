import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const TalentManagement = () => {
  const { talent, setTalent, showToast } = useApp();

  const [newComic, setNewComic] = useState({
    name: '',
    city: '',
    zone: 'EAST • KOLKATA',
    category: 'Observational Storytelling',
    score: '9.0/10',
    statusLabel: 'QUALIFIED FINALS',
    quote: '',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4VfI6G1e8_y231v4-4rJ6kXh5T4r5Hq2-G8F-qT1P7U9L_k2J4-H9kF2-1r7X4r8V-1s4kG2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newComic.name || !newComic.city) {
      alert('Name and city are required.');
      return;
    }
    const created = {
      ...newComic,
      id: `talent-${Date.now()}`,
      rank: `#0${talent.length + 1}`
    };
    setTalent([...talent, created]);
    showToast(`Added ${created.name} to talent roster!`, 'success');
    setNewComic({
      name: '',
      city: '',
      zone: 'EAST • KOLKATA',
      category: 'Observational Storytelling',
      score: '9.0/10',
      statusLabel: 'QUALIFIED FINALS',
      quote: '',
      photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4VfI6G1e8_y231v4-4rJ6kXh5T4r5Hq2-G8F-qT1P7U9L_k2J4-H9kF2-1r7X4r8V-1s4kG2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4'
    });
  };

  const handleDelete = (id) => {
    setTalent(talent.filter((t) => t.id !== id));
    showToast('Comic removed from roster', 'info');
  };

  return (
    <div className="admin-talent-view">
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>ADD QUALIFIED COMEDIAN TO ROSTER</h3>
            <p>Spotlight contestants who won regional qualifiers</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">STAGE / ARTIST NAME</label>
            <input
              type="text"
              value={newComic.name}
              onChange={(e) => setNewComic({ ...newComic, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">CITY</label>
            <input
              type="text"
              value={newComic.city}
              onChange={(e) => setNewComic({ ...newComic, city: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">REGIONAL ZONE</label>
            <input
              type="text"
              value={newComic.zone}
              onChange={(e) => setNewComic({ ...newComic, zone: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">COMEDY GENRE</label>
            <input
              type="text"
              value={newComic.category}
              onChange={(e) => setNewComic({ ...newComic, category: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">JURY / DECIBEL SCORE</label>
            <input
              type="text"
              value={newComic.score}
              onChange={(e) => setNewComic({ ...newComic, score: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">QUALIFICATION BADGE</label>
            <input
              type="text"
              value={newComic.statusLabel}
              onChange={(e) => setNewComic({ ...newComic, statusLabel: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group form-full">
            <label className="form-label">EDITORIAL QUOTE / BIO</label>
            <textarea
              rows="2"
              value={newComic.quote}
              onChange={(e) => setNewComic({ ...newComic, quote: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div className="form-group form-full">
            <button type="submit" className="btn-action-primary">
              <span className="material-symbols-outlined">add</span>
              <span>ADD COMEDIAN TO ROSTER</span>
            </button>
          </div>
        </form>
      </div>

      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>CURRENT TALENT LEADERBOARD ({talent.length})</h3>
          </div>
        </div>

        <div className="table-responsive-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>NAME</th>
                <th>CITY / ZONE</th>
                <th>GENRE</th>
                <th>SCORE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {talent.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#FF8A00' }}>
                    {c.rank}
                  </td>
                  <td style={{ fontWeight: '600' }}>{c.name}</td>
                  <td>{c.zone || c.city}</td>
                  <td>{c.category}</td>
                  <td style={{ color: '#FFB000' }}>{c.score}</td>
                  <td>
                    <span className="status-badge status-approved">{c.statusLabel}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-icon-action btn-icon-danger"
                      onClick={() => handleDelete(c.id)}
                      title="Remove comedian"
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
