import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { VideoGrid } from '../VideoGrid/VideoGrid';

export const LatestVideos = () => {
  const { videos } = useApp();

  return (
    <section className="section latest-videos-section" id="latest-tapes" aria-labelledby="latest-vid-heading">
      <div className="container">
        <div className="section-head-between">
          <div>
            <div className="section-badge">
              <span className="material-symbols-outlined">trending_up</span>
              <span>VIRAL CLIP ARCHIVE</span>
            </div>
            <h2 id="latest-vid-heading" className="section-title">
              LATEST AUDITION TAPES
            </h2>
          </div>
          <Link to="/watch" className="btn btn-outline btn-sm">
            <span>VIEW ALL VIDEOS</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <VideoGrid videos={videos.slice(0, 3)} />
      </div>
    </section>
  );
};
