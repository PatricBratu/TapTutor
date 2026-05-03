import React from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const SUBJECTS_DATA = [
  { name: 'Matematică', emoji: '📐', progress: 88, mastered: true,  chapters: ['Algebră', 'Geometrie', 'Funcții'], color:'#6C5CE7', bg:'#ede9fe' },
  { name: 'Chimie',     emoji: '🧪', progress: 72, mastered: true,  chapters: ['Reacții', 'Elemente', 'Acizi'], color:'#FFA552', bg:'#fff4e8' },
  { name: 'Biologie',   emoji: '🌿', progress: 45, mastered: false, chapters: ['Celula', 'Ecosisteme'], color:'#55A868', bg:'#edfff3' },
  { name: 'Fizică',     emoji: '⚛️', progress: 75, mastered: false, chapters: ['Mișcarea', 'Forțe', 'Energia'], color:'#4ECDC4', bg:'#e8faf9' },
  { name: 'Informatică',emoji: '💻', progress: 55, mastered: false, chapters: ['Algoritmi', 'C++'], color:'#0984E3', bg:'#e8f4ff' },
  { name: 'Istorie',    emoji: '🏛️', progress: 30, mastered: false, chapters: ['Antichitate', 'Evul Mediu'], color:'#D63031', bg:'#fff0f0' },
]

const STREAK = 7
const TOTAL_SESSIONS = 34
const TOTAL_MINUTES = 420

function Ring({ pct, color, size = 60 }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="7"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition:'stroke-dasharray 1s ease' }}
      />
    </svg>
  )
}

export default function ProgressScreen({ onNavigate }) {
  const mastered = SUBJECTS_DATA.filter(s => s.mastered)
  const gaps     = SUBJECTS_DATA.filter(s => !s.mastered)
  const avg      = Math.round(SUBJECTS_DATA.reduce((a,s) => a+s.progress, 0) / SUBJECTS_DATA.length)

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, position:'relative', minHeight:0 }}>
      <StatusBar />
      <div className="app-header">
        <div className="logo">
          <button onClick={() => onNavigate('home')} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'var(--text)', padding:0, display:'flex', alignItems:'center' }}>←</button>
          <span className="logo-icon" style={{ marginLeft: 4 }}>🎓</span> 
          TapTutor
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:'var(--text-light)' }}>📊 Progresul meu</div>
      </div>

      <div className="scroll-content" style={{ paddingBottom:90 }}>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
          {[
            { label:'Zile consecutiv', value:STREAK, icon:'🔥', color:'#FFA552' },
            { label:'Sesiuni totale',  value:TOTAL_SESSIONS, icon:'📚', color:'var(--green-dark)' },
            { label:'Minute studiu',   value:TOTAL_MINUTES, icon:'⏱️', color:'var(--blue)' },
          ].map(s => (
            <div key={s.label} style={{
              background:'white', borderRadius:14, padding:'12px 8px',
              border:'1.5px solid var(--border)', textAlign:'center',
              boxShadow:'var(--shadow-sm)'
            }}>
              <div style={{ fontSize:22 }}>{s.icon}</div>
              <div style={{ fontSize:20, fontWeight:900, color:s.color, lineHeight:1.1 }}>{s.value}</div>
              <div style={{ fontSize:10, fontWeight:700, color:'var(--text-light)', marginTop:2, lineHeight:1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Overall progress ring */}
        <div className="card" style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ position:'relative', flexShrink:0 }}>
            <Ring pct={avg} color="var(--green)" size={80}/>
            <div style={{
              position:'absolute', inset:0,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:16, fontWeight:900, color:'var(--text)'
            }}>{avg}%</div>
          </div>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:'var(--text)' }}>Progres general</div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-light)', marginTop:3, lineHeight:1.5 }}>
              Ai studiat {SUBJECTS_DATA.length} materii. <br/>
              {mastered.length} stăpânite, {gaps.length} cu lacune.
            </div>
          </div>
        </div>

        {/* Mastered */}
        <div>
          <div style={{ fontSize:14, fontWeight:800, color:'var(--green-dark)', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
            <span>✅</span> Materii stăpânite
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {mastered.map(s => (
              <div key={s.name} style={{
                background:'white', borderRadius:14, padding:'12px 14px',
                border:'1.5px solid var(--border)', display:'flex', alignItems:'center', gap:12,
                boxShadow:'var(--shadow-sm)'
              }}>
                <span style={{ fontSize:24 }}>{s.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:800, color:'var(--text)' }}>{s.name}</div>
                  <div style={{ fontSize:11, fontWeight:600, color:'var(--text-light)', marginBottom:5 }}>
                    {s.chapters.join(' · ')}
                  </div>
                  <div style={{ height:5, background:'var(--border)', borderRadius:5, overflow:'hidden' }}>
                    <div style={{
                      height:'100%', borderRadius:5,
                      background:`linear-gradient(90deg,${s.color},${s.color}cc)`,
                      width:`${s.progress}%`, transition:'width 1s ease'
                    }}/>
                  </div>
                </div>
                <span style={{ fontSize:14, fontWeight:800, color:s.color }}>{s.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gaps */}
        <div>
          <div style={{ fontSize:14, fontWeight:800, color:'var(--red)', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
            <span>⚠️</span> Lacune de învățare
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {gaps.map(s => (
              <div key={s.name} style={{
                background:'white', borderRadius:14, padding:'12px 14px',
                border:'1.5px solid #ffd6d6', display:'flex', alignItems:'center', gap:12,
                boxShadow:'var(--shadow-sm)'
              }}>
                <span style={{ fontSize:24 }}>{s.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:800, color:'var(--text)' }}>{s.name}</div>
                  <div style={{ fontSize:11, fontWeight:600, color:'var(--text-light)', marginBottom:5 }}>
                    {s.chapters.join(' · ')}
                  </div>
                  <div style={{ height:5, background:'var(--border)', borderRadius:5, overflow:'hidden' }}>
                    <div style={{
                      height:'100%', borderRadius:5,
                      background:'linear-gradient(90deg,var(--red),#ff9b9b)',
                      width:`${s.progress}%`, transition:'width 1s ease'
                    }}/>
                  </div>
                </div>
                <span style={{ fontSize:14, fontWeight:800, color:'var(--red)' }}>{s.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly chart */}
        <div className="card">
          <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:12 }}>📅 Activitate săptămânală</div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:60 }}>
            {[40,65,30,80,55,90,70].map((h,i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{
                  width:'100%', height: `${h * 0.6}px`,
                  background: i===6
                    ? 'linear-gradient(180deg,var(--green),var(--green-dark))'
                    : 'var(--green-light)',
                  borderRadius:'4px 4px 0 0',
                  border: i===6 ? 'none' : '1.5px solid var(--green-mid)',
                  transition:'height 0.6s ease'
                }}/>
                <span style={{ fontSize:10, fontWeight:700, color:'var(--text-light)' }}>
                  {['L','Ma','Mi','J','V','S','D'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('quiz')}>
          📝 Fă un test acum
        </button>
      </div>

      <BottomNav active="progress" onNavigate={onNavigate} />
    </div>
  )
}
