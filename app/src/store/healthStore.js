import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { startOfDay, subDays, format } from 'date-fns';

function generateSampleData() {
  const entries = [];
  const today = startOfDay(new Date());

  for (let i = 29; i >= 0; i--) {
    const date = format(subDays(today, i), 'yyyy-MM-dd');

    entries.push({
      id: `sleep-${date}`,
      category: 'sleep',
      date,
      data: {
        hours: 6 + Math.random() * 2.5,
        quality: Math.ceil(Math.random() * 5),
        bedtime: '22:30',
        wakeTime: '06:45',
      },
    });

    entries.push({
      id: `activity-${date}`,
      category: 'activity',
      date,
      data: {
        steps: Math.floor(5000 + Math.random() * 8000),
        activeMinutes: Math.floor(20 + Math.random() * 60),
        calories: Math.floor(200 + Math.random() * 400),
        workoutType: ['Running', 'Walking', 'Cycling', 'Yoga', 'Strength'][Math.floor(Math.random() * 5)],
      },
    });

    entries.push({
      id: `hydration-${date}`,
      category: 'hydration',
      date,
      data: {
        glasses: Math.floor(4 + Math.random() * 6),
        goal: 8,
      },
    });

    entries.push({
      id: `nutrition-${date}`,
      category: 'nutrition',
      date,
      data: {
        calories: Math.floor(1600 + Math.random() * 800),
        protein: Math.floor(50 + Math.random() * 80),
        carbs: Math.floor(150 + Math.random() * 150),
        fat: Math.floor(40 + Math.random() * 50),
      },
    });

    entries.push({
      id: `mood-${date}`,
      category: 'mood',
      date,
      data: {
        score: Math.ceil(Math.random() * 5),
        note: '',
      },
    });

    entries.push({
      id: `body-${date}`,
      category: 'body',
      date,
      data: {
        weight: 72 + (Math.random() - 0.5) * 3,
        heartRate: Math.floor(60 + Math.random() * 20),
      },
    });
  }

  return entries;
}

function generateSampleGoals() {
  return [
    { id: 'goal-1', category: 'activity', title: '10,000 Steps', target: 10000, unit: 'steps', frequency: 'daily', streak: 5, active: true },
    { id: 'goal-2', category: 'hydration', title: '8 Glasses of Water', target: 8, unit: 'glasses', frequency: 'daily', streak: 12, active: true },
    { id: 'goal-3', category: 'sleep', title: 'Sleep 7+ Hours', target: 7, unit: 'hours', frequency: 'daily', streak: 3, active: true },
    { id: 'goal-4', category: 'nutrition', title: 'Under 2200 Calories', target: 2200, unit: 'kcal', frequency: 'daily', streak: 8, active: true },
    { id: 'goal-5', category: 'mood', title: 'Daily Mood Check-in', target: 1, unit: 'entries', frequency: 'daily', streak: 15, active: true },
  ];
}

export const useHealthStore = create(
  persist(
    (set, get) => ({
      entries: generateSampleData(),
      goals: generateSampleGoals(),
      profile: {
        name: 'Alex',
        age: 28,
        height: 175,
        weight: 72,
      },
      darkMode: false,

      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, { ...entry, id: `${entry.category}-${entry.date}-${Date.now()}` }],
        })),

      getEntriesByDate: (date) => {
        return get().entries.filter((e) => e.date === date);
      },

      getEntriesByCategory: (category, days = 7) => {
        const today = startOfDay(new Date());
        const start = format(subDays(today, days - 1), 'yyyy-MM-dd');
        return get().entries.filter((e) => e.category === category && e.date >= start);
      },

      getTodayEntries: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        return get().entries.filter((e) => e.date === today);
      },

      getWellnessScore: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayEntries = get().entries.filter((e) => e.date === today);
        let score = 0;
        let factors = 0;

        const sleep = todayEntries.find((e) => e.category === 'sleep');
        if (sleep) {
          score += Math.min((sleep.data.hours / 8) * 25, 25);
          factors++;
        }

        const activity = todayEntries.find((e) => e.category === 'activity');
        if (activity) {
          score += Math.min((activity.data.steps / 10000) * 25, 25);
          factors++;
        }

        const hydration = todayEntries.find((e) => e.category === 'hydration');
        if (hydration) {
          score += Math.min((hydration.data.glasses / 8) * 25, 25);
          factors++;
        }

        const mood = todayEntries.find((e) => e.category === 'mood');
        if (mood) {
          score += (mood.data.score / 5) * 25;
          factors++;
        }

        if (factors === 0) return 72;
        return Math.round(score);
      },

      updateGoalStreak: (goalId, increment) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId ? { ...g, streak: g.streak + (increment ? 1 : -g.streak) } : g
          ),
        })),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
    }),
    {
      name: 'vitalflow-storage',
    }
  )
);
