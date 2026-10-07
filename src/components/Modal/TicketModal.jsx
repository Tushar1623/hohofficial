import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const TicketModal = () => {
  const { ticketModalState, closeTicketModal, showToast } = useApp();
  const { isOpen, event } = ticketModalState;

  const [tier, setTier] = useState('gen'); // 'gen' or 'vip'
  const [qty, setQty] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bookedPass, setBookedPass] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setBookedPass(null);
      setName('');
      setPhone('');
      setEmail('');
      setQty(2);
      setTier('gen');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeTicketModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeTicketModal]);

  if (!isOpen || !event) return null;

  const unitPrice = tier === 'vip' ? (event.vipCost || 699) : (event.genCost || 399);
  const subtotal = unitPrice * qty;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please fill in your name, WhatsApp number, and email.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const ticketId = `PASS-HOH-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookedPass({
        ticketId,
        name,
        phone,
        email,
        qty,
        tier: tier === 'vip' ? 'VIP FRONT ROW' : 'GENERAL ENTRY',
        total,
        event: event.title,
        date: event.date,
        venue: event.venue,
        city: event.city
      });
      setLoading(false);
      showToast(`Pass ${ticketId} reserved! Check WhatsApp for QR code.`, 'success');
    }, 600);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={closeTicketModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-heading"
    >
      <div
        className="ticket-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeTicketModal}
          aria-label="Close ticket booking window"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {bookedPass ? (
          /* CONFIRMATION TICKET STUB */
          <div className="ticket-confirmation-wrap">
            <div className="ticket-success-head">
              <span className="material-symbols-outlined pass-confirmed-icon">confirmation_number</span>
              <h2 className="ticket-success-title">YOU'RE IN THE ROOM!</h2>
              <p className="ticket-success-sub">
                Your entry passes are confirmed. Present this digital stub at venue doors.
              </p>
            </div>

            <div className="physical-ticket-stub">
              <div className="stub-top">
                <div className="stub-brand">
                  <img src="/HoH.jpg" alt="HoH" width="32" height="32" />
                  <span>HOUSE OF HUMOUR</span>
                </div>
                <span className="stub-tier-badge">{bookedPass.tier}</span>
              </div>

              <div className="stub-body">
                <h3 className="stub-event">{bookedPass.event}</h3>
                <div className="stub-grid">
                  <div>
                    <span className="stub-k">DATE</span>
                    <span className="stub-v">{bookedPass.date}</span>
                  </div>
                  <div>
                    <span className="stub-k">VENUE</span>
                    <span className="stub-v">{bookedPass.venue}</span>
                  </div>
                  <div>
                    <span className="stub-k">GUEST</span>
                    <span className="stub-v">{bookedPass.name}</span>
                  </div>
                  <div>
                    <span className="stub-k">PASS COUNT</span>
                    <span className="stub-v">{bookedPass.qty} SEATS</span>
                  </div>
                </div>
              </div>

              <div className="stub-tear-line">
                <div className="stub-notch notch-left" />
                <div className="stub-dash-line" />
                <div className="stub-notch notch-right" />
              </div>

              <div className="stub-bottom">
                <div className="stub-qr">
                  <svg viewBox="0 0 80 80" width="56" height="56">
                    <rect width="80" height="80" fill="#111" />
                    <rect x="8" y="8" width="20" height="20" fill="#FF8A00" />
                    <rect x="12" y="12" width="12" height="12" fill="#111" />
                    <rect x="15" y="15" width="6" height="6" fill="#FF8A00" />
                    <rect x="52" y="8" width="20" height="20" fill="#FF8A00" />
                    <rect x="56" y="12" width="12" height="12" fill="#111" />
                    <rect x="59" y="15" width="6" height="6" fill="#FF8A00" />
                    <rect x="8" y="52" width="20" height="20" fill="#FF8A00" />
                    <rect x="12" y="56" width="12" height="12" fill="#111" />
                    <rect x="15" y="59" width="6" height="6" fill="#FF8A00" />
                    <rect x="34" y="34" width="12" height="12" fill="#FFF" />
                    <rect x="50" y="50" width="16" height="16" fill="#FFB000" />
                  </svg>
                </div>
                <div className="stub-code-block">
                  <span className="stub-pass-code">{bookedPass.ticketId}</span>
                  <span className="stub-paid">PAID: ₹{bookedPass.total} (INCL. GST)</span>
                </div>
              </div>
            </div>

            <div className="stub-actions">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => window.print()}
              >
                <span className="material-symbols-outlined">print</span>
                <span>PRINT / SAVE TICKET PASS</span>
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleBookingSubmit} className="ticket-modal-form">
            <div className="ticket-modal-title-row">
              <span className="modal-eyebrow">RESERVE AUDIENCE SEATS</span>
              <h2 id="ticket-modal-heading" className="ticket-modal-title">
                {event.title}
              </h2>
              <p className="ticket-modal-meta">
                <span className="material-symbols-outlined">location_on</span>
                <span>{event.venue}, {event.city} • {event.date}</span>
              </p>
            </div>

            {/* Tier Selector */}
            <div className="tier-choice-group">
              <label
                className={`tier-choice-pill ${tier === 'gen' ? 'is-selected' : ''}`}
                onClick={() => setTier('gen')}
              >
                <input
                  type="radio"
                  name="tier"
                  checked={tier === 'gen'}
                  onChange={() => setTier('gen')}
                  className="sr-only"
                />
                <div className="tier-choice-info">
                  <span className="tier-choice-title">GENERAL ENTRY</span>
                  <span className="tier-choice-sub">Standard seating + voting rights</span>
                </div>
                <span className="tier-choice-price">₹{event.genCost || 399}</span>
              </label>

              <label
                className={`tier-choice-pill ${tier === 'vip' ? 'is-selected' : ''}`}
                onClick={() => setTier('vip')}
              >
                <input
                  type="radio"
                  name="tier"
                  checked={tier === 'vip'}
                  onChange={() => setTier('vip')}
                  className="sr-only"
                />
                <div className="tier-choice-info">
                  <span className="tier-choice-title">VIP STAGE PASS</span>
                  <span className="tier-choice-sub">Front row + 1 Craft beverage</span>
                </div>
                <span className="tier-choice-price">₹{event.vipCost || 699}</span>
              </label>
            </div>

            {/* Quantity Selector */}
            <div className="qty-row">
              <span className="qty-label">NUMBER OF PASSES</span>
              <div className="qty-selector">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease seats"
                >
                  -
                </button>
                <span className="qty-num">{qty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQty((prev) => Math.min(8, prev + 1))}
                  aria-label="Increase seats"
                >
                  +
                </button>
              </div>
            </div>

            {/* Attendee Details */}
            <div className="modal-fields-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="ticket-name">Full Name</label>
                <input
                  id="ticket-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sen"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ticket-phone">WhatsApp Phone</label>
                <input
                  id="ticket-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98300 00000"
                  className="form-input"
                />
              </div>

              <div className="form-group form-span-2">
                <label className="form-label" htmlFor="ticket-email">Email Address</label>
                <input
                  id="ticket-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ticket@domain.com"
                  className="form-input"
                />
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="pricing-breakdown">
              <div className="price-line">
                <span>{qty} × {tier === 'vip' ? 'VIP' : 'General'} @ ₹{unitPrice}</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="price-line">
                <span>GST (18%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="price-line price-line-total">
                <span>TOTAL DUE</span>
                <span className="total-val">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? 'SECURING YOUR PASS...' : `CONFIRM & PAY ₹${total}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
