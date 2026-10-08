import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const NotFound = () => {
  return (
    <div>
      <Navbar />

      <main className="section text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(72px, 14vw, 120px)', color: '#1a1a1a', lineHeight: '0.9', display: 'block' }}>
            404
          </span>
          <div className="section-badge mx-auto">
            <span>PUNCHLINE NOT FOUND</span>
          </div>
          <h1 className="section-title">
            THIS JOKE DIDN'T <span className="text-gradient">LAND.</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--gray)', maxWidth: '480px', margin: '0 auto 28px auto' }}>
            The requested page does not exist or has been heckled off stage. Let's get you back to the main room.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              Back to Main Arena
            </Link>
            <Link to="/events" className="btn btn-secondary">
              View Tour Dates
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
