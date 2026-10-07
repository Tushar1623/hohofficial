import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const VideoModal = () => {
  const { videoModalState, closeVideoModal } = useApp();
  const { isOpen, video } = videoModalState;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeVideoModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeVideoModal]);

  if (!isOpen || !video) return null;

  // Build embed URL
  const youtubeId = video.youtubeId || 'dQw4w9WgXcQ';
  const embedUrl = video.embedUrl || `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;

  return (
    <div
      className="modal-backdrop"
      onClick={closeVideoModal}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div
        className="video-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="video-modal-header">
          <div className="video-modal-title-block">
            <span className="video-modal-tag">{video.category || video.tag || 'HoH LIVE'}</span>
            <h3 className="video-modal-h3">{video.title}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={closeVideoModal}
            aria-label="Close video player"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="video-modal-viewport">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-modal-iframe"
          />
        </div>
      </div>
    </div>
  );
};
