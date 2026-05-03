<<<<<<< HEAD
# TapTutor — Aplicație React

## Instalare și pornire

### 1. Instalează Node.js
Descarcă de la: https://nodejs.org (versiunea LTS)

### 2. Instalează dependențele
```bash
cd taptutor-app
npm install
```

### 3. (Opțional) Adaugă cheia API Anthropic
Deschide `src/screens/ChatScreen.jsx` și înlocuiește `'x-api-key': ''` cu cheia ta Claude API.

### 4. Pornește aplicația
```bash
npm run dev
```

Deschide http://localhost:5173 în browser.

---

## Ecrane incluse

| Ecran | Descriere |
|-------|-----------|
| 🌟 Splash | Animație de pornire |
| 📡 NFC Tap | Simulare detectare card NFC |
| 💬 Chat | Chat AI cu tutorele (Claude) + diagrame |
| 📝 Quiz | Teste cu multiple choice + feedback |
| 📊 Progres | Statistici, grafice, materii |
| 🏠 Acasă | Selectare materie, activitate recentă |
| 💎 Premium | Planuri de abonament |

## Structura proiectului
```
taptutor-app/
├── src/
│   ├── screens/
│   │   ├── SplashScreen.jsx
│   │   ├── NFCScreen.jsx
│   │   ├── ChatScreen.jsx
│   │   ├── QuizScreen.jsx
│   │   ├── ProgressScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   └── PricingScreen.jsx
│   ├── components/
│   │   ├── StatusBar.jsx
│   │   └── BottomNav.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```
=======
# TapTutor
>>>>>>> 0da091b86f7c11a6dd204dcb9efa0ce405811c2c
