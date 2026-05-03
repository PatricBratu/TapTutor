import React from 'react'

export default function StatusBar() {
  const now = new Date()
  const time = now.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="status-bar">
      <span>{time}</span>
      <div className="status-icons">
        {/* Signal */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill="#1e2a38"/>
          <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#1e2a38"/>
          <rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="#1e2a38"/>
          <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#1e2a38"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 3C10 3 11.8 3.8 13.1 5.1L14.2 3.8C12.6 2.1 10.4 1 8 1C5.6 1 3.4 2.1 1.8 3.8L2.9 5.1C4.2 3.8 6 3 8 3Z" fill="#1e2a38"/>
          <path d="M8 6C9.2 6 10.3 6.5 11.1 7.3L12.2 6C11.1 4.8 9.6 4 8 4C6.4 4 4.9 4.8 3.8 6L4.9 7.3C5.7 6.5 6.8 6 8 6Z" fill="#1e2a38"/>
          <circle cx="8" cy="10" r="2" fill="#1e2a38"/>
        </svg>
        {/* Battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#1e2a38"/>
          <rect x="1.5" y="1.5" width="18" height="9" rx="2" fill="#1e2a38"/>
          <path d="M24 4V8C24.9 7.7 25.5 7 25.5 6C25.5 5 24.9 4.3 24 4Z" fill="#1e2a38"/>
        </svg>
      </div>
    </div>
  )
}
