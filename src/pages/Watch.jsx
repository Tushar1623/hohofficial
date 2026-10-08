import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { VideoCard } from '../components/VideoCard';
import { Modal } from '../components/Modal';
import { api } from '../services/api';

export const Watch = () => {
  const [videos, setVideos] = useState([]);
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getVideos().then((data) => {
      if (mounted) {
        setVideos(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const tags = ['ALL', 'CROWD WORK', 'SATIRE', 'DEADPAN'];

  const filtered = selectedTag === 'ALL'
    ? videos
    : videos.filter((v) => v.tag?.toUpperCase() === selectedTag);

  return (
    <div>
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-badge">UNCENSORED RECORDINGS</span>
            <h1 className="section-title">
              WATCH <span className="text-gradient">STAGE TAPES</span>
            </h1>
            <p className="section-subtitle">
              Authentic audience roasts and comedian qualifiers filmed in comedy clubs across India.
            </p>
          </div>

          {/* Tag Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className={`btn btn-sm ${selectedTag === t ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedTag(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>Loading videos...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>No videos published in this category yet.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {filtered.map((vid) => (
                <VideoCard key={vid.id} video={vid} onPlay={setActiveVideo} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Video Modal - defers iframe embed until user clicks play */}
      <Modal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title}
      >
        {activeVideo && (
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '4px', overflow: 'hidden' }}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId || '5qap5aO4i9A'}?autoplay=1`}
              title={activeVideo.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};
