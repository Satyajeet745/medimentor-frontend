import { useState } from 'react';

const DEMO_TEMPLATES = [
  { label: '🧬 Rare Disease Demo', type: 'rare', patient: { name: 'Priya Sharma', age: '28', gender: 'Female', phone: '9876543210', allergies: 'None', bp: '118/78', temp: '98.6', heartRate: '72', spo2: '98' }, symptoms: 'bone pain, fatigue, spleen enlargement, anemia, thrombocytopenia' },
  { label: '⚠️ Emergency Demo', type: 'emergency', patient: { name: 'Arun Patil', age: '62', gender: 'Male', phone: '9823456789', allergies: 'None', bp: '180/110', temp: '99.2', heartRate: '110', spo2: '92' }, symptoms: 'chest pain, breathlessness, dizziness, sweating' },
  { label: '💊 Common Disease Demo', type: 'common', patient: { name: 'Rajan Mehta', age: '55', gender: 'Male', phone: '9123456789', allergies: 'Penicillin', bp: '140/90', temp: '98.4', heartRate: '82', spo2: '97' }, symptoms: 'increased thirst, frequent urination, fatigue, blurred vision' },
];

function VitalBadge({ label, value, unit, normal, warning, danger }) {
  if (!value) return null;
  const num = parseFloat(value);
  let color = 'var(--success)';
  let bg = 'var(--success-light)';
  if (danger && num >= danger) { color = 'var(--emergency)'; bg = 'var(--emergency-light)'; }
  else if (warning && num >= warning) { color = 'var(--warning)'; bg = 'var(--warning-light)'; }

  return (
    <div style={{ background: bg, border: `1px solid ${color}30`, borderRadius: 'var(--radius-sm)', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: '100px' }}>
      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ fontSize: '1rem', fontWeight: 700, color }}>{value} <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>{unit}</span></span>
    </div>
  );
}

export default function PatientForm({ patient, onChange, onNext }) {
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    onChange({ ...patient, [field]: value });
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!patient.name?.trim()) errs.name = 'Name is required';
    if (!patient.age) errs.age = 'Age is required';
    if (!patient.phone) errs.phone = 'Phone is required';
    if (!patient.allergies?.trim()) errs.allergies = 'Enter allergies or "None"';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const applyTemplate = (t) => {
    onChange(t.patient);
    window._demoSymptoms = t.symptoms;
    window._demoType = t.type;
  };

  const bpSystolic = patient.bp ? parseInt(patient.bp.split('/')[0]) : 0;
  const bpDiastolic = patient.bp ? parseInt(patient.bp.split('/')[1]) : 0;

  return (
    <div className="step-container">
      <h2 className="step-heading">Patient Information</h2>
      <p className="step-subheading">Enter patient demographics and current vitals</p>

      <div className="demo-section">
        <div className="demo-label">⚡ Quick Demo Templates</div>
        <div className="demo-buttons">
          {DEMO_TEMPLATES.map((t, i) => (
            <button key={i} className={`demo-btn${t.type === 'emergency' ? ' emergency' : ''}`} onClick={() => applyTemplate(t)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" value={patient.name || ''} onChange={e => update('name', e.target.value)} placeholder="Patient full name" />
            {errors.name && <span style={{ color: 'var(--emergency)', fontSize: '0.78rem' }}>{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Age *</label>
            <input type="number" value={patient.age || ''} onChange={e => update('age', e.target.value)} placeholder="Years" min="0" max="120" />
            {errors.age && <span style={{ color: 'var(--emergency)', fontSize: '0.78rem' }}>{errors.age}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <div className="radio-group">
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g} className="radio-option">
                <input type="radio" name="gender" value={g} checked={patient.gender === g} onChange={() => update('gender', g)} />
                <span>{g}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input type="tel" value={patient.phone || ''} onChange={e => update('phone', e.target.value)} placeholder="For WhatsApp prescription delivery" />
          {errors.phone && <span style={{ color: 'var(--emergency)', fontSize: '0.78rem' }}>{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Known Allergies *</label>
          <input type="text" value={patient.allergies || ''} onChange={e => update('allergies', e.target.value)} placeholder="None if not applicable (e.g. Penicillin, Sulfa)" />
          {errors.allergies && <span style={{ color: 'var(--emergency)', fontSize: '0.78rem' }}>{errors.allergies}</span>}
        </div>

        {/* VITALS SECTION */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🫀 Patient Vitals <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none' }}>(Optional — abnormal values flagged automatically)</span>
          </div>

          <div className="form-row" style={{ gap: '12px', marginBottom: '12px' }}>
            <div className="form-group">
              <label>Blood Pressure (mmHg)</label>
              <input type="text" value={patient.bp || ''} onChange={e => update('bp', e.target.value)} placeholder="120/80" />
            </div>
            <div className="form-group">
              <label>Temperature (°F)</label>
              <input type="number" value={patient.temp || ''} onChange={e => update('temp', e.target.value)} placeholder="98.6" step="0.1" />
            </div>
          </div>

          <div className="form-row" style={{ gap: '12px' }}>
            <div className="form-group">
              <label>Heart Rate (bpm)</label>
              <input type="number" value={patient.heartRate || ''} onChange={e => update('heartRate', e.target.value)} placeholder="72" />
            </div>
            <div className="form-group">
              <label>SpO2 (%)</label>
              <input type="number" value={patient.spo2 || ''} onChange={e => update('spo2', e.target.value)} placeholder="98" min="0" max="100" />
            </div>
          </div>

          {/* Vitals Alert Badges */}
          {(patient.bp || patient.temp || patient.heartRate || patient.spo2) && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vitals Status</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {patient.bp && (
                  <VitalBadge label="Blood Pressure" value={patient.bp} unit="mmHg"
                    warning={bpSystolic >= 140 || bpDiastolic >= 90}
                    danger={bpSystolic >= 180 || bpDiastolic >= 110}
                  />
                )}
                {patient.temp && <VitalBadge label="Temperature" value={patient.temp} unit="°F" warning={parseFloat(patient.temp) >= 99.5} danger={parseFloat(patient.temp) >= 103} />}
                {patient.heartRate && <VitalBadge label="Heart Rate" value={patient.heartRate} unit="bpm" warning={parseInt(patient.heartRate) >= 100 || parseInt(patient.heartRate) < 60} danger={parseInt(patient.heartRate) >= 130} />}
                {patient.spo2 && <VitalBadge label="SpO2" value={patient.spo2} unit="%" warning={parseFloat(patient.spo2) < 95} danger={parseFloat(patient.spo2) < 90} />}
              </div>
              {/* Critical alerts */}
              {(bpSystolic >= 180 || parseFloat(patient.temp) >= 103 || parseFloat(patient.spo2) < 90 || parseInt(patient.heartRate) >= 130) && (
                <div style={{ marginTop: '10px', background: 'var(--emergency-light)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: '0.82rem', color: 'var(--emergency)', fontWeight: 600 }}>
                  🚨 Critical vitals detected — consider emergency evaluation
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn-next" onClick={() => { if (validate()) onNext(); }}>Next → Enter Symptoms</button>
      </div>
    </div>
  );
}
