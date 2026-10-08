import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { api } from '../services/api';

export const Talent = () => {
  const [talent, setTalent] = useState([]);
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getTalent().then((data) => {
      if (mounted) {
        setTalent(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const zones = ['ALL', 'EAST', 'WEST', 'NORTH', 'SOUTH'];

  const filtered = selectedZone === 'ALL'
    ? talent
    : talent.filter((c) => (c.zone || c.city || '').toUpperCase().includes(selectedZone));

  return (
    <div>
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-badge">STAND-UP CONTENDERS</span>
            <h1 className="section-title">
              THE TALENT <span className="text-gradient">ROSTER</span>
            </h1>
            <p className="section-subtitle">
              Regional qualifier winners advancing to the National Championship Arena.
            </p>
          </div>

          {/* Zone Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {zones.map((z) => (
              <button
                key={z}
                type="button"
                className={`btn btn-sm ${selectedZone === z ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedZone(z)}
              >
                {z} {z !== 'ALL' ? 'ZONE' : 'CIRCUITS'}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>Loading talent roster...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>No comedians announced for this circuit yet.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {filtered.map((comic) => (
                <article
                  key={comic.id}
                  style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', fontWeight: '700' }}>
                        {comic.rank}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--yellow)', background: 'rgba(255,176,0,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                        {comic.score}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFF', marginBottom: '4px' }}>
                      {comic.name}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--yellow)', display: 'block', marginBottom: '6px' }}>
                      {comic.zone || comic.city}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--gray)', display: 'block', marginBottom: '12px' }}>
                      {comic.category}
                    </span>

                    <p style={{ fontSize: '13px', color: 'var(--gray)', fontStyle: 'italic', lineHeight: '1.45', marginBottom: '16px' }}>
                      "{comic.quote}"
                    </p>
                  </div>

                  {comic.instagram && (
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', fontSize: '12px', color: 'var(--orange)', fontFamily: 'var(--font-mono)' }}>
                      {comic.instagram}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '48px', padding: '36px', background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#FFF', marginBottom: '8px' }}>
              HAVE A TIGHT FIVE-MINUTE SET?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '20px' }}>
              Submit your audition video. Stage spots and cash prizes are waiting.
            </p>
            <Link to="/apply" className="btn btn-primary">
              Apply as Contestant
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
