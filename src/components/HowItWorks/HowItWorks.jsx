import React from 'react';
import { ROADMAP_STEPS } from '../../data/demoData';

export const HowItWorks = () => {
  return (
    <section className="section how-it-works-section" id="how-it-works" aria-labelledby="roadmap-heading">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-badge">
            <span className="material-symbols-outlined">route</span>
            <span>THE CONTESTANT ROADMAP</span>
          </div>
          <h2 id="roadmap-heading" className="section-title">
            FROM BEDROOM WRITING <br />
            <span className="text-gradient">TO THE NATIONAL STAGE</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A transparent, unfiltered path built to discover India's freshest comedy voices.
          </p>
        </div>

        <div className="roadmap-grid">
          {ROADMAP_STEPS.map((step) => (
            <div key={step.step} className="roadmap-card">
              <div className="roadmap-step-num">{step.step}</div>
              <h3 className="roadmap-step-title">{step.title}</h3>
              <p className="roadmap-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
