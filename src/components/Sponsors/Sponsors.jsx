import React from 'react';
import { useApp } from '../../context/AppContext';
import { SponsorGrid } from '../SponsorGrid/SponsorGrid';

export const Sponsors = () => {
  const { sponsors } = useApp();

  return (
    <section className="section sponsors-section" id="partners" aria-labelledby="partners-heading">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-badge">
            <span className="material-symbols-outlined">handshake</span>
            <span>ECOSYSTEM SUPPORTERS</span>
          </div>
          <h2 id="partners-heading" className="section-title">
            POWERED BY COMEDY PARTNERS
          </h2>
          <p className="section-subtitle mx-auto">
            Supporting independent stand-up comedy venues, broadcast engineering, and artist cash purses.
          </p>
        </div>

        <SponsorGrid sponsors={sponsors} />
      </div>
    </section>
  );
};
