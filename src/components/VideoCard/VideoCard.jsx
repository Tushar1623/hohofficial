import React from 'react';
import { useApp } from '../../context/AppContext';

export const VideoCard = ({ video }) => {
  const { openVideoModal } = useApp();

  if (!video) return null;

  return (
    <article className="video-card">
      <div
        className="video-thumb-container"
        onClick={() => openVideoModal(video)}
        role="button"
        tabIndex="0"
        aria-label={`Play video: ${video.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openVideoModal(video);
          }
        }}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-thumb-img"
          loading="lazy"
        />
        <div className="video-play-overlay">
          <div className="video-play-btn-circle">
            <span className="material-symbols-outlined">play_arrow</span>
          </div>
        </div>
        <span className="video-tag-pill">{video.tag || video.category || 'STAND-UP'}</span>
      </div>

      <div className="video-card-info">
        <h3 className="video-card-title">{video.title}</h3>
        <p className="video-card-meta">{video.details || video.category || 'Live Set'}</p>
      </div>
    </article>
  );
};
