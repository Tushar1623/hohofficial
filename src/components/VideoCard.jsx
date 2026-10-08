import React from 'react';

// Extract YouTube ID safely
function getYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  } catch {
    return null;
  }
}

export const VideoCard = ({ video }) => {
  if (!video || !video.youtubeUrl) return null;

  const videoId = getYouTubeId(video.youtubeUrl);
  if (!videoId) {
    return (
      <div className="empty-event-card text-center">
        <p>Video currently unavailable.</p>
      </div>
    );
  }

  const thumbUrl = video.thumbnail?.trim() || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleOpen = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="featured-video-card">
      <div
        className="featured-video-thumb-wrap"
        onClick={handleOpen}
        role="button"
        tabIndex="0"
        aria-label={`Watch on YouTube: ${video.title || 'House of Humour Video'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <img
          src={thumbUrl}
          alt={video.title || 'Featured House of Humour Video'}
          className="featured-video-img"
          loading="lazy"
        />
        <div className="video-play-badge">
          <span className="material-symbols-outlined">play_arrow</span>
        </div>
      </div>

      <div className="featured-video-footer">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleOpen}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>smart_display</span>
          <span>WATCH ON YOUTUBE</span>
        </button>
      </div>
    </article>
  );
};

export default VideoCard;
