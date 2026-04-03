import { useState, useRef, useEffect } from 'react';

const QUICK_CHIPS = [
  'Rare drugs for Gaucher Disease?',
  'Drug interactions: Warfarin + Aspirin?',
  'Orphan drugs for AIP?',
  'Cystic fibrosis treatment guidelines?',
  'First-line treatment for Fabry Disease?',
  'HAE emergency management?',
];

const WELCOME = {
  role: 'ai',
  text: `Welcome to **MediMentor AI Clinical Chat** — powered by Groq AI.\n\nI assist qualified physicians with:\n\n• Drug queries & dosage information\n• Rare disease & orphan drug protocols\n• Drug interaction analysis\n• Clinical guideline references\n• FDA-approved treatment pathways\n\nFinal clinical judgment always belongs to the treating physician.`,
};

function formatText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

export default function ClinicalChat({ onBack, onApp }) {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'AI assistant temporarily unavailable. Please ensure the backend server is running.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-layout">
      <div className="chat-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'Lora,serif', fontSize: '1.2rem', fontWeight: 600 }}>🏥 MediMentor</span>
          <span style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border-accent)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            AI Clinical Chat — Groq
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="topbar-btn" onClick={onApp}>+ New Consultation</button>
          <button className="topbar-btn" onClick={onBack}>← Home</button>
        </div>
      </div>

      <div className="chat-chips">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>Try:</span>
        {QUICK_CHIPS.map((chip, i) => (
          <button key={i} className="chat-chip" onClick={() => sendMessage(chip)} disabled={loading}>{chip}</button>
        ))}
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="message-avatar">{msg.role === 'ai' ? '🏥' : '👨‍⚕️'}</div>
            <div className="message-bubble" dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
          </div>
        ))}
        {loading && (
          <div className="message ai">
            <div className="message-avatar">🏥</div>
            <div className="message-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', animation: `pulse-dot 1.2s ease ${i * 0.2}s infinite` }} />
              ))}
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Groq AI analyzing...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="Ask about drugs, interactions, clinical guidelines..."
          disabled={loading}
        />
        <button className="btn-send" onClick={() => sendMessage()} disabled={!input.trim() || loading}>➤</button>
      </div>

      <div style={{ padding: '8px 32px', fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        ⚕ MediMentor assists qualified doctors. It does not replace clinical judgment. Powered by Groq Llama 3.3
      </div>
    </div>
  );
}
