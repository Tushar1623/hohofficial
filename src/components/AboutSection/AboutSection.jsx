import React from 'react';
import { Link } from 'react-router-dom';

export const AboutSection = () => {
  return (
    <section className="section about-summary-section" id="about-hoh" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-split-layout">
          <div className="about-text-content">
            <div className="section-badge">
              <span className="material-symbols-outlined">verified</span>
              <span>THE HOH MANIFESTO</span>
            </div>
            <h2 id="about-heading" className="section-title">
              NOT ANOTHER BORING <br />
              <span className="text-gradient">REALITY SHOW.</span>
            </h2>
            <p className="about-p">
              House of Humour was born out of frustration with sterile broadcast comedy competitions that filter out edgy humor and sanitize jokes for family TV slots.
            </p>
            <p className="about-p">
              We operate strictly in smoky comedy basements and authentic club backrooms. No sob backstories. No melodramatic judge music. Just a comedian, a microphone, and a room full of real audience members testing every punchline.
            </p>

            <div className="about-values-list">
              <div className="value-bullet">
                <span className="bullet-dot" />
                <span><strong>Uncensored Voices:</strong> Pure creative freedom on the stage.</span>
              </div>
              <div className="value-bullet">
                <span className="bullet-dot" />
                <span><strong>Transparent Judging:</strong> Direct audience decibel scores dictate winners.</span>
              </div>
              <div className="value-bullet">
                <span className="bullet-dot" />
                <span><strong>Instant Cash Rewards:</strong> ₹15,000 spot purse paid at every chapter.</span>
              </div>
            </div>

            <div className="about-cta-row">
              <Link to="/about" className="btn btn-outline">
                <span>READ COMPLETE HOH ORIGIN STORY</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="about-graphic-frame">
            <div className="about-stat-box">
              <div className="stat-giant-num">100%</div>
              <span className="stat-giant-lbl">UNCENSORED LIVE STAND-UP</span>
              <p className="stat-sub">Across Kolkata, Mumbai, Delhi, Bengaluru &amp; Pune.</p>
            </div>
            <div className="about-quote-box">
              <p className="quote-body">
                "If you can make 100 strangers laugh when you are having the worst week of your life, you belong on this stage."
              </p>
              <span className="quote-author">— THE SATIRE CURATORS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
