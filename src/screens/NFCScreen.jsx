import React, { useEffect, useState, useRef } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const SUBJECT_MAP = {
  'fizica':      { name: 'Fizică',       emoji: '⚛️',  color: '#4ECDC4', bg: '#e8faf9' },
  'matematica':  { name: 'Matematică',   emoji: '📐',  color: '#6C5CE7', bg: '#ede9fe' },
  'chimie':      { name: 'Chimie',       emoji: '🧪',  color: '#FFA552', bg: '#fff4e8' },
  'biologie':    { name: 'Biologie',     emoji: '🌿',  color: '#55A868', bg: '#edfff3' },
  'informatica': { name: 'Informatică',  emoji: '💻',  color: '#0984E3', bg: '#e8f4ff' },
  'istorie':     { name: 'Istorie',      emoji: '🏛️',  color: '#D63031', bg: '#fff0f0' },
}

const subjects = Object.values(SUBJECT_MAP)

function normalizeSubject(raw) {
  const normalized = raw.trim().toLowerCase()
    .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
    .replace(/ș/g, 's').replace(/ț/g, 't')
  return SUBJECT_MAP[normalized] || null
}

export default function NFCScreen({ onDetected, onNavigate }) {
  const [scanning, setScanning] = useState(false)
  const [detected, setDetected] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [nfcSupported, setNfcSupported] = useState(false)
  const [nfcError, setNfcError] = useState(null)
  const scannerRef = useRef(null)

  useEffect(() => {
    setNfcSupported('NDEFReader' in window)
  }, [])

  // Manual tap (fallback)
  function tapCard(subject) {
    if (detected) return
    setSelectedSubject(subject)
    setScanning(true)
    setTimeout(() => {
      setDetected(true)
      setTimeout(() => onDetected(subject), 800)
    }, 1200)
  }

  // Real NFC scan
  async function startNFCScan() {
    if (scanning || detected) return
    setNfcError(null)
    setScanning(true)

    try {
      const ndef = new NDEFReader()
      await ndef.scan()
      scannerRef.current = ndef

      ndef.onreading = (event) => {
        for (const record of event.message.records) {
          if (record.recordType === 'text') {
            const decoder = new TextDecoder(record.encoding || 'utf-8')
            const text = decoder.decode(record.data)
            const subject = normalizeSubject(text)
            if (subject) {
              setSelectedSubject(subject)
              setDetected(true)
              setScanning(false)
              setTimeout(() => onDetected(subject), 800)
              return
            }
          }
          // Also try URL records (in case they wrote a URL)
          if (record.recordType === 'url') {
            const url = new TextDecoder().decode(record.data)
            const params = new URLSearchParams(url.split('?')[1] || '')
            const materie = params.get('materie')
            if (materie) {
              const subject = normalizeSubject(materie)
              if (subject) {
                setSelectedSubject(subject)
                setDetected(true)
                setScanning(false)
                setTimeout(() => onDetected(subject), 800)
                return
              }
            }
          }
        }
        // If we got here, couldn't parse the tag
        setNfcError('Tag-ul NFC nu conține o materie recunoscută. Scrie exact: Fizica, Matematica, Chimie, etc.')
        setScanning(false)
      }

      ndef.onreadingerror = () => {
        setNfcError('Eroare la citirea tag-ului. Încearcă din nou.')
        setScanning(false)
      }

    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setNfcError('NFC-ul nu a fost permis. Dă permisiune în browser.')
      } else if (err.name === 'NotSupportedError') {
        setNfcError('Browserul tău nu suportă NFC. Folosește Chrome pe Android.')
      } else {
        setNfcError(`Eroare NFC: ${err.message}`)
      }
      setScanning(false)
    }
  }

  function stopScan() {
    setScanning(false)
    setNfcError(null)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, background:'linear-gradient(160deg,#e8faf9 0%,#f8f9ff 60%,#ede9fe 100%)', minHeight:0 }}>
      <StatusBar />

      <div className="app-header">
        <div className="logo">
          <button onClick={() => onNavigate('home')} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'var(--text)', padding:0, display:'flex', alignItems:'center' }}>←</button>
          <span className="logo-icon" style={{ marginLeft: 4 }}>🎓</span>
          TapTutor
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:'var(--text-light)' }}>📡 NFC Scan</div>
      </div>

      <div style={{ padding:'10px 16px 90px', flex:1, overflowY:'auto', scrollbarWidth:'none', display:'flex', flexDirection:'column', gap:12 }}>

        {/* NFC Scan Button (real NFC) */}
        {nfcSupported && !detected && (
          <button
            onClick={scanning ? stopScan : startNFCScan}
            style={{
              width:'100%', border:'none', borderRadius:20, padding:'18px 16px',
              background: scanning
                ? 'linear-gradient(135deg,#1e2a38,#2d3a4a)'
                : 'linear-gradient(135deg,var(--green),var(--green-dark))',
              display:'flex', alignItems:'center', justifyContent:'center', gap:12,
              cursor:'pointer', fontFamily:'Nunito,sans-serif',
              boxShadow: scanning
                ? '0 6px 24px rgba(30,42,56,0.4)'
                : '0 6px 24px rgba(78,205,196,0.4)',
              transition:'all 0.3s'
            }}
          >
            <div style={{ position:'relative', width:48, height:48, flexShrink:0 }}>
              <div style={{
                width:48, height:48, borderRadius:'50%',
                background:'rgba(255,255,255,0.15)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:24
              }}>📡</div>
              {scanning && [0,1,2].map(i => (
                <div key={i} style={{
                  position:'absolute', inset:-4, borderRadius:'50%',
                  border:'2px solid rgba(78,205,196,0.6)',
                  animation: `nfcRing 1.5s ease-out ${i * 0.4}s infinite`
                }}/>
              ))}
            </div>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontSize:16, fontWeight:800, color:'white' }}>
                {scanning ? '📡 Se scanează…' : '📡 Scanează Card NFC'}
              </div>
              <div style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.7)' }}>
                {scanning ? 'Ține tag-ul NFC lângă telefon' : 'Apasă și apropie cardul de telefon'}
              </div>
            </div>
          </button>
        )}

        {/* Detected banner */}
        {detected && selectedSubject && (
          <div style={{
            background:'linear-gradient(90deg,#e8faf9,#f0fdfb)',
            border:'2px solid var(--green)',
            borderRadius:20, padding:'14px 18px',
            display:'flex', alignItems:'center', gap:10,
            animation:'popIn 0.4s ease both',
            boxShadow:'0 4px 16px rgba(78,205,196,0.3)'
          }}>
            <span style={{ fontSize:28 }}>✅</span>
            <div>
              <div style={{ fontSize:16, fontWeight:800, color:'#1a9e96' }}>
                Card detectat!
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>
                {selectedSubject.emoji} {selectedSubject.name}
              </div>
            </div>
          </div>
        )}

        {/* NFC Error */}
        {nfcError && (
          <div style={{
            background:'var(--red-light)', border:'1.5px solid var(--red)',
            borderRadius:14, padding:'10px 14px',
            fontSize:13, fontWeight:600, color:'#c0392b',
            animation:'fadeSlideUp 0.3s ease both'
          }}>
            ⚠️ {nfcError}
          </div>
        )}

        {/* Not supported info */}
        {!nfcSupported && !detected && (
          <div style={{
            background:'linear-gradient(135deg,#fff4e8,#ffe0c0)',
            border:'1.5px solid #FFA552', borderRadius:14, padding:'12px 14px',
            display:'flex', gap:10, alignItems:'flex-start'
          }}>
            <span style={{ fontSize:20 }}>📱</span>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', marginBottom:3 }}>
                NFC nu e disponibil în acest browser
              </div>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text-light)', lineHeight:1.5 }}>
                Deschide aplicația în <strong>Chrome pe Android</strong> pentru NFC real. Aici poți selecta manual materia de mai jos.
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        {!detected && (
          <div style={{
            display:'flex', alignItems:'center', gap:12,
            fontSize:12, fontWeight:700, color:'var(--text-light)'
          }}>
            <div style={{ flex:1, height:1, background:'var(--border)' }}/>
            {nfcSupported ? 'sau alege manual' : 'alege o materie'}
            <div style={{ flex:1, height:1, background:'var(--border)' }}/>
          </div>
        )}

        {/* Subject grid (manual fallback) */}
        {!detected && (
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr',
            gap:10
          }}>
            {subjects.map(s => (
              <button
                key={s.name}
                onClick={() => tapCard(s)}
                disabled={scanning || detected}
                style={{
                  background: s.bg,
                  border: `2px solid ${selectedSubject?.name===s.name && (scanning||detected) ? s.color : 'transparent'}`,
                  borderRadius:16, padding:'14px 12px',
                  display:'flex', flexDirection:'column', alignItems:'flex-start', gap:4,
                  cursor: scanning||detected ? 'default':'pointer',
                  transition:'all 0.2s',
                  opacity: (scanning||detected) && selectedSubject?.name!==s.name ? 0.45 : 1,
                  transform: selectedSubject?.name===s.name && detected ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: selectedSubject?.name===s.name ? `0 4px 16px ${s.color}55` : 'var(--shadow-sm)',
                  fontFamily:'Nunito,sans-serif'
                }}
              >
                <span style={{fontSize:26}}>{s.emoji}</span>
                <span style={{fontSize:14,fontWeight:800,color:s.color}}>{s.name}</span>
                <span style={{fontSize:11,fontWeight:600,color:'var(--text-light)'}}>Atinge pentru a studia</span>
              </button>
            ))}
          </div>
        )}

        {/* How it works hint */}
        {!detected && (
          <div style={{
            background:'white', borderRadius:14, padding:'12px 14px',
            border:'1.5px solid var(--border)',
            display:'flex', gap:10, alignItems:'flex-start'
          }}>
            <span style={{fontSize:20}}>💡</span>
            <div>
              <div style={{fontSize:13,fontWeight:800,color:'var(--text)',marginBottom:3}}>Cum funcționează NFC?</div>
              <div style={{fontSize:12,fontWeight:600,color:'var(--text-light)',lineHeight:1.5}}>
                1. Programează tag-urile cu <strong>NFC Tools</strong> (textul "Fizica", "Matematica", etc.)<br/>
                2. Apasă butonul <strong>Scanează</strong> de mai sus<br/>
                3. Ține tag-ul NFC lângă spatele telefonului<br/>
                4. TapTutor detectează materia și pornește lecția! 🚀
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  )
}
