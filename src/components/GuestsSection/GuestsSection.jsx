import React from 'react';
import { useApp } from '../../context/AppContext';
import { GuestCard } from '../GuestCard/GuestCard';

export const GuestsSection = () => {
  const { guests } = useApp();

  return (
    <section className="section guests-section" id="judges" aria-labelledby="judges-heading">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-badge">
            <span className="material-symbols-outlined">workspace_premium</span>
            <span>INDUSTRY EVALUATORS</span>
          </div>
          <h2 id="judges-heading" className="section-title">
            THE JURY &amp; HEADLINERS
          </h2>
          <p className="section-subtitle mx-auto">
            Touring veterans and OTT comedy series producers who provide candid, real-world notes.
          </p>
        </div>

        <div className="guests-grid">
          {guests.map((judge) => (
            <GuestCard key={judge.id} guest={judge} />
          ))}
        </div>
      </div>
    </section>
  );
};
