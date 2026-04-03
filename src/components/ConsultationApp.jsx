import { useState, useEffect } from 'react';
import PatientForm from './PatientForm';
import SymptomEntry from './SymptomEntry';
import DiseasePrediction from './DiseasePrediction';
import DrugSuggestions from './DrugSuggestions';
import Prescription from './Prescription';
import Dashboard from './Dashboard';

const STEPS = [{ label: 'Patient Info' },{ label: 'Enter Symptoms' },{ label: 'Disease Prediction' },{ label: 'Drug Suggestions' },{ label: 'Prescription' }];
const initialState = { patient: { name:'',age:'',gender:'Male',phone:'',allergies:'',bp:'',temp:'',heartRate:'',spo2:'' }, symptoms:'',diseaseName:'',diseases:[],selectedDisease:null,drugs:[],selectedDrugs:[],clinicalNote:'',followUp:'' };

export default function ConsultationApp({ onBack, onChat, doctor, onLogout }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);
  const [history, setHistory] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchPhone, setSearchPhone] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('medimentor_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const updateData = (patch) => setData(d => ({ ...d, ...patch }));

  const saveToHistory = (prescriptionData) => {
    const record = {
      id: `MM-${Date.now()}`,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-IN', { day:'2-digit',month:'short',year:'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour:'2-digit',minute:'2-digit' }),
      doctor: doctor?.name,
      patient: prescriptionData.patient,
      disease: prescriptionData.disease?.name,
      isRare: prescriptionData.disease?.isRare,
      drugs: prescriptionData.drugs,
      clinicalNote: prescriptionData.clinicalNote,
      followUp: prescriptionData.followUp,
    };
    const updated = [record, ...history].slice(0, 100);
    setHistory(updated);
    localStorage.setItem('medimentor_history', JSON.stringify(updated));
  };

  const reset = () => { setStep(0); setData(initialState); };

  // Doctor-wise patient history
  const myHistory = history.filter(h => h.doctor === doctor?.name);
  const filteredHistory = myHistory.filter(h =>
    searchPhone === '' ||
    h.patient?.phone?.includes(searchPhone) ||
    h.patient?.name?.toLowerCase().includes(searchPhone.toLowerCase())
  );

  return (
    <div className="app-layout">
      {/* Full-screen Dashboard */}
      {showDashboard && <Dashboard history={history} doctor={doctor} onClose={() => setShowDashboard(false)} />}

      {/* TOP BAR */}
      <div className="app-topbar">
        <span className="topbar-logo">🏥 MediMentor</span>
        {data.patient.name && <span className="topbar-patient">👤 {data.patient.name}{data.patient.age && `, ${data.patient.age}y`}</span>}
        <div className="topbar-actions" style={{ gap: '8px' }}>
          {doctor && (
            <div style={{ display:'flex',alignItems:'center',gap:'8px',background:'var(--bg-elevated)',border:'1px solid var(--border-accent)',borderRadius:'var(--radius-sm)',padding:'5px 12px' }}>
              <span style={{ fontSize:'1rem' }}>{doctor.avatar}</span>
              <div>
                <div style={{ fontSize:'0.78rem',fontWeight:700,color:'var(--text-primary)',lineHeight:1.2 }}>{doctor.name}</div>
                <div style={{ fontSize:'0.68rem',color:'var(--accent)',lineHeight:1.2 }}>{doctor.qualification}</div>
              </div>
            </div>
          )}
          <button className="topbar-btn" onClick={() => setShowDashboard(true)}>📊 Dashboard</button>
          <button className="topbar-btn" onClick={() => setShowHistory(true)}>📋 My Patients {myHistory.length > 0 && `(${myHistory.length})`}</button>
          <button className="topbar-btn" onClick={onChat}>💬 AI Chat</button>
          <button className="topbar-btn" onClick={onLogout} style={{ color:'var(--emergency)' }}>🚪 Logout</button>
        </div>
      </div>

      {/* HISTORY PANEL */}
      {showHistory && (
        <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',backdropFilter:'blur(8px)',zIndex:9999,display:'flex',alignItems:'flex-start',justifyContent:'flex-end',paddingTop:'64px' }}>
          <div style={{ background:'var(--bg-surface)',borderLeft:'1px solid var(--border)',width:'440px',height:'calc(100vh - 64px)',display:'flex',flexDirection:'column' }}>
            <div style={{ padding:'24px',borderBottom:'1px solid var(--border)',flexShrink:0 }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px' }}>
                <h3 style={{ fontFamily:'Lora,serif',color:'var(--text-primary)',margin:0 }}>📋 My Patient History</h3>
                <button onClick={() => setShowHistory(false)} style={{ background:'transparent',border:'1px solid var(--border)',color:'var(--text-secondary)',padding:'6px 12px',borderRadius:'var(--radius-sm)',cursor:'pointer',fontFamily:'var(--font-ui)',fontSize:'0.8rem' }}>✕ Close</button>
              </div>
              <input type="text" value={searchPhone} onChange={e => setSearchPhone(e.target.value)} placeholder="Search by name or phone..." style={{ width:'100%' }} />
              <div style={{ fontSize:'0.75rem',color:'var(--text-muted)',marginTop:'6px' }}>{filteredHistory.length} records — showing only your patients</div>
            </div>
            <div style={{ flex:1,overflowY:'auto',padding:'16px' }}>
              {filteredHistory.length === 0 ? (
                <div style={{ textAlign:'center',color:'var(--text-muted)',padding:'40px 20px' }}>
                  <div style={{ fontSize:'2rem',marginBottom:'12px' }}>📋</div>
                  <div>No records found</div>
                </div>
              ) : filteredHistory.map(record => (
                <div key={record.id} style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',padding:'16px',marginBottom:'12px' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                >
                  <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'10px' }}>
                    <div>
                      <div style={{ fontWeight:700,color:'var(--text-primary)',fontSize:'0.95rem' }}>👤 {record.patient?.name}</div>
                      <div style={{ fontSize:'0.78rem',color:'var(--text-muted)',marginTop:'2px' }}>{record.patient?.age}y · {record.patient?.gender} · 📞 {record.patient?.phone}</div>
                    </div>
                    <div style={{ textAlign:'right',fontSize:'0.72rem',color:'var(--text-muted)' }}><div>{record.date}</div><div>{record.time}</div></div>
                  </div>
                  <div style={{ background:'var(--bg-surface)',borderRadius:'var(--radius-sm)',padding:'8px 12px',marginBottom:'10px' }}>
                    <div style={{ fontSize:'0.7rem',color:'var(--text-muted)',textTransform:'uppercase',marginBottom:'4px' }}>Diagnosis</div>
                    <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                      <span style={{ color:'var(--text-primary)',fontWeight:600,fontSize:'0.88rem' }}>{record.disease}</span>
                      {record.isRare && <span style={{ background:'var(--purple-light)',color:'var(--purple)',border:'1px solid rgba(124,58,237,0.2)',padding:'1px 8px',borderRadius:'100px',fontSize:'0.65rem',fontWeight:700 }}>🧬 RARE</span>}
                    </div>
                  </div>
                  {record.drugs?.slice(0,2).map((d,j) => <div key={j} style={{ fontSize:'0.78rem',color:'var(--text-secondary)',marginBottom:'2px' }}>• {d.name} — <span style={{ color:'var(--accent)' }}>{d.dosage}</span></div>)}
                  {record.patient?.allergies && record.patient.allergies.toLowerCase() !== 'none' && <div style={{ fontSize:'0.75rem',color:'var(--emergency)',marginTop:'8px' }}>⚠ {record.patient.allergies}</div>}
                  <button onClick={() => { updateData({ patient:record.patient }); setShowHistory(false); setStep(0); }}
                    style={{ background:'var(--accent-light)',color:'var(--accent)',border:'1px solid var(--border-accent)',padding:'7px 14px',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-ui)',fontSize:'0.78rem',fontWeight:600,cursor:'pointer',width:'100%',marginTop:'10px' }}>
                    → Load for New Consultation
                  </button>
                </div>
              ))}
            </div>
            {myHistory.length > 0 && (
              <div style={{ padding:'16px',borderTop:'1px solid var(--border)',flexShrink:0 }}>
                <button onClick={() => { if(confirm('Clear all your history?')) { const others = history.filter(h => h.doctor !== doctor?.name); setHistory(others); localStorage.setItem('medimentor_history', JSON.stringify(others)); } }}
                  style={{ background:'transparent',color:'var(--text-muted)',border:'1px solid var(--border)',padding:'8px',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-ui)',fontSize:'0.78rem',cursor:'pointer',width:'100%' }}>
                  🗑 Clear My History
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="app-sidebar">
        {doctor && (
          <div style={{ background:'var(--bg-elevated)',border:'1px solid var(--border-accent)',borderRadius:'var(--radius-md)',padding:'16px',marginBottom:'24px' }}>
            <div style={{ display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px' }}>
              <span style={{ fontSize:'1.8rem' }}>{doctor.avatar}</span>
              <div>
                <div style={{ fontWeight:700,color:'var(--text-primary)',fontSize:'0.85rem',lineHeight:1.3 }}>{doctor.name}</div>
                <div style={{ color:'var(--accent)',fontSize:'0.72rem' }}>{doctor.qualification}</div>
              </div>
            </div>
            <div style={{ fontSize:'0.72rem',color:'var(--text-muted)',lineHeight:1.7 }}>
              <div>🏥 {doctor.hospital}</div>
              <div>🔬 {doctor.specialization}</div>
              <div style={{ marginTop:'6px',color:'var(--success)' }}>✓ {myHistory.length} my consultations</div>
            </div>
          </div>
        )}
        <div className="sidebar-title">Consultation Progress</div>
        <div className="step-indicator">
          {STEPS.map((s, i) => (
            <div key={i} className={`si-item ${i===step?'active':''} ${i<step?'completed':''}`} onClick={() => i<step && setStep(i)} style={{ cursor:i<step?'pointer':'default' }}>
              <div className="si-dot" /><span className="si-label">{i+1}. {s.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'auto',paddingTop:'24px',borderTop:'1px solid var(--border)',fontSize:'0.72rem',color:'var(--text-muted)',lineHeight:1.5 }}>
          ⚕ MediMentor assists qualified doctors. It does not replace clinical judgment.
        </div>
      </aside>

      {/* MAIN */}
      <main className="app-main">
        {step===0 && <PatientForm patient={data.patient} onChange={patient => updateData({patient})} onNext={() => setStep(1)} />}
        {step===1 && <SymptomEntry symptoms={data.symptoms} diseaseName={data.diseaseName} patient={data.patient} onChange={(s,d) => updateData({symptoms:s,diseaseName:d})} onNext={(diseases) => { updateData({diseases}); setStep(2); }} onBack={() => setStep(0)} />}
        {step===2 && <DiseasePrediction diseases={data.diseases} selected={data.selectedDisease} onSelect={d => updateData({selectedDisease:d})} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step===3 && <DrugSuggestions disease={data.selectedDisease} patient={data.patient} selectedDrugs={data.selectedDrugs} clinicalNote={data.clinicalNote} followUp={data.followUp} onChange={(sd,cn,fu) => updateData({selectedDrugs:sd,clinicalNote:cn,followUp:fu})} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
        {step===4 && <Prescription patient={data.patient} disease={data.selectedDisease} drugs={data.selectedDrugs} clinicalNote={data.clinicalNote} followUp={data.followUp} doctor={doctor} onReset={reset} onSaveHistory={saveToHistory} />}
      </main>
    </div>
  );
}
