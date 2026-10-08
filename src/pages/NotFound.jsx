import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="page-wrapper text-center notfound-page">
      <div className="container">
        <span className="notfound-code">404</span>
        <div className="section-eyebrow">PUNCHLINE NOT FOUND</div>
        <h1 className="page-title">THIS JOKE DIDN'T LAND.</h1>
        <p className="page-subtitle">
          The requested page does not exist or has been heckled off stage. Let's get you back to the main room.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            BACK TO HOME
          </Link>
          <Link to="/participate" className="btn btn-secondary">
            PARTICIPATE
          </Link>
          <Link to="/tickets" className="btn btn-secondary">
            GET TICKETS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
