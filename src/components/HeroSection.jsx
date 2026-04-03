import { useEffect, useState } from 'react';

function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 18 + 8, dur: Math.random() * 8 + 6,
    delay: Math.random() * 4, symbol: Math.random() > 0.5 ? '✚' : '◦',
  }));
  return (
    <div className="hero-particles" aria-hidden="true">
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {particles.map(p => (
          <text key={p.id} x={`${p.x}%`} y={`${p.y}%`} fontSize={p.size}
            fill="rgba(13,148,136,0.12)"
            style={{ animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite` }}>
            {p.symbol}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function HeroSection({ onStart, doctor }) {
  return (
    <section className="hero" id="home">
      <FloatingParticles />
      <div className="hero-content">
        <div className="hero-badge animate-fadeIn">
          <span style={{ width: '7px', height: '7px', background: 'var(--accent)', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
          Powered by Groq AI — Clinical Decision Support
        </div>

        <h1 className="hero-title animate-fadeIn animate-d1">
          Medi<span>Mentor</span>
        </h1>

        <p className="hero-subtitle animate-fadeIn animate-d2">
          AI-Powered Rare Drug Suggestion & Smart Prescription System
        </p>

        <p className="hero-desc animate-fadeIn animate-d3">
          From symptoms to prescription in under 2 minutes. Built for doctors.
          Identifies 5000+ diseases including rare conditions with orphan drug protocols.
        </p>

        <div className="hero-buttons animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <button className="btn-primary" onClick={onStart}>
            Start Consultation →
          </button>
          <button className="btn-outline" onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}>
            See How It Works
          </button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', gap: '24px', justifyContent: 'center',
          marginTop: '40px', paddingTop: '28px',
          borderTop: '1px solid rgba(13,148,136,0.15)',
          animation: 'fadeIn 1s ease 0.6s both',
          flexWrap: 'wrap',
        }}>
          {[
            { val: '5000+', label: 'Diseases Covered' },
            { val: '30+', label: 'Orphan Drugs' },
            { val: '<2 min', label: 'Diagnosis Time' },
            { val: 'FDA', label: 'Approved Protocols' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Lora,serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
