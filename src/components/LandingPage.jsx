import { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import VideoCards from './VideoCards';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(timer); } else setCount(start); }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString()}</span>;
}

export default function LandingPage({ onStart, onChat, doctor, onLogout }) {
  const [stats, setStats] = useState({ consultations: 0, rareDetected: 0 });
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('medimentor_history') || '[]');
    setStats({ consultations: history.length, rareDetected: history.filter(h => h.isRare).length });
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <span className="navbar-logo">🏥 MediMentor</span>
        <ul className="navbar-links">
          <li><a href="#" onClick={e => { e.preventDefault(); window.scrollTo(0,0); }}>Home</a></li>
          <li><a href="#features" onClick={e => { e.preventDefault(); scrollTo('features'); }}>Features</a></li>
          <li><a href="#videos" onClick={e => { e.preventDefault(); scrollTo('videos'); }}>How It Works</a></li>
          <li><a href="#testimonials" onClick={e => { e.preventDefault(); scrollTo('testimonials'); }}>Reviews</a></li>
          <li><a href="#" onClick={e => { e.preventDefault(); onChat(); }}>💬 AI Chat</a></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {doctor && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', background: 'var(--accent-light)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-sm)', padding: '6px 14px' }}>
              <span style={{ fontSize: '1.1rem' }}>{doctor.avatar}</span>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{doctor.name}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--accent)' }}>{doctor.qualification}</div>
              </div>
              <button onClick={onLogout} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.68rem', fontFamily: 'var(--font-ui)', marginLeft: '4px' }}>Logout</button>
            </div>
          )}
          <button className="navbar-cta" onClick={onStart}>Start Consultation →</button>
        </div>
      </nav>

      <HeroSection onStart={onStart} doctor={doctor} />

      {/* LIVE STATS */}
      {stats.consultations > 0 && (
        <div style={{ background: 'var(--accent)', padding: '20px 48px', display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '🩺', value: stats.consultations, label: 'Consultations Done' },
            { icon: '🧬', value: stats.rareDetected, label: 'Rare Diseases Detected' },
            { icon: '💊', value: stats.consultations * 3, label: 'Drugs Prescribed' },
            { icon: '👤', value: stats.consultations, label: 'Patients Served' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: 'Lora,serif', fontSize: '1.4rem', fontWeight: 700, color: 'white', lineHeight: 1 }}><AnimatedCounter target={s.value} /></div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <VideoCards />
      <FeaturesSection />

      {/* HOW IT WORKS */}
      <section className="how-section" id="how" style={{ background: 'white' }}>
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Complete clinical workflow in 5 streamlined steps</p>
        </div>
        <div className="steps-flow">
          {[
            { n: '1', title: 'Login', desc: 'Doctor or Patient login', icon: '🔐' },
            { n: '2', title: 'Patient Info', desc: 'Demographics, allergies & vitals', icon: '👤' },
            { n: '3', title: 'Enter Symptoms', desc: 'Type or speak in any language', icon: '🎤' },
            { n: '4', title: 'AI Predicts', desc: 'Groq AI analyzes 5000+ diseases', icon: '🤖' },
            { n: '5', title: 'Prescription', desc: 'PDF + WhatsApp in your language', icon: '📋' },
          ].map((s, i) => (
            <div className="step-item" key={i}>
              <div className="step-circle">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PATIENT FLOW */}
      <section style={{ padding: '80px 48px', background: 'var(--bg-deep)' }} id="patient-flow">
        <div className="section-header">
          <h2 className="section-title">Patient Portal Flow</h2>
          <p className="section-subtitle">Patients can submit symptoms in their own language — AI handles the rest</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', maxWidth: '960px', margin: '0 auto' }}>
          {[
            { step: '01', icon: '🌐', title: 'Select Language', desc: 'Choose English, Hindi, Marathi or Gujarati. Everything switches to your language.' },
            { step: '02', icon: '🎤', title: 'Speak or Type', desc: 'Type symptoms or use voice input. Say "ताप, खोकला" in Marathi — AI understands.' },
            { step: '03', icon: '🔬', title: 'Get Results', desc: 'Disease prediction with plain language explanation and ayurvedic home remedies.' },
            { step: '04', icon: '🌿', title: 'Home Remedies', desc: 'Ayurvedic remedies shown in your language alongside modern medicine.' },
            { step: '05', icon: '📅', title: 'Book Appointment', desc: 'Directly book appointment with available doctors in the hospital.' },
            { step: '06', icon: '🚨', title: 'Emergency Alert', desc: 'Dangerous symptoms? Instant 108 ambulance call and nearest hospital finder.' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ background: 'var(--accent-light)', color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '100px', whiteSpace: 'nowrap' }}>{s.step}</div>
                <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              </div>
              <div style={{ fontFamily: 'Lora,serif', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>{s.title}</div>
              <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { icon: '🧬', label: '5000+ Diseases' },
            { icon: '💊', label: '30+ Orphan Drugs' },
            { icon: '🌐', label: '4 Languages' },
            { icon: '🎤', label: 'Voice Input' },
            { icon: '📋', label: 'Smart Prescription' },
            { icon: '🚨', label: 'Emergency Detection' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.1rem' }}>{f.icon}</span>
              <span style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{f.label}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #2D3748', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'Lora,serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>🏥 MediMentor</span>
          <p style={{ color: '#718096', fontSize: '0.78rem', margin: 0 }}>
            AI-Powered Rare Drug Suggestion & Smart Prescription System
          </p>
          <p style={{ color: '#718096', fontSize: '0.78rem', margin: 0 }}>
            © 2025 MediMentor · All rights reserved
          </p>
        </div>
        <p style={{ color: '#4A5568', fontSize: '0.75rem', marginTop: '16px', textAlign: 'center' }}>
          ⚕ MediMentor assists qualified doctors. It does not replace clinical judgment. Always consult a licensed physician.
        </p>
      </footer>
    </div>
  );
}
