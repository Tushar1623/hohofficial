import React from 'react';

export const VideoCard = ({ video, onPlay }) => {
  if (!video) return null;

  return (
    <article className="video-card">
      <div
        className="video-thumb-container"
        onClick={() => onPlay ? onPlay(video) : null}
        role="button"
        tabIndex="0"
        aria-label={`Play video: ${video.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onPlay) onPlay(video);
          }
        }}
      >
        <img
          src={video.thumbnail || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=640&q=80'}
          alt={video.title}
          className="video-thumb-img"
          loading="lazy"
        />
        <div className="video-play-overlay">
          <div className="video-play-btn-circle">
            <span className="material-symbols-outlined">play_arrow</span>
          </div>
        </div>
        <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.8)', color: 'var(--yellow)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
          {video.tag || video.category || 'STAND-UP'}
        </span>
      </div>

      <div className="video-card-info">
        <h3 className="video-card-title">{video.title}</h3>
        <p className="video-card-meta">{video.category || 'Live Set'} • {video.duration || 'Watch'}</p>
      </div>
    </article>
  );
};
