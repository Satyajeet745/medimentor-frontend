import { useEffect, useState } from 'react';
import { LANGUAGES, PRESCRIPTION_TRANSLATIONS } from '../data/translations';

function buildWhatsAppText(lang, { patient, disease, drugs, clinicalNote, followUp, doctor, rxId, dateStr, timeStr }) {
  const t = PRESCRIPTION_TRANSLATIONS[lang];
  const drugList = drugs.map((d, i) =>
    `${i + 1}. ${d.name} — ${d.dosage}${d.isOrphan ? ` (${t.orphanDrug})` : ''}`
  ).join('\n');

  return (
    `🏥 *${t.title}*\n` +
    `━━━━━━━━━━━━━━━━━\n` +
    `*${t.ref}:* ${rxId} | *${lang === 'en' ? 'Date' : lang === 'hi' ? 'दिनांक' : lang === 'mr' ? 'दिनांक' : 'તારીખ'}:* ${dateStr}\n` +
    `━━━━━━━━━━━━━━━━━\n` +
    `👨‍⚕️ *${t.prescribingDoctor}*\n` +
    `${doctor?.name || 'N/A'} — ${doctor?.qualification || ''}\n` +
    `${doctor?.specialization || ''} · ${doctor?.hospital || ''}\n` +
    `━━━━━━━━━━━━━━━━━\n` +
    `👤 *${t.patientDetails}*\n` +
    `${patient.name} | ${t.age}: ${patient.age} ${t.years}, ${patient.gender}\n` +
    `${t.phone}: +91 ${patient.phone}\n` +
    (patient.allergies && patient.allergies.toLowerCase() !== 'none' ? `⚠ ${t.allergies}: ${patient.allergies}\n` : '') +
    `━━━━━━━━━━━━━━━━━\n` +
    `🔬 *${t.diagnosis}:* ${disease?.name}${disease?.isRare ? ` 🧬 (${t.rareDiseaseLabel})` : ''}\n` +
    `━━━━━━━━━━━━━━━━━\n` +
    `💊 *${t.medications}:*\n${drugList}\n` +
    `━━━━━━━━━━━━━━━━━\n` +
    (clinicalNote ? `📋 *${t.clinicalNotes}:*\n${clinicalNote}\n` : '') +
    (followUp ? `🗓 *${t.followUp}:* ${followUp}\n` : '') +
    `━━━━━━━━━━━━━━━━━\n` +
    `_${t.disclaimer}_`
  );
}

