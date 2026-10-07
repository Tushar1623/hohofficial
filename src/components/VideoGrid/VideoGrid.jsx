import React from 'react';
import { VideoCard } from '../VideoCard/VideoCard';

export const VideoGrid = ({ videos = [] }) => {
  if (!videos.length) {
    return (
      <div className="empty-state-card">
        <span className="material-symbols-outlined empty-icon">videocam_off</span>
        <p>No comedy tapes found for this category yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((vid) => (
        <VideoCard key={vid.id} video={vid} />
      ))}
    </div>
  );
};
