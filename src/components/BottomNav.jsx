import React from 'react'

export default function BottomNav({ active, onNavigate }) {
  const items = [
    { id: 'home',     icon: '🏠', label: 'Acasă'   },
    { id: 'chat',     icon: '💬', label: 'Chat'     },
    { id: 'quiz',     icon: '📝', label: 'Teste'    },
    { id: 'progress', icon: '📊', label: 'Progres'  },
    { id: 'settings', icon: '⚙️', label: 'Setări'   },
  ]

  return (
    <div className="bottom-nav">
      {items.map(item => (
        <button
          key={item.id}
          className={`nav-item${active === item.id ? ' active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
          {active === item.id && (
            <span style={{
              position: 'absolute',
              bottom: 0,
              width: 24,
              height: 3,
              background: 'var(--green)',
              borderRadius: '3px 3px 0 0',
              marginTop: 2
            }}/>
          )}
        </button>
      ))}
    </div>
  )
}
