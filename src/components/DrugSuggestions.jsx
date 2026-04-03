import { useState, useEffect } from 'react';

const KNOWN_INTERACTIONS = [
  { a: 'warfarin', b: 'aspirin', msg: 'Warfarin + Aspirin: Significant bleeding risk — combined anticoagulation.' },
  { a: 'metformin', b: 'alcohol', msg: 'Metformin + Alcohol: Lactic acidosis risk.' },
  { a: 'ace inhibitor', b: 'potassium', msg: 'ACE Inhibitor + Potassium: Hyperkalemia risk.' },
  { a: 'maoi', b: 'ssri', msg: 'MAOIs + SSRIs: Potentially fatal serotonin syndrome.' },
  { a: 'penicillamine', b: 'iron', msg: 'Penicillamine + Iron: Absorption significantly reduced — separate by 2+ hours.' },
];

function checkInteractions(drugs) {
  const names = drugs.map(d => d.name.toLowerCase());
  const warnings = [];
  KNOWN_INTERACTIONS.forEach(({ a, b, msg }) => {
    const hasA = names.some(n => n.includes(a));
    const hasB = names.some(n => n.includes(b));
    if (hasA && hasB) warnings.push(msg);
  });
  return warnings;
}

function checkAllergyConflict(drugs, allergies) {
  if (!allergies || allergies.toLowerCase() === 'none') return [];
  const allergyList = allergies.toLowerCase().split(/[,;]/);
  return drugs.filter(d =>
    allergyList.some(a => d.name.toLowerCase().includes(a.trim()) || d.category?.toLowerCase().includes(a.trim()))
  );
}

export default function DrugSuggestions({ disease, patient, selectedDrugs, clinicalNote, followUp, onChange, onNext, onBack }) {
  const [drugs, setDrugs] = useState([]);
  const [selected, setSelected] = useState(selectedDrugs || []);
  const [note, setNote] = useState(clinicalNote || '');
  const [followUpText, setFollowUpText] = useState(followUp || '');
  const [editableDosages, setEditableDosages] = useState({});
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const [allergyConflicts, setAllergyConflicts] = useState([]);

  useEffect(() => {
    if (!disease) return;
    fetchDrugs();
  }, [disease]);

  useEffect(() => {
    const warns = checkInteractions(selected);
    setInteractions(warns);
    const conflicts = checkAllergyConflict(selected, patient?.allergies);
    setAllergyConflicts(conflicts);
    onChange(selected, note, followUpText);
  }, [selected, note, followUpText]);

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/drugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disease: disease.name }),
      });
      const data = await res.json();
      setDrugs(data.drugs || []);
      if (!note) setNote(data.clinicalNote || '');
      setFallback(!!data.fallback);
    } catch {
      setFallback(true);
      setDrugs([{ name: 'AI Unavailable', dosage: 'Refer to formulary', category: 'Standard of Care', isOrphan: false }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleDrug = (drug) => {
    setSelected(prev => {
      const exists = prev.find(d => d.name === drug.name);
      if (exists) return prev.filter(d => d.name !== drug.name);
      return [...prev, { ...drug, dosage: editableDosages[drug.name] || drug.dosage }];
    });
  };

  const updateDosage = (drugName, dosage) => {
    setEditableDosages(d => ({ ...d, [drugName]: dosage }));
    setSelected(prev => prev.map(d => d.name === drugName ? { ...d, dosage } : d));
  };

  if (loading) {
    return (
      <div className="step-container">
        <div className="loading-overlay" style={{ position: 'relative', background: 'none', minHeight: '300px' }}>
          <div className="loading-spinner" />
          <div className="loading-text">Loading drug protocols...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container" style={{ maxWidth: '760px' }}>
      <h2 className="step-heading">Drug Suggestions</h2>
      <p className="step-subheading">
        Evidence-based drug protocols for <strong style={{ color: 'var(--accent)' }}>{disease?.name}</strong>
        {disease?.isRare && <span className="badge badge-rare" style={{ marginLeft: '10px' }}>🧬 RARE DISEASE</span>}
      </p>

      {fallback && (
        <div className="banner-fallback">
          ⚠ AI temporarily unavailable. Using local clinical database.
        </div>
      )}

      {interactions.length > 0 && (
        <div className="interaction-banner">
          <span>⚠</span>
          <div>
            <strong>Drug Interaction Detected — Review before prescribing</strong>
            <ul style={{ margin: '6px 0 0 16px', fontSize: '0.8rem' }}>
              {interactions.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        </div>
      )}

      {allergyConflicts.length > 0 && (
        <div className="allergy-warning">
          <span>🚨</span>
          <div>
            <strong>Allergy Conflict — Patient allergic to: {patient?.allergies}</strong>
            <div style={{ marginTop: '4px', fontSize: '0.8rem' }}>
              Flagged drugs: {allergyConflicts.map(d => d.name).join(', ')}
            </div>
          </div>
        </div>
      )}

      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        Select drugs to include in prescription · Dosages are editable
      </div>

      <div className="drug-cards">
        {drugs.map((drug, i) => {
          const isSelected = selected.find(d => d.name === drug.name);
          const hasAllergyConflict = allergyConflicts.find(d => d.name === drug.name);

          return (
            <div
              key={i}
              className="drug-card"
              style={{
                borderLeftColor: hasAllergyConflict ? 'var(--emergency)' : 'var(--accent)',
                opacity: 1,
              }}
            >
              <input
                type="checkbox"
                className="drug-checkbox"
                checked={!!isSelected}
                onChange={() => toggleDrug(drug)}
              />
              <div className="drug-info">
                <div className="drug-name">
                  {drug.name}
                  {drug.isOrphan && (
                    <span className="badge badge-orphan">🏷 ORPHAN DRUG</span>
                  )}
                  {hasAllergyConflict && (
                    <span className="badge badge-high">⚠ ALLERGY RISK</span>
                  )}
                </div>
                <div className="drug-dosage">{editableDosages[drug.name] || drug.dosage}</div>
                {isSelected && (
                  <input
                    type="text"
                    className="drug-dosage-edit"
                    value={editableDosages[drug.name] || drug.dosage}
                    onChange={e => updateDosage(drug.name, e.target.value)}
                    placeholder="Edit dosage..."
                  />
                )}
                <div className="drug-category">{drug.category}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="clinical-notes-section">
        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label>Clinical Notes</label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Clinical guidelines and special instructions..."
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>Follow-up Instructions</label>
          <input
            type="text"
            value={followUpText}
            onChange={e => setFollowUpText(e.target.value)}
            placeholder="e.g. Review in 2 weeks, Monitor CBC monthly"
          />
        </div>
      </div>

      {selected.length === 0 && (
        <div className="banner-info" style={{ marginTop: '16px' }}>
          <span>ℹ</span> Select at least one drug to generate prescription
        </div>
      )}

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          className="btn-next"
          onClick={onNext}
          disabled={selected.length === 0}
        >
          Generate Prescription →
        </button>
      </div>
    </div>
  );
}
