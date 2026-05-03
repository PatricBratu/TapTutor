import React, { useState, useRef, useEffect } from 'react'

import BottomNav from '../components/BottomNav'

const SUBJECTS = {
  'Fizică':      { chapter: 'Mișcarea', progress: 75, system: `Ești TapTutor, tutore AI prietenos care predă Fizică elevilor din România. Subiect curent: Mișcarea uniform accelerată. Explici clar, dai exemple practice, folosești formule (v₂=v₁+a·t). Max 120 cuvinte. Răspunzi DOAR în română.` },
  'Matematică':  { chapter: 'Algebră',  progress: 88, system: `Ești TapTutor, tutore AI prietenos care predă Matematică elevilor din România. Subiect curent: Algebră — ecuații de gradul II. Max 120 cuvinte. Răspunzi DOAR în română.` },
  'Chimie':      { chapter: 'Reacții',  progress: 60, system: `Ești TapTutor, tutore AI prietenos care predă Chimie elevilor din România. Subiect curent: Reacții chimice și tipuri de reacții. Max 120 cuvinte. Răspunzi DOAR în română.` },
  'Biologie':    { chapter: 'Celula',   progress: 45, system: `Ești TapTutor, tutore AI prietenos care predă Biologie elevilor din România. Subiect curent: Structura celulei. Max 120 cuvinte. Răspunzi DOAR în română.` },
  'Informatică': { chapter: 'Algoritmi',progress: 55, system: `Ești TapTutor, tutore AI prietenos care predă Informatică elevilor din România. Subiect curent: Algoritmi și structuri de date. Max 120 cuvinte. Răspunzi DOAR în română.` },
  'Istorie':     { chapter: 'România modernă', progress: 30, system: `Ești TapTutor, tutore AI prietenos care predă Istorie elevilor din România. Subiect curent: România modernă sec. XIX-XX. Max 120 cuvinte. Răspunzi DOAR în română.` },
}

const INITIAL_MESSAGES = {
  'Fizică':      'Salut! Hai să vorbim despre **mișcarea uniform accelerată**. 🚗\n\nFormula cheie: v₂ = v₁ + a·t\n\nUn corp care accelerează uniform crește viteza cu aceeași valoare în fiecare secundă. Ai întrebări?',
  'Matematică':  'Bună! Astăzi explorăm **ecuațiile de gradul II**! 📐\n\nForma generală: ax² + bx + c = 0\n\nFormula discriminantului: Δ = b² - 4ac. Cu ce vrei să începem?',
  'Chimie':      'Salut! Studiem **reacțiile chimice** astăzi! 🧪\n\nO reacție chimică transformă substanțele reactante în produse. De exemplu: 2H₂ + O₂ → 2H₂O\n\nCe tip de reacție vrei să înveți mai întâi?',
  'Biologie':    'Bună ziua! Explorăm **celula** — unitatea de bază a vieții! 🌿\n\nCelula are: membrană celulară, citoplasmă, nucleu și organite.\n\nCe vrei să afli primul?',
  'Informatică': 'Salut! Discutăm despre **algoritmi**! 💻\n\nUn algoritm este o succesiune finită de pași pentru rezolvarea unei probleme. Exemplu clasic: sortarea unui șir de numere.\n\nCe te interesează?',
  'Istorie':     'Bună! Studiem **România modernă**! 🏛️\n\nSecol XIX a adus Unirea Principatelor (1859) și Independența (1877). Sunt momente cheie ce au format statul român modern.\n\nCe perioadă te interesează?',
}

