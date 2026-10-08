import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EventCard } from '../components/EventCard';
import { VideoCard } from '../components/VideoCard';
import { Modal } from '../components/Modal';
import { api } from '../services/api';

export const Home = () => {
  const [nearestEvent, setNearestEvent] = useState(null);
  const [videos, setVideos] = useState([]);
  const [talent, setTalent] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [activeVideo, setActiveVideo] = useState(null);
  const [ticketEvent, setTicketEvent] = useState(null);
  const [ticketTier, setTicketTier] = useState('gen');
  const [ticketCount, setTicketCount] = useState(2);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [event, vids, tal, spon] = await Promise.all([
          api.getNearestUpcomingEvent(),
          api.getVideos(),
          api.getTalent(),
          api.getSponsors()
        ]);
        if (mounted) {
          setNearestEvent(event);
          setVideos(vids.slice(0, 3));
          setTalent(tal.slice(0, 4));
          setSponsors(spon);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const openTickets = (eventToBook) => {
    setTicketEvent(eventToBook || nearestEvent);
  };

  return (
    <div>
      <Navbar onOpenTickets={() => openTickets(nearestEvent)} />

      <main id="main-content">
        {/* HERO SECTION */}
        <section className="hero-section" aria-label="House of Humour">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-logo-frame">
                <img
                  src="/HoH.jpg"
                  alt="House of Humour Official Brand"
                  width="120"
                  height="120"
                  priority="true"
                />
              </div>

              <div className="section-badge">
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--red)' }}>circle</span>
                <span>INDIA'S BIGGEST STAND-UP COMEDY TALENT HUNT</span>
              </div>

              <h1 className="hero-title">
                WHERE NO JOKE <br />
                <span className="text-gradient">IS TOO FAR.</span>
              </h1>

              <p className="hero-tagline">
                10 handpicked comedians take the microphone under live club spotlights. Audience decibel scores dictate the podium winner.
              </p>

              <div className="hero-actions">
                <Link to="/events" className="btn btn-primary btn-lg">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>confirmation_number</span>
                  <span>EXPLORE TOUR DATES</span>
                </Link>

                <Link to="/apply" className="btn btn-secondary btn-lg">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mic</span>
                  <span>APPLY AS CONTESTANT</span>
                </Link>
              </div>

              {/* Simple Metrics Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', width: '100%', maxWidth: '720px', marginTop: '16px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--orange)' }}>5 CITIES</span>
                  <p style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}>REGIONAL QUALIFIERS</p>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--yellow)' }}>₹15,000</span>
                  <p style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}>NIGHTLY SPOT PURSE</p>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#FFF' }}>100% LIVE</span>
                  <p style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}>DECIBEL VOTING</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEXT UPCOMING EVENT (Phase 14) */}
        <section className="section" id="next-event" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div className="section-head">
              <span className="section-badge">TOUR HEADLINER</span>
              <h2 className="section-title">NEXT LIVE SHOWCASE</h2>
              <p className="section-subtitle">
                Reserve your passes before the room fills up.
              </p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>
                Loading tour schedule...
              </div>
            ) : nearestEvent ? (
              <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                <EventCard event={nearestEvent} onBook={openTickets} />
              </div>
            ) : (
              <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--yellow)', marginBottom: '8px' }}>
                  event_busy
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFF', marginBottom: '8px' }}>
                  NEXT HOH EVENT COMING SOON
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '16px' }}>
                  Dates for the upcoming city tour are being finalized with club curators.
                </p>
                <Link to="/events" className="btn btn-secondary btn-sm">
                  View Full Schedule
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CONTESTANT CTA */}
        <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ background: 'radial-gradient(circle at 100% 0%, rgba(255,138,0,0.12) 0%, var(--surface-1) 70%)', border: '1px solid rgba(255,138,0,0.35)', borderRadius: 'var(--radius)', padding: 'clamp(28px, 5vw, 48px)', textAlign: 'center' }}>
              <span className="section-badge">AUDITION CALL</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 48px)', color: '#FFF', marginBottom: '12px' }}>
                TEST YOUR FIVE-MINUTE SET UNDER THE SPOTLIGHTS
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--gray)', maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                Original material. Uncensored crowd. Authentic laughter decibels decide the winner. Spot cash purse awarded immediately on stage.
              </p>
              <Link to="/apply" className="btn btn-primary btn-lg">
                APPLY FOR AUDITIONS (FREE)
              </Link>
            </div>
          </div>
        </section>

        {/* RECENT SETS / VIDEOS (Phase 13: deferred iframe) */}
        {videos.length > 0 && (
          <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span className="section-badge">COMEDY ARCHIVE</span>
                  <h2 className="section-title">RECENT STAGE SETS</h2>
                </div>
                <Link to="/watch" className="btn btn-secondary btn-sm">
                  View All Videos
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {videos.map((vid) => (
                  <VideoCard key={vid.id} video={vid} onPlay={setActiveVideo} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TALENT ROSTER SPOTLIGHT */}
        {talent.length > 0 && (
          <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span className="section-badge">STAND-UP CONTENDERS</span>
                  <h2 className="section-title">QUALIFIED TALENT</h2>
                </div>
                <Link to="/talent" className="btn btn-secondary btn-sm">
                  Full Roster
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {talent.map((c) => (
                  <div key={c.id} style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', fontWeight: '700' }}>{c.rank}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--yellow)' }}>{c.score}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#FFF', marginBottom: '4px' }}>{c.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>{c.zone || c.city}</p>
                    <p style={{ fontSize: '13px', color: 'var(--gray)', fontStyle: 'italic', lineHeight: '1.4' }}>"{c.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SPONSORS */}
        {sponsors.length > 0 && (
          <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container text-center">
              <span className="section-badge">ECOSYSTEM PARTNERS</span>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', marginTop: '20px' }}>
                {sponsors.map((sp) => (
                  <div key={sp.id} style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                    <span style={{ color: '#FFF', fontWeight: '700' }}>{sp.name}</span>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--yellow)' }}>{sp.tier}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* VIDEO PLAYER MODAL (Phase 13: deferred iframe) */}
      <Modal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title}
      >
        {activeVideo && (
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '4px', overflow: 'hidden' }}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId || '5qap5aO4i9A'}?autoplay=1`}
              title={activeVideo.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>

      {/* TICKET BOOKING MODAL (Phase 16: honest checkout without fake payment claims) */}
      <Modal
        isOpen={!!ticketEvent}
        onClose={() => setTicketEvent(null)}
        title={ticketEvent ? `Passes: ${ticketEvent.title}` : 'Reserve Tickets'}
      >
        {ticketEvent && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '16px' }}>
              {ticketEvent.venue}, {ticketEvent.city} • {ticketEvent.date}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <button
                type="button"
                className={`btn ${ticketTier === 'gen' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '12px', padding: '10px' }}
                onClick={() => setTicketTier('gen')}
              >
                General: ₹{ticketEvent.genCost || 399}
              </button>
              <button
                type="button"
                className={`btn ${ticketTier === 'vip' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '12px', padding: '10px' }}
                onClick={() => setTicketTier('vip')}
              >
                VIP Front: ₹{ticketEvent.vipCost || 699}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-2)', padding: '12px 16px', borderRadius: 'var(--radius)', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>Seats Count:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  style={{ width: '32px', height: '32px', background: '#222', border: '1px solid #444', color: '#FFF', borderRadius: '4px', cursor: 'pointer' }}
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                >
                  -
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '16px' }}>{ticketCount}</span>
                <button
                  type="button"
                  style={{ width: '32px', height: '32px', background: '#222', border: '1px solid #444', color: '#FFF', borderRadius: '4px', cursor: 'pointer' }}
                  onClick={() => setTicketCount(Math.min(6, ticketCount + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)' }}>
              <span>Total Amount:</span>
              <span style={{ color: 'var(--orange)', fontWeight: '700', fontSize: '18px' }}>
                ₹{(ticketTier === 'vip' ? (ticketEvent.vipCost || 699) : (ticketEvent.genCost || 399)) * ticketCount}
              </span>
            </div>

            <div style={{ background: 'rgba(255,176,0,0.1)', border: '1px solid rgba(255,176,0,0.3)', borderRadius: 'var(--radius)', padding: '12px', marginBottom: '16px', fontSize: '12px', color: 'var(--yellow)', lineHeight: '1.5' }}>
              Online payment gateway is scheduled to open soon. You can also reserve passes directly via WhatsApp: <strong>+91 98301 22345</strong> or purchase at the venue gate on show day.
            </div>

            <a
              href={`https://wa.me/919830122345?text=Hi%20HoH,%20I%20would%20like%20to%20reserve%20${ticketCount}%20${ticketTier.toUpperCase()}%20tickets%20for%20${ticketEvent.city}%20show`}
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
