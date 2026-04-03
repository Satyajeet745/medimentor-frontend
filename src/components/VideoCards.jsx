import { useRef } from 'react';

const cards = [
  {
    label: 'DOCTOR WORKFLOW',
    title: 'Symptom to Prescription in 2 Minutes',
    desc: 'AI predicts rare diseases, suggests orphan drugs, and generates a printable prescription instantly.',
    video: '/videos/doctor.mp4',
    icon: '🩺',
    gradient: 'linear-gradient(135deg, #0A1628 0%, #0d3b5e 60%, #0A2A40 100%)',
  },
  {
    label: 'RARE DISEASE AI',
    title: 'Rare Disease Detection & Orphan Drug Suggestions',
    desc: 'Identifies 5000+ diseases and suggests FDA-approved orphan drugs with exact dosages automatically.',
    video: '/videos/rare.mp4',
    icon: '🧬',
    gradient: 'linear-gradient(135deg, #1a0a28 0%, #3b0d5e 60%, #2a0a40 100%)',
  },
  {
    label: 'PATIENT PORTAL',
    title: 'Patient Enters Symptoms in Their Language',
    desc: 'Patient logs in, selects language — Hindi, Marathi, Gujarati — speaks or types symptoms, AI analyzes instantly.',
    video: '/videos/patient_symptoms.mp4',
    icon: '🙍',
    gradient: 'linear-gradient(135deg, #0A2818 0%, #0d5e3b 60%, #0A402A 100%)',
  },
  {
    label: 'EMERGENCY AI',
    title: 'Emergency Detection — Direct 108 Ambulance Call',
    desc: 'Dangerous symptoms detected? Instant emergency alert with 108 ambulance call and nearest hospital finder.',
    video: '/videos/patient_emergency.mp4',
    icon: '🚨',
    gradient: 'linear-gradient(135deg, #280A0A 0%, #5e0d0d 60%, #400A0A 100%)',
  },
];

function VideoCard({ card }) {
  const videoRef = useRef(null);

  return (
    <div className="video-card">
      <div style={{ width: '100%', height: '100%', background: card.gradient, overflow: 'hidden', position: 'relative' }}>
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.style.display = 'none'; }}
        >
          <source src={card.video} type="video/mp4" />
        </video>
        {/* Fallback icon shown if video fails */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem', zIndex: 0,
          opacity: 0.3,
        }}>
          {card.icon}
        </div>
      </div>
      <div className="video-overlay">
        <div className="video-label">{card.label}</div>
        <div className="video-title">{card.title}</div>
        <div className="video-desc">{card.desc}</div>
      </div>
    </div>
  );
}

export default function VideoCards() {
  return (
    <section className="video-section" id="videos">
      <div className="section-header">
        <h2 className="section-title">See How MediMentor Transforms Clinical Workflows</h2>
        <p className="section-subtitle">
          From rare disease detection to WhatsApp prescription — everything works seamlessly.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        maxWidth: '1160px',
        margin: '0 auto',
      }}>
        {cards.map((card, i) => (
          <VideoCard key={i} card={card} />
        ))}
      </div>

      {/* File names hint */}
      <div style={{
        maxWidth: '1160px', margin: '28px auto 0',
        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', padding: '16px 24px',
        display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center',
      }}>
       
       
      </div>
    </section>
  );
}
