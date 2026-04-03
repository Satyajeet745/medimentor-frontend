import { useState, useEffect, useRef } from 'react';
import EmergencyAlert from './EmergencyAlert';

const EMERGENCY_KEYWORDS = [
  'chest pain','chest tightness','heart attack','cardiac arrest',
  'breathlessness','cannot breathe','not breathing','stopped breathing',
  'severe shortness of breath','respiratory arrest','choking',
  'anaphylaxis','severe allergic reaction','stroke',
  'loss of consciousness','unconscious','unresponsive',
  'status epilepticus','severe bleeding','hemorrhage',
  'septic shock','anaphylactic shock','diabetic coma',
  'hypoglycemic coma','ketoacidosis','pulmonary embolism',
  'aortic dissection','overdose','eclampsia','severe preeclampsia'
];

const LOADING_MESSAGES = [
  { icon: '🩺', text: 'Cross-referencing symptoms with clinical database...' },
  { icon: '🧬', text: 'Analyzing rare disease pattern matching...' },
  { icon: '💊', text: 'Reviewing FDA-approved drug protocols...' },
  { icon: '🔬', text: 'Running differential diagnosis algorithm...' },
  { icon: '📋', text: 'Evaluating symptom severity and risk factors...' },
  { icon: '🫀', text: 'Checking cardiovascular risk indicators...' },
  { icon: '🧠', text: 'Scanning neurological symptom patterns...' },
  { icon: '⚕️', text: 'Applying evidence-based clinical guidelines...' },
  { icon: '🏥', text: 'Consulting clinical decision support system...' },
  { icon: '📊', text: 'Calculating disease confidence scores...' },
];

const RARE_EXAMPLES = [
  { label: 'Gaucher Disease', symptoms: 'bone pain, fatigue, spleen enlargement, anemia, thrombocytopenia' },
  { label: 'Fabry Disease', symptoms: 'neuropathic pain burning hands feet, angiokeratoma, hypohidrosis' },
  { label: 'Wilson Disease', symptoms: 'liver disease, tremor, kayser-fleischer rings, psychiatric symptoms' },
  { label: 'Cystic Fibrosis', symptoms: 'chronic lung infection, salty skin, malabsorption, clubbing' },
  { label: 'Huntington Disease', symptoms: 'involuntary movements chorea, cognitive decline, psychiatric symptoms' },
  { label: 'HAE', symptoms: 'recurrent angioedema, abdominal pain, laryngeal edema, swelling' },
  { label: 'ATTR Amyloidosis', symptoms: 'peripheral neuropathy, cardiomyopathy, autonomic dysfunction' },
  { label: 'AIP', symptoms: 'acute abdominal pain, neurological symptoms, dark urine, porphyria' },
  { label: 'Marfan Syndrome', symptoms: 'tall stature, long limbs, aortic dilation, lens dislocation' },
  { label: 'ALS', symptoms: 'progressive muscle weakness, fasciculations, dysarthria, dysphagia' },
];

const COMMON_EXAMPLES = [
  { label: 'Type 2 Diabetes', symptoms: 'increased thirst, frequent urination, fatigue, blurred vision, weight loss' },
  { label: 'Hypertension', symptoms: 'severe headache, dizziness, blurred vision, chest discomfort' },
  { label: 'Asthma', symptoms: 'wheezing, shortness of breath, chest tightness, dry cough' },
  { label: 'Pneumonia', symptoms: 'fever, chills, chest pain, productive cough, difficulty breathing' },
  { label: 'Tuberculosis', symptoms: 'persistent cough, night sweats, weight loss, blood in sputum, fever' },
  { label: 'Hypothyroidism', symptoms: 'weight gain, fatigue, hair loss, cold intolerance, dry skin' },
  { label: 'Migraine', symptoms: 'severe headache, nausea, vomiting, light sensitivity, throbbing pain' },
  { label: 'Dengue Fever', symptoms: 'high fever, severe headache, eye pain, rash, muscle joint pain' },
  { label: 'Malaria', symptoms: 'cyclical fever chills, headache, sweating, myalgia, splenomegaly' },
  { label: 'Rheumatoid Arthritis', symptoms: 'morning stiffness, symmetrical joint swelling, fatigue, elevated CRP' },
];

