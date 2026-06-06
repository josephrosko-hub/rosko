import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { startOfDay, subDays, format, differenceInDays } from 'date-fns';

function generateAdvancedData() {
  const entries = [];
  const today = startOfDay(new Date());

  for (let i = 59; i >= 0; i--) {
    const date = format(subDays(today, i), 'yyyy-MM-dd');
    const dayOfWeek = subDays(today, i).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const baseHRV = 45 + Math.random() * 30;
    const baseSleep = isWeekend ? 7.5 + Math.random() * 1.5 : 6 + Math.random() * 2;
    const baseStrain = isWeekend ? 8 + Math.random() * 8 : 10 + Math.random() * 10;
    const recoveryBase = Math.min(99, Math.max(20, baseHRV * 1.1 + baseSleep * 3 - baseStrain * 0.5 + (Math.random() - 0.5) * 15));

    entries.push({
      id: `biometrics-${date}`,
      category: 'biometrics',
      date,
      data: {
        hrv: Math.round(baseHRV),
        restingHR: Math.round(55 + Math.random() * 15),
        respiratoryRate: +(14 + Math.random() * 4).toFixed(1),
        spo2: +(96 + Math.random() * 3).toFixed(1),
        skinTemp: +(36.2 + (Math.random() - 0.5) * 0.8).toFixed(1),
        bodyBattery: Math.round(30 + Math.random() * 60),
      },
    });

    entries.push({
      id: `recovery-${date}`,
      category: 'recovery',
      date,
      data: {
        score: Math.round(recoveryBase),
        hrv: Math.round(baseHRV),
        restingHR: Math.round(55 + Math.random() * 15),
        sleepPerformance: Math.round(baseSleep / 8 * 100),
        status: recoveryBase >= 67 ? 'green' : recoveryBase >= 34 ? 'yellow' : 'red',
      },
    });

    const sleepStages = generateSleepStages(baseSleep);
    entries.push({
      id: `sleep-${date}`,
      category: 'sleep',
      date,
      data: {
        totalHours: +baseSleep.toFixed(1),
        efficiency: Math.round(85 + Math.random() * 12),
        latency: Math.round(5 + Math.random() * 20),
        quality: Math.round(baseSleep / 8 * 100),
        stages: sleepStages,
        deepSleep: sleepStages.filter(s => s.stage === 'deep').reduce((sum, s) => sum + s.duration, 0),
        remSleep: sleepStages.filter(s => s.stage === 'rem').reduce((sum, s) => sum + s.duration, 0),
        lightSleep: sleepStages.filter(s => s.stage === 'light').reduce((sum, s) => sum + s.duration, 0),
        awake: sleepStages.filter(s => s.stage === 'awake').reduce((sum, s) => sum + s.duration, 0),
        bedtime: `${22 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        wakeTime: `${6 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        sleepDebt: +(Math.max(0, (8 - baseSleep) * 0.7 + Math.random() * 2)).toFixed(1),
        consistency: Math.round(70 + Math.random() * 25),
      },
    });

    entries.push({
      id: `strain-${date}`,
      category: 'strain',
      date,
      data: {
        score: +baseStrain.toFixed(1),
        maxHR: Math.round(120 + Math.random() * 60),
        avgHR: Math.round(70 + Math.random() * 30),
        calories: Math.round(1800 + Math.random() * 800),
        activeCalories: Math.round(300 + Math.random() * 500),
        steps: Math.floor(4000 + Math.random() * 12000),
        distance: +(2 + Math.random() * 8).toFixed(1),
        activeMinutes: Math.round(20 + Math.random() * 80),
        workouts: generateWorkouts(date, baseStrain),
      },
    });

    entries.push({
      id: `nutrition-${date}`,
      category: 'nutrition',
      date,
      data: {
        calories: Math.round(1800 + Math.random() * 800),
        target: 2200,
        protein: Math.round(80 + Math.random() * 80),
        proteinTarget: 140,
        carbs: Math.round(180 + Math.random() * 150),
        carbsTarget: 280,
        fat: Math.round(50 + Math.random() * 50),
        fatTarget: 70,
        water: Math.round(4 + Math.random() * 6),
        waterTarget: 8,
        meals: generateMeals(),
        fastingHours: +(12 + Math.random() * 6).toFixed(1),
      },
    });

    entries.push({
      id: `mood-${date}`,
      category: 'mood',
      date,
      data: {
        score: Math.ceil(Math.random() * 5),
        energy: Math.ceil(Math.random() * 5),
        stress: Math.ceil(Math.random() * 5),
        note: '',
      },
    });
  }

  return entries;
}

function generateSleepStages(totalHours) {
  const stages = [];
  let remaining = totalHours * 60;
  const stageTypes = ['light', 'deep', 'rem', 'light', 'awake'];
  let time = 0;

  while (remaining > 0) {
    const stage = stageTypes[Math.floor(Math.random() * stageTypes.length)];
    const duration = Math.min(remaining, 15 + Math.random() * 45);
    stages.push({ stage, duration: Math.round(duration), startMin: Math.round(time) });
    time += duration;
    remaining -= duration;
  }
  return stages;
}

function generateWorkouts(date, strain) {
  if (strain < 10) return [];
  const types = ['Run', 'Strength', 'HIIT', 'Cycling', 'Yoga', 'Swimming', 'Walk', 'CrossFit'];
  const count = strain > 15 ? 2 : 1;
  return Array.from({ length: count }, () => ({
    type: types[Math.floor(Math.random() * types.length)],
    duration: Math.round(20 + Math.random() * 50),
    calories: Math.round(150 + Math.random() * 400),
    avgHR: Math.round(110 + Math.random() * 50),
    maxHR: Math.round(150 + Math.random() * 40),
    strain: +(5 + Math.random() * 10).toFixed(1),
  }));
}

function generateMeals() {
  return [
    { name: 'Breakfast', time: '07:30', calories: Math.round(300 + Math.random() * 200), logged: true },
    { name: 'Lunch', time: '12:30', calories: Math.round(500 + Math.random() * 300), logged: true },
    { name: 'Snack', time: '15:30', calories: Math.round(100 + Math.random() * 150), logged: Math.random() > 0.3 },
    { name: 'Dinner', time: '19:00', calories: Math.round(500 + Math.random() * 400), logged: Math.random() > 0.2 },
  ];
}

function generateGoals() {
  return [
    { id: 'goal-1', category: 'strain', title: '10,000 Steps', target: 10000, unit: 'steps', icon: 'footprints', streak: Math.floor(Math.random() * 20), active: true },
    { id: 'goal-2', category: 'nutrition', title: '8 Glasses Water', target: 8, unit: 'glasses', icon: 'droplets', streak: Math.floor(5 + Math.random() * 15), active: true },
    { id: 'goal-3', category: 'sleep', title: 'Sleep 7+ Hours', target: 7, unit: 'hours', icon: 'moon', streak: Math.floor(Math.random() * 10), active: true },
    { id: 'goal-4', category: 'strain', title: '30 Min Activity', target: 30, unit: 'min', icon: 'zap', streak: Math.floor(Math.random() * 25), active: true },
    { id: 'goal-5', category: 'nutrition', title: 'Hit Protein Goal', target: 140, unit: 'g', icon: 'beef', streak: Math.floor(Math.random() * 12), active: true },
    { id: 'goal-6', category: 'mood', title: 'Daily Check-in', target: 1, unit: '', icon: 'smile', streak: Math.floor(10 + Math.random() * 30), active: true },
  ];
}

function generateBadges() {
  return [
    { id: 'badge-1', name: 'Early Bird', description: '7-day sleep consistency streak', icon: '🌅', earned: true, date: '2026-05-20' },
    { id: 'badge-2', name: 'Iron Will', description: 'Hit protein goal 14 days straight', icon: '💪', earned: true, date: '2026-05-25' },
    { id: 'badge-3', name: 'Hydration Hero', description: '30-day water streak', icon: '💧', earned: false, progress: 75 },
    { id: 'badge-4', name: 'Marathon Month', description: 'Log 100km in a month', icon: '🏃', earned: false, progress: 62 },
    { id: 'badge-5', name: 'Zen Master', description: '10 breathing sessions', icon: '🧘', earned: true, date: '2026-06-01' },
    { id: 'badge-6', name: 'Data Driven', description: 'Track all categories for 30 days', icon: '📊', earned: false, progress: 88 },
  ];
}

export const useHealthStore = create(
  persist(
    (set, get) => ({
      entries: generateAdvancedData(),
      goals: generateGoals(),
      badges: generateBadges(),
      profile: {
        name: 'Alex',
        avatar: null,
        age: 28,
        height: 175,
        weight: 72,
        sex: 'male',
        level: 12,
        xp: 2840,
        xpToNext: 3500,
        memberSince: '2026-01-15',
      },
      darkMode: true,
      activeTab: 'home',

      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, { ...entry, id: `${entry.category}-${entry.date}-${Date.now()}` }],
        })),

      getEntriesByDate: (date) => get().entries.filter((e) => e.date === date),

      getEntriesByCategory: (category, days = 7) => {
        const today = startOfDay(new Date());
        const start = format(subDays(today, days - 1), 'yyyy-MM-dd');
        return get().entries.filter((e) => e.category === category && e.date >= start);
      },

      getToday: (category) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const entries = get().entries.filter((e) => e.date === today && e.category === category);
        return entries[entries.length - 1] || null;
      },

      getRecoveryScore: () => {
        const entry = get().getToday('recovery');
        return entry ? entry.data.score : 72;
      },

      getStrainScore: () => {
        const entry = get().getToday('strain');
        return entry ? entry.data.score : 0;
      },

      getSleepScore: () => {
        const entry = get().getToday('sleep');
        return entry ? entry.data.quality : 0;
      },

      getInsights: () => {
        const entries = get().entries;
        const last7 = entries.filter((e) => e.date >= format(subDays(new Date(), 7), 'yyyy-MM-dd'));

        const avgHRV = last7.filter(e => e.category === 'biometrics').reduce((s, e) => s + e.data.hrv, 0) / Math.max(last7.filter(e => e.category === 'biometrics').length, 1);
        const avgStrain = last7.filter(e => e.category === 'strain').reduce((s, e) => s + e.data.score, 0) / Math.max(last7.filter(e => e.category === 'strain').length, 1);

        return [
          {
            type: 'correlation',
            title: 'Sleep → Recovery Link',
            text: `When you sleep 7.5+ hours, your recovery averages 18% higher. Last night: ${get().getToday('sleep')?.data.totalHours || '—'}hrs.`,
            priority: 'high',
          },
          {
            type: 'trend',
            title: 'HRV Trending Up',
            text: `Your 7-day HRV average is ${Math.round(avgHRV)}ms — up from last week. Keep your strain balanced.`,
            priority: 'medium',
          },
          {
            type: 'recommendation',
            title: avgStrain > 15 ? 'Consider Recovery Day' : 'Good Strain Balance',
            text: avgStrain > 15
              ? `Your avg strain is ${avgStrain.toFixed(1)} — above optimal. A light day would boost tomorrow's recovery.`
              : `Your strain load is balanced at ${avgStrain.toFixed(1)}. Great pacing this week.`,
            priority: avgStrain > 15 ? 'high' : 'low',
          },
          {
            type: 'achievement',
            title: 'Consistency Wins',
            text: `You've logged data for ${Math.min(differenceInDays(new Date(), new Date('2026-01-15')), 60)} consecutive days. Top 5% of VitalFlow users.`,
            priority: 'low',
          },
        ];
      },

      addXP: (amount) => set((state) => {
        let newXP = state.profile.xp + amount;
        let newLevel = state.profile.level;
        let newXPToNext = state.profile.xpToNext;
        while (newXP >= newXPToNext) {
          newXP -= newXPToNext;
          newLevel++;
          newXPToNext = Math.round(newXPToNext * 1.2);
        }
        return { profile: { ...state.profile, xp: newXP, level: newLevel, xpToNext: newXPToNext } };
      }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setActiveTab: (tab) => set({ activeTab: tab }),
      updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
    }),
    { name: 'vitalflow-v2-storage' }
  )
);
