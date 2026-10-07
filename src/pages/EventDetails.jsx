import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { EventDetails as EventDetailsComponent } from '../components/EventDetails/EventDetails';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const EventDetails = () => {
  const { id } = useParams();
  const { events, activeEvent } = useApp();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchEvent() {
      setLoading(true);
      try {
        const found = await api.getEvent(id);
        if (isMounted) {
          setEventData(found || activeEvent);
        }
      } catch (err) {
        if (isMounted) setEventData(activeEvent);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchEvent();

    return () => {
      isMounted = false;
    };
  }, [id, activeEvent]);

  return (
    <div className="page-event-details-root">
      <Navbar />

      <main className="section page-main-content">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">HOME</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/events" className="breadcrumb-link">EVENTS</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{eventData?.city || 'EVENT'} CHAPTER</span>
          </nav>

          {loading ? (
            <div className="loading-state-card">
              <span className="spinner-inline" />
              <span>LOADING CHAPTER DETAILS...</span>
            </div>
          ) : (
            <EventDetailsComponent event={eventData} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