export default function Prescription({ patient, disease, drugs, clinicalNote, followUp, doctor, onReset, onSaveHistory }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const rxId = `MM-${Date.now()}`;

  const [lang, setLang] = useState('en');
  const [showModal, setShowModal] = useState(false);
  const [customPhone, setCustomPhone] = useState(patient.phone || '');
  const [sent, setSent] = useState(false);
  const [saved, setSaved] = useState(false);

  const t = PRESCRIPTION_TRANSLATIONS[lang];

  useEffect(() => {
    fetch('/api/prescription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient, disease: disease?.name, drugs, notes: clinicalNote, doctor: doctor?.name }),
    }).then(() => setSaved(true)).catch(() => {});
    if (onSaveHistory) onSaveHistory({ patient, disease, drugs, clinicalNote, followUp });
  }, []);

  const handlePrint = () => window.print();

  const handleSendWhatsApp = () => {
    const phone = customPhone.replace(/\D/g, '');
    const text = buildWhatsAppText(lang, { patient, disease, drugs, clinicalNote, followUp, doctor, rxId, dateStr, timeStr });
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
    setShowModal(false);
  };

  return (
    <div className="prescription-wrapper">

      {/* WHATSAPP MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '36px', maxWidth: '500px', width: '90%', boxShadow: 'var(--shadow-elevated)' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>💬</div>
              <h3 style={{ fontFamily: 'Lora,serif', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {lang === 'en' ? 'Send Prescription via WhatsApp' : lang === 'hi' ? 'WhatsApp पर प्रिस्क्रिप्शन भेजें' : lang === 'mr' ? 'WhatsApp वर प्रिस्क्रिप्शन पाठवा' : 'WhatsApp પર પ્રિસ્ક્રિપ્શન મોકલો'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                {lang === 'en' ? 'Sent in selected language — works for any number' : lang === 'hi' ? 'चयनित भाषा में भेजा जाएगा' : lang === 'mr' ? 'निवडलेल्या भाषेत पाठवले जाईल' : 'પસંદ કરેલ ભાષામાં મોકલાશે'}
              </p>
            </div>

            {/* Phone input */}
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>{t.phone}</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>🇮🇳 +91</div>
                <input type="tel" value={customPhone} onChange={e => setCustomPhone(e.target.value)} placeholder="Enter 10-digit number" style={{ flex: 1 }} maxLength={10} />
              </div>
            </div>

            {/* Message preview */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '12px', marginBottom: '18px', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxHeight: '150px', overflowY: 'auto' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                {lang === 'en' ? '📱 Preview' : lang === 'hi' ? '📱 पूर्वावलोकन' : lang === 'mr' ? '📱 पूर्वावलोकन' : '📱 પૂર્વાવલોકન'}
              </div>
              🏥 {t.title}<br />
              👨‍⚕️ {doctor?.name} — {doctor?.qualification}<br />
              👤 {patient.name} | {t.age}: {patient.age}<br />
              🔬 {t.diagnosis}: {disease?.name}{disease?.isRare ? ' 🧬' : ''}<br />
              {drugs.slice(0, 2).map((d, i) => <span key={i}>💊 {d.name}<br /></span>)}
              {drugs.length > 2 && <span>+ {drugs.length - 2} more...<br /></span>}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1 }}>
                {lang === 'en' ? 'Cancel' : lang === 'hi' ? 'रद्द करें' : lang === 'mr' ? 'रद्द करा' : 'રદ કરો'}
              </button>
              <button onClick={handleSendWhatsApp} disabled={customPhone.replace(/\D/g, '').length < 10}
                style={{ flex: 2, background: '#25d366', color: 'white', border: 'none', padding: '13px 20px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-ui)', fontSize: '0.92rem', fontWeight: 700, cursor: customPhone.replace(/\D/g, '').length >= 10 ? 'pointer' : 'not-allowed', opacity: customPhone.replace(/\D/g, '').length >= 10 ? 1 : 0.5 }}>
                💬 {lang === 'en' ? 'Send' : lang === 'hi' ? 'भेजें' : lang === 'mr' ? 'पाठवा' : 'મોકલો'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <h2 className="step-heading" style={{ margin: 0 }}>
          {lang === 'en' ? 'Prescription Generated' : lang === 'hi' ? 'प्रिस्क्रिप्शन तैयार' : lang === 'mr' ? 'प्रिस्क्रिप्शन तयार' : 'પ્રિસ્ક્રિપ્શન તૈયાર'}
        </h2>
        {saved && <span style={{ background: 'var(--success-light)', color: 'var(--success)', border: '1px solid rgba(39,174,96,0.3)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>✓ Saved</span>}
        {sent && <span style={{ background: 'rgba(37,211,102,0.15)', color: '#25d366', border: '1px solid rgba(37,211,102,0.3)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>✓ Sent</span>}
      </div>

      {/* LANGUAGE SELECTOR */}
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '20px', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
          🌐 {lang === 'en' ? 'Select Prescription Language' : lang === 'hi' ? 'प्रिस्क्रिप्शन भाषा चुनें' : lang === 'mr' ? 'प्रिस्क्रिप्शन भाषा निवडा' : 'પ્રિસ્ક્રિપ્શન ભાષા પસંદ કરો'}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)}
              style={{ background: lang === l.code ? 'var(--accent)' : 'var(--bg-elevated)', color: lang === l.code ? 'white' : 'var(--text-secondary)', border: `2px solid ${lang === l.code ? 'var(--accent)' : 'var(--border)'}`, padding: '8px 18px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 700, transition: 'var(--transition)' }}>
              {l.flag} {l.native}
            </button>
          ))}
        </div>
      </div>

      {/* PRESCRIPTION CARD */}
      <div className="rx-card" id="rx-print">
        <div className="rx-header">
          <div>
            <div className="rx-logo">🏥 {t.title}</div>
            <div style={{ fontSize: '0.73rem', color: '#888', marginTop: '4px' }}>{t.subtitle}</div>
          </div>
          <div className="rx-meta">
            <div style={{ fontWeight: 700, color: '#333' }}>{t.ref}: {rxId}</div>
            <div>{dateStr}</div><div>{timeStr}</div>
          </div>
        </div>

        {/* Doctor */}
        {doctor && (
          <div className="rx-section" style={{ background: '#f0faf8', borderRadius: '8px', padding: '14px 16px' }}>
            <div className="rx-label">{t.prescribingDoctor}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '2rem' }}>{doctor.avatar}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0d3b3b' }}>{doctor.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#2a9d8f', fontWeight: 600 }}>{doctor.qualification}</div>
                <div style={{ fontSize: '0.78rem', color: '#666' }}>{doctor.specialization} · {doctor.hospital}</div>
              </div>
            </div>
          </div>
        )}

        {/* Patient */}
        <div className="rx-section">
          <div className="rx-label">{t.patientDetails}</div>
          <div className="rx-value"><strong>{patient.name}</strong> &nbsp;|&nbsp; {t.age}: {patient.age} {t.years} &nbsp;|&nbsp; {patient.gender}</div>
          <div className="rx-value" style={{ marginTop: '4px' }}>📞 +91 {patient.phone}</div>
          {patient.allergies && patient.allergies.toLowerCase() !== 'none' && (
            <div className="rx-value rx-allergy" style={{ marginTop: '4px' }}>⚠ {t.allergies}: {patient.allergies}</div>
          )}
          {(patient.bp || patient.temp || patient.heartRate || patient.spo2) && (
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
              {patient.bp && <span style={{ fontSize: '0.78rem', color: '#555' }}>BP: <strong>{patient.bp}</strong></span>}
              {patient.temp && <span style={{ fontSize: '0.78rem', color: '#555' }}>Temp: <strong>{patient.temp}°F</strong></span>}
              {patient.heartRate && <span style={{ fontSize: '0.78rem', color: '#555' }}>HR: <strong>{patient.heartRate}</strong></span>}
              {patient.spo2 && <span style={{ fontSize: '0.78rem', color: '#555' }}>SpO2: <strong>{patient.spo2}%</strong></span>}
            </div>
          )}
        </div>

        {/* Diagnosis */}
        <div className="rx-section">
          <div className="rx-label">{t.diagnosis}</div>
          <div className="rx-value" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <strong style={{ fontSize: '1.05rem' }}>{disease?.name}</strong>
            {disease?.isRare && <span className="rx-rare-badge">🧬 {t.rareDiseaseLabel}</span>}
            {disease?.severity && (
              <span style={{ background: disease.severity.toLowerCase() === 'high' ? '#fff0ee' : '#f0f9f4', color: disease.severity.toLowerCase() === 'high' ? '#c0392b' : '#27ae60', border: `1px solid ${disease.severity.toLowerCase() === 'high' ? '#f5c6c2' : '#b8e8cc'}`, padding: '2px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {disease.severity} {t.severity}
              </span>
            )}
          </div>
        </div>

        {/* Medications */}
        <div className="rx-section">
          <div className="rx-label">{t.medications} ({drugs.length})</div>
          {drugs.map((drug, i) => (
            <div key={i} className="rx-drug-item">
              <div className="rx-drug-name">{i + 1}. {drug.name}{drug.isOrphan && <span className="rx-orphan">🏷 {t.orphanDrug}</span>}</div>
              <div className="rx-drug-dosage">{t.dosage}: {drug.dosage}</div>
              {drug.category && <div className="rx-drug-cat">{t.category}: {drug.category}</div>}
            </div>
          ))}
        </div>

        {(clinicalNote || followUp) && (
          <div className="rx-section">
            {clinicalNote && <><div className="rx-label">{t.clinicalNotes}</div><div className="rx-value" style={{ marginBottom: followUp ? '12px' : 0 }}>{clinicalNote}</div></>}
            {followUp && <><div className="rx-label" style={{ marginTop: '8px' }}>{t.followUp}</div><div className="rx-value">{followUp}</div></>}
          </div>
        )}

        {/* Signature */}
        <div className="rx-signature">
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#0d3b3b', fontWeight: 700, marginBottom: '36px' }}>{doctor?.name}</div>
              <div className="rx-sig-line" />
              <div className="rx-sig-label">{t.doctorSignature}</div>
            </div>
          </div>
          <div className="rx-disclaimer">{t.disclaimer}</div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="rx-actions no-print" style={{ marginTop: '24px' }}>
        <button className="btn-print" onClick={handlePrint}>
          {lang === 'en' ? '🖨 Print / Save PDF' : lang === 'hi' ? '🖨 PDF सहेजें' : lang === 'mr' ? '🖨 PDF जतन करा' : '🖨 PDF સાચવો'}
        </button>
        <button className="btn-whatsapp" onClick={() => setShowModal(true)}>
          {lang === 'en' ? '💬 Send via WhatsApp' : lang === 'hi' ? '💬 WhatsApp पर भेजें' : lang === 'mr' ? '💬 WhatsApp वर पाठवा' : '💬 WhatsApp પર મોકલો'}
        </button>
        <button className="btn-new" onClick={onReset}>
          {lang === 'en' ? '＋ New Consultation' : lang === 'hi' ? '＋ नई परामर्श' : lang === 'mr' ? '＋ नवीन सल्लामसलत' : '＋ નવી સલાહ'}
        </button>
      </div>

      <div className="no-print" style={{ marginTop: '14px', padding: '12px 16px', background: 'var(--accent-light)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--accent)', lineHeight: 1.6 }}>
        🌐 {lang === 'en' ? 'Prescription language: English. Switch language above to send in Hindi, Marathi, or Gujarati.' : lang === 'hi' ? 'प्रिस्क्रिप्शन भाषा: हिंदी। WhatsApp संदेश हिंदी में भेजा जाएगा।' : lang === 'mr' ? 'प्रिस्क्रिप्शन भाषा: मराठी। WhatsApp संदेश मराठीत पाठवला जाईल.' : 'પ્રિસ્ક્રિપ્શન ભાષા: ગુજરાતી. WhatsApp સંદેશ ગુજરાતીમાં મોકલાશે.'}
      </div>
    </div>
  );
}
