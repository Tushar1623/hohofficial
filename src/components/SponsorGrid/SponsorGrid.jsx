import React from 'react';
import { SponsorCard } from '../SponsorCard/SponsorCard';

export const SponsorGrid = ({ sponsors = [] }) => {
  return (
    <div className="sponsor-grid">
      {sponsors.map((sp) => (
        <SponsorCard key={sp.id} sponsor={sp} />
      ))}
    </div>
  );
};
