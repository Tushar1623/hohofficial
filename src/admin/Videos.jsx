import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const VideoManagement = () => {
  const { featuredVideo, updateFeaturedVideoData, videos, addVideoItem, deleteVideoItem } = useApp();

  // Featured form state
  const [featForm, setFeatForm] = useState({
    title: featuredVideo?.title || '',
    youtubeId: featuredVideo?.youtubeId || '',
    episode: featuredVideo?.episode || '',
    duration: featuredVideo?.duration || '',
    category: featuredVideo?.category || ''
  });

  // New video form state
  const [newVideoForm, setNewVideoForm] = useState({
    title: '',
    youtubeId: '',
    tag: 'CROWD WORK',
    category: 'Stand-Up Special',
    details: 'Live Stage Set • 50K Views',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNpZgYKj4shh6YFuYbLQqqBi39C4tdiD0ep-t1siBsvvuk75EF_38ZpTVf0yUTGN7WZnZxeBTrtDmKeLBp9egW-2M-AMp9kb-53UMNcDJaI9v7RkD3fh-qniuQlQ-w3okqPExaUU_ymUd-3dgiCTxEmZMkEmo_NCbIMVg8b3L733CwVPbkVFmqhXhbq2dOFsLaI5hi067V7VM-hMXiLmZfReg1Qa1YxitWQ_euTx_n'
  });

  const handleUpdateFeatured = async (e) => {
    e.preventDefault();
    await updateFeaturedVideoData({
      ...featForm,
      embedUrl: `https://www.youtube.com/embed/${featForm.youtubeId}?autoplay=1`
    });
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideoForm.title || !newVideoForm.youtubeId) {
      alert('Title and YouTube ID are required.');
      return;
    }
    await addVideoItem({
      ...newVideoForm,
      embedUrl: `https://www.youtube.com/embed/${newVideoForm.youtubeId}?autoplay=1`
    });
    setNewVideoForm({
      title: '',
      youtubeId: '',
      tag: 'CROWD WORK',
      category: 'Stand-Up Special',
      details: 'Live Stage Set • 50K Views',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNpZgYKj4shh6YFuYbLQqqBi39C4tdiD0ep-t1siBsvvuk75EF_38ZpTVf0yUTGN7WZnZxeBTrtDmKeLBp9egW-2M-AMp9kb-53UMNcDJaI9v7RkD3fh-qniuQlQ-w3okqPExaUU_ymUd-3dgiCTxEmZMkEmo_NCbIMVg8b3L733CwVPbkVFmqhXhbq2dOFsLaI5hi067V7VM-hMXiLmZfReg1Qa1YxitWQ_euTx_n'
    });
  };

  return (
    <div className="admin-videos-view">
      {/* Featured Video Card */}
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>FEATURED YOUTUBE EPISODE</h3>
            <p>Displayed front-and-center on the homepage and video theater</p>
          </div>
        </div>

        <form onSubmit={handleUpdateFeatured} className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">EPISODE TITLE</label>
            <input
              type="text"
              value={featForm.title}
              onChange={(e) => setFeatForm({ ...featForm, title: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">YOUTUBE VIDEO ID</label>
            <input
              type="text"
              value={featForm.youtubeId}
              onChange={(e) => setFeatForm({ ...featForm, youtubeId: e.target.value })}
              className="form-input"
              placeholder="e.g. dQw4w9WgXcQ"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">EPISODE / CHAPTER LABEL</label>
            <input
              type="text"
              value={featForm.episode}
              onChange={(e) => setFeatForm({ ...featForm, episode: e.target.value })}
              className="form-input"
              placeholder="EPISODE 04 • EAST QUALIFIERS"
            />
          </div>

          <div className="form-group">
            <label className="form-label">DURATION &amp; RESOLUTION</label>
            <input
              type="text"
              value={featForm.duration}
              onChange={(e) => setFeatForm({ ...featForm, duration: e.target.value })}
              className="form-input"
              placeholder="4K UHD • 21:40"
            />
          </div>

          <div className="form-group form-full">
            <button type="submit" className="btn-action-primary">
              <span className="material-symbols-outlined">save</span>
              <span>UPDATE FEATURED VIDEO</span>
            </button>
          </div>
        </form>
      </div>

      {/* Add New Video Clip */}
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>ADD NEW VIDEO CLIP</h3>
            <p>Publish a comedian set to the watch library</p>
          </div>
        </div>

        <form onSubmit={handleAddVideo} className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">VIDEO TITLE</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma Roast Special"
              value={newVideoForm.title}
              onChange={(e) => setNewVideoForm({ ...newVideoForm, title: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">YOUTUBE ID</label>
            <input
              type="text"
              placeholder="e.g. dQw4w9WgXcQ"
              value={newVideoForm.youtubeId}
              onChange={(e) => setNewVideoForm({ ...newVideoForm, youtubeId: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">GENRE / TAG</label>
            <select
              value={newVideoForm.tag}
              onChange={(e) => setNewVideoForm({ ...newVideoForm, tag: e.target.value })}
              className="form-select"
            >
              <option value="CROWD WORK">CROWD WORK</option>
              <option value="DARK HUMOR">DARK HUMOR</option>
              <option value="DEADPAN">DEADPAN</option>
              <option value="OBSERVATIONAL">OBSERVATIONAL</option>
              <option value="ROAST">ROAST</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">META DETAILS</label>
            <input
              type="text"
              value={newVideoForm.details}
              onChange={(e) => setNewVideoForm({ ...newVideoForm, details: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group form-full">
            <button type="submit" className="btn-action-primary">
              <span className="material-symbols-outlined">add</span>
              <span>PUBLISH VIDEO TO ARCHIVE</span>
            </button>
          </div>
        </form>
      </div>

      {/* Videos List */}
      <div className="card-section">
        <div className="card-section-head">
          <div>
            <h3>CURRENT VIDEO ARCHIVE ({videos.length})</h3>
            <p>Videos shown on the watch page and latest clips section</p>
          </div>
        </div>

        <div className="table-responsive-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>THUMBNAIL</th>
                <th>TITLE</th>
                <th>TAG</th>
                <th>YOUTUBE ID</th>
                <th>DETAILS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v.id}>
                  <td>
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      style={{ width: '60px', height: '36px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td style={{ fontWeight: '600' }}>{v.title}</td>
                  <td>
                    <span className="status-badge status-shortlisted">{v.tag || v.category}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{v.youtubeId}</td>
                  <td style={{ fontSize: '12px', color: '#888' }}>{v.details}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-icon-action btn-icon-danger"
                      onClick={() => deleteVideoItem(v.id)}
                      title="Delete video"
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
