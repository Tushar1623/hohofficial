import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { TalentGrid } from '../TalentGrid/TalentGrid';

export const TalentSection = () => {
  const { talent } = useApp();

  return (
    <section className="section talent-roster-section" id="talent" aria-labelledby="talent-roster-heading">
      <div className="container">
        <div className="section-head-between">
          <div>
            <div className="section-badge">
              <span className="material-symbols-outlined">stars</span>
              <span>QUALIFIED CONTENDERS</span>
            </div>
            <h2 id="talent-roster-heading" className="section-title">
              THE TALENT ROSTER
            </h2>
            <p className="section-subtitle">
              Regional qualifier winners advancing to the National Championship Arena.
            </p>
          </div>
          <Link to="/talent" className="btn btn-outline btn-sm">
            <span>FULL LEADERBOARD</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <TalentGrid talentList={talent.slice(0, 4)} />
      </div>
    </section>
  );
};
