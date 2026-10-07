import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PERKS_LIST } from '../../data/demoData';

export const ContestantCTA = () => {
  const [decibels, setDecibels] = useState(88);
  const [cheerActive, setCheerActive] = useState(false);

  const simulateCheer = () => {
    setCheerActive(true);
    // Simulate crowd roar fluctuation
    const randomDb = Math.floor(92 + Math.random() * 14); // 92 to 105 dB
    setDecibels(randomDb);

    // Audio chime synthesis using web audio API if supported
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Audio not permitted or supported
    }

    setTimeout(() => {
      setCheerActive(false);
    }, 1200);
  };

  return (
    <section className="section contestant-cta-section" id="auditions" aria-labelledby="contestant-heading">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-badge">
            <span className="material-symbols-outlined">mic_external_on</span>
            <span>FOR STAND-UP COMEDIANS</span>
          </div>
          <h2 id="contestant-heading" className="section-title">
            ONE MIC. FIVE MINUTES. <br />
            <span className="text-gradient">TEST YOUR JOKES ON OUR STAGE.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Whether you have been writing tight five-minute sets for months or touring regional rooms, House of Humour is your unfiltered proving ground.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="perks-grid">
          {PERKS_LIST.map((perk) => (
            <div key={perk.id} className="perk-card">
              <div className="perk-icon-wrap">
                <span className="material-symbols-outlined">{perk.icon}</span>
              </div>
              <h3 className="perk-title">{perk.title}</h3>
              <p className="perk-desc">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Laugh-O-Meter Cheer Simulator */}
        <div className="decibel-meter-showcase">
          <div className="decibel-meter-header">
            <div>
              <span className="meter-eyebrow">STAGE SOUND PRESSURE LEVEL</span>
              <h3 className="meter-title">LIVE CROWD DECIBEL METER</h3>
            </div>
            <button
              type="button"
              className={`btn btn-secondary btn-sm ${cheerActive ? 'cheering' : ''}`}
              onClick={simulateCheer}
              aria-label="Simulate crowd laughter decibels"
            >
              <span className="material-symbols-outlined">volume_up</span>
              <span>{cheerActive ? 'ROAR DETECTED!' : 'TEST CROWD CHEER'}</span>
            </button>
          </div>

          <div className="decibel-gauge-wrap">
            <div className="decibel-score-display">
              <span className="db-value">{decibels}</span>
              <span className="db-unit">dB</span>
            </div>
            <div className="decibel-bars-row" aria-hidden="true">
              {[60, 70, 75, 80, 85, 90, 95, 100, 105].map((level, idx) => (
                <div
                  key={idx}
                  className={`db-bar ${decibels >= level ? 'bar-lit' : ''} ${level >= 95 ? 'bar-peak' : ''}`}
                  style={{ height: `${20 + idx * 8}px` }}
                />
              ))}
            </div>
          </div>
          <p className="decibel-verdict-text">
            {decibels >= 98
              ? '🔥 STANDING OVATION: Automatic qualifier for National Finals.'
              : decibels >= 90
              ? '⚡ EXPLOSIVE LAUGHS: Solid contender for the ₹15,000 cash purse.'
              : '🎤 CLUB CHUCKLES: Tighten the taglines and push the punchline.'}
          </p>
        </div>

        {/* Call To Action Strip */}
        <div className="audition-action-strip">
          <div className="audition-action-content">
            <h3 className="strip-title">READY TO STEP UNDER THE SPOTLIGHT?</h3>
            <p className="strip-desc">Auditions are free. Selected comics receive high-res stage recordings.</p>
          </div>
          <Link to="/apply" className="btn btn-primary btn-lg">
            <span>START CONTESTANT APPLICATION</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
