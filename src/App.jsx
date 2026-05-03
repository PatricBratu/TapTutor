import React, { useState, useCallback, useEffect } from 'react'
import SplashScreen    from './screens/SplashScreen'
import NFCScreen       from './screens/NFCScreen'
import ChatScreen      from './screens/ChatScreen'
import QuizScreen      from './screens/QuizScreen'
import ProgressScreen  from './screens/ProgressScreen'
import HomeScreen      from './screens/HomeScreen'
import PricingScreen   from './screens/PricingScreen'
import SettingsScreen  from './screens/SettingsScreen'
import AuthScreen      from './screens/AuthScreen'

const DEFAULT_API_KEY = 'AIzaSyCwRbb1PUaO1Vj4uHPRbdgEoOOjfGkK4qA'

export default function App() {
  const [screen, setScreen]   = useState('splash')
  const [subject, setSubject] = useState(null)
  const [key, setKey]         = useState(0)
  const [user, setUser]       = useState(null)

  // Set default API key on first load
  useEffect(() => {
    if (!localStorage.getItem('taptutor_gemini_key')) {
      localStorage.setItem('taptutor_gemini_key', DEFAULT_API_KEY)
    }
    const savedUser = localStorage.getItem('taptutor_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const navigate = useCallback((to) => {
    setScreen(to)
    setKey(k => k + 1)
  }, [])

  const handleSplashDone = useCallback(() => {
    // Verificăm dacă avem user, dacă nu îl trimitem la auth
    const savedUser = localStorage.getItem('taptutor_user')
    if (savedUser) {
      navigate('home')
    } else {
      navigate('auth')
    }
  }, [navigate])

  const handleLogin = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('taptutor_user', JSON.stringify(userData))
    navigate('home')
  }, [navigate])

  const handleLogout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('taptutor_user')
    navigate('auth')
  }, [navigate])

  const handleNFCDetected = useCallback((subjectObj) => {
    setSubject(subjectObj)
    navigate('chat')
  }, [navigate])

  const handleSubjectSelect = useCallback((subjectObj) => {
    setSubject(subjectObj)
    navigate('chat')
  }, [navigate])

  const handleNavigate = useCallback((to) => {
    navigate(to)
  }, [navigate])

  function renderScreen() {
    switch (screen) {
      case 'splash':
        return <SplashScreen onDone={handleSplashDone} />
      case 'nfc':
        return <NFCScreen onDetected={handleNFCDetected} onNavigate={handleNavigate} />
      case 'auth':
        return <AuthScreen onLogin={handleLogin} />
      case 'home':
        return <HomeScreen onSubjectSelect={handleSubjectSelect} onNavigate={handleNavigate} />
      case 'chat':
        return <ChatScreen subject={subject} onNavigate={handleNavigate} />
      case 'quiz':
        return <QuizScreen subject={subject} onNavigate={handleNavigate} />
      case 'progress':
        return <ProgressScreen onNavigate={handleNavigate} />
      case 'pricing':
        return <PricingScreen onNavigate={handleNavigate} />
      case 'settings':
        return <SettingsScreen onNavigate={handleNavigate} onLogout={handleLogout} />
      default:
        return <HomeScreen onSubjectSelect={handleSubjectSelect} onNavigate={handleNavigate} />
    }
  }

  return (
    <div key={key} className="screen-enter" style={{ display:'flex', flexDirection:'column', width:'100%', height:'100%', flex:1, overflow:'hidden', minHeight:0 }}>
      {renderScreen()}
    </div>
  )
}
