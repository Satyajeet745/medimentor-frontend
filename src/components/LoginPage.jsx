import { useState } from 'react';

const DOCTORS = [
  { id:1, name:"Dr. Rajesh Sharma", qualification:"MBBS, MD (Internal Medicine)", specialization:"General Physician", hospital:"City General Hospital", username:"drrajesh", password:"doctor123", avatar:"👨‍⚕️", role:"doctor" },
  { id:2, name:"Dr. Priya Patel", qualification:"MBBS, MS (General Surgery)", specialization:"General Surgeon", hospital:"Apollo Medical Center", username:"drpriya", password:"doctor123", avatar:"👩‍⚕️", role:"doctor" },
  { id:3, name:"Dr. Amit Kulkarni", qualification:"MBBS, DM (Neurology)", specialization:"Neurologist", hospital:"AIIMS Nagpur", username:"dramit", password:"doctor123", avatar:"👨‍⚕️", role:"doctor" },
  { id:4, name:"Dr. Sneha Desai", qualification:"MBBS, MD (Pediatrics)", specialization:"Pediatrician", hospital:"Rainbow Children Hospital", username:"drsneha", password:"doctor123", avatar:"👩‍⚕️", role:"doctor" },
];

export const PATIENTS = [
  { id:'PAT001', name:"Amit Sharma", age:45, gender:"Male", phone:"9876543210", password:"patient123", avatar:"👨", role:"patient" },
  { id:'PAT002', name:"Priya Patil", age:32, gender:"Female", phone:"9823456789", password:"patient123", avatar:"👩", role:"patient" },
  { id:'PAT003', name:"Rajan Mehta", age:58, gender:"Male", phone:"9712345678", password:"patient123", avatar:"👨", role:"patient" },
  { id:'PAT004', name:"Anjali Desai", age:25, gender:"Female", phone:"9634567890", password:"patient123", avatar:"👩", role:"patient" },
];

