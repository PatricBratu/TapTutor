import React, { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const QUIZZES = {
  'Fizică': [
    {
      q: 'Un corp pornește de la repaus cu accelerația a = 3 m/s². Care este viteza după 4 secunde?',
      options: ['9 m/s', '12 m/s', '15 m/s', '7 m/s'],
      correct: 1,
      explanation: 'v₂ = v₁ + a·t = 0 + 3·4 = 12 m/s ✅'
    },
    {
      q: 'Ce descrie mișcarea uniform accelerată?',
      options: ['Viteză constantă', 'Accelerație constantă', 'Distanță constantă', 'Forță nulă'],
      correct: 1,
      explanation: 'Mișcarea uniform accelerată are accelerație CONSTANTĂ — viteza crește uniform în timp. ✅'
    },
    {
      q: 'Formula distanței parcurse în mișcarea uniform accelerată este:',
      options: ['d = v·t', 'd = v₁·t + ½·a·t²', 'd = a·t²', 'd = v²/2a'],
      correct: 1,
      explanation: 'd = v₁·t + ½·a·t² este formula corectă pentru distanța parcursă. ✅'
    },
    {
      q: 'Unitatea de măsură a accelerației este:',
      options: ['m/s', 'm/s²', 'km/h', 'N/kg'],
      correct: 1,
      explanation: 'Accelerația se măsoară în m/s² (metri pe secundă la pătrat). ✅'
    },
  ],
  'Matematică': [
    {
      q: 'Câte soluții reale are ecuația x² - 5x + 6 = 0?',
      options: ['0 soluții', '1 soluție', '2 soluții reale', 'Infinit multe'],
      correct: 2,
      explanation: 'Δ = 25 - 24 = 1 > 0, deci 2 soluții reale distincte: x₁=2, x₂=3 ✅'
    },
    {
      q: 'Care este Δ pentru ecuația 2x² + 3x - 2 = 0?',
      options: ['9', '25', '16', '-7'],
      correct: 1,
      explanation: 'Δ = b² - 4ac = 9 - 4·2·(-2) = 9 + 16 = 25 ✅'
    },
    {
      q: 'Dacă Δ < 0, ecuația de gradul II are:',
      options: ['Două soluții reale', 'O soluție reală dublă', 'Nicio soluție reală', 'Trei soluții'],
      correct: 2,
      explanation: 'Dacă Δ < 0 nu există soluții reale — rădăcinile sunt numere complexe. ✅'
    },
  ],
  'Chimie': [
    {
      q: 'Ce tip de reacție este: A + B → AB ?',
      options: ['Descompunere', 'Combinare/Sinteză', 'Substituție', 'Schimb dublu'],
      correct: 1,
      explanation: 'A + B → AB este o reacție de combinare (sinteză). ✅'
    },
    {
      q: 'Formula apei este:',
      options: ['H₂O₂', 'HO', 'H₂O', 'H₃O'],
      correct: 2,
      explanation: 'Apa are formula H₂O — 2 atomi de hidrogen și 1 atom de oxigen. ✅'
    },
    {
      q: 'Ce se conservă într-o reacție chimică?',
      options: ['Culoarea', 'Masa', 'Temperatura', 'Volumul'],
      correct: 1,
      explanation: 'Legea conservării masei: masa reactanților = masa produșilor. ✅'
    },
  ],
}

export default function QuizScreen({ subject, onNavigate }) {
  const subjectKey = subject?.name || 'Fizică'
  const questions = QUIZZES[subjectKey] || QUIZZES['Fizică']

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [showExp, setShowExp] = useState(false)

  const q = questions[current]
  const score = answers.filter(Boolean).length

  function pickAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)
    setShowExp(true)
    setAnswers(prev => [...prev, idx === q.correct])
  }

  function next() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setShowExp(false)
    }
  }

  function restart() {
    setCurrent(0); setSelected(null); setAnswers([]); setFinished(false); setShowExp(false)
  }

  const pct = Math.round((current / questions.length) * 100)
  const finalPct = Math.round((score / questions.length) * 100)

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, position:'relative', minHeight:0 }}>
      <StatusBar />

      {/* Header */}
      <div className="app-header">
        <div className="logo">
          <button onClick={() => onNavigate('home')} style={{ background:'transparent', border:'none', fontSize:22, cursor:'pointer', color:'var(--text)', padding:0, display:'flex', alignItems:'center' }}>←</button>
          <span className="logo-icon" style={{ marginLeft: 4 }}>🎓</span> 
          TapTutor
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:'var(--text-light)' }}>📝 Teste · {subjectKey}</div>
      </div>

      <div className="scroll-content" style={{ paddingBottom:90 }}>

        {!finished ? (
          <>
            {/* Progress */}
            <div style={{ marginBottom:2 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:12, fontWeight:700, color:'var(--text-light)' }}>
                  Întrebarea {current+1} din {questions.length}
                </span>
                <span style={{ fontSize:12, fontWeight:800, color:'var(--green-dark)' }}>
                  {score} corecte
                </span>
              </div>
              <div style={{ height:6, background:'var(--border)', borderRadius:6, overflow:'hidden' }}>
                <div style={{
                  height:'100%', borderRadius:6,
                  background:'linear-gradient(90deg,var(--green),var(--green-dark))',
                  width: `${((current+1)/questions.length)*100}%`,
                  transition:'width 0.4s ease'
                }}/>
              </div>
            </div>

            {/* Question */}
            <div className="card" style={{ animation:'fadeSlideUp 0.3s ease both' }}>
              <div style={{
                display:'inline-block', background:'var(--green-light)',
                borderRadius:8, padding:'4px 10px', marginBottom:10,
                fontSize:12, fontWeight:800, color:'var(--green-dark)'
              }}>
                📚 {subjectKey}
              </div>
              <p style={{ fontSize:15, fontWeight:700, color:'var(--text)', lineHeight:1.55 }}>
                {q.q}
              </p>
            </div>

            {/* Options */}
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {q.options.map((opt, i) => {
                let cls = 'quiz-option'
                if (selected !== null) {
                  if (i === q.correct) cls += ' correct'
                  else if (i === selected && selected !== q.correct) cls += ' wrong'
                  cls += ' disabled'
                }
                return (
                  <button key={i} className={cls} onClick={() => pickAnswer(i)}>
                    <span style={{
                      width:26, height:26, borderRadius:'50%',
                      background: selected===null ? 'var(--border)'
                        : i===q.correct ? '#4CAF50'
                        : i===selected ? 'var(--red)'
                        : 'var(--border)',
                      color: selected!==null && (i===q.correct || i===selected) ? 'white' : 'var(--text-light)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:12, fontWeight:800, flexShrink:0,
                      transition:'all 0.3s'
                    }}>
                      {selected !== null && i === q.correct ? '✓' : selected !== null && i === selected && i !== q.correct ? '✗' : String.fromCharCode(65+i)}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExp && (
              <div style={{
                background: answers[answers.length-1] ? '#f0fff4' : 'var(--red-light)',
                border: `1.5px solid ${answers[answers.length-1] ? '#4CAF50' : 'var(--red)'}`,
                borderRadius:12, padding:'12px 14px',
                animation:'fadeSlideUp 0.3s ease both'
              }}>
                <div style={{ fontSize:14, fontWeight:800, marginBottom:4,
                  color: answers[answers.length-1] ? '#2d7a35' : '#c0392b' }}>
                  {answers[answers.length-1] ? '🎉 Corect!' : '❌ Greșit!'}
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', lineHeight:1.5 }}>
                  {q.explanation}
                </div>
              </div>
            )}

            {/* Next btn */}
            {selected !== null && (
              <button className="btn-primary" onClick={next} style={{ animation:'fadeSlideUp 0.3s ease both' }}>
                {current+1 >= questions.length ? '🏁 Vezi rezultatele' : 'Următoarea întrebare →'}
              </button>
            )}
          </>
        ) : (
          /* Results */
          <div style={{ display:'flex', flexDirection:'column', gap:14, animation:'fadeSlideUp 0.4s ease both' }}>
            <div style={{
              background:'linear-gradient(135deg,var(--green-light),var(--blue-light))',
              borderRadius:20, padding:'24px 20px', textAlign:'center'
            }}>
              <div style={{ fontSize:56, marginBottom:8 }}>
                {finalPct >= 80 ? '🏆' : finalPct >= 50 ? '👍' : '📚'}
              </div>
              <div style={{ fontSize:22, fontWeight:900, color:'var(--text)', marginBottom:4 }}>
                {score}/{questions.length} corecte
              </div>
              <div style={{
                fontSize:40, fontWeight:900,
                color: finalPct>=80 ? 'var(--green-dark)' : finalPct>=50 ? 'var(--orange)' : 'var(--red)'
              }}>
                {finalPct}%
              </div>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text-light)', marginTop:6 }}>
                {finalPct>=80 ? 'Excelent! Ai stăpânit materia! 🎉' : finalPct>=50 ? 'Bine! Mai exersează puțin! 💪' : 'Continuă să înveți! 📖'}
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize:15, fontWeight:800, marginBottom:10 }}>Răspunsurile tale:</div>
              {answers.map((correct, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'flex-start', gap:8, padding:'6px 0',
                  borderBottom: i < answers.length-1 ? '1px solid var(--border)' : 'none'
                }}>
                  <span style={{ fontSize:16 }}>{correct ? '✅' : '❌'}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:'var(--text)', lineHeight:1.4 }}>
                    {questions[i].q.substring(0,55)}…
                  </span>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={restart}>🔄 Încearcă din nou</button>
            <button className="btn-outline" onClick={() => onNavigate('chat')}>💬 Înapoi la Chat</button>
          </div>
        )}
      </div>

      <BottomNav active="quiz" onNavigate={onNavigate} />
    </div>
  )
}
