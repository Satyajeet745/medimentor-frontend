import { useEffect, useRef } from 'react';

const features = [
  { icon: '🧬', title: 'Rare Disease Detection', desc: '5000+ diseases identified including 30 rare conditions with AI confidence scoring' },
  { icon: '💊', title: 'Orphan Drug Suggestions', desc: '30+ FDA orphan drugs with exact dosages, categories, and clinical protocols' },
  { icon: '⚠️', title: 'Emergency Detection', desc: 'Patient portal detects emergencies instantly with nearest hospital locator and 108 ambulance' },
  { icon: '📋', title: 'Smart Prescription', desc: 'Doctor name, qualification, vitals on prescription — PDF + WhatsApp delivery' },
  { icon: '🌐', title: 'Multi-Language Support', desc: 'Hindi, Marathi, Gujarati — patients enter symptoms in their language, AI understands all' },
  { icon: '🎤', title: 'Voice Input', desc: 'Doctor or patient speaks symptoms in any language — AI transcribes and analyzes instantly' },
  { icon: '🌿', title: 'Ayurvedic Remedies', desc: 'Home remedies in regional languages alongside modern medicine for holistic care' },
  { icon: '📊', title: 'Doctor Dashboard', desc: 'Full analytics — top diseases, drugs, patient history, weekly charts, and performance stats' },
];

export default function FeaturesSection() {
  const cardsRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    cardsRef.current.forEach(c => { if (c) observer.observe(c); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <h2 className="section-title">Built for Clinical Excellence</h2>
        <p className="section-subtitle">Every feature designed around real medical workflows</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1160px', margin: '0 auto' }}>
        {features.map((f, i) => (
          <div key={i} className="feature-card" ref={el => cardsRef.current[i] = el} style={{ transitionDelay: `${i * 0.08}s` }}>
            <span className="feature-icon">{f.icon}</span>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
