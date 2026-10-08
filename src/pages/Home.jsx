import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import EventCard from '../components/EventCard.jsx';
import VideoCard from '../components/VideoCard.jsx';

export const Home = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const [eventData, videoData] = await Promise.allSettled([
          api.getNextEvent(),
          api.getFeaturedVideo()
        ]);

        if (mounted) {
          if (eventData.status === 'fulfilled') {
            setNextEvent(eventData.value);
          }
          if (videoData.status === 'fulfilled') {
            const rawVid = videoData.value;
            const parsedVid = rawVid?.video !== undefined ? rawVid.video : rawVid;
            setFeaturedVideo(parsedVid);
          }
        }
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="page-wrapper">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content text-center">
            <span className="hero-badge">THE ARENA IS WAITING</span>
            <h1 className="hero-title">
              HOUSE OF <span>HUMOUR</span>
            </h1>
            <p className="hero-tagline">
              India's Biggest Stand-Up Comedy Talent Hunt
            </p>
            <div className="hero-cta-group">
              <Link to="/participate" className="btn btn-primary">
                <span className="material-symbols-outlined">mic</span>
                <span>PARTICIPATE AS COMEDIAN</span>
              </Link>
              <Link to="/tickets" className="btn btn-secondary">
                <span className="material-symbols-outlined">confirmation_number</span>
                <span>GET TICKETS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Video Section (Section 30: "Featured video coming soon" if none) */}
      <section className="section-watch">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">WATCH HOH</span>
            <h2 className="section-title">
              {featuredVideo?.title || 'FEATURED AUDITION'}
            </h2>
          </div>

          {featuredVideo && featuredVideo.youtubeUrl ? (
            <div className="featured-video-container">
              <VideoCard video={featuredVideo} />
            </div>
          ) : (
            <div className="empty-event-card text-center" style={{ maxWidth: '640px', margin: '0 auto' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--gray)' }}>smart_display</span>
              <h3>Featured video coming soon.</h3>
              <p>Audition highlights and live performances will appear here.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Next Event Section (Section 30: "Next event coming soon" if none) */}
      <section className="section-next-event">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">STAGE CLASH</span>
            <h2 className="section-title">NEXT EVENT</h2>
          </div>

          {loading ? (
            <div className="loading-card text-center">
              <p>Finding next tour date...</p>
            </div>
          ) : nextEvent ? (
            <EventCard event={nextEvent} />
          ) : (
            <div className="empty-event-card text-center">
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--gray)' }}>event_busy</span>
              <h3>Next event coming soon.</h3>
              <p>Tour dates and audition details will be announced shortly.</p>
              <div style={{ marginTop: '16px' }}>
                <Link to="/participate" className="btn btn-primary btn-sm">
                  AUDITION FOR FUTURE DATES
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
