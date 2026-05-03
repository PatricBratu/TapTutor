import React, { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1100)
    const t3 = setTimeout(() => onDone(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div style={{
      flex: 1,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #e8faf9 0%, #f8f9ff 60%, #ede9fe 100%)',
      gap: 0, position: 'relative', overflow: 'hidden'
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'absolute', width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(78,205,196,0.18) 0%, transparent 70%)',
        top: -60, left: -60, borderRadius: '50%'
      }}/>
      <div style={{
        position: 'absolute', width: 250, height: 250,
        background: 'radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)',
        bottom: -40, right: -40, borderRadius: '50%'
      }}/>

      {/* Logo */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        opacity: phase >= 0 ? 1 : 0,
        transform: phase >= 0 ? 'scale(1)' : 'scale(0.5)',
        transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)'
      }}>
        {/* Icon ring */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--green), #38b2aa)',
            boxShadow: '0 8px 32px rgba(78,205,196,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 50,
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            🎓
          </div>
          {/* Ripple rings */}
          {[0,1,2].map(i => (
            <div key={i} style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px solid rgba(78,205,196,0.5)',
              animation: `nfcRing 2s ease-out ${i * 0.6}s infinite`
            }}/>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: 38, fontWeight: 900, color: 'var(--text)',
            letterSpacing: -1, lineHeight: 1
          }}>TapTutor</h1>
          <p style={{
            fontSize: 14, fontWeight: 600, color: 'var(--text-light)',
            marginTop: 6,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 0.1s'
          }}>
            Profesorul tău personal în buzunar
          </p>
        </div>
      </div>

      {/* Tagline chips */}
      {phase >= 2 && (
        <div style={{
          display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap',
          justifyContent: 'center', padding: '0 20px',
          animation: 'fadeSlideUp 0.4s ease both'
        }}>
          {['🤖 AI Personalizat', '📡 NFC Instant', '💸 45 lei/lună'].map(tag => (
            <span key={tag} style={{
              background: 'white', border: '1.5px solid var(--border)',
              borderRadius: 20, padding: '5px 12px',
              fontSize: 12, fontWeight: 700, color: 'var(--text-light)',
              boxShadow: 'var(--shadow-sm)'
            }}>{tag}</span>
          ))}
        </div>
      )}

      {/* Loading bar */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
      }}>
        <div style={{ width: 120, height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: 'linear-gradient(90deg, var(--green), var(--green-dark))',
            width: phase >= 2 ? '100%' : phase >= 1 ? '60%' : '20%',
            transition: 'width 0.6s ease'
          }}/>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-light)' }}>Se încarcă…</span>
      </div>
    </div>
  )
}
