import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Modal } from '../components/Modal';
import { api } from '../services/api';

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.getEvent(id).then((data) => {
      if (mounted) {
        setEvent(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [id]);

  return (
    <div>
      <Navbar />

      <main className="section">
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <Link to="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
              <span>Back to Tour Schedule</span>
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray)' }}>Loading chapter details...</div>
          ) : !event ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#FFF', marginBottom: '8px' }}>EVENT NOT FOUND</h2>
              <p style={{ color: 'var(--gray)', marginBottom: '16px' }}>The requested tour chapter does not exist or has been archived.</p>
              <Link to="/events" className="btn btn-secondary btn-sm">View Active Shows</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {/* Left Column: Information */}
              <div>
                <div className="section-badge">{event.city} QUALIFIER</div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 60px)', color: '#FFF', lineHeight: '1', marginBottom: '16px' }}>
                  {event.title}
                </h1>
                <p style={{ fontSize: '16px', color: 'var(--gray)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {event.description}
                </p>

                <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFF', marginBottom: '16px' }}>SHOW DETAILS</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-mono)', display: 'block' }}>DATE</span>
                      <strong style={{ color: '#FFF' }}>{event.date}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-mono)', display: 'block' }}>TIME</span>
                      <strong style={{ color: '#FFF' }}>{event.time}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-mono)', display: 'block' }}>VENUE</span>
                      <strong style={{ color: '#FFF' }}>{event.venue}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-mono)', display: 'block' }}>SPOT PURSE</span>
                      <strong style={{ color: 'var(--orange)' }}>{event.prize} CASH</strong>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFF', marginBottom: '12px' }}>SHOW FORMAT</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--gray)' }}>
                    <li>• 10 handpicked comedians performing tight 5-minute sets.</li>
                    <li>• Audience laughter volume tracked live on decibel meter.</li>
                    <li>• Top performer takes home spot cash purse on stage.</li>
                    <li>• Winner advances directly to National Championship Finals.</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Pass Pricing */}
              <div>
                <div style={{ background: 'var(--surface-1)', border: '1px solid rgba(255,138,0,0.3)', borderRadius: 'var(--radius)', padding: '28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFF', marginBottom: '16px' }}>CHOOSE YOUR PASS</h3>

                  <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ color: '#FFF' }}>GENERAL ENTRY</strong>
                      <span style={{ color: 'var(--orange)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>₹{event.genCost || 399}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)' }}>Standard club seating + audience voting decibel rights.</p>
                  </div>

                  <div style={{ background: 'var(--surface-2)', border: '1px solid rgba(255,176,0,0.4)', borderRadius: 'var(--radius)', padding: '16px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ color: 'var(--yellow)' }}>VIP FRONT ROW</strong>
                      <span style={{ color: 'var(--orange)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>₹{event.vipCost || 699}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)' }}>Reserved front row seats right next to the mic + 1 complimentary drink.</p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    onClick={() => setModalOpen(true)}
                  >
                    BOOK EVENT PASS
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={event ? `Reserve Passes: ${event.title}` : 'Reserve Passes'}
      >
        {event && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '14px' }}>
              {event.venue}, {event.city} • {event.date}
            </p>
            <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--radius)', marginBottom: '16px', fontSize: '13px', lineHeight: '1.6' }}>
              <div>General Entry: ₹{event.genCost || 399}</div>
              <div>VIP Front Row: ₹{event.vipCost || 699}</div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--yellow)', marginBottom: '16px' }}>
              To reserve tickets, contact the tour desk via WhatsApp: +91 98301 22345 or purchase directly at the venue gate on show day.
            </p>
            <a
              href={`https://wa.me/919830122345?text=Hi%20HoH,%20I%20would%20like%20to%20reserve%20passes%20for%20the%20${event.city}%20show`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-block"
            >
              Reserve via WhatsApp
            </a>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};
