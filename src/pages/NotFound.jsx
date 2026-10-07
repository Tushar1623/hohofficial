import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';

export const NotFound = () => {
  return (
    <div className="page-notfound-root">
      <Navbar />

      <main className="section page-main-content">
        <div className="container">
          <div className="not-found-card text-center">
            <span className="notfound-code">404</span>
            <div className="section-badge mx-auto">
              <span className="material-symbols-outlined">sentiment_dissatisfied</span>
              <span>PUNCHLINE NOT FOUND</span>
            </div>
            <h1 className="notfound-title">
              THIS JOKE DIDN'T <span className="text-gradient">LAND.</span>
            </h1>
            <p className="notfound-desc mx-auto">
              The page or stage URL you are looking for has been heckled off stage or never existed. Let’s get you back to the main room.
            </p>

            <div className="notfound-actions">
              <Link to="/" className="btn btn-primary btn-lg">
                <span className="material-symbols-outlined">home</span>
                <span>BACK TO MAIN ARENA</span>
              </Link>
              <Link to="/events" className="btn btn-secondary btn-lg">
                <span className="material-symbols-outlined">theater_comedy</span>
                <span>VIEW TOUR SCHEDULE</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
