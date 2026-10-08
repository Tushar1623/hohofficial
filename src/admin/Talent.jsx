import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const TalentManagement = () => {
  const [talent, setTalent] = useState([]);
  const [form, setForm] = useState({ name: '', city: '', category: 'Observational Storytelling', score: '9.0 dB', quote: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const list = await api.getTalent();
    setTalent(list);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.city) return;

    const updated = [
      ...talent,
      {
        ...form,
        id: `talent-${Date.now()}`,
        rank: `#0${talent.length + 1}`,
        zone: form.city.toUpperCase()
      }
    ];
    await api.saveTalent(updated);
    setForm({ name: '', city: '', category: 'Observational Storytelling', score: '9.0 dB', quote: '' });
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove comedian?')) {
      const updated = talent.filter((t) => t.id !== id);
      await api.saveTalent(updated);
      load();
    }
  };

  return (
    <div>
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>ADD QUALIFIED COMEDIAN</h3>
            <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Spotlight contestants who qualified for finals</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Comedian Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">City *</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Comedy Genre</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Decibel Score</label>
            <input
              type="text"
              value={form.score}
              onChange={(e) => setForm({ ...form, score: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Editorial Quote / Notes</label>
            <input
              type="text"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Add Comedian
            </button>
          </div>
        </form>
      </div>

      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>TALENT LEADERBOARD ({talent.length})</h3>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '20px', color: 'var(--gray)' }}>Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>NAME</th>
                  <th>CITY</th>
                  <th>GENRE</th>
                  <th>SCORE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {talent.map((c) => (
                  <tr key={c.id}>
                    <td><strong style={{ color: 'var(--orange)' }}>{c.rank}</strong></td>
                    <td><strong style={{ color: '#FFF' }}>{c.name}</strong></td>
                    <td>{c.city}</td>
                    <td>{c.category}</td>
                    <td><span style={{ color: 'var(--yellow)' }}>{c.score}</span></td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#ff6b6b', padding: '4px 8px', minHeight: '30px' }}
                        onClick={() => handleDelete(c.id)}
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
