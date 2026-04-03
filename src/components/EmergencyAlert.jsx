import { useState, useEffect } from 'react';

export default function EmergencyAlert({ onDismiss }) {
  const [canDismiss, setCanDismiss] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); setCanDismiss(true); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openNearestHospital = () => {
    window.open('https://www.google.com/maps/search/hospital+near+me', '_blank');
  };

  const callEmergency = () => {
    window.location.href = 'tel:108';
  };

  return (
    <div className="emergency-overlay">
      <div className="emergency-box">
        <span className="emergency-icon">🚨</span>
        <h2 className="emergency-title">⚠ MEDICAL EMERGENCY</h2>
        <p className="emergency-msg">Symptoms indicate a life-threatening condition</p>
        <p className="emergency-sub">
          <strong>Do NOT wait — activate emergency protocols immediately.</strong><br />
          Call 108 or rush to nearest Emergency Room.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button onClick={callEmergency} style={{
            background: 'var(--emergency)', color: 'white',
            padding: '14px 28px', borderRadius: '8px',
            textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
            border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-ui)',
          }}>
            📞 Call 108
          </button>

          <button onClick={openNearestHospital} style={{
            background: '#2563eb', color: 'white',
            padding: '14px 28px', borderRadius: '8px',
            fontWeight: 700, fontSize: '1rem',
            border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-ui)',
          }}>
            📍 Nearest Hospital
          </button>
        </div>

        <button
          className="btn-dismiss"
          onClick={canDismiss ? onDismiss : undefined}
          disabled={!canDismiss}
          style={{ opacity: canDismiss ? 1 : 0.4, cursor: canDismiss ? 'pointer' : 'not-allowed' }}
        >
          {canDismiss ? 'Dismiss & Continue Assessment' : `Dismiss in ${countdown}s`}
        </button>
      </div>
    </div>
  );
}
