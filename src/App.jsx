import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ConsultationApp from './components/ConsultationApp';
import ClinicalChat from './components/ClinicalChat';
import LoginPage from './components/LoginPage';
import PatientPortal from './components/PatientPortal';

function App() {
  const [page, setPage] = useState('login');
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const savedDoc = localStorage.getItem('medimentor_doctor');
    const savedPat = localStorage.getItem('medimentor_patient');
    if (savedDoc) { setDoctor(JSON.parse(savedDoc)); setPage('landing'); }
    else if (savedPat) { setPatient(JSON.parse(savedPat)); setPage('patient'); }
  }, []);

  const handleDoctorLogin = (doc) => { setDoctor(doc); setPatient(null); setPage('landing'); };
  const handlePatientLogin = (pat) => { setPatient(pat); setDoctor(null); setPage('patient'); };

  const handleLogout = () => {
    localStorage.removeItem('medimentor_doctor');
    localStorage.removeItem('medimentor_patient');
    setDoctor(null); setPatient(null); setPage('login');
  };

  return (
    <div className="app-root">
      {page === 'login' && <LoginPage onDoctorLogin={handleDoctorLogin} onPatientLogin={handlePatientLogin} />}
      {page === 'patient' && patient && <PatientPortal patient={patient} onLogout={handleLogout} />}
      {page === 'landing' && <LandingPage onStart={() => setPage('app')} onChat={() => setPage('chat')} doctor={doctor} onLogout={handleLogout} />}
      {page === 'app' && <ConsultationApp onBack={() => setPage('landing')} onChat={() => setPage('chat')} doctor={doctor} onLogout={handleLogout} />}
      {page === 'chat' && <ClinicalChat onBack={() => setPage('landing')} onApp={() => setPage('app')} doctor={doctor} onLogout={handleLogout} />}
    </div>
  );
}

export default App;