const EMERGENCY_EXAMPLES = [
  { label: '❤️ Heart Attack', symptoms: 'chest pain, crushing chest pressure, left arm pain, sweating, nausea' },
  { label: '🧠 Acute Stroke', symptoms: 'sudden face drooping, arm weakness, speech difficulty, severe headache' },
  { label: '⚡ Cardiac Arrest', symptoms: 'cardiac arrest, no pulse, unconscious, unresponsive, not breathing' },
  { label: '🤧 Anaphylaxis', symptoms: 'severe allergic reaction, throat swelling, anaphylaxis, difficulty breathing' },
  { label: '🩸 Hemorrhage', symptoms: 'severe bleeding, uncontrolled hemorrhage, hypovolemic shock' },
  { label: '🔥 DKA', symptoms: 'diabetic ketoacidosis, blood glucose very high, Kussmaul breathing, fruity breath' },
  { label: '🫀 Pulmonary Embolism', symptoms: 'sudden shortness of breath, chest pain, coughing blood' },
  { label: '🤰 Eclampsia', symptoms: 'eclampsia, seizures in pregnancy, severe preeclampsia, HELLP syndrome' },
  { label: '🧠 Meningitis', symptoms: 'severe meningitis, neck stiffness, fever, photophobia, purpuric rash' },
  { label: '💊 Drug Overdose', symptoms: 'overdose, drug poisoning, unconscious after medication, toxic ingestion' },
];

