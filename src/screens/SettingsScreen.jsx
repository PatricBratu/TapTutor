import React, { useState, useEffect } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

export default function SettingsScreen({ onNavigate }) {
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)
  const [hasKey, setHasKey] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('taptutor_gemini_key') || ''
    setApiKey(stored)
    setHasKey(!!stored)
  }, [])

  function save() {
    localStorage.setItem('taptutor_gemini_key', apiKey.trim())
    setSaved(true)
    setHasKey(!!apiKey.trim())
    setTimeout(() => setSaved(false), 2000)
  }

  function clearKey() {
    localStorage.removeItem('taptutor_gemini_key')
    setApiKey('')
    setHasKey(false)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, position:'relative', minHeight:0 }}>
      <StatusBar />
      <div className="app-header">
        <div className="logo">
          <button onClick={() => onNavigate('home')} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'var(--text)', padding:0, display:'flex', alignItems:'center' }}>←</button>
          <span className="logo-icon" style={{ marginLeft: 4 }}>🎓</span>
          TapTutor
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:'var(--text-light)' }}>⚙️ Setări</div>
      </div>

      <div className="scroll-content" style={{ paddingBottom:90 }}>

        {/* API Key Section */}
        <div className="card">
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <span style={{ fontSize:24 }}>🤖</span>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Gemini AI API Key</div>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text-light)' }}>
                Necesară pentru chat-ul AI
              </div>
            </div>
            <span style={{
              marginLeft:'auto', fontSize:18,
              animation: hasKey ? 'none' : 'pulse 1.5s ease-in-out infinite'
            }}>
              {hasKey ? '✅' : '❌'}
            </span>
          </div>

          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="Introdu cheia API Gemini…"
            style={{
              width:'100%', padding:'11px 14px',
              border:'1.5px solid var(--border)', borderRadius:12,
              fontFamily:'Nunito,sans-serif', fontSize:14, fontWeight:600,
              color:'var(--text)', background:'#f8f9fa', outline:'none',
              marginBottom:10,
              transition:'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor='var(--green)'}
            onBlur={e => e.target.style.borderColor='var(--border)'}
          />

          <div style={{ display:'flex', gap:8 }}>
            <button className="btn-primary" onClick={save} style={{ flex:2 }}>
              {saved ? '✅ Salvat!' : '💾 Salvează'}
            </button>
            {hasKey && (
              <button className="btn-ghost" onClick={clearKey} style={{ flex:1 }}>
                🗑️ Șterge
              </button>
            )}
          </div>
        </div>

        {/* Get API Key */}
        <div className="card" style={{ background:'linear-gradient(135deg,#e8faf9,#ede9fe)' }}>
          <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:8 }}>
            🔑 Cum obții o cheie API?
          </div>
          <ol style={{ paddingLeft:18, fontSize:13, fontWeight:600, color:'var(--text)', lineHeight:1.8 }}>
            <li>Mergi la <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener"
              style={{ color:'var(--green-dark)', textDecoration:'underline', fontWeight:800 }}>
              Google AI Studio
            </a></li>
            <li>Autentifică-te cu contul Google</li>
            <li>Apasă <strong>"Create API Key"</strong></li>
            <li>Copiază cheia și lipe-o mai sus</li>
          </ol>
        </div>

        {/* NFC Instructions */}
        <div className="card">
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <span style={{ fontSize:24 }}>📡</span>
            <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>
              Cum programezi tag-urile NFC
            </div>
          </div>

          <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', lineHeight:1.7 }}>
            <ol style={{ paddingLeft:18 }}>
              <li>Descarcă <strong>"NFC Tools"</strong> din Google Play</li>
              <li>Apasă <strong>"Write"</strong> → <strong>"Add a record"</strong></li>
              <li>Alege <strong>"Text"</strong></li>
              <li>Scrie numele materiei (exact unul din cele de mai jos)</li>
              <li>Apasă <strong>"Write"</strong> și ține tag-ul de telefon</li>
            </ol>
          </div>

          <div style={{ marginTop:12, display:'flex', flexWrap:'wrap', gap:6 }}>
            {['Fizica','Matematica','Chimie','Biologie','Informatica','Istorie'].map(m => (
              <span key={m} style={{
                background:'var(--green-light)', borderRadius:10,
                padding:'4px 10px', fontSize:12, fontWeight:700,
                color:'var(--green-dark)', border:'1px solid var(--green-mid)'
              }}>{m}</span>
            ))}
          </div>
        </div>

        {/* NFC Status */}
        <div className="card">
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:20 }}>
              {'NDEFReader' in window ? '✅' : '⚠️'}
            </span>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:'var(--text)' }}>
                Web NFC {'NDEFReader' in window ? 'Disponibil' : 'Indisponibil'}
              </div>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text-light)' }}>
                {'NDEFReader' in window
                  ? 'Browserul tău suportă citirea NFC! 🎉'
                  : 'Deschide în Chrome pe Android pentru NFC real'}
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div style={{
          textAlign:'center', padding:'16px 0',
          fontSize:12, fontWeight:600, color:'var(--text-light)'
        }}>
          <div style={{ fontSize:16, marginBottom:4 }}>🎓</div>
          TapTutor v1.0 — Demo<br/>
          Colegiul Național Samuel von Brukenthal
        </div>

      </div>

      <BottomNav active="settings" onNavigate={onNavigate} />
    </div>
  )
}
