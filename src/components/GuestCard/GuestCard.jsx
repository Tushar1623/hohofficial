import React from 'react';

export const GuestCard = ({ guest }) => {
  if (!guest) return null;

  return (
    <article className="guest-card">
      <div className="guest-photo-wrap">
        <img
          src={guest.photo}
          alt={guest.name}
          className="guest-photo-img"
          loading="lazy"
        />
        <div className="guest-tag-pill">{guest.tag || 'HEADLINER'}</div>
      </div>

      <div className="guest-card-body">
        <span className="guest-role-text">{guest.role}</span>
        <h3 className="guest-name">{guest.name}</h3>
        <p className="guest-desc">{guest.desc || guest.description}</p>
      </div>
    </article>
  );
};
