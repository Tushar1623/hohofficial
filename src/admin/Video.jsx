import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export const Video = () => {
  const [video, setVideo] = useState({
    title: '',
    youtubeUrl: '',
    thumbnail: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadVideo();
  }, []);

  async function loadVideo() {
    try {
      setLoading(true);
      const data = await api.getFeaturedVideo();
      if (data) setVideo(data);
    } catch (err) {
      console.error('Failed to load video:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!video.title.trim() || !video.youtubeUrl.trim()) {
      return alert('Please enter both Video Title and YouTube URL.');
    }

    try {
      setSaving(true);
      await api.updateFeaturedVideo(video);
      setMessage('Featured video updated successfully. The public homepage now displays this video.');
    } catch (err) {
      alert('Failed to update video: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Featured Video Management</h1>
          <p className="admin-page-desc">Controls the single featured YouTube video showcased on the public homepage.</p>
        </div>
      </div>

      {message && (
        <div className="admin-success-box">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="admin-card text-center"><p>Loading video settings...</p></div>
      ) : (
        <div className="admin-grid-2">
          {/* Edit Form */}
          <div className="admin-card">
            <h2 className="card-section-title">Edit Video Details</h2>
            <form onSubmit={handleSave} className="admin-form">
              <div className="form-group">
                <label>Video Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. East Qualifiers: Raw Crowd Work & Stage Roasts"
                  value={video.title}
                  onChange={(e) => setVideo({ ...video, title: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label>YouTube URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={video.youtubeUrl}
                  onChange={(e) => setVideo({ ...video, youtubeUrl: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label>Custom Thumbnail Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or leave blank for default"
                  value={video.thumbnail || ''}
                  onChange={(e) => setVideo({ ...video, thumbnail: e.target.value })}
                  disabled={saving}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'SAVE FEATURED VIDEO'}
              </button>
            </form>
          </div>

          {/* Live Preview */}
          <div className="admin-card">
            <h2 className="card-section-title">Live Preview on Homepage</h2>
            <div className="featured-video-preview">
              <div className="preview-thumb-wrap">
                <img
                  src={video.thumbnail || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80'}
                  alt={video.title || 'Video preview'}
                  className="preview-thumb-img"
                />
                <div className="video-play-badge">
                  <span className="material-symbols-outlined">play_arrow</span>
                </div>
              </div>
              <h3 style={{ marginTop: '12px', fontSize: '16px' }}>{video.title || 'Untitled Video'}</h3>
              <p className="text-muted" style={{ fontSize: '12px' }}>{video.youtubeUrl || 'No YouTube link set'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
