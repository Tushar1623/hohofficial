import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const GuestManagement = () => {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const list = await api.getGuests();
    setGuests(list);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role) return;

    const updated = [...guests, { ...form, id: `jury-${Date.now()}` }];
    await api.saveGuests(updated);
    setForm({ name: '', role: '', description: '' });
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove jury member?')) {
      const updated = guests.filter((g) => g.id !== id);
      await api.saveGuests(updated);
      load();
    }
  };

  return (
    <div>
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>ADD JURY / GUEST HEADLINER</h3>
            <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Industry evaluators who provide feedback on tour sets</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role / Title *</label>
            <input
              type="text"
              placeholder="e.g. Head of Jury"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Description / Bio</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Add Jury Member
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

        {loading ? (
          <div style={{ padding: '20px', color: 'var(--gray)' }}>Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>DESCRIPTION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((g) => (
                  <tr key={g.id}>
                    <td><strong style={{ color: '#FFF' }}>{g.name}</strong></td>
                    <td><span style={{ color: 'var(--yellow)' }}>{g.role}</span></td>
                    <td style={{ fontSize: '12px', color: 'var(--gray)' }}>{g.description}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#ff6b6b', padding: '4px 8px', minHeight: '30px' }}
                        onClick={() => handleDelete(g.id)}
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
