# TapTutor — PWA cu NFC + Gemini AI

Profesorul tău personal în buzunar. Tutore AI cu carduri NFC pentru elevi.

## Instalare

```bash
npm install
npm run dev
```

## Deploy pe Vercel

```bash
npx vercel --prod
```

## Ecrane

| Ecran | Descriere |
|-------|-----------|
| 🌟 Splash | Animație de pornire |
| 🏠 Acasă | Selectare materie, activitate recentă |
| 📡 NFC Scan | Citire reală tag NFC + selectare manuală |
| 💬 Chat | Chat AI cu Gemini + diagrame |
| 📝 Teste | Quiz multiple choice + feedback |
| 📊 Progres | Statistici, grafice, materii |
| ⚙️ Setări | Cheie API, instrucțiuni NFC |

## Programare tag-uri NFC

Folosește app-ul **NFC Tools** și scrie textul:
`Fizica`, `Matematica`, `Chimie`, `Biologie`, `Informatica`, `Istorie`
