import React, { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const SUBJECTS = [
  { name: 'Fizică',       emoji: '⚛️',  color: '#4ECDC4', bg:'linear-gradient(135deg,#e8faf9,#c0f5f2)', progress:75, chapters:4, lastStudied:'Azi' },
  { name: 'Matematică',   emoji: '📐',  color: '#6C5CE7', bg:'linear-gradient(135deg,#ede9fe,#d8d0ff)', progress:88, chapters:6, lastStudied:'Ieri' },
  { name: 'Chimie',       emoji: '🧪',  color: '#FFA552', bg:'linear-gradient(135deg,#fff4e8,#ffe0c0)', progress:60, chapters:3, lastStudied:'Acum 2 zile' },
  { name: 'Biologie',     emoji: '🌿',  color: '#55A868', bg:'linear-gradient(135deg,#edfff3,#c0f0cc)', progress:45, chapters:3, lastStudied:'Acum 3 zile' },
  { name: 'Informatică',  emoji: '💻',  color: '#0984E3', bg:'linear-gradient(135deg,#e8f4ff,#b8dcff)', progress:55, chapters:5, lastStudied:'Acum 4 zile' },
  { name: 'Istorie',      emoji: '🏛️',  color: '#D63031', bg:'linear-gradient(135deg,#fff0f0,#ffd0d0)', progress:30, chapters:4, lastStudied:'Acum o săptămână' },
]

export default function HomeScreen({ onSubjectSelect, onNavigate }) {
  const [search, setSearch] = useState('')

  const filtered = SUBJECTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, position:'relative', minHeight:0 }}>
      <StatusBar />

      <div className="app-header">
        <div className="logo"><span className="logo-icon">🎓</span> TapTutor</div>
        <div style={{
          background:'linear-gradient(135deg,var(--green-light),var(--blue-light))',
          borderRadius:20, padding:'4px 12px',
          fontSize:12, fontWeight:800, color:'var(--green-dark)'
        }}>🔥 7 zile</div>
      </div>

      <div className="scroll-content" style={{ paddingBottom:90 }}>

        {/* Greeting */}
        <div style={{
          background:'linear-gradient(135deg,#e8faf9 0%,#ede9fe 100%)',
          borderRadius:18, padding:'16px 18px',
          display:'flex', alignItems:'center', gap:14
        }}>
          <div style={{
            width:52, height:52, borderRadius:'50%',
            background:'linear-gradient(135deg,var(--green),var(--green-dark))',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:26,
            boxShadow:'0 4px 14px rgba(78,205,196,0.4)', flexShrink:0
          }}>🤖</div>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Bună ziua! 👋</div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-light)', marginTop:3, lineHeight:1.45 }}>
              Alege o materie sau atinge un card NFC pentru a începe.
            </div>
          </div>
        </div>

        {/* NFC prompt */}
        <button
          onClick={() => onNavigate('nfc')}
          style={{
            width:'100%', border:'2px dashed var(--green)',
            borderRadius:16, padding:'14px 16px',
            background:'linear-gradient(135deg,rgba(78,205,196,0.06),rgba(78,205,196,0.02))',
            display:'flex', alignItems:'center', gap:12,
            cursor:'pointer', transition:'all 0.2s', fontFamily:'Nunito,sans-serif'
          }}
        >
          <div style={{
            width:44, height:44, borderRadius:12,
            background:'linear-gradient(135deg,var(--green),var(--green-dark))',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:22, flexShrink:0, boxShadow:'0 3px 10px rgba(78,205,196,0.4)',
            animation:'pulse 2s ease-in-out infinite'
          }}>📡</div>
          <div style={{ textAlign:'left' }}>
            <div style={{ fontSize:14, fontWeight:800, color:'var(--green-dark)' }}>Atinge un card NFC</div>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--text-light)' }}>Detectare instant — fără parole!</div>
          </div>
          <span style={{ marginLeft:'auto', fontSize:18, color:'var(--green)' }}>›</span>
        </button>

        {/* Search */}
        <div style={{ position:'relative' }}>
          <span style={{
            position:'absolute', left:14, top:'50%', transform:'translateY(-50%)',
            fontSize:16, color:'var(--text-light)'
          }}>🔍</span>
          <input
            style={{
              width:'100%', padding:'10px 16px 10px 40px',
              border:'1.5px solid var(--border)', borderRadius:14,
              fontFamily:'Nunito,sans-serif', fontSize:14, fontWeight:600,
              color:'var(--text)', background:'white', outline:'none',
              transition:'border-color 0.2s'
            }}
            placeholder="Caută o materie…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={e => e.target.style.borderColor='var(--green)'}
            onBlur={e => e.target.style.borderColor='var(--border)'}
          />
        </div>

        {/* Subject grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {filtered.map(s => (
            <button
              key={s.name}
              onClick={() => onSubjectSelect(s)}
              style={{
                background:s.bg, borderRadius:18, padding:'16px 14px',
                border:'2px solid transparent', cursor:'pointer',
                display:'flex', flexDirection:'column', alignItems:'flex-start', gap:4,
                transition:'all 0.22s', fontFamily:'Nunito,sans-serif',
                boxShadow:'var(--shadow-sm)', textAlign:'left'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow-md)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)' }}
            >
              <span style={{ fontSize:28, marginBottom:2 }}>{s.emoji}</span>
              <span style={{ fontSize:14, fontWeight:800, color:s.color }}>{s.name}</span>
              <span style={{ fontSize:11, fontWeight:600, color:'var(--text-light)' }}>
                {s.chapters} capitole
              </span>
              {/* Mini progress */}
              <div style={{ width:'100%', height:4, background:'rgba(255,255,255,0.6)', borderRadius:4, overflow:'hidden', marginTop:4 }}>
                <div style={{
                  height:'100%', borderRadius:4,
                  background:s.color,
                  width:`${s.progress}%`, transition:'width 0.6s ease'
                }}/>
              </div>
              <span style={{ fontSize:10, fontWeight:700, color:s.color }}>{s.progress}%</span>
            </button>
          ))}
        </div>

        {/* Recent activity */}
        <div className="card">
          <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:10 }}>🕐 Activitate recentă</div>
          {SUBJECTS.slice(0,3).map(s => (
            <div key={s.name} style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'8px 0', borderBottom:'1px solid var(--border)'
            }}>
              <span style={{ fontSize:20 }}>{s.emoji}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{s.name}</div>
                <div style={{ fontSize:11, fontWeight:600, color:'var(--text-light)' }}>{s.lastStudied}</div>
              </div>
              <div style={{
                background:s.bg, borderRadius:10, padding:'3px 10px',
                fontSize:12, fontWeight:800, color:s.color
              }}>{s.progress}%</div>
            </div>
          ))}
        </div>

      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  )
}
