import React, { useState } from 'react'

export default function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password || (!isLogin && !name)) {
      alert('Te rugăm să completezi toate câmpurile.')
      return
    }
    
    // Salvăm datele utilizatorului mockate
    const user = { name: isLogin ? (email.split('@')[0] || 'Utilizator') : name, email }
    onLogin(user)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, padding: '30px 20px', background: 'linear-gradient(135deg, #e8faf9 0%, #f0fdfb 100%)', justifyContent:'center' }}>
      <div className="card" style={{ padding: '30px 20px', borderRadius: '24px', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
        <div className="logo" style={{ justifyContent: 'center', marginBottom: 10, fontSize: 32 }}>
          <span className="logo-icon">🎓</span> TapTutor
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 24 }}>
          {isLogin ? 'Bine ai revenit!' : 'Creează un cont nou'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap: 16 }}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Numele tău" 
              className="input-field" 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}
          <input 
            type="email" 
            placeholder="Adresa de email" 
            className="input-field" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Parola" 
            className="input-field" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit" className="btn-primary" style={{ padding: '14px', fontSize: 16, marginTop: 10 }}>
            {isLogin ? 'Intră în cont' : 'Creează contul'}
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: 14, color: 'var(--text-light)', fontWeight: 600 }}>
          {isLogin ? 'Nu ai cont?' : 'Ai deja un cont?'}{' '}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--green-dark)', cursor: 'pointer', fontWeight: 800 }}
          >
            {isLogin ? 'Creează unul acum' : 'Intră în cont'}
          </span>
        </p>
      </div>
    </div>
  )
}
