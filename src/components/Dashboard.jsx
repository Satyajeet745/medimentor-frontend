import { useState, useEffect } from 'react';

function StatCard({ icon, value, label, color = 'var(--accent)' }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0; const step = Math.ceil(value / 40);
    const t = setInterval(() => { start += step; if (start >= value) { setDisplay(value); clearInterval(t); } else setDisplay(start); }, 40);
    return () => clearInterval(t);
  }, [value]);
  return (
    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px 20px', flex: 1, boxShadow: 'var(--shadow-card)', transition: 'var(--transition)', minWidth: '140px' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = color}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color, fontFamily: 'Lora,serif', lineHeight: 1 }}>{display}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>{label}</div>
    </div>
  );
}

function MiniBar({ data }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '80px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '100%', height: `${Math.max((d.value / max) * 64, d.value > 0 ? 6 : 0)}px`, background: 'var(--accent)', borderRadius: '4px 4px 0 0', opacity: 0.8, transition: 'height 1s ease', minHeight: 0 }} />
          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard({ history, doctor, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // Filter history by current doctor
  const myHistory = history.filter(h => h.doctor === doctor?.name);
  const todayRecords = myHistory.filter(h => h.date === today);
  const rareDiseases = myHistory.filter(h => h.isRare).length;
  const uniquePatients = new Set(myHistory.map(h => h.patient?.phone)).size;

  const diseaseCounts = {};
  myHistory.forEach(h => { if (h.disease) diseaseCounts[h.disease] = (diseaseCounts[h.disease] || 0) + 1; });
  const topDiseases = Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const drugCounts = {};
  myHistory.forEach(h => h.drugs?.forEach(d => { drugCounts[d.name] = (drugCounts[d.name] || 0) + 1; }));
  const topDrugs = Object.entries(drugCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // Patient appointments booked with this doctor
  const allAppointments = JSON.parse(localStorage.getItem('medimentor_patient_appointments') || '[]');
  const myAppointments = allAppointments.filter(a => a.doctor === doctor?.name);

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    return { label: d.toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 2), value: myHistory.filter(h => h.date === label).length };
  });

  const tabStyle = (tab) => ({
    padding: '10px 20px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600,
    background: activeTab === tab ? 'var(--accent)' : 'transparent',
    color: activeTab === tab ? 'white' : 'var(--text-secondary)',
    borderRadius: 'var(--radius-sm)', transition: 'var(--transition)',
  });

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-deep)', zIndex: 9999, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Dashboard Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'Lora,serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>📊 Doctor Dashboard</span>
          {doctor && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-elevated)', padding: '4px 12px', borderRadius: '100px', border: '1px solid var(--border)' }}>
              {doctor.avatar} {doctor.name} · {doctor.specialization}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📅 {today}</span>
          <button onClick={onClose} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '0.82rem', fontWeight: 600 }}>
            ✕ Close
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 40px', display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[
          { key: 'overview', label: '📊 Overview' },
          { key: 'patients', label: '👤 Patient History' },
          { key: 'diseases', label: '🔬 Diseases' },
          { key: 'drugs', label: '💊 Drugs' },
          { key: 'appointments', label: '📅 Patient Appointments' },
          { key: 'testimonials', label: '💬 Feedback' },
        ].map(tab => (
          <button key={tab.key} style={tabStyle(tab.key)} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '32px 40px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'Lora,serif', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                Welcome back, {doctor?.name}!
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {doctor?.hospital} · {doctor?.specialization} · {today}
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <StatCard icon="🩺" value={myHistory.length} label="My Total Consultations" color="var(--accent)" />
              <StatCard icon="📅" value={todayRecords.length} label="Today's Consultations" color="#3B82F6" />
              <StatCard icon="🧬" value={rareDiseases} label="Rare Diseases Detected" color="var(--purple)" />
              <StatCard icon="👤" value={uniquePatients} label="Unique Patients" color="var(--success)" />
            </div>

            {myHistory.length === 0 ? (
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
                <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>No consultations yet</div>
                <div style={{ fontSize: '0.82rem' }}>Complete consultations to see your analytics here</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Weekly chart */}
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent)', marginBottom: '20px' }}>📈 My Consultations — Last 7 Days</div>
                  <MiniBar data={last7} />
                </div>

                {/* Top diseases */}
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent)', marginBottom: '16px' }}>🔬 My Top Diagnoses</div>
                  {topDiseases.slice(0, 4).map(([disease, count], i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, width: '20px' }}>#{i+1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{disease}</div>
                        <div style={{ height: '4px', background: 'var(--bg-deep)', borderRadius: '100px', overflow: 'hidden' }}>
                          <div style={{ width: `${(count / topDiseases[0][1]) * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: '100px' }} />
                        </div>
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)' }}>{count}x</div>
                    </div>
                  ))}
                </div>

                {/* Recent activity */}
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--success)', marginBottom: '16px' }}>🕐 Recent Activity</div>
                  {myHistory.slice(0, 5).map((h, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '12px', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{h.patient?.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{h.disease} {h.isRare ? '🧬' : ''}</div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        <div>{h.date}</div><div>{h.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top drugs */}
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--warning)', marginBottom: '16px' }}>💊 Most Prescribed</div>
                  {topDrugs.slice(0, 4).map(([drug, count], i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, width: '20px' }}>#{i+1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{drug}</div>
                        <div style={{ height: '4px', background: 'var(--bg-deep)', borderRadius: '100px', overflow: 'hidden' }}>
                          <div style={{ width: `${(count / (topDrugs[0]?.[1] || 1)) * 100}%`, height: '100%', background: 'var(--warning)', borderRadius: '100px' }} />
                        </div>
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--warning)' }}>{count}x</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PATIENT HISTORY TAB */}
        {activeTab === 'patients' && (
          <div>
            <h3 style={{ fontFamily: 'Lora,serif', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
              👤 My Patient Records — {myHistory.length} consultations
            </h3>
            {myHistory.length === 0 ? (
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
                <div>No patient records yet</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
                {myHistory.map((record, i) => (
                  <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-card)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>👤 {record.patient?.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{record.patient?.age}y · {record.patient?.gender} · 📞 {record.patient?.phone}</div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <div>{record.date}</div><div>{record.time}</div>
                      </div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', marginBottom: '10px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Diagnosis</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem' }}>{record.disease}</span>
                        {record.isRare && <span style={{ background: 'var(--purple-light)', color: 'var(--purple)', padding: '1px 8px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 700, border: '1px solid rgba(124,58,237,0.2)' }}>🧬 RARE</span>}
                      </div>
                    </div>
                    {record.drugs?.slice(0, 2).map((d, j) => (
                      <div key={j} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>• {d.name} — <span style={{ color: 'var(--accent)' }}>{d.dosage}</span></div>
                    ))}
                    {record.patient?.allergies && record.patient.allergies.toLowerCase() !== 'none' && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--emergency)', marginTop: '8px' }}>⚠ {record.patient.allergies}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DISEASES TAB */}
        {activeTab === 'diseases' && (
          <div>
            <h3 style={{ fontFamily: 'Lora,serif', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '20px' }}>🔬 Disease Analytics</h3>
            {topDiseases.length === 0 ? (
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>No data yet</div>
            ) : (
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow-card)' }}>
                {topDiseases.map(([disease, count], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', paddingBottom: '18px', borderBottom: i < topDiseases.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0 }}>#{i+1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>{disease}</div>
                      <div style={{ height: '8px', background: 'var(--bg-deep)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ width: `${(count / topDiseases[0][1]) * 100}%`, height: '100%', background: 'linear-gradient(90deg,var(--accent),#14b8a6)', borderRadius: '100px', transition: 'width 1s ease' }} />
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '1rem', minWidth: '40px', textAlign: 'right' }}>{count}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '60px' }}>{Math.round((count / myHistory.length) * 100)}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DRUGS TAB */}
        {activeTab === 'drugs' && (
          <div>
            <h3 style={{ fontFamily: 'Lora,serif', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '20px' }}>💊 Drug Prescription Analytics</h3>
            {topDrugs.length === 0 ? (
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>No data yet</div>
            ) : (
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow-card)' }}>
                {topDrugs.map(([drug, count], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', paddingBottom: '18px', borderBottom: i < topDrugs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(217,119,6,0.1)', color: 'var(--warning)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0 }}>#{i+1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>{drug}</div>
                      <div style={{ height: '8px', background: 'var(--bg-deep)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ width: `${(count / topDrugs[0][1]) * 100}%`, height: '100%', background: 'linear-gradient(90deg,var(--warning),#f59e0b)', borderRadius: '100px' }} />
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--warning)', fontSize: '1rem', minWidth: '40px', textAlign: 'right' }}>{count}x</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'Lora,serif', fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>
                📅 Patient Appointments — {myAppointments.length} booked
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'var(--bg-elevated)', padding: '4px 12px', borderRadius: '100px', border: '1px solid var(--border)' }}>
                Showing only your appointments
              </span>
            </div>
            {myAppointments.length === 0 ? (
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📅</div>
                <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>No appointments booked yet</div>
                <div style={{ fontSize: '0.82rem' }}>Patients can book appointments from their portal</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
                {myAppointments.map((apt, i) => (
                  <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-card)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--accent-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem' }}>
                          {apt.patient?.[0] || 'P'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>👤 {apt.patient}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Patient Portal Booking</div>
                        </div>
                      </div>
                      <span style={{ background: 'var(--success-light)', color: 'var(--success)', border: '1px solid rgba(5,150,105,0.25)', padding: '3px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700 }}>
                        ✓ {apt.status}
                      </span>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '12px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Date</div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>📅 {apt.date}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Time</div>
                        <div style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.85rem' }}>🕐 {apt.slot}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Speciality</div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{apt.spec}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div>
            <h3 style={{ fontFamily: 'Lora,serif', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '20px' }}>💬 What Doctors & Patients Say</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
              {[
                { avatar: 'R', name: 'Dr. Rajesh Sharma', role: 'General Physician', color: '3B82F6', quote: 'MediMentor identified a rare Gaucher Disease case I would have missed. The orphan drug suggestion was spot-on. Game-changer for rural doctors.' },
                { avatar: 'S', name: 'Dr. Sneha Desai', role: 'Pediatrician', color: '7C3AED', quote: 'The WhatsApp prescription saves 30 minutes daily. Parents receive it in their language instantly. Highly recommended.' },
                { avatar: 'P', name: 'Priya Sharma', role: 'Patient', color: '059669', quote: 'Typed symptoms in Marathi and got results in seconds. The ayurvedic home remedies were a bonus. Booking appointment was so easy!' },
                { avatar: 'R', name: 'Rakesh Patel', role: 'Patient', color: 'D97706', quote: 'I no longer carry paper reports. The AI chatbot answered my health questions in Gujarati which was very helpful.' },
              ].map((t, i) => (
                <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>"{t.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', background: `#${t.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', fontWeight: 700 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.88rem' }}>{t.name}</div>
                      <div style={{ fontSize: '0.75rem', color: `#${t.color}` }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
