# VitalFlow — Health Tracking App

A beautiful, intuitive health tracking app built with React, Tailwind CSS, and Framer Motion.

## Features

- **Wellness Dashboard** — At-a-glance daily wellness score with radial progress ring
- **Quick Logging** — One-tap logging for sleep, activity, hydration, nutrition, mood, and body metrics
- **Trend Analysis** — Interactive charts showing 7/14/30-day trends with area graphs
- **Goals & Streaks** — Set health goals and track habit streaks with visual calendars
- **Breathing Exercise** — Built-in box breathing (4-4-4-4) guided exercise
- **Dark Mode** — Full dark mode support with navy-toned palette
- **Data Export** — Export all health data as JSON
- **Onboarding** — Beautiful first-time user experience with swipeable intro cards
- **Offline-First** — All data persisted in localStorage

## Tech Stack

- **React 19** + Vite
- **Tailwind CSS 4** (custom theme with sage/peach/sky/lavender palette)
- **Zustand** (state management with persistence)
- **Recharts** (data visualization)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **date-fns** (date utilities)
- **React Router** (client-side routing)

## Getting Started

```bash
cd app
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build

```bash
npm run build
```

Production assets are output to the `dist/` directory.

## Design Principles

- **Calm by default** — Soft gradients, generous whitespace, no visual noise
- **Progressive disclosure** — Essential info first, details on tap
- **Delight in details** — Spring animations, smooth transitions, haptic feedback patterns
- **Accessibility** — Semantic HTML, clear contrast ratios, keyboard navigable
