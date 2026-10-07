import React from 'react';

export const TalentCard = ({ talent }) => {
  if (!talent) return null;

  return (
    <article className="talent-card">
      <div className="talent-photo-container">
        <img
          src={talent.photo}
          alt={talent.name}
          className="talent-photo-img"
          loading="lazy"
        />
        <div className="talent-rank-badge">{talent.rank || '#'}</div>
        <div className="talent-status-pill status-approved">
          {talent.statusLabel || 'QUALIFIED'}
        </div>
      </div>

      <div className="talent-card-body">
        <div className="talent-meta-top">
          <span className="talent-zone">{talent.zone || talent.city}</span>
          <span className="talent-score">{talent.score ? `★ ${talent.score}` : '9.2 dB'}</span>
        </div>

        <h3 className="talent-name">{talent.name}</h3>
        <span className="talent-category-tag">{talent.category}</span>

        <p className="talent-quote">
          "{talent.quote || 'Raw comedic perspective honed across high-pressure live stages.'}"
        </p>

        <div className="talent-social-links">
          {talent.instagram && (
            <a
              href={`https://instagram.com/${talent.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="talent-social-link"
              aria-label={`${talent.name} on Instagram`}
            >
              <span className="material-symbols-outlined">photo_camera</span>
              <span>{talent.instagram}</span>
            </a>
          )}
          {talent.youtube && (
            <a
              href={talent.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="talent-social-link"
              aria-label={`${talent.name} on YouTube`}
            >
              <span className="material-symbols-outlined">smart_display</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
