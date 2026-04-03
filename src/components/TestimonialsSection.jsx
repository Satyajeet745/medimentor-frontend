const testimonials = [
  { avatar: 'R', name: 'Dr. Rajesh Sharma', role: 'General Physician', color: '3B82F6', bg: 'EFF6FF', quote: 'MediMentor identified a rare Gaucher Disease case I would have missed. The orphan drug suggestion was spot-on. This tool is a game-changer for rural doctors.' },
  { avatar: 'P', name: 'Priya Sharma', role: 'Patient', color: '059669', bg: 'F0FDF4', quote: 'I typed my symptoms in Marathi and got results in seconds. The ayurvedic home remedies were a bonus. Booking my doctor appointment was so easy!' },
  { avatar: 'S', name: 'Dr. Sneha Desai', role: 'Pediatrician', color: '7C3AED', bg: 'F5F3FF', quote: 'The prescription WhatsApp feature saves me 30 minutes daily. Parents receive the prescription instantly in their language. Highly recommended for all doctors.' },
  { avatar: 'R', name: 'Rakesh Patel', role: 'Patient', color: 'D97706', bg: 'FFFBEB', quote: 'I no longer carry paper reports. My doctor can see my full history. The AI chatbot answered my health questions in Gujarati which was very helpful.' },
  { avatar: 'A', name: 'Dr. Amit Kulkarni', role: 'Neurologist', color: 'DC2626', bg: 'FEF2F2', quote: 'The AI disease prediction with confidence scores helps me quickly validate my diagnosis. The dashboard analytics show exactly which conditions are trending.' },
  { avatar: 'M', name: 'Meera Joshi', role: 'Hospital Administrator', color: '0D9488', bg: 'F0FDFA', quote: 'Patient history management and doctor-wise records have digitized our entire prescription workflow. Zero paper. Full transparency.' },
];

export default function TestimonialsSection() {
  return (
    <section style={{ padding: '100px 48px', background: 'var(--bg-deep)' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent-light)', border: '1px solid var(--border-accent)', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 700, padding: '6px 16px', borderRadius: '100px', marginBottom: '20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          💙 Trusted by Healthcare Professionals
        </div>
        <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: 'var(--text-primary)', marginBottom: '12px' }}>
          What clinicians & patients say
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          Real experiences from doctors, patients, and hospital administrators using our AI-powered platform.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1160px', margin: '0 auto' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: 'white', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: '28px',
            boxShadow: 'var(--shadow-card)', transition: 'var(--transition)',
            display: 'flex', flexDirection: 'column', gap: '20px',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-elevated)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
          >
            {/* Icon */}
            <div style={{ width: '48px', height: '48px', background: `#${t.bg}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '28px', height: '28px', background: `#${t.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>
                {t.avatar}
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
              "{t.quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', background: `#${t.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 }}>
                {t.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.88rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: `#${t.color}`, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {t.role === 'Patient' ? '🙍' : t.role.includes('Admin') ? '🏥' : '👨‍⚕️'} {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
