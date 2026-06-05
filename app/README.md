# VitalFlow v2 — Next-Gen Health Intelligence

A world-class health tracking app that combines the biometric depth of Whoop, the design polish of Apple Health, and AI-powered insights neither can match.

## What Makes This Different

- **Recovery Score** — Know exactly how ready your body is, powered by HRV, resting HR, sleep quality, and strain balance
- **Strain Tracking** — Real-time daily strain gauge (0–21 scale) with workout breakdowns
- **Sleep Stages** — Deep/REM/Light/Awake visualization with sleep debt tracking and consistency scoring
- **Body Battery** — See your energy reserves deplete and recharge throughout the day
- **AI Coach** — Correlation engine discovers patterns you'd never notice ("When you sleep 7.5+ hrs, recovery is 18% higher")
- **Nutrition + Fasting** — Macro rings, meal cards, hydration tracking, and intermittent fasting timer
- **Gamification** — Levels, XP, badges, streaks — your health journey made addictive in a good way
- **Dead-Simple Navigation** — 6 tabs, zero friction, animated transitions, one-handed operation

## Tech Stack

- **React 19** + Vite 8
- **Tailwind CSS 4** (custom design tokens — sage, peach, sky, lavender, emerald, navy)
- **Zustand** with localStorage persistence
- **Recharts** (data viz)
- **Framer Motion** (spring animations, layout transitions)
- **Lucide React** (icons)
- **date-fns** (date utilities)

## Design Language

- Glassmorphism cards with backdrop-blur
- Glowing recovery/strain indicators
- Dark-first palette (deep navy with jewel-tone accents)
- Plus Jakarta Sans (display) + Inter (body)
- Micro-animations on every interaction
- Mobile-first, gesture-friendly

## Running

```bash
cd app
npm install
npm run dev
```

## Deploy

Push to `main` — GitHub Actions auto-deploys to GitHub Pages.

Live at: `https://josephrosko-hub.github.io/vitalflow/`