export default function LoginPage({ onDoctorLogin, onPatientLogin }) {
  const [tab, setTab] = useState('doctor');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [patientPass, setPatientPass] = useState('');
  const [showPatientPass, setShowPatientPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDoctorLogin = () => {
    if (!username || !password) { setError('Please enter username and password'); return; }
    setLoading(true); setError('');
    setTimeout(() => {
      const doc = DOCTORS.find(d => d.username === username && d.password === password);
      if (doc) { localStorage.setItem('medimentor_doctor', JSON.stringify(doc)); onDoctorLogin(doc); }
      else setError('Invalid username or password.');
      setLoading(false);
    }, 600);
  };

  const handlePatientLogin = () => {
    if (!patientId || !patientPass) { setError('Please enter Patient ID and password'); return; }
    setLoading(true); setError('');
    setTimeout(() => {
      const patient = PATIENTS.find(p => p.id === patientId.toUpperCase() && p.password === patientPass);
      if (patient) { localStorage.setItem('medimentor_patient', JSON.stringify(patient)); onPatientLogin(patient); }
      else setError('Invalid Patient ID or password.');
      setLoading(false);
    }, 600);
  };

  const tabStyle = (t) => ({
    flex:1, padding:'11px', border:'none',
    background: tab===t ? 'var(--accent)' : 'transparent',
    color: tab===t ? 'white' : 'var(--text-secondary)',
    cursor:'pointer', fontFamily:'var(--font-ui)', fontSize:'0.88rem', fontWeight:700,
    borderRadius: tab===t ? 'var(--radius-sm)' : '0', transition:'var(--transition)',
  });

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#F0FDF9 0%,#E6F7F5 40%,#F0F4F8 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(13,148,136,0.08) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

      <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:'500px', animation:'fadeIn 0.6s ease both' }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <div style={{ fontSize:'3rem', marginBottom:'10px' }}>🏥</div>
          <h1 style={{ fontFamily:'Lora,serif', fontSize:'2.2rem', color:'var(--text-primary)', marginBottom:'6px' }}>MediMentor</h1>
          <p style={{ color:'var(--text-secondary)', fontSize:'0.88rem' }}>AI-Powered Clinical Decision Support System</p>
        </div>

        {/* Card */}
        <div style={{ background:'white', border:'1px solid var(--border)', borderRadius:'var(--radius-xl)', padding:'8px', boxShadow:'0 20px 60px rgba(0,0,0,0.1)' }}>
          {/* Tabs */}
          <div style={{ display:'flex', background:'var(--bg-deep)', borderRadius:'var(--radius-sm)', padding:'4px', gap:'4px' }}>
            <button style={tabStyle('doctor')} onClick={() => { setTab('doctor'); setError(''); }}>👨‍⚕️ Doctor Login</button>
            <button style={tabStyle('patient')} onClick={() => { setTab('patient'); setError(''); }}>🙍 Patient Login</button>
          </div>

          <div style={{ padding:'24px' }}>

            {/* DOCTOR LOGIN */}
            {tab === 'doctor' && (
              <>
                <p style={{ color:'var(--text-muted)', fontSize:'0.8rem', marginBottom:'20px' }}>🔒 Authorized medical professionals only</p>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" onKeyDown={e => e.key==='Enter' && handleDoctorLogin()} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <div style={{ position:'relative' }}>
                      <input type={showPass?'text':'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" onKeyDown={e => e.key==='Enter' && handleDoctorLogin()} style={{ paddingRight:'48px' }} />
                      <button onClick={() => setShowPass(!showPass)} style={{ position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',fontSize:'1rem' }}>{showPass?'🙈':'👁'}</button>
                    </div>
                  </div>
                  {error && tab==='doctor' && <div style={{ background:'var(--emergency-light)',border:'1px solid rgba(220,38,38,0.2)',color:'var(--emergency)',padding:'10px 14px',borderRadius:'var(--radius-sm)',fontSize:'0.82rem' }}>⚠ {error}</div>}
                  <button className="btn-next" onClick={handleDoctorLogin} disabled={loading} style={{ width:'100%',justifyContent:'center' }}>
                    {loading ? '🔄 Verifying...' : '🔐 Login as Doctor'}
                  </button>
                </div>
                <div style={{ marginTop:'24px', paddingTop:'20px', borderTop:'1px solid var(--border)' }}>
                  <div style={{ fontSize:'0.7rem',color:'var(--text-muted)',marginBottom:'10px',textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:700 }}>⚡ Quick Demo Login</div>
                  <div style={{ display:'flex',flexDirection:'column',gap:'7px' }}>
                    {DOCTORS.map(doc => (
                      <button key={doc.id} onClick={() => { localStorage.setItem('medimentor_doctor',JSON.stringify(doc)); onDoctorLogin(doc); }}
                        style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'9px 12px',cursor:'pointer',display:'flex',alignItems:'center',gap:'10px',transition:'var(--transition)',textAlign:'left' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                      >
                        <span style={{ fontSize:'1.4rem' }}>{doc.avatar}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ color:'var(--text-primary)',fontWeight:600,fontSize:'0.82rem' }}>{doc.name}</div>
                          <div style={{ color:'var(--accent)',fontSize:'0.72rem' }}>{doc.qualification}</div>
                        </div>
                        <span style={{ color:'var(--text-muted)',fontSize:'0.72rem' }}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* PATIENT LOGIN */}
            {tab === 'patient' && (
              <>
                <p style={{ color:'var(--text-muted)', fontSize:'0.8rem', marginBottom:'20px' }}>🪪 Login with your Patient ID provided by the hospital</p>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Patient ID</label>
                    <input type="text" value={patientId} onChange={e => setPatientId(e.target.value.toUpperCase())} placeholder="e.g. PAT001" onKeyDown={e => e.key==='Enter' && handlePatientLogin()} />
                    <div style={{ fontSize:'0.72rem',color:'var(--text-muted)',marginTop:'4px' }}>Your Patient ID is given by the hospital at registration</div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <div style={{ position:'relative' }}>
                      <input type={showPatientPass?'text':'password'} value={patientPass} onChange={e => setPatientPass(e.target.value)} placeholder="Enter your password" onKeyDown={e => e.key==='Enter' && handlePatientLogin()} style={{ paddingRight:'48px' }} />
                      <button onClick={() => setShowPatientPass(!showPatientPass)} style={{ position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',fontSize:'1rem' }}>{showPatientPass?'🙈':'👁'}</button>
                    </div>
                  </div>
                  {error && tab==='patient' && <div style={{ background:'var(--emergency-light)',border:'1px solid rgba(220,38,38,0.2)',color:'var(--emergency)',padding:'10px 14px',borderRadius:'var(--radius-sm)',fontSize:'0.82rem' }}>⚠ {error}</div>}
                  <button className="btn-next" onClick={handlePatientLogin} disabled={loading} style={{ width:'100%',justifyContent:'center' }}>
                    {loading ? '🔄 Verifying...' : '→ Login as Patient'}
                  </button>
                </div>

                {/* Demo patient accounts */}
                <div style={{ marginTop:'24px', paddingTop:'20px', borderTop:'1px solid var(--border)' }}>
                  <div style={{ fontSize:'0.7rem',color:'var(--text-muted)',marginBottom:'10px',textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:700 }}>⚡ Demo Patient Accounts</div>
                  <div style={{ display:'flex',flexDirection:'column',gap:'7px' }}>
                    {PATIENTS.map(pat => (
                      <button key={pat.id} onClick={() => { localStorage.setItem('medimentor_patient',JSON.stringify(pat)); onPatientLogin(pat); }}
                        style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'9px 12px',cursor:'pointer',display:'flex',alignItems:'center',gap:'10px',transition:'var(--transition)',textAlign:'left' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                      >
                        <span style={{ fontSize:'1.4rem' }}>{pat.avatar}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ color:'var(--text-primary)',fontWeight:600,fontSize:'0.82rem' }}>{pat.name} · {pat.age}y · {pat.gender}</div>
                          <div style={{ color:'var(--accent)',fontSize:'0.72rem',display:'flex',gap:'12px' }}>
                            <span>🪪 {pat.id}</span>
                            <span>📞 {pat.phone}</span>
                          </div>
                        </div>
                        <span style={{ color:'var(--text-muted)',fontSize:'0.72rem' }}>→</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop:'10px',padding:'10px 14px',background:'var(--accent-light)',border:'1px solid var(--border-accent)',borderRadius:'var(--radius-sm)',fontSize:'0.78rem',color:'var(--accent)' }}>
                    🔑 All demo passwords: <strong>patient123</strong>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ textAlign:'center',marginTop:'20px',fontSize:'0.73rem',color:'var(--text-muted)' }}>
          ⚕ MediMentor assists qualified doctors. It does not replace clinical judgment.
        </div>
      </div>
    </div>
  );
}
