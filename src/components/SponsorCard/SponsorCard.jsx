import React from 'react';

export const SponsorCard = ({ sponsor }) => {
  if (!sponsor) return null;

  return (
    <div className="sponsor-card">
      <span className="sponsor-tier-badge">{sponsor.tier || 'Official Partner'}</span>
      <h3 className="sponsor-name">{sponsor.name}</h3>
      {sponsor.description && (
        <p className="sponsor-desc">{sponsor.description}</p>
      )}
      {sponsor.website && sponsor.website !== '#' && (
        <a
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="sponsor-link"
          aria-label={`Visit ${sponsor.name}`}
        >
          <span>Visit Partner</span>
          <span className="material-symbols-outlined">north_east</span>
        </a>
      )}
    </div>
  );
};
