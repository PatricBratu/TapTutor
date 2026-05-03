import React, { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

export default function PricingScreen({ onNavigate }) {
  const [selected, setSelected] = useState('monthly')
  const [bought, setBought] = useState(false)

  const plans = [
    {
      id: 'cards',
      icon: '💳',
      name: 'Set Carduri NFC',
      price: '100 lei',
      period: 'o singură dată',
      color: '#6C5CE7',
      bg: 'linear-gradient(135deg,#ede9fe,#e0d8ff)',
      features: [
        '5 carduri NFC reutilizabile',
        'Scrii pe ele cu pixul',
        'Compatibile cu orice telefon',
        'Durată de viață nelimitată',
      ],
      featured: false,
    },
    {
      id: 'monthly',
      icon: '🚀',
      name: 'Abonament Premium',
      price: '45 lei',
      period: 'pe lună',
      color: '#4ECDC4',
      bg: 'linear-gradient(135deg,#e8faf9,#c0f5f2)',
      features: [
        'Acces complet la toate materiile',
        'Chat AI nelimitat',
        'Teste personalizate zilnice',
        'Raport progres detaliat',
        'Suport prioritar',
      ],
      featured: true,
      badge: '⭐ Recomandat',
    },
    {
      id: 'bundle',
      icon: '🎯',
      name: 'Pachet Complet',
      price: '130 lei',
      period: 'primul lună + carduri',
      color: '#FFA552',
      bg: 'linear-gradient(135deg,#fff4e8,#ffe0c0)',
      features: [
        'Tot ce include Premium',
        '5 carduri NFC incluse',
        'Economisești 15 lei',
        'Ghid de start rapid',
      ],
      featured: false,
      badge: '🔥 Best Value',
    },
  ]

  const competitors = [
    { name: 'Meditații private', price: '400+ lei/săpt.', good: false },
    { name: 'Quizlet',           price: 'Fără NFC',       good: false },
    { name: 'Kahoot',            price: 'Jocuri generice', good: false },
    { name: 'TapTutor',         price: '45 lei/lună',    good: true  },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, position:'relative', minHeight:0 }}>
      <StatusBar />
      <div className="app-header">
        <div className="logo">
          <button onClick={() => onNavigate('home')} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'var(--text)', padding:0, display:'flex', alignItems:'center' }}>←</button>
          <span className="logo-icon" style={{ marginLeft: 4 }}>🎓</span> 
          TapTutor
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:'var(--text-light)' }}>💎 Premium</div>
      </div>

      <div className="scroll-content" style={{ paddingBottom:90 }}>

        {/* Hero */}
        <div style={{
          background:'linear-gradient(135deg,#1e2a38 0%,#2d3a4a 100%)',
          borderRadius:20, padding:'20px 18px', textAlign:'center',
          color:'white', position:'relative', overflow:'hidden'
        }}>
          <div style={{
            position:'absolute', top:-30, right:-30, width:120, height:120,
            background:'rgba(78,205,196,0.15)', borderRadius:'50%'
          }}/>
          <div style={{ fontSize:36, marginBottom:8 }}>🚀</div>
          <h2 style={{ fontSize:20, fontWeight:900, marginBottom:6 }}>
            De 40× mai ieftin ca meditatiile
          </h2>
          <p style={{ fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.7)', lineHeight:1.5 }}>
            Primul tutore AI cu NFC din România.<br/>
            Personalizare completă la un preț accesibil.
          </p>
        </div>

        {/* Plans */}
        {plans.map(plan => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            style={{
              background: plan.featured ? plan.bg : 'white',
              borderRadius:20, padding:'18px 16px',
              border: selected===plan.id
                ? `2.5px solid ${plan.color}`
                : '2px solid var(--border)',
              cursor:'pointer', transition:'all 0.22s', position:'relative',
              boxShadow: selected===plan.id
                ? `0 6px 24px ${plan.color}44`
                : 'var(--shadow-sm)',
              transform: selected===plan.id ? 'scale(1.01)' : 'scale(1)'
            }}
          >
            {plan.badge && (
              <div style={{
                position:'absolute', top:-11, right:14,
                background: plan.featured ? plan.color : '#FFA552',
                color:'white', borderRadius:12, padding:'3px 12px',
                fontSize:11, fontWeight:800
              }}>{plan.badge}</div>
            )}

            <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
              <div style={{
                width:48, height:48, borderRadius:14,
                background:`linear-gradient(135deg,${plan.color},${plan.color}aa)`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:24, flexShrink:0,
                boxShadow:`0 3px 12px ${plan.color}44`
              }}>{plan.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>{plan.name}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:4, marginTop:2 }}>
                  <span style={{ fontSize:22, fontWeight:900, color:plan.color }}>{plan.price}</span>
                  <span style={{ fontSize:12, fontWeight:600, color:'var(--text-light)' }}>/ {plan.period}</span>
                </div>
              </div>
              <div style={{
                width:22, height:22, borderRadius:'50%', flexShrink:0, marginTop:2,
                border: `2.5px solid ${selected===plan.id ? plan.color : 'var(--border)'}`,
                background: selected===plan.id ? plan.color : 'white',
                display:'flex', alignItems:'center', justifyContent:'center'
              }}>
                {selected===plan.id && <span style={{ fontSize:12, color:'white' }}>✓</span>}
              </div>
            </div>

            <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:5 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:7, fontSize:13, fontWeight:600, color:'var(--text)' }}>
                  <span style={{ color:plan.color, fontSize:14 }}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        {!bought ? (
          <button
            className="btn-primary"
            style={{ fontSize:15, fontWeight:900, padding:'14px' }}
            onClick={() => setBought(true)}
          >
            🛒 Cumpără acum — {plans.find(p=>p.id===selected)?.price}
          </button>
        ) : (
          <div style={{
            background:'linear-gradient(135deg,#e8faf9,#c0f5f2)',
            border:'2px solid var(--green)', borderRadius:16, padding:'16px',
            textAlign:'center', animation:'popIn 0.4s ease both'
          }}>
            <div style={{ fontSize:32, marginBottom:6 }}>🎉</div>
            <div style={{ fontSize:16, fontWeight:800, color:'var(--green-dark)' }}>Felicitări!</div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-light)', marginTop:4 }}>
              În aplicația reală, plata s-ar procesa acum. Bun venit în TapTutor Premium!
            </div>
          </div>
        )}

        {/* Competitor comparison */}
        <div className="card">
          <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:10 }}>
            🏆 De ce TapTutor câștigă
          </div>
          {competitors.map(c => (
            <div key={c.name} style={{
              display:'flex', alignItems:'center', gap:10, padding:'7px 0',
              borderBottom:'1px solid var(--border)'
            }}>
              <span style={{ fontSize:16 }}>{c.good ? '✅' : '❌'}</span>
              <span style={{ flex:1, fontSize:13, fontWeight:700, color: c.good ? 'var(--text)' : 'var(--text-light)' }}>
                {c.name}
              </span>
              <span style={{
                fontSize:12, fontWeight:800,
                color: c.good ? 'var(--green-dark)' : 'var(--red)',
                background: c.good ? 'var(--green-light)' : 'var(--red-light)',
                borderRadius:10, padding:'3px 10px'
              }}>{c.price}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{
          background:'linear-gradient(135deg,#ede9fe,#e8faf9)',
          borderRadius:16, padding:'16px',
          border:'1.5px solid var(--border)'
        }}>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', lineHeight:1.6, fontStyle:'italic' }}>
            "TapTutor m-a ajutat să trec Bacalaureatul cu nota 9 la Fizică! Eram la 5 înainte să-l folosesc."
          </div>
          <div style={{ fontSize:12, fontWeight:800, color:'var(--text-light)', marginTop:8 }}>
            — Andrei M., absolvent 2025 ⭐⭐⭐⭐⭐
          </div>
        </div>

      </div>

      <BottomNav active="pricing" onNavigate={onNavigate} />
    </div>
  )
}
