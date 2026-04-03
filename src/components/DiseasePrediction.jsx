import { useState, useEffect } from 'react';
import { getDiseaseDescription } from '../data/diseaseDescriptions';

function ConfidenceBar({ value }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(value), 100); return () => clearTimeout(t); }, [value]);
  const color = value >= 75 ? 'linear-gradient(90deg,#0D9488,#14b8a6)' : value >= 50 ? 'linear-gradient(90deg,#D97706,#f59e0b)' : 'linear-gradient(90deg,#94A3B8,#CBD5E0)';
  return (
    <div className="confidence-bar-container">
      <div className="confidence-bar-track">
        <div className="confidence-bar-fill" style={{ width:`${width}%`, background:color, transition:'width 1.5s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
      <span className="confidence-num">{value}%</span>
    </div>
  );
}

function DiseaseInfo({ disease }) {
  const [expanded, setExpanded] = useState(false);
  const info = getDiseaseDescription(disease.name);

  if (!info) return (
    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '8px' }}>
      {disease.reasoning || 'Clinical evaluation recommended based on presented symptoms.'}
    </div>
  );

  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        {info.icon} {info.about}
      </div>
      <button onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}
        style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.76rem', fontFamily: 'var(--font-ui)', fontWeight: 600, padding: '6px 0', textDecoration: 'underline' }}>
        {expanded ? 'Show Less ▲' : 'View Details ▼'}
      </button>
      {expanded && (
        <div style={{ background: 'var(--accent-light)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-sm)', padding: '14px', marginTop: '6px' }}>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent)', marginBottom: '4px' }}>Common Symptoms</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{info.symptoms}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent)', marginBottom: '4px' }}>Clinical Management</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{info.management}</div>
          </div>
          {disease.isRare && (
            <div style={{ marginTop: '10px', padding: '8px 12px', background: 'var(--purple-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--purple)', fontWeight: 500 }}>
              🧬 This is a rare disease — orphan drug protocols may apply. Specialist referral recommended.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DiseasePrediction({ diseases, selected, onSelect, onNext, onBack }) {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    diseases.forEach((_, i) => setTimeout(() => setVisible(v => [...v, i]), i * 150));
  }, [diseases]);

  const getSeverityClass = (s) => {
    if (!s) return 'badge-moderate';
    if (s.toLowerCase() === 'high') return 'badge-high';
    if (s.toLowerCase() === 'low') return 'badge-low';
    return 'badge-moderate';
  };

  const getSeverityLabel = (s) => {
    if (!s) return '🟡 Moderate';
    if (s.toLowerCase() === 'high') return '🔴 High Risk';
    if (s.toLowerCase() === 'low') return '🟢 Low Risk';
    return '🟡 Moderate';
  };

  if (!diseases || diseases.length === 0) {
    return (
      <div className="step-container">
        <h2 className="step-heading">Disease Prediction</h2>
        <div className="banner-fallback">⚠ Could not predict disease. Please describe symptoms in more detail.</div>
        <div className="btn-row"><button className="btn-secondary" onClick={onBack}>← Back to Symptoms</button></div>
      </div>
    );
  }

  return (
    <div className="step-container" style={{ maxWidth: '720px' }}>
      <h2 className="step-heading">AI Disease Prediction</h2>
      <p className="step-subheading">Select the most clinically appropriate diagnosis to continue</p>

      <div className="disease-cards">
        {diseases.map((disease, i) => (
          <div key={i}
            className={`disease-card ${visible.includes(i) ? 'visible' : ''} ${selected?.name === disease.name ? 'selected' : ''}`}
            onClick={() => onSelect(disease)}
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            <input type="radio" className="disease-radio" checked={selected?.name === disease.name} onChange={() => onSelect(disease)} onClick={e => e.stopPropagation()} />

            <div className="disease-header">
              <div className="disease-name">{disease.name}</div>
              <div className="disease-badges">
                <span className={`badge ${getSeverityClass(disease.severity)}`}>{getSeverityLabel(disease.severity)}</span>
                {disease.isRare && <span className="badge badge-rare">🧬 Rare Disease</span>}
              </div>
            </div>

            <ConfidenceBar value={disease.confidence || 0} />

            {/* Simple disease description instead of AI jargon */}
            <DiseaseInfo disease={disease} />
          </div>
        ))}
      </div>

      {!selected && (
        <div className="banner-info"><span>ℹ</span> Select a diagnosis above to proceed to drug suggestions</div>
      )}

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={onNext} disabled={!selected}>View Drug Suggestions →</button>
      </div>
    </div>
  );
}
