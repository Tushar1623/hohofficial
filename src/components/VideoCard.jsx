import React from 'react';

// Extract YouTube maxresdefault thumbnail if none is explicitly provided
function getYouTubeThumbnail(url, customThumb) {
  if (customThumb && customThumb.trim()) return customThumb;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
    }
  } catch {}
  return 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80';
}

export const VideoCard = ({ video }) => {
  if (!video || !video.youtubeUrl) return null;

  const handleOpen = () => {
    if (video.youtubeUrl) {
      window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const thumbUrl = getYouTubeThumbnail(video.youtubeUrl, video.thumbnail);

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
          onError={(e) => {
            // Fallback if maxresdefault doesn't exist for a particular YouTube video
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80';
          }}
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
