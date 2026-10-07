import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { TalentGrid } from '../components/TalentGrid/TalentGrid';
import { useApp } from '../context/AppContext';

export const Talent = () => {
  const { talent } = useApp();
  const [selectedZone, setSelectedZone] = useState('ALL');

  const zones = ['ALL', 'EAST', 'WEST', 'NORTH', 'SOUTH'];

  const filteredTalent = talent.filter((comic) => {
    if (selectedZone === 'ALL') return true;
    const zoneStr = (comic.zone || comic.city || '').toUpperCase();
    return zoneStr.includes(selectedZone);
  });

  return (
    <div className="page-talent-root">
      <Navbar />

      <main className="section page-main-content">
        <div className="container">
          {/* Header Banner */}
          <div className="page-banner text-center">
            <div className="section-badge">
              <span className="material-symbols-outlined">military_tech</span>
              <span>STAND-UP CONTENDERS</span>
            </div>
            <h1 className="page-title">
              THE TALENT <span className="text-gradient">ROSTER</span>
            </h1>
            <p className="page-subtitle mx-auto">
              Comedians who braved the audience decibel meter and qualified for the 2026 National Championship.
            </p>
          </div>

          {/* Regional Zone Filter */}
          <div className="talent-filter-bar">
            <span className="filter-label">REGIONAL CIRCUIT:</span>
            <div className="filter-pills">
              {zones.map((zone) => (
                <button
                  key={zone}
                  type="button"
                  className={`filter-pill ${selectedZone === zone ? 'active' : ''}`}
                  onClick={() => setSelectedZone(zone)}
                >
                  {zone} {zone !== 'ALL' ? 'ZONE' : 'CIRCUITS'}
                </button>
              ))}
            </div>
          </div>

          {/* Comedians Grid */}
          <TalentGrid talentList={filteredTalent} />

          {/* Call to Audition */}
          <div className="talent-join-cta">
            <div className="talent-cta-inner">
              <span className="material-symbols-outlined cta-icon">mic_external_on</span>
              <h2 className="cta-heading">THINK YOU HAVE WHAT IT TAKES TO BE ON THIS ROSTER?</h2>
              <p className="cta-desc">
                Submit your 3-minute audition tape. We are touring Kolkata, Mumbai, Delhi, Bengaluru, and Pune.
              </p>
              <Link to="/apply" className="btn btn-primary btn-lg">
                <span>APPLY FOR AUDITIONS</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
