import React, { useRef } from 'react';

export const ContestantPass = ({ application, eventTitle = 'Kolkata Chapter Finals' }) => {
  const passRef = useRef(null);

  if (!application) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="contestant-pass-wrapper">
      <div className="contestant-badge-card" ref={passRef}>
        {/* Pass Top Bar */}
        <div className="badge-header">
          <div className="badge-brand">
            <img src="/HoH.jpg" alt="HoH Logo" className="badge-logo-img" width="36" height="36" />
            <div>
              <span className="badge-brand-title">HOUSE OF HUMOUR</span>
              <span className="badge-brand-sub">OFFICIAL ARTIST BADGE</span>
            </div>
          </div>
          <div className="badge-id-box">
            <span className="badge-id-lbl">CONTESTANT ID</span>
            <span className="badge-id-val">{application.id || '#HOH-PENDING'}</span>
          </div>
        </div>

        {/* Pass Center Details */}
        <div className="badge-body">
          <div className="badge-name-block">
            <span className="badge-artist-lbl">REGISTERED COMEDIAN</span>
            <h3 className="badge-artist-name">{application.name || 'ANONYMOUS COMIC'}</h3>
          </div>

          <div className="badge-meta-grid">
            <div className="badge-meta-item">
              <span className="meta-k">CITY / ZONE</span>
              <span className="meta-v">{application.city?.toUpperCase() || 'NATIONAL'}</span>
            </div>
            <div className="badge-meta-item">
              <span className="meta-k">STAGE EXPERIENCE</span>
              <span className="meta-v">{application.exp || application.comedyExperience || 'Audition'}</span>
            </div>
            <div className="badge-meta-item">
              <span className="meta-k">STATUS</span>
              <span className={`status-pill status-${application.status || 'pending'}`}>
                {(application.status || 'pending').toUpperCase()}
              </span>
            </div>
            <div className="badge-meta-item">
              <span className="meta-k">CIRCUIT ASSIGNMENT</span>
              <span className="meta-v">{eventTitle}</span>
            </div>
          </div>
        </div>

        {/* Pass Footer with QR Code & Barcode */}
        <div className="badge-footer">
          <div className="badge-qr-area">
            {/* SVG Digital Pass QR Code Representation */}
            <svg
              className="badge-qr-svg"
              viewBox="0 0 100 100"
              width="64"
              height="64"
              role="img"
              aria-label="Contestant verification QR code"
            >
              <rect width="100" height="100" fill="#111" />
              {/* Corner markers */}
              <rect x="10" y="10" width="24" height="24" fill="#FF8A00" />
              <rect x="14" y="14" width="16" height="16" fill="#111" />
              <rect x="18" y="18" width="8" height="8" fill="#FF8A00" />

              <rect x="66" y="10" width="24" height="24" fill="#FF8A00" />
              <rect x="70" y="14" width="16" height="16" fill="#111" />
              <rect x="74" y="18" width="8" height="8" fill="#FF8A00" />

              <rect x="10" y="66" width="24" height="24" fill="#FF8A00" />
              <rect x="14" y="70" width="16" height="16" fill="#111" />
              <rect x="18" y="74" width="8" height="8" fill="#FF8A00" />

              {/* Data blocks */}
              <rect x="42" y="12" width="6" height="6" fill="#FFF" />
              <rect x="52" y="12" width="6" height="6" fill="#FFB000" />
              <rect x="42" y="24" width="6" height="12" fill="#FFF" />
              <rect x="12" y="44" width="12" height="6" fill="#FFB000" />
              <rect x="30" y="44" width="8" height="8" fill="#FFF" />
              <rect x="46" y="42" width="10" height="10" fill="#FF8A00" />
              <rect x="64" y="44" width="8" height="6" fill="#FFF" />
              <rect x="80" y="44" width="8" height="12" fill="#FFB000" />
              <rect x="42" y="64" width="6" height="14" fill="#FFF" />
              <rect x="54" y="68" width="8" height="8" fill="#FF8A00" />
              <rect x="70" y="70" width="16" height="6" fill="#FFF" />
              <rect x="74" y="80" width="12" height="8" fill="#FFB000" />
            </svg>
            <div className="badge-qr-info">
              <span className="qr-title">SCAN AT DOOR</span>
              <span className="qr-subtitle">STAGE SECURITY CHECK</span>
            </div>
          </div>

          <div className="badge-lanyard-hole" aria-hidden="true" />
        </div>
      </div>

      <div className="pass-actions-row">
        <button type="button" className="btn btn-outline btn-sm" onClick={handlePrint}>
          <span className="material-symbols-outlined">print</span>
          <span>PRINT / SAVE BADGE</span>
        </button>
      </div>
    </div>
  );
};