export default function SymptomEntry({ symptoms: initSymptoms, diseaseName: initDisease, patient, onChange, onNext, onBack }) {
  const [symptoms, setSymptoms] = useState(initSymptoms || '');
  const [diseaseName, setDiseaseName] = useState(initDisease || '');
  const [emergency, setEmergency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('rare');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const msgInterval = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (window._demoSymptoms && !symptoms) {
      const s = window._demoSymptoms;
      setSymptoms(s); onChange(s, diseaseName);
      window._demoSymptoms = null;
      if (window._demoType === 'emergency') setTimeout(() => setEmergency(true), 300);
    }
    // Check voice support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
    }
  }, []);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      const newSymptoms = symptoms ? symptoms + ', ' + transcript : transcript;
      setSymptoms(newSymptoms);
      onChange(newSymptoms, diseaseName);
      if (EMERGENCY_KEYWORDS.some(kw => transcript.toLowerCase().includes(kw))) setEmergency(true);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  };

  const stopVoice = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const startLoadingMessages = () => {
    let index = 0;
    setLoadingMsg(LOADING_MESSAGES[0]);
    msgInterval.current = setInterval(() => {
      index = (index + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[index]);
    }, 900);
  };

  const stopLoadingMessages = () => {
    if (msgInterval.current) clearInterval(msgInterval.current);
  };

  const checkEmergency = (text) => EMERGENCY_KEYWORDS.some(kw => text.toLowerCase().includes(kw));

  const fillSymptoms = (val) => {
    setSymptoms(val); onChange(val, diseaseName);
    if (checkEmergency(val)) setEmergency(true);
  };

  const handleSymptomsChange = (val) => {
    setSymptoms(val); onChange(val, diseaseName);
    if (checkEmergency(val)) setEmergency(true);
  };

  const handleAnalyze = async () => {
    const input = diseaseName.trim() || symptoms.trim();
    if (!input) { setError('Please enter symptoms or a disease name.'); return; }
    setError('');
    setLoading(true);
    startLoadingMessages();
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: input }),
      });
      const data = await res.json();
      onNext(data.diseases || []);
    } catch {
      setError('Unable to connect to backend. Please ensure server is running on port 5001.');
    } finally {
      setLoading(false);
      stopLoadingMessages();
    }
  };

  const tabStyle = (tab) => ({
    background: activeTab === tab ? 'var(--accent)' : 'var(--bg-surface)',
    color: activeTab === tab ? 'white' : 'var(--text-secondary)',
    border: `1px solid ${activeTab === tab ? 'var(--accent)' : 'var(--border)'}`,
    padding: '7px 16px', borderRadius: 'var(--radius-sm)',
    cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
    fontFamily: 'var(--font-ui)', transition: 'var(--transition)',
  });

  const currentExamples = activeTab === 'rare' ? RARE_EXAMPLES : activeTab === 'common' ? COMMON_EXAMPLES : EMERGENCY_EXAMPLES;

  return (
    <div className="step-container" style={{ maxWidth: '760px' }}>
      {emergency && <EmergencyAlert onDismiss={() => setEmergency(false)} />}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <div style={{ textAlign: 'center', maxWidth: '360px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{loadingMsg.icon}</div>
            <div className="loading-text" style={{ marginBottom: '8px' }}>{loadingMsg.text}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Clinical AI analyzing across 5000+ disease profiles
            </div>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '20px' }}>
              {[0,1,2,3,4].map(i => (
                <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: `pulse-dot 1.5s ease ${i * 0.15}s infinite` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <h2 className="step-heading">Enter Symptoms</h2>
      <p className="step-subheading">
        Type or <strong style={{ color: 'var(--accent)' }}>speak</strong> symptoms — AI analyzes across 5000+ diseases
      </p>

      <div className="form-grid" style={{ marginBottom: '28px' }}>
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ margin: 0 }}>Describe Patient Symptoms *</label>
            {voiceSupported && (
              <button
                onClick={isListening ? stopVoice : startVoice}
                style={{
                  background: isListening ? 'var(--emergency)' : 'var(--accent-light)',
                  color: isListening ? 'white' : 'var(--accent)',
                  border: `1px solid ${isListening ? 'var(--emergency)' : 'var(--border-accent)'}`,
                  padding: '6px 14px', borderRadius: '100px',
                  cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700,
                  fontFamily: 'var(--font-ui)', display: 'flex', alignItems: 'center', gap: '6px',
                  animation: isListening ? 'pulse-emergency 1.5s infinite' : 'none',
                }}
              >
                {isListening ? (
                  <><span style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', display: 'inline-block' }} />Stop Recording</>
                ) : (
                  <>🎤 Voice Input</>
                )}
              </button>
            )}
          </div>

          {isListening && (
            <div style={{ background: 'var(--emergency-light)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: '10px', fontSize: '0.82rem', color: 'var(--emergency)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', background: 'var(--emergency)', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 1s infinite' }} />
              Listening... Speak symptoms clearly. Click Stop when done.
            </div>
          )}

          <textarea
            value={symptoms}
            onChange={e => handleSymptomsChange(e.target.value)}
            placeholder="Type or speak symptoms separated by commas...&#10;&#10;Examples:&#10;• bone pain, fatigue, spleen enlargement, anemia&#10;• increased thirst, frequent urination, blurred vision&#10;• chest pain, breathlessness, sweating&#10;&#10;Or click a chip below to auto-fill"
            rows={5}
          />
          {symptoms && (
            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '4px' }}>
              ✓ {symptoms.split(',').filter(s => s.trim()).length} symptom(s) entered
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>— OR enter disease name directly —</div>

        <div className="form-group">
          <label>Known Disease Name (Optional)</label>
          <input type="text" value={diseaseName} onChange={e => { setDiseaseName(e.target.value); onChange(symptoms, e.target.value); }} placeholder="e.g. Gaucher Disease, Type 2 Diabetes, Tuberculosis..." />
        </div>

        {patient.allergies && patient.allergies.toLowerCase() !== 'none' && (
          <div className="banner-info"><span>💊</span> Patient allergies: <strong style={{ marginLeft: '4px' }}>{patient.allergies}</strong> — will be cross-checked</div>
        )}
        {error && <div className="allergy-warning"><span>⚠</span> {error}</div>}
      </div>

      <div className="demo-section">
        <div className="demo-label">📋 Example Scenarios — Click to Auto-Fill</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Examples only — you can type <strong>any disease or symptoms</strong>. AI handles 5000+ conditions.
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <button style={tabStyle('rare')} onClick={() => setActiveTab('rare')}>🧬 Rare Disease</button>
          <button style={tabStyle('common')} onClick={() => setActiveTab('common')}>💊 Common Disease</button>
          <button style={tabStyle('emergency')} onClick={() => setActiveTab('emergency')}>⚠️ Emergency</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {currentExamples.map((c, i) => (
            <button key={i} className={`demo-btn${activeTab === 'emergency' ? ' emergency' : ''}`} onClick={() => fillSymptoms(c.symptoms)} style={{ fontSize: '0.78rem' }}>{c.label}</button>
          ))}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleAnalyze}>🔬 Analyze Symptoms →</button>
      </div>
    </div>
  );
}
