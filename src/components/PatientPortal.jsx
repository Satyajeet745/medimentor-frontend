import { useState, useRef, useEffect } from 'react';
import EmergencyAlert from './EmergencyAlert';
import { LANGUAGES, SYMPTOM_EXAMPLES, UI_TEXT, translateSymptomsToEnglish, getAyurvedicRemedies, getDiseaseName } from '../data/translations';

const EMERGENCY_KEYWORDS = ['chest pain','heart attack','cardiac arrest','breathlessness','cannot breathe','not breathing','stroke','unconscious','unresponsive','severe bleeding','anaphylaxis','overdose','eclampsia','छाती में दर्द','बेहोशी','छातीत दुखणे','शुद्ध हरपणे','છાતીમાં દુખાવો','બેભાન'];

const LOADING_STEPS = [
  { icon:'🩺', en:'Analyzing your symptoms...', hi:'लक्षणों का विश्लेषण...', mr:'लक्षणे तपासत आहे...', gu:'લક્ષણો તપાસી રહ્યા છીએ...' },
  { icon:'🔬', en:'Checking medical database...', hi:'चिकित्सा डेटाबेस जांच...', mr:'वैद्यकीय डेटाबेस तपासत...', gu:'તબીબી ડેટાબેઝ...' },
  { icon:'💊', en:'Reviewing clinical guidelines...', hi:'गाइडलाइन जांच...', mr:'मार्गदर्शक तत्त्वे तपासत...', gu:'ક્લિનિકલ માર્ગદર્શિકા...' },
  { icon:'📋', en:'Preparing health information...', hi:'जानकारी तैयार हो रही है...', mr:'माहिती तयार करत आहे...', gu:'માહિتી તૈяр...' },
  { icon:'🏥', en:'Almost ready...', hi:'लगभग तैयार...', mr:'जवळजवळ तयार...', gu:'લगभग तैयार...' },
];

const DOCTORS = [
  { id:1, name:'Dr. Rajesh Sharma', spec:'General Physician', qualification:'MBBS, MD', slots:['9:00 AM','10:00 AM','11:30 AM','2:00 PM','4:00 PM'], avatar:'👨‍⚕️' },
  { id:2, name:'Dr. Priya Patel', spec:'General Surgeon', qualification:'MBBS, MS', slots:['9:30 AM','11:00 AM','3:00 PM','5:00 PM'], avatar:'👩‍⚕️' },
  { id:3, name:'Dr. Amit Kulkarni', spec:'Neurologist', qualification:'MBBS, DM', slots:['10:00 AM','12:00 PM','4:30 PM'], avatar:'👨‍⚕️' },
  { id:4, name:'Dr. Sneha Desai', spec:'Pediatrician', qualification:'MBBS, MD', slots:['9:00 AM','10:30 AM','2:30 PM','4:00 PM'], avatar:'👩‍⚕️' },
];

const MODEL_PATIENTS = [
  { name:'Amit Sharma', age:45, gender:'Male', issue:'Chest pain and breathlessness', lang:'hi', symptoms:'छाती में दर्द, सांस लेने में तकलीफ, चक्कर आना' },
  { name:'Priya Patil', age:32, gender:'Female', issue:'Fever and body aches', lang:'mr', symptoms:'ताप, अंगदुखी, खोकला, थकवा' },
  { name:'Rajan Mehta', age:58, gender:'Male', issue:'Joint pain and swelling', lang:'gu', symptoms:'સાંધાનો દુખાવો, સોજો, સવારે જ્ઠtness' },
  { name:'Anjali Desai', age:25, gender:'Female', issue:'Headache and nausea', lang:'en', symptoms:'severe headache, nausea, light sensitivity, dizziness' },
];

