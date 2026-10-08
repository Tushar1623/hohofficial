import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

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
      a: 'Tickets can be reserved directly on our website by clicking "GET TICKETS" on any event page or via WhatsApp support.'
    }
  ];

  return (
    <div>
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-badge">THE HOH MANIFESTO</span>
            <h1 className="section-title">
              ABOUT <span className="text-gradient">HOUSE OF HUMOUR</span>
            </h1>
            <p className="section-subtitle">
              Built by stand-up comedians, for stand-up comedians. Uncensored, unfiltered, and unapologetically funny.
            </p>
          </div>

          {/* Brand Showcase */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center', marginBottom: '56px', background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 'clamp(24px, 4vw, 40px)' }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src="/HoH.jpg"
                alt="House of Humour Brand"
                width="140"
                height="140"
                style={{ margin: '0 auto 12px auto' }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--yellow)', letterSpacing: '0.12em' }}>
                OFFICIAL BRAND IDENTITY
              </span>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#FFF', lineHeight: '1.1', marginBottom: '12px' }}>
                ONE STAGE. YOUR JOKE. INDIA’S NEXT COMEDY STAR.
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: '1.6', marginBottom: '12px' }}>
                House of Humour was created to solve a glaring problem in the Indian comedy circuit: talented writers performing in small basements with no path to high-production broadcast or fair compensation.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: '1.6' }}>
                We produce theatrical, broadcast-grade club showcases that treat comedy as an elite art form. We equip every chapter with broadcast microphones, cinematic multi-cam lighting, and paying audiences who came to laugh.
              </p>
            </div>
          </div>

          {/* 4 Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '56px' }}>
            {[
              { num: '01', title: 'RAW FREEDOM', desc: 'No censorship. Comedians have creative autonomy to test bold punchlines.' },
              { num: '02', title: 'REAL CROWDS', desc: 'Audiences who actually buy passes to listen, critique, and roar.' },
              { num: '03', title: 'DECIBEL METERS', desc: 'Scientific judging based on physical acoustic laughter volume.' },
              { num: '04', title: 'INSTANT CASH', desc: 'Immediate ₹15,000 spot purses handed over directly on stage.' }
            ].map((p) => (
              <div key={p.num} style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--orange)', display: 'block', marginBottom: '6px' }}>{p.num}</span>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#FFF', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: '1.5' }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#FFF', textAlign: 'center', marginBottom: '24px' }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    style={{ width: '100%', padding: '16px 20px', background: 'transparent', border: 'none', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--yellow)' }}>
                      {openFaq === idx ? 'remove' : 'add'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div style={{ padding: '0 20px 16px 20px', fontSize: '14px', color: 'var(--gray)', lineHeight: '1.6' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