const DIAGRAMS = {
  'Fizică': (
    <svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg" width="100%" style={{display:'block'}}>
      <defs>
        <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.03"/>
        </linearGradient>
      </defs>
      <line x1="55" y1="12" x2="55" y2="125" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="55" y1="125" x2="280" y2="125" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round"/>
      <polygon points="55,8 51,16 59,16" fill="#2D3436"/>
      <polygon points="284,125 276,121 276,129" fill="#2D3436"/>
      <text x="10" y="72" fontFamily="Nunito,sans-serif" fontSize="9.5" fontWeight="700" fill="#2D3436">Viteză</text>
      <text x="10" y="84" fontFamily="Nunito,sans-serif" fontSize="9.5" fontWeight="700" fill="#2D3436">(m/s)</text>
      <text x="258" y="138" fontFamily="Nunito,sans-serif" fontSize="9.5" fontWeight="700" fill="#2D3436">Timp (s)</text>
      <polygon points="75,118 230,32 230,125 75,125" fill="url(#aGrad)"/>
      <line x1="75" y1="118" x2="230" y2="32" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="75" y1="118" x2="75" y2="125" stroke="#b2bec3" strokeWidth="1.5" strokeDasharray="3,3"/>
      <line x1="230" y1="32" x2="230" y2="125" stroke="#b2bec3" strokeWidth="1.5" strokeDasharray="3,3"/>
      <line x1="55" y1="118" x2="75" y2="118" stroke="#b2bec3" strokeWidth="1.5" strokeDasharray="3,3"/>
      <line x1="55" y1="32" x2="230" y2="32" stroke="#b2bec3" strokeWidth="1.5" strokeDasharray="3,3"/>
      <circle cx="75" cy="118" r="5" fill="#4ECDC4" stroke="white" strokeWidth="2"/>
      <circle cx="230" cy="32" r="5" fill="#4ECDC4" stroke="white" strokeWidth="2"/>
      <text x="236" y="36" fontFamily="Nunito,sans-serif" fontSize="9.5" fontWeight="800" fill="#2D3436">V₂ = 6 m/s</text>
      <text x="80" y="112" fontFamily="Nunito,sans-serif" fontSize="9.5" fontWeight="800" fill="#2D3436">v₁ = 2 m/s</text>
      <text x="118" y="93" fontFamily="Nunito,sans-serif" fontSize="9" fontWeight="700" fill="#636e72" transform="rotate(-28,145,85)">a = accelerație</text>
      <rect x="58" y="38" width="56" height="22" rx="6" fill="#f0fdfb" stroke="#4ECDC4" strokeWidth="1.2"/>
      <text x="86" y="50" fontFamily="Nunito,sans-serif" fontSize="9" fontWeight="800" fill="#1a9e96" textAnchor="middle">a = 2 m/s²</text>
      <text x="70" y="138" fontFamily="Nunito,sans-serif" fontSize="9.5" fontWeight="700" fill="#2D3436">V₁</text>
      <text x="56" y="124" fontSize="16" fontFamily="sans-serif">🚗</text>
    </svg>
  ),
  'Matematică': (
    <svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg" width="100%" style={{display:'block'}}>
      <defs>
        <linearGradient id="mGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#6C5CE7" stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <line x1="20" y1="80" x2="280" y2="80" stroke="#2D3436" strokeWidth="1.5"/>
      <line x1="150" y1="10" x2="150" y2="150" stroke="#2D3436" strokeWidth="1.5"/>
      <polygon points="284,80 276,76 276,84" fill="#2D3436"/>
      <polygon points="150,6 146,14 154,14" fill="#2D3436"/>
      <text x="266" y="76" fontFamily="Nunito,sans-serif" fontSize="9" fill="#2D3436">x</text>
      <text x="154" y="12" fontFamily="Nunito,sans-serif" fontSize="9" fill="#2D3436">y</text>
      <path d="M60,140 Q150,20 240,140" stroke="#6C5CE7" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M60,140 Q150,20 240,140 L240,80 Q150,80 60,80 Z" fill="url(#mGrad)"/>
      <circle cx="88" cy="80" r="4" fill="#6C5CE7" stroke="white" strokeWidth="2"/>
      <circle cx="212" cy="80" r="4" fill="#6C5CE7" stroke="white" strokeWidth="2"/>
      <text x="78" y="94" fontFamily="Nunito,sans-serif" fontSize="8.5" fontWeight="700" fill="#6C5CE7">x₁</text>
      <text x="204" y="94" fontFamily="Nunito,sans-serif" fontSize="8.5" fontWeight="700" fill="#6C5CE7">x₂</text>
      <circle cx="150" cy="20" r="4" fill="#FF6B6B" stroke="white" strokeWidth="2"/>
      <text x="155" y="18" fontFamily="Nunito,sans-serif" fontSize="8.5" fontWeight="700" fill="#FF6B6B">vârf</text>
      <rect x="30" y="10" width="90" height="24" rx="6" fill="#ede9fe" stroke="#6C5CE7" strokeWidth="1"/>
      <text x="75" y="23" fontFamily="Nunito,sans-serif" fontSize="8.5" fontWeight="800" fill="#6C5CE7" textAnchor="middle">Δ = b² - 4ac</text>
    </svg>
  ),
}

export default function ChatScreen({ subject, onNavigate }) {
  const subjectKey = subject?.name || 'Fizică'
  const meta = SUBJECTS[subjectKey] || SUBJECTS['Fizică']
  const diagram = DIAGRAMS[subjectKey]

  const [messages, setMessages] = useState([
    { role: 'user', content: 'Salut, sunt gata să învăț!' },
    { role: 'model', content: INITIAL_MESSAGES[subjectKey] || INITIAL_MESSAGES['Fizică'] }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [noKey, setNoKey] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, loading])

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
  }

  async function sendMessage(overrideText) {
    const msg = overrideText || input.trim()
    if (!msg || loading) return
    setInput('')
    setLoading(true)
    setNoKey(false)

    const newMessages = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)

    const apiKey = localStorage.getItem('taptutor_gemini_key')
    if (!apiKey) {
      setNoKey(true)
      setMessages(prev => [...prev, { role: 'model', content: '⚠️ Nu ai setat cheia API Gemini! Mergi la **Setări** (⚙️) și introdu cheia ta API.' }])
      setLoading(false)
      return
    }

    try {
      // Build Gemini API contents (needs "user"/"model" roles)
      const apiContents = newMessages.map(m => ({
        role: m.role === 'assistant' ? 'model' : m.role,
        parts: [{ text: m.content }]
      }))

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: meta.system }] },
            contents: apiContents,
            generationConfig: {
              maxOutputTokens: 400,
              temperature: 0.7,
            }
          })
        }
      )

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error.message || 'API Error')
      }

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
        || 'Îmi pare rău, nu am putut genera un răspuns.'

      setMessages(prev => [...prev, { role: 'model', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'model',
        content: `❌ Eroare: ${err.message}.\n\nVerifică cheia API în Setări (⚙️) și conexiunea la internet.`
      }])
    }
    setLoading(false)
  }

  const quickBtns = {
    'Fizică':      ['Explică mai mult formula', 'Vreau un exemplu'],
    'Matematică':  ['Cum calculez Δ?', 'Dă-mi un exercițiu'],
    'Chimie':      ['Explică mai mult', 'Un exemplu de reacție'],
    'Biologie':    ['Spune-mi despre nucleu', 'Ce sunt organitele?'],
    'Informatică': ['Ce e un algoritm?', 'Exemplu de sortare'],
    'Istorie':     ['Spune-mi mai mult', 'Alte evenimente cheie'],
  }
  const btns = quickBtns[subjectKey] || ['Explică mai mult', 'Vreau un exemplu']

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, position:'relative', minHeight:0 }}>


      {/* NFC banner */}
      <div className="nfc-banner">
        <div className="nfc-check">✓</div>
        Card detectat: <strong>{subjectKey}</strong>
      </div>

      {/* Header */}
      <div className="app-header">
        <div className="logo">
          <button onClick={() => onNavigate('home')} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'var(--text)', padding:0, display:'flex', alignItems:'center' }}>←</button>
          <span className="logo-icon" style={{ marginLeft: 4 }}>🎓</span>
          TapTutor
        </div>
        <div className="chapter-badge">
          <span className="chapter-label">Capitol: {meta.chapter}</span>
          <div className="chapter-value">
            <div className="progress-bar-small">
              <div className="progress-fill" style={{ width: `${meta.progress}%` }}/>
            </div>
            {meta.progress}%
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="scroll-content" ref={chatRef}>
        {messages.filter(m => m.role !== 'user' || m.content !== 'Salut, sunt gata să învăț!').map((m, i) => (
          m.role === 'model' || m.role === 'assistant' ? (
            <div key={i} className="ai-message-container">
              <div className="bot-avatar">🤖</div>
              <div className="ai-bubble" dangerouslySetInnerHTML={{ __html: formatText(m.content) }}/>
            </div>
          ) : (
            <div key={i} className="user-message">
              <div className="user-bubble">{m.content}</div>
            </div>
          )
        ))}

        {loading && (
          <div className="ai-message-container">
            <div className="bot-avatar">🤖</div>
            <div className="ai-bubble">
              <span className="dot"/><span className="dot"/><span className="dot"/>
            </div>
          </div>
        )}

        {/* Show diagram after first message */}
        {messages.length <= 2 && diagram && (
          <>
            <div className="diagram-label">Iată o diagramă pentru a înțelege mai bine:</div>
            <div className="diagram-card">
              <div style={{ borderRadius:8, overflow:'hidden' }}>{diagram}</div>
              {subjectKey === 'Fizică' && (
                <div className="formula-line" style={{ marginTop:8 }}>
                  Cum calculăm viteza finală? <span>v₂ = v₁ + a·t</span>
                </div>
              )}
              {subjectKey === 'Matematică' && (
                <div className="formula-line" style={{ marginTop:8 }}>
                  Rădăcinile ecuației: <span>x = (-b ± √Δ) / 2a</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Quick buttons */}
        {messages.length <= 3 && !loading && (
          <div className="action-buttons">
            <button className="btn-outline" onClick={() => sendMessage(btns[0])}>{btns[0]}</button>
            <button className="btn-ghost"   onClick={() => sendMessage(btns[1])}>{btns[1]}</button>
          </div>
        )}

        {/* No API key warning */}
        {noKey && (
          <button className="btn-primary" onClick={() => onNavigate('settings')} style={{ animation:'pulse 1.5s infinite' }}>
            ⚙️ Mergi la Setări pentru cheie API
          </button>
        )}

        {/* Progress card */}
        <div className="progress-card">
          <div className="progress-title">📊 Raport Progres</div>
          <div className="progress-cols">
            <div>
              <div className="col-title green">Materii stăpânite</div>
              <div className="progress-item green"><span>✓</span> Matematică</div>
              <div className="progress-item green"><span>✓</span> Chimie</div>
            </div>
            <div>
              <div className="col-title red">Lacune de Învățare</div>
              <div className="progress-item red"><span>!</span> Fizică</div>
              <div className="progress-item red"><span>!</span> Electronică</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="input-bar">
        <input
          className="input-field"
          placeholder="Scrie o întrebare…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button className="send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
          Trimite
        </button>
      </div>

      <BottomNav active="chat" onNavigate={onNavigate} />
    </div>
  )
}