export default function PatientPortal({ patient, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('en');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('moderate');
  const [allergies, setAllergies] = useState('');
  const [emergency, setEmergency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  // Appointment
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  // Chat
  const [chatMessages, setChatMessages] = useState([{ role:'ai', text:'Hello! I can help you with health questions in your language. What would you like to know?' }]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatListening, setChatListening] = useState(false);
  const chatRef = useRef(null);
  const msgInterval = useRef(null);
  const recognitionRef = useRef(null);
  const chatRecognitionRef = useRef(null);
  const t = UI_TEXT[lang];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) setVoiceSupported(true);
    const saved = localStorage.getItem('medimentor_patient_appointments');
    if (saved) setAppointments(JSON.parse(saved));
  }, []);

  useEffect(() => { chatRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const checkEmergency = (text) => EMERGENCY_KEYWORDS.some(kw => text.toLowerCase().includes(kw.toLowerCase()));

  const handleSymptomsChange = (val) => { setSymptoms(val); if (checkEmergency(val)) setEmergency(true); };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    recognitionRef.current = r;
    r.lang = { en:'en-IN', hi:'hi-IN', mr:'mr-IN', gu:'gu-IN' }[lang] || 'en-IN';
    r.continuous = true; r.interimResults = true;
    r.onresult = (e) => { const tr = Array.from(e.results).map(r => r[0].transcript).join(''); handleSymptomsChange(symptoms ? symptoms + ', ' + tr : tr); };
    r.onend = () => setIsListening(false);
    r.start(); setIsListening(true);
  };
  const stopVoice = () => { recognitionRef.current?.stop(); setIsListening(false); };

  const startChatVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    chatRecognitionRef.current = r;
    r.lang = { en:'en-IN', hi:'hi-IN', mr:'mr-IN', gu:'gu-IN' }[lang] || 'en-IN';
    r.onresult = (e) => { const tr = Array.from(e.results).map(r => r[0].transcript).join(''); setChatInput(tr); };
    r.onend = () => setChatListening(false);
    r.start(); setChatListening(true);
  };
  const stopChatVoice = () => { chatRecognitionRef.current?.stop(); setChatListening(false); };

  const handleSubmit = async () => {
    if (!symptoms.trim()) { setError('Please describe your symptoms.'); return; }
    setError(''); setLoading(true); setResult(null);
    let idx = 0; setLoadingStep(0);
    msgInterval.current = setInterval(() => { idx = (idx+1) % LOADING_STEPS.length; setLoadingStep(idx); }, 1000);
    const englishSymptoms = translateSymptomsToEnglish(symptoms, lang);
    try {
      const res = await fetch('/api/predict', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ symptoms: englishSymptoms }) });
      const data = await res.json();
      setResult(data.diseases || []);
    } catch { setError('Unable to connect. Please try again.'); }
    finally { setLoading(false); clearInterval(msgInterval.current); }
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedSlot || !appointmentDate) return;
    const apt = { id: Date.now(), patient: patient.name, doctor: selectedDoctor.name, spec: selectedDoctor.spec, slot: selectedSlot, date: appointmentDate, status: 'Confirmed' };
    const updated = [apt, ...appointments];
    setAppointments(updated);
    localStorage.setItem('medimentor_patient_appointments', JSON.stringify(updated));
    setAppointmentBooked(true);
    setTimeout(() => setAppointmentBooked(false), 3000);
    setSelectedDoctor(null); setSelectedSlot(''); setAppointmentDate('');
  };

  const sendChat = async () => {
    const msg = chatInput.trim();
    if (!msg || chatLoading) return;
    setChatInput('');
    const langHint = lang !== 'en' ? ` (Please respond in ${lang === 'hi' ? 'Hindi' : lang === 'mr' ? 'Marathi' : 'Gujarati'} language)` : '';
    setChatMessages(prev => [...prev, { role:'user', text: msg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: msg + langHint }) });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role:'ai', text: data.reply }]);
    } catch { setChatMessages(prev => [...prev, { role:'ai', text:'Sorry, unable to connect. Please try again.' }]); }
    finally { setChatLoading(false); }
  };

  const tabStyle = (tab) => ({
    padding:'10px 18px', border:'none', cursor:'pointer', fontFamily:'var(--font-ui)', fontSize:'0.85rem', fontWeight:600,
    background: activeTab===tab ? 'var(--accent)' : 'transparent',
    color: activeTab===tab ? 'white' : 'var(--text-secondary)',
    borderRadius:'var(--radius-sm)', transition:'var(--transition)',
  });

  const step = LOADING_STEPS[loadingStep];

  return (
    <div className="patient-portal" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'linear-gradient(135deg,#F0FDF9 0%,#E6F7F5 40%,#F0F4F8 100%)' }}>
      {emergency && <EmergencyAlert onDismiss={() => setEmergency(false)} />}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'2rem', marginBottom:'10px' }}>{step.icon}</div>
            <div className="loading-text">{step[lang] || step.en}</div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="patient-topbar" style={{ position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex',alignItems:'center',gap:'12px' }}>
          <span style={{ fontFamily:'Lora,serif',fontSize:'1.2rem',fontWeight:700,color:'var(--accent)' }}>🏥 MediMentor</span>
          <span style={{ background:'var(--accent-light)',color:'var(--accent)',border:'1px solid var(--border-accent)',padding:'3px 12px',borderRadius:'100px',fontSize:'0.72rem',fontWeight:700 }}>
            {t.home === 'Home' ? 'Patient Portal' : lang === 'hi' ? 'रोगी पोर्टल' : lang === 'mr' ? 'रुग्ण पोर्टल' : 'દર્દી પોર્ટલ'}
          </span>
        </div>
        <div style={{ display:'flex',alignItems:'center',gap:'10px' }}>
          <span style={{ fontSize:'0.85rem',color:'var(--text-secondary)' }}>👤 {patient.name}</span>
          <button className="topbar-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ background:'white',borderBottom:'1px solid var(--border)',padding:'0 24px',display:'flex',gap:'4px',alignItems:'center',overflowX:'auto' }}>
        {[
          { key:'home', label:`🏠 ${t.home}` },
          { key:'symptoms', label:`🔬 ${lang==='en'?'Symptoms':lang==='hi'?'लक्षण':lang==='mr'?'लक्षणे':'લક્ષણો'}` },
          { key:'appointment', label:`📅 ${t.appointment}` },
          { key:'history', label:`📋 ${t.myHistory}` },
          { key:'chat', label:`💬 ${lang==='en'?'AI Chat':lang==='hi'?'AI चैट':lang==='mr'?'AI चॅट':'AI ચૅટ'}` },
        ].map(tab => <button key={tab.key} style={tabStyle(tab.key)} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>)}
      </div>

      <div style={{ flex:1, maxWidth:'760px', margin:'0 auto', padding:'28px 24px', width:'100%' }}>

        {/* LANGUAGE SELECTOR */}
        <div style={{ background:'white',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',padding:'16px 20px',marginBottom:'20px',boxShadow:'var(--shadow-card)' }}>
          <div style={{ fontSize:'0.72rem',fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'10px' }}>🌐 {t.selectLang}</div>
          <div style={{ display:'flex',gap:'10px',flexWrap:'wrap' }}>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code); setSymptoms(''); setError(''); }}
                style={{ background:lang===l.code?'var(--accent)':'var(--bg-elevated)',color:lang===l.code?'white':'var(--text-secondary)',border:`2px solid ${lang===l.code?'var(--accent)':'var(--border)'}`,padding:'8px 16px',borderRadius:'var(--radius-sm)',cursor:'pointer',fontFamily:'var(--font-ui)',fontSize:'0.85rem',fontWeight:700,transition:'var(--transition)' }}>
                {l.flag} {l.native}
              </button>
            ))}
          </div>
        </div>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px', marginBottom: '20px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg,var(--accent),#14b8a6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.2rem', flexShrink: 0 }}>
                  {patient.name?.[0] || 'P'}
                </div>
                <div>
                  <h2 style={{ fontFamily: 'Lora,serif', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{t.welcome}, {patient.name}! 👋</h2>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {patient.id && <span style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border-accent)', padding: '2px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700 }}>ID: {patient.id}</span>}
                    {patient.phone && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📞 {patient.phone}</span>}
                    {patient.age && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🎂 {patient.age}y</span>}
                    {patient.gender && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>👤 {patient.gender}</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {[
                  { icon: '🔬', label: lang === 'en' ? 'Check Symptoms' : lang === 'hi' ? 'लक्षण जांचें' : lang === 'mr' ? 'लक्षणे तपासा' : 'લક્ષણ તpasો', tab: 'symptoms', color: 'var(--accent)' },
                  { icon: '📅', label: t.appointment, tab: 'appointment', color: '#3B82F6' },
                  { icon: '📋', label: t.myHistory, tab: 'history', color: 'var(--success)' },
                  { icon: '💬', label: t.chatWithAI, tab: 'chat', color: 'var(--purple)' },
                ].map((item, i) => (
                  <button key={i} onClick={() => setActiveTab(item.tab)}
                    style={{ background: 'var(--bg-elevated)', border: `1px solid var(--border)`, borderRadius: 'var(--radius-md)', padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'var(--transition)', fontFamily: 'var(--font-ui)', textAlign: 'left' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.background = `${item.color}12`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SYMPTOMS TAB */}
        {activeTab === 'symptoms' && (
          <div>
            {!result ? (
              <div style={{ background:'white',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',padding:'28px',boxShadow:'var(--shadow-card)' }}>
                <h3 style={{ fontFamily:'Lora,serif',fontSize:'1.2rem',color:'var(--text-primary)',marginBottom:'20px' }}>📋 {t.describe}</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px' }}>
                      <label style={{ margin:0 }}>{lang==='en'?'Symptoms *':lang==='hi'?'लक्षण *':lang==='mr'?'लक्षणे *':'લક્ષણો *'}</label>
                      {voiceSupported && (
                        <button onClick={isListening ? stopVoice : startVoice}
                          style={{ background:isListening?'var(--emergency)':'var(--accent-light)',color:isListening?'white':'var(--accent)',border:`1px solid ${isListening?'var(--emergency)':'var(--border-accent)'}`,padding:'5px 14px',borderRadius:'100px',cursor:'pointer',fontSize:'0.78rem',fontWeight:700,fontFamily:'var(--font-ui)' }}>
                          {isListening ? t.stopBtn : t.speakBtn}
                        </button>
                      )}
                    </div>
                    {isListening && <div style={{ background:'#FEF2F2',border:'1px solid rgba(220,38,38,0.2)',borderRadius:'var(--radius-sm)',padding:'8px 12px',marginBottom:'8px',fontSize:'0.8rem',color:'var(--emergency)' }}>🔴 {t.listening}</div>}
                    <textarea value={symptoms} onChange={e => handleSymptomsChange(e.target.value)} placeholder={lang==='en'?'Describe symptoms...':lang==='hi'?'लक्षण बताएं...':lang==='mr'?'लक्षणे सांगा...':'લક્ષণો જણાવો...'} rows={4} />
                  </div>

                  <div>
                    <div style={{ fontSize:'0.72rem',color:'var(--text-muted)',marginBottom:'8px',fontWeight:600,textTransform:'uppercase' }}>{t.examples}</div>
                    <div style={{ display:'flex',flexWrap:'wrap',gap:'7px' }}>
                      {(SYMPTOM_EXAMPLES[lang]||SYMPTOM_EXAMPLES.en).map((ex,i) => (
                        <button key={i} onClick={() => handleSymptomsChange(ex.text)}
                          style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',color:'var(--text-secondary)',padding:'6px 12px',borderRadius:'100px',fontSize:'0.76rem',cursor:'pointer',fontFamily:'var(--font-ui)',transition:'var(--transition)' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-secondary)'; }}
                        >{ex.label}</button>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group"><label>{t.howLong}</label><input type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder={lang==='en'?'e.g. 2 days':lang==='hi'?'जैसे: 2 दिन':lang==='mr'?'उदा: 2 दिवस':'2 દિવસ'} /></div>
                    <div className="form-group"><label>{t.severity}</label><select value={severity} onChange={e => setSeverity(e.target.value)}><option value="mild">{t.mild}</option><option value="moderate">{t.moderate}</option><option value="severe">{t.severe}</option></select></div>
                  </div>
                  <div className="form-group"><label>{t.allergies}</label><input type="text" value={allergies} onChange={e => setAllergies(e.target.value)} placeholder={t.none} /></div>
                  {error && <div className="allergy-warning"><span>⚠</span> {error}</div>}
                  <button className="btn-next" onClick={handleSubmit} style={{ width:'100%',justifyContent:'center',padding:'14px' }}>{t.analyze}</button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ background:'white',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',padding:'28px',marginBottom:'20px',boxShadow:'var(--shadow-card)' }}>
                  <h3 style={{ fontFamily:'Lora,serif',fontSize:'1.3rem',color:'var(--text-primary)',marginBottom:'6px' }}>🔬 {t.results}</h3>
                  <p style={{ color:'var(--text-secondary)',fontSize:'0.85rem',marginBottom:'16px' }}>{t.basedOn}: <em>"{symptoms}"</em></p>
                  <div style={{ background:'var(--warning-light)',border:'1px solid rgba(217,119,6,0.25)',borderRadius:'var(--radius-sm)',padding:'12px',marginBottom:'16px',fontSize:'0.82rem',color:'var(--warning)' }}>{t.disclaimer}</div>

                  {result.map((disease,i) => {
                    const localName = getDiseaseName(disease.name, lang);
                    const { remedies, category } = getAyurvedicRemedies(symptoms + ' ' + disease.name, lang);
                    return (
                      <div key={i} style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',padding:'18px',marginBottom:'12px' }}>
                        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px',flexWrap:'wrap',gap:'8px' }}>
                          <div style={{ fontFamily:'Lora,serif',fontSize:'1.05rem',fontWeight:600,color:'var(--text-primary)' }}>{localName}</div>
                          <div style={{ display:'flex',gap:'7px',flexWrap:'wrap' }}>
                            <span style={{ background:'var(--accent-light)',color:'var(--accent)',border:'1px solid var(--border-accent)',padding:'2px 10px',borderRadius:'100px',fontSize:'0.72rem',fontWeight:700 }}>{disease.confidence}% {t.match}</span>
                            {disease.isRare && <span style={{ background:'var(--purple-light)',color:'var(--purple)',border:'1px solid rgba(124,58,237,0.2)',padding:'2px 10px',borderRadius:'100px',fontSize:'0.72rem',fontWeight:700 }}>🧬 {t.rare}</span>}
                          </div>
                        </div>
                        <div style={{ height:'5px',background:'var(--border)',borderRadius:'100px',overflow:'hidden',marginBottom:'12px' }}>
                          <div style={{ width:`${disease.confidence}%`,height:'100%',background:'var(--accent)',borderRadius:'100px',transition:'width 1.2s ease' }} />
                        </div>
                        <div style={{ fontSize:'0.82rem',color:'var(--text-secondary)',lineHeight:1.6,marginBottom:'12px' }}>{disease.reasoning}</div>

                        {/* Ayurvedic remedies */}
                        {remedies.length > 0 && (
                          <div style={{ background:'linear-gradient(135deg,#F0FDF4,#ECFDF5)',border:'1px solid rgba(5,150,105,0.2)',borderRadius:'var(--radius-sm)',padding:'14px' }}>
                            <div style={{ fontSize:'0.75rem',fontWeight:700,color:'var(--success)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'10px' }}>🌿 {t.ayurvedic} — {category}</div>
                            {remedies.map((remedy,j) => (
                              <div key={j} style={{ display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'6px',fontSize:'0.8rem',color:'var(--text-secondary)' }}>
                                <span style={{ color:'var(--success)',flexShrink:0 }}>✦</span>
                                <span>{remedy}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div style={{ background:'#F0FDF9',border:'1px solid var(--border-accent)',borderRadius:'var(--radius-md)',padding:'18px',marginTop:'16px' }}>
                    <div style={{ fontWeight:700,color:'var(--accent)',marginBottom:'10px' }}>{t.whatNext}</div>
                    <ul style={{ paddingLeft:'18px' }}>{t.steps.map((s,i) => <li key={i} style={{ fontSize:'0.85rem',color:'var(--text-secondary)',lineHeight:2 }}>{s}</li>)}</ul>
                  </div>
                </div>
                <div style={{ display:'flex',gap:'12px',flexWrap:'wrap' }}>
                  <button className="btn-next" onClick={() => setResult(null)}>{t.checkOther}</button>
                  <button className="btn-secondary" onClick={() => setActiveTab('appointment')}>📅 {t.appointment}</button>
                  <button className="btn-secondary" onClick={() => window.print()}>{t.saveReport}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* APPOINTMENT TAB */}
        {activeTab === 'appointment' && (
          <div>
            <div style={{ background:'white',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',padding:'28px',marginBottom:'20px',boxShadow:'var(--shadow-card)' }}>
              <h3 style={{ fontFamily:'Lora,serif',fontSize:'1.2rem',color:'var(--text-primary)',marginBottom:'20px' }}>
                📅 {lang==='en'?'Book Doctor Appointment':lang==='hi'?'डॉक्टर अपॉइंटमेंट बुक करें':lang==='mr'?'डॉक्टर अपॉइंटमेंट बुक करा':'ડૉક્ટર અpointment બુK'}
              </h3>
              {appointmentBooked && (
                <div style={{ background:'var(--success-light)',border:'1px solid rgba(5,150,105,0.3)',borderRadius:'var(--radius-sm)',padding:'12px 16px',marginBottom:'16px',color:'var(--success)',fontWeight:600,fontSize:'0.88rem' }}>
                  ✅ {lang==='en'?'Appointment Confirmed!':lang==='hi'?'अपॉइंटमेंट कन्फर्म!':lang==='mr'?'अपॉइंटमेंट कन्फर्म!':'Appointment Confirm!'}
                </div>
              )}

              <div style={{ display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px' }}>
                {DOCTORS.map(doc => (
                  <div key={doc.id} onClick={() => setSelectedDoctor(doc)}
                    style={{ background: selectedDoctor?.id===doc.id ? 'var(--accent-light)' : 'var(--bg-elevated)', border:`2px solid ${selectedDoctor?.id===doc.id?'var(--accent)':'var(--border)'}`, borderRadius:'var(--radius-md)',padding:'16px',cursor:'pointer',transition:'var(--transition)',display:'flex',alignItems:'center',gap:'14px' }}>
                    <span style={{ fontSize:'2rem' }}>{doc.avatar}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,color:'var(--text-primary)',fontSize:'0.92rem' }}>{doc.name}</div>
                      <div style={{ fontSize:'0.78rem',color:'var(--accent)',marginTop:'2px' }}>{doc.qualification} · {doc.spec}</div>
                    </div>
                    {selectedDoctor?.id===doc.id && <span style={{ color:'var(--accent)',fontSize:'1.2rem' }}>✓</span>}
                  </div>
                ))}
              </div>

              {selectedDoctor && (
                <>
                  <div className="form-row" style={{ marginBottom:'16px' }}>
                    <div className="form-group">
                      <label>{lang==='en'?'Select Date':lang==='hi'?'तारीख चुनें':lang==='mr'?'तारीख निवडा':'તારીখ પસંદ'}</label>
                      <input type="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                      <label>{lang==='en'?'Select Time Slot':lang==='hi'?'समय चुनें':lang==='mr'?'वेळ निवडा':'સمय Pसंd'}</label>
                      <div style={{ display:'flex',flexWrap:'wrap',gap:'8px',marginTop:'4px' }}>
                        {selectedDoctor.slots.map(slot => (
                          <button key={slot} onClick={() => setSelectedSlot(slot)}
                            style={{ background:selectedSlot===slot?'var(--accent)':'white',color:selectedSlot===slot?'white':'var(--text-secondary)',border:`1px solid ${selectedSlot===slot?'var(--accent)':'var(--border)'}`,padding:'6px 12px',borderRadius:'var(--radius-sm)',cursor:'pointer',fontSize:'0.8rem',fontFamily:'var(--font-ui)',transition:'var(--transition)' }}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="btn-next" onClick={handleBookAppointment} disabled={!selectedSlot||!appointmentDate} style={{ width:'100%',justifyContent:'center' }}>
                    📅 {lang==='en'?'Confirm Appointment':lang==='hi'?'अपॉइंटमेंट कन्फर्म करें':lang==='mr'?'अपॉइंटमेंट कन्फर्म करा':'Confirm Appointment'}
                  </button>
                </>
              )}
            </div>

            {/* My appointments */}
            {appointments.length > 0 && (
              <div style={{ background:'white',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',padding:'24px',boxShadow:'var(--shadow-card)' }}>
                <div style={{ fontSize:'0.75rem',fontWeight:700,color:'var(--accent)',textTransform:'uppercase',marginBottom:'14px' }}>📋 My Appointments</div>
                {appointments.map((apt,i) => (
                  <div key={i} style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'14px',marginBottom:'10px',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <div>
                      <div style={{ fontWeight:600,color:'var(--text-primary)',fontSize:'0.88rem' }}>{apt.doctor}</div>
                      <div style={{ fontSize:'0.75rem',color:'var(--text-muted)' }}>{apt.spec} · {apt.date} · {apt.slot}</div>
                    </div>
                    <span style={{ background:'var(--success-light)',color:'var(--success)',border:'1px solid rgba(5,150,105,0.25)',padding:'3px 10px',borderRadius:'100px',fontSize:'0.72rem',fontWeight:700 }}>✓ {apt.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div style={{ background:'white',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',padding:'28px',boxShadow:'var(--shadow-card)' }}>
            <h3 style={{ fontFamily:'Lora,serif',fontSize:'1.2rem',color:'var(--text-primary)',marginBottom:'20px' }}>📋 {t.myHistory}</h3>
            {appointments.length === 0 ? (
              <div style={{ textAlign:'center',color:'var(--text-muted)',padding:'40px' }}>
                <div style={{ fontSize:'3rem',marginBottom:'12px' }}>📋</div>
                <div>{lang==='en'?'No history yet. Book an appointment!':lang==='hi'?'कोई इतिहास नहीं। अपॉइंटमेंट बुक करें!':lang==='mr'?'इतिहास नाही. अपॉइंटमेंट बुक करा!':'ઇतिहास નথी. Appointment book करो!'}</div>
              </div>
            ) : appointments.map((apt,i) => (
              <div key={i} style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',padding:'18px',marginBottom:'12px' }}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'10px' }}>
                  <div style={{ fontWeight:700,color:'var(--text-primary)' }}>👨‍⚕️ {apt.doctor}</div>
                  <span style={{ background:'var(--success-light)',color:'var(--success)',padding:'2px 10px',borderRadius:'100px',fontSize:'0.72rem',fontWeight:700 }}>✓ {apt.status}</span>
                </div>
                <div style={{ fontSize:'0.78rem',color:'var(--text-muted)' }}>{apt.spec} · 📅 {apt.date} · 🕐 {apt.slot}</div>
              </div>
            ))}
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div style={{ background:'white',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',overflow:'hidden',boxShadow:'var(--shadow-card)',display:'flex',flexDirection:'column',height:'520px' }}>
            <div style={{ padding:'16px 20px',borderBottom:'1px solid var(--border)',background:'var(--accent-light)',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:700,color:'var(--accent)',fontSize:'0.9rem' }}>💬 {t.chatWithAI}</div>
                <div style={{ fontSize:'0.72rem',color:'var(--text-muted)' }}>{lang==='en'?'Ask health questions in your language':lang==='hi'?'अपनी भाषा में स्वास्थ्य प्रश्न पूछें':lang==='mr'?'तुमच्या भाषेत आरोग्य प्रश्न विचारा':'તmāri ভাষামাં સ્વাস્થ્ย Prashn'}</div>
              </div>
              <span style={{ fontSize:'1.5rem' }}>🤖</span>
            </div>

            <div style={{ flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:'12px' }}>
              {chatMessages.map((msg,i) => (
                <div key={i} style={{ display:'flex',gap:'8px',maxWidth:'85%',alignSelf:msg.role==='user'?'flex-end':'flex-start',flexDirection:msg.role==='user'?'row-reverse':'row' }}>
                  <div style={{ width:'30px',height:'30px',borderRadius:'50%',background:msg.role==='ai'?'var(--accent)':'var(--bg-elevated)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',flexShrink:0,border:'1px solid var(--border)' }}>{msg.role==='ai'?'🏥':'👤'}</div>
                  <div style={{ background:msg.role==='ai'?'var(--bg-elevated)':'var(--accent)',color:msg.role==='ai'?'var(--text-primary)':'white',border:`1px solid ${msg.role==='ai'?'var(--border)':'var(--accent)'}`,borderRadius:msg.role==='ai'?'4px 12px 12px 12px':'12px 4px 12px 12px',padding:'10px 14px',fontSize:'0.85rem',lineHeight:1.6 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ display:'flex',gap:'8px',alignItems:'center' }}>
                  <div style={{ width:'30px',height:'30px',borderRadius:'50%',background:'var(--accent)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem' }}>🏥</div>
                  <div style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:'4px 12px 12px 12px',padding:'10px 14px',display:'flex',gap:'5px',alignItems:'center' }}>
                    {[0,1,2].map(i => <div key={i} style={{ width:'6px',height:'6px',borderRadius:'50%',background:'var(--accent)',animation:`pulse-dot 1.2s ease ${i*0.2}s infinite` }} />)}
                  </div>
                </div>
              )}
              <div ref={chatRef} />
            </div>

            <div style={{ padding:'12px 16px',borderTop:'1px solid var(--border)',display:'flex',gap:'8px' }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey) { e.preventDefault(); sendChat(); } }}
                placeholder={lang==='en'?'Ask a health question...':lang==='hi'?'स्वास्थ्य प्रश्न पूछें...':lang==='mr'?'आरोग्य प्रश्न विचारा...':'Prashn Puchho...'} className="chat-input" disabled={chatLoading} />
              {voiceSupported && (
                <button onClick={chatListening ? stopChatVoice : startChatVoice}
                  style={{ background:chatListening?'var(--emergency)':'var(--accent-light)',color:chatListening?'white':'var(--accent)',border:`1px solid ${chatListening?'var(--emergency)':'var(--border-accent)'}`,width:'44px',height:'44px',borderRadius:'50%',cursor:'pointer',fontSize:'1rem',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                  {chatListening?'⏹':'🎤'}
                </button>
              )}
              <button className="btn-send" onClick={sendChat} disabled={!chatInput.trim()||chatLoading}>➤</button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding:'14px 28px',textAlign:'center',fontSize:'0.73rem',color:'var(--text-muted)',borderTop:'1px solid var(--border)',background:'white' }}>
        ⚕ MediMentor — {lang==='en'?'For informational purposes only. Always consult a doctor.':lang==='hi'?'केवल जानकारी के लिए। डॉक्टर से मिलें।':lang==='mr'?'केवळ माहितीसाठी। डॉक्टरांना भेटा.':'માત્ર માहitી. ডৌক্ĞRne মিলো.'}
        <br />
        <span style={{ fontSize:'0.7rem',color:'var(--text-muted)',marginTop:'4px',display:'block' }}>
          AI-Powered Rare Drug Suggestion & Smart Prescription System
        </span>
      </div>
    </div>
  );
}
