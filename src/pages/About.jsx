import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';

export const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const faqs = [
    {
      q: 'What is House of Humour (HoH)?',
      a: 'House of Humour is India’s premier grassroots stand-up comedy talent hunt. We tour premier comedy clubs across 5 regional zones (East, West, North, South) to find, fund, and broadcast the next generation of Indian comedy stars.'
    },
    {
      q: 'How does the audience decibel judging work?',
      a: 'Instead of behind-closed-doors corporate voting, our club stages feature live digital sound decibel meters calibrated to audience roar. The genuine laughs and applause generated during a comedian’s 5-minute set directly dictate their ranking on the leaderboard.'
    },
    {
      q: 'Is there any registration fee to apply as a contestant?',
      a: 'No. Auditions and stage spots at House of Humour are 100% free. We believe talent discovery should have zero financial barrier.'
    },
    {
      q: 'What does the winner receive?',
      a: 'Each regional chapter winner takes home a spot cash purse of ₹15,000 immediately after the show, a 4K broadcast release on YouTube, and an automatic spot in the National Championship Finals with a ₹2,00,000 grand trophy.'
    },
    {
      q: 'How do audiences buy tickets?',
      a: 'Tickets can be reserved directly on our website by clicking "GET TICKETS" on any event page. Digital passes with QR entry codes are delivered instantly.'
    }
  ];

  return (
    <div className="page-about-root">
      <Navbar />

      <main className="section page-main-content">
        <div className="container">
          {/* Header Banner */}
          <div className="page-banner text-center">
            <div className="section-badge">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>THE HOH REVOLUTION</span>
            </div>
            <h1 className="page-title">
              ABOUT <span className="text-gradient">HOUSE OF HUMOUR</span>
            </h1>
            <p className="page-subtitle mx-auto">
              Built by stand-up comedians, for stand-up comedians. Uncensored, unfiltered, and unapologetically funny.
            </p>
          </div>

          {/* Official Brand Showcase */}
          <div className="about-brand-showcase">
            <div className="about-brand-logo-card">
              <img
                src="/HoH.jpg"
                alt="House of Humour Official Brand Identity"
                className="about-official-logo"
                width="160"
                height="160"
              />
              <span className="about-brand-tag">OFFICIAL BRAND IDENTITY</span>
            </div>

            <div className="about-brand-copy">
              <h2 className="about-h2">ONE STAGE. YOUR JOKE. INDIA’S NEXT COMEDY STAR.</h2>
              <p>
                Founded in 2024, House of Humour was created to solve a glaring problem in the Indian comedy circuit: talented writers performing in small basements with no path to high-production broadcast or fair compensation.
              </p>
              <p>
                We produce theatrical, broadcast-grade club showcases that treat comedy as the elite art form it is. We equip every chapter with Shure broadcast microphones, cinematic multi-cam lighting, and paying audiences who came to laugh.
              </p>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="about-pillars-grid">
            <div className="pillar-card">
              <span className="pillar-num">01</span>
              <h3 className="pillar-title">RAW FREEDOM</h3>
              <p className="pillar-desc">
                No censorship or corporate sanitization. Comedians have total creative autonomy to test bold punchlines.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">02</span>
              <h3 className="pillar-title">REAL CROWDS</h3>
              <p className="pillar-desc">
                Audiences who actually buy passes to listen, critique, and roar. Authentic rooms that make comics sharper.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">03</span>
              <h3 className="pillar-title">DECIBEL METERS</h3>
              <p className="pillar-desc">
                Scientific, objective judging based on physical acoustic laughter volume, eliminating judge bias.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">04</span>
              <h3 className="pillar-title">INSTANT CASH</h3>
              <p className="pillar-desc">
                Immediate ₹15,000 spot purses handed over directly on stage. We believe comedians deserve to get paid.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="faq-section-wrapper">
            <div className="section-head text-center">
              <div className="section-badge">
                <span className="material-symbols-outlined">help</span>
                <span>QUESTIONS &amp; ANSWERS</span>
              </div>
              <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
            </div>

            <div className="faq-accordion-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`faq-item ${openFaq === idx ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined faq-arrow">
                      {openFaq === idx ? 'remove' : 'add'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-answer-pane">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="about-bottom-cta">
            <h2>READY TO ATTEND OR TAKE THE STAGE?</h2>
            <div className="about-btn-row">
              <Link to="/events" className="btn btn-primary btn-lg">
                <span>EXPLORE TOUR EVENTS</span>
              </Link>
              <Link to="/apply" className="btn btn-secondary btn-lg">
                <span>SUBMIT AN AUDITION</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
