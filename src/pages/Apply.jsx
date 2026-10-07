import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { ContestantForm } from '../components/ContestantForm/ContestantForm';

export const Apply = () => {
  return (
    <div className="page-apply-root">
      <Navbar />

      <main className="section page-main-content">
        <div className="container">
          {/* Header Banner */}
          <div className="page-banner text-center">
            <div className="section-badge">
              <span className="material-symbols-outlined">mic</span>
              <span>OFFICIAL AUDITION PORTAL</span>
            </div>
            <h1 className="page-title">
              APPLY AS A <span className="text-gradient">CONTESTANT</span>
            </h1>
            <p className="page-subtitle mx-auto">
              10 Comics per regional chapter. 5 minutes on the live microphone. Complete the official registration below to secure an audition spot.
            </p>
          </div>

          <div className="apply-layout-grid">
            {/* Left Column: Guidelines & Criteria */}
            <div className="apply-info-sidebar">
              <div className="guidelines-card">
                <h3 className="guidelines-title">AUDITION CRITERIA</h3>
                <ul className="guidelines-list">
                  <li>
                    <span className="material-symbols-outlined">check_circle</span>
                    <div>
                      <strong>Original Material Only:</strong> Plagiarized jokes or translated sets result in immediate disqualification.
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined">check_circle</span>
                    <div>
                      <strong>3–5 Min Video Set:</strong> Submit an unedited video of you performing in front of a live audience, open mic, or rehearsal camera.
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined">check_circle</span>
                    <div>
                      <strong>No Entry Fees:</strong> Auditioning for House of Humour is 100% free. We never charge artists to step on stage.
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined">check_circle</span>
                    <div>
                      <strong>Instant Digital Badge:</strong> Once submitted, your official contestant pass with QR code will be generated immediately.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="guidelines-card prize-highlight-box">
                <span className="material-symbols-outlined star-icon">monetization_on</span>
                <h4 className="prize-callout-title">₹15,000 LIVE SPOT PURSE</h4>
                <p className="prize-callout-desc">
                  Each regional chapter winner takes home cash on stage and advances to the National Finals in Mumbai with ₹2,00,000 grand trophy.
                </p>
              </div>
            </div>

            {/* Right Column: Contestant Form */}
            <div className="apply-form-main">
              <ContestantForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
