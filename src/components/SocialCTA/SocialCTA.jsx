import React from 'react';

export const SocialCTA = () => {
  return (
    <section className="section social-cta-section" aria-labelledby="social-cta-heading">
      <div className="container">
        <div className="social-cta-banner">
          <div className="social-cta-content">
            <span className="social-eyebrow">NEVER MISS A VIRAL ROAST</span>
            <h2 id="social-cta-heading" className="social-cta-title">
              JOIN 150,000+ COMEDY FANS ONLINE
            </h2>
            <p className="social-cta-desc">
              Get raw set highlights, backstage roast footage, and early bird tickets directly in your feed before shows sell out.
            </p>
          </div>

          <div className="social-cta-actions">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              aria-label="Subscribe to House of Humour on YouTube"
            >
              <span className="material-symbols-outlined">smart_display</span>
              <span>SUBSCRIBE ON YOUTUBE</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
              aria-label="Follow House of Humour on Instagram"
            >
              <span className="material-symbols-outlined">photo_camera</span>
              <span>FOLLOW ON INSTAGRAM</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
