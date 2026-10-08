import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContestantForm } from '../components/ContestantForm';

export const Apply = () => {
  return (
    <div>
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-badge">OFFICIAL AUDITION PORTAL</span>
            <h1 className="section-title">
              APPLY AS A <span className="text-gradient">CONTESTANT</span>
            </h1>
            <p className="section-subtitle">
              10 Comics per regional chapter. 5 minutes on the live microphone. Auditions are 100% free.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>
            {/* Guidelines */}
            <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#FFF', marginBottom: '16px' }}>
                AUDITION GUIDELINES
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: 'var(--gray)', lineHeight: '1.5' }}>
                <li>
                  <strong style={{ color: '#FFF', display: 'block' }}>1. Original Material Only:</strong>
                  Plagiarized jokes or copied sets result in immediate disqualification.
                </li>
                <li>
                  <strong style={{ color: '#FFF', display: 'block' }}>2. 2–5 Minute Video Set:</strong>
                  Upload a clear performance set on YouTube or Google Drive (public access).
                </li>
                <li>
                  <strong style={{ color: '#FFF', display: 'block' }}>3. Free Auditions:</strong>
                  We never charge comedians to step under the spotlight.
                </li>
                <li>
                  <strong style={{ color: '#FFF', display: 'block' }}>4. Spot Cash Purse:</strong>
                  Nightly winner takes home ₹15,000 cash on stage and advances to the National Finals.
                </li>
              </ul>
            </div>

            {/* Application Form */}
            <div>
              <ContestantForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
