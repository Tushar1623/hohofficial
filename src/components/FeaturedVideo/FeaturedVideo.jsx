import React from 'react';
import { useApp } from '../../context/AppContext';

export const FeaturedVideo = () => {
  const { featuredVideo, openVideoModal } = useApp();

  if (!featuredVideo) return null;

  return (
    <section className="section featured-video-section" id="featured-tape" aria-labelledby="feat-vid-heading">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <span className="material-symbols-outlined">smart_display</span>
            <span>UNCENSORED 4K BROADCAST</span>
          </div>
          <h2 id="feat-vid-heading" className="section-title">
            FEATURED EPISODE
          </h2>
          <p className="section-subtitle">
            Watch the latest qualifier tape straight from the live room. Unedited punchlines, authentic crowd reactions.
          </p>
        </div>

        <div className="featured-video-player-wrap">
          <div
            className="featured-video-poster"
            onClick={() => openVideoModal(featuredVideo)}
            role="button"
            tabIndex="0"
            aria-label={`Watch featured episode: ${featuredVideo.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openVideoModal(featuredVideo);
              }
            }}
          >
            <img
              src={featuredVideo.thumbnail}
              alt={featuredVideo.title}
              className="featured-poster-img"
              loading="lazy"
            />
            <div className="featured-overlay-grad" />

            {/* Glowing Big Play Button */}
            <div className="featured-play-button">
              <span className="material-symbols-outlined play-icon">play_arrow</span>
              <span className="play-ripple" aria-hidden="true" />
            </div>

            {/* Video metadata bar */}
            <div className="featured-info-overlay">
              <div className="featured-badge-row">
                <span className="feat-pill-episode">{featuredVideo.episode}</span>
                <span className="feat-pill-dur">{featuredVideo.duration}</span>
              </div>
              <h3 className="featured-title">{featuredVideo.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
