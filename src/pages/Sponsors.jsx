import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [sponsorsRes, settingsRes] = await Promise.allSettled([
          api.getSponsors(),
          api.getSettings()
        ]);

        if (!isMounted) return;

        if (sponsorsRes.status === 'fulfilled') {
          // Keep only active sponsors and sort by sortOrder ASC
          const activeSponsors = (sponsorsRes.value || [])
            .filter((s) => s.isActive !== false)
            .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0));
          setSponsors(activeSponsors);
        } else {
          console.error('Failed to load sponsors:', sponsorsRes.reason);
          setError('Unable to load sponsors at this time.');
        }

        if (settingsRes.status === 'fulfilled') {
          setSettings(settingsRes.value);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching sponsors:', err);
          setError('Unable to load sponsors.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenPartnerModal = () => {
    setPartnerModalOpen(true);
  };

  const handleClosePartnerModal = () => {
    setPartnerModalOpen(false);
  };

  const partnerPhone = settings?.contactNumber?.replace(/[^0-9]/g, '') || '919230374701';
  const partnerEmail = settings?.email || 'houseofhumour@gmail.com';
  const whatsappUrl = `https://wa.me/${partnerPhone}?text=${encodeURIComponent(
    'Hello House of Humour Team! We are interested in partnering and sponsoring with House of Humour.'
  )}`;
  const mailtoUrl = `mailto:${partnerEmail}?subject=${encodeURIComponent(
    'Sponsorship & Partnership Inquiry - House of Humour'
  )}&body=${encodeURIComponent(
    'Hello House of Humour Team,\n\nWe are interested in discussing brand sponsorship and partnership opportunities with House of Humour.\n\nBrand/Company Name:\nContact Person:\nPhone:\nWebsite:\n\nThank you!'
  )}`;

  return (
    <div className="page-wrapper sponsors-page">
      <div className="container">
        {/* Page Header */}
        <header className="page-header text-center">
          <span className="section-eyebrow">PARTNERS &amp; SUPPORTERS</span>
          <h1 className="page-title">OUR SPONSORS</h1>
          <p className="page-subtitle">
            Brands and partners supporting House of Humour.
          </p>
        </header>

        {loading ? (
          <div className="loading-card text-center">
            <div className="spinner-border" />
            <p>Loading partners and sponsors...</p>
          </div>
        ) : error && sponsors.length === 0 ? (
          <div className="sponsors-empty-card text-center">
            <span className="sponsor-empty-badge">Become a Sponsor</span>
            <h2 className="sponsor-empty-title">Partner with House of Humour</h2>
            <p className="sponsor-empty-text">
              Interested in reaching India's comedy audience?
            </p>
            <div className="sponsor-cta-action">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleOpenPartnerModal}
              >
                PARTNER WITH US
              </button>
            </div>
          </div>
        ) : sponsors.length === 0 ? (
          /* Empty State as requested */
          <div className="sponsors-empty-card text-center">
            <div className="sponsor-empty-icon-wrap">
              <span className="material-symbols-outlined">handshake</span>
            </div>
            <span className="sponsor-empty-badge">Become a Sponsor</span>
            <h2 className="sponsor-empty-title">Partner with House of Humour</h2>
            <p className="sponsor-empty-text">
              Interested in reaching India's comedy audience?
            </p>
            <div className="sponsor-cta-action">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleOpenPartnerModal}
              >
                PARTNER WITH US
              </button>
            </div>
          </div>
        ) : (
          /* Active Sponsors Grid */
          <div className="sponsors-content-wrap">
            <div className="sponsors-grid">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id || sponsor._id} className="sponsor-card">
                  <div className="sponsor-logo-box">
                    {sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        className="sponsor-logo-img"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement.querySelector('.sponsor-logo-fallback');
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="sponsor-logo-fallback"
                      style={{ display: sponsor.logo ? 'none' : 'flex' }}
                    >
                      <span>{sponsor.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="sponsor-info">
                    <h3 className="sponsor-name">{sponsor.name}</h3>
                    {sponsor.description && (
                      <p className="sponsor-description">{sponsor.description}</p>
                    )}
                    {sponsor.website && (
                      <a
                        href={sponsor.website.startsWith('http') ? sponsor.website : `https://${sponsor.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sponsor-website-link"
                      >
                        <span>Visit Website</span>
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Partnership invitation banner */}
            <div className="sponsors-cta-banner text-center">
              <span className="sponsor-empty-badge">Become a Sponsor</span>
              <h2 className="sponsor-empty-title">Partner with House of Humour</h2>
              <p className="sponsor-empty-text">
                Interested in reaching India's comedy audience?
              </p>
              <div className="sponsor-cta-action">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleOpenPartnerModal}
                >
                  PARTNER WITH US
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Partner with Us Modal */}
      {partnerModalOpen && (
        <div className="admin-modal-backdrop" onClick={handleClosePartnerModal}>
          <div
            className="admin-modal-card partner-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="partnerModalTitle"
          >
            <div className="admin-modal-header">
              <div>
                <span className="section-eyebrow" style={{ marginBottom: '2px' }}>COLLABORATION</span>
                <h2 id="partnerModalTitle" style={{ fontSize: '22px' }}>PARTNER WITH US</h2>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={handleClosePartnerModal}
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="partner-modal-body">
              <p className="partner-modal-desc">
                Connect your brand with thousands of stand-up comedy enthusiasts across Kolkata and beyond. Let's create high-impact audience engagements together.
              </p>

              <div className="partner-options-grid">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-option-btn partner-wa-btn"
                >
                  <span className="material-symbols-outlined">chat</span>
                  <div className="partner-opt-text">
                    <strong>Chat on WhatsApp</strong>
                    <span>Direct discussion with partnership desk</span>
                  </div>
                </a>

                <a
                  href={mailtoUrl}
                  className="partner-option-btn partner-email-btn"
                >
                  <span className="material-symbols-outlined">mail</span>
                  <div className="partner-opt-text">
                    <strong>Send an Email</strong>
                    <span>{partnerEmail}</span>
                  </div>
                </a>
              </div>

              {settings?.contactNumber && (
                <div className="partner-phone-note">
                  <span className="material-symbols-outlined">call</span>
                  <span>Direct Hotline: <strong>{settings.contactNumber}</strong></span>
                </div>
              )}
            </div>

            <div className="admin-modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClosePartnerModal}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsors;
