import React from 'react';
import { TalentCard } from '../TalentCard/TalentCard';

export const TalentGrid = ({ talentList = [] }) => {
  if (!talentList.length) {
    return (
      <div className="empty-state-card">
        <span className="material-symbols-outlined empty-icon">person_off</span>
        <p>No comedians currently listed in this category.</p>
      </div>
    );
  }

  return (
    <div className="talent-grid">
      {talentList.map((comic) => (
        <TalentCard key={comic.id} talent={comic} />
      ))}
    </div>
  );
};
