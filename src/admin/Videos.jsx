import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', youtubeId: '', tag: 'CROWD WORK', duration: '15:00' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const list = await api.getVideos();
    setVideos(list);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.youtubeId) return;

    await api.addVideo({
      ...form,
      thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=640&q=80',
      youtubeUrl: `https://www.youtube.com/watch?v=${form.youtubeId}`
    });
    setForm({ title: '', youtubeId: '', tag: 'CROWD WORK', duration: '15:00' });
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete video?')) {
      await api.deleteVideo(id);
      load();
    }
  };

  return (
    <div>
      {/* Add Video Card */}
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>ADD VIDEO CLIP</h3>
            <p style={{ fontSize: '13px', color: 'var(--gray)' }}>Publish a comedian set to the watch library</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Video Title *</label>
            <input
              type="text"
              placeholder="e.g. Kolkata Roast Rounds"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">YouTube Video ID *</label>
            <input
              type="text"
              placeholder="e.g. 5qap5aO4i9A"
              value={form.youtubeId}
              onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tag / Genre</label>
            <select
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="form-select"
            >
              <option value="CROWD WORK">CROWD WORK</option>
              <option value="SATIRE">SATIRE</option>
              <option value="DEADPAN">DEADPAN</option>
              <option value="ROAST">ROAST</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Duration</label>
            <input
              type="text"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Publish Video
            </button>
          </div>
        </form>
      </div>

      {/* Videos List */}
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>CURRENT VIDEO ARCHIVE ({videos.length})</h3>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '20px', color: 'var(--gray)' }}>Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>TAG</th>
                  <th>YOUTUBE ID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((v) => (
                  <tr key={v.id}>
                    <td><strong style={{ color: '#FFF' }}>{v.title}</strong></td>
                    <td><span className="status-badge status-approved">{v.tag}</span></td>
                    <td>{v.youtubeId}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#ff6b6b', padding: '4px 8px', minHeight: '30px' }}
                        onClick={() => handleDelete(v.id)}
                      >
                        Delete
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
