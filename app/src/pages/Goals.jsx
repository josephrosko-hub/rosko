import { motion } from 'framer-motion';
import { Target, Flame, Trophy, Moon, Footprints, Droplets, Utensils, Smile } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

const categoryIcons = {
  sleep: Moon,
  activity: Footprints,
  hydration: Droplets,
  nutrition: Utensils,
  mood: Smile,
};

const categoryColors = {
  sleep: { bg: 'bg-lavender-100', text: 'text-lavender-600', progress: 'bg-lavender-500' },
  activity: { bg: 'bg-sage-100', text: 'text-sage-600', progress: 'bg-sage-500' },
  hydration: { bg: 'bg-sky-100', text: 'text-sky-600', progress: 'bg-sky-500' },
  nutrition: { bg: 'bg-peach-100', text: 'text-peach-600', progress: 'bg-peach-500' },
  mood: { bg: 'bg-peach-100', text: 'text-peach-500', progress: 'bg-peach-400' },
};

export default function Goals() {
  const { goals, darkMode, getTodayEntries } = useHealthStore();
  const todayEntries = getTodayEntries();

  const getProgress = (goal) => {
    const entry = todayEntries.find((e) => e.category === goal.category);
    if (!entry) return 0;

    switch (goal.category) {
      case 'activity': return (entry.data.steps / goal.target) * 100;
      case 'hydration': return (entry.data.glasses / goal.target) * 100;
      case 'sleep': return (entry.data.hours / goal.target) * 100;
      case 'nutrition': return entry.data.calories <= goal.target ? 100 : ((goal.target * 2 - entry.data.calories) / goal.target) * 100;
      case 'mood': return entry.data.score > 0 ? 100 : 0;
      default: return 0;
    }
  };

  const totalStreak = goals.reduce((sum, g) => sum + g.streak, 0);
  const goalsCompleted = goals.filter((g) => getProgress(g) >= 100).length;

  const streakDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    return {
      label: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][day.getDay()],
      active: i >= 7 - Math.min(goals[0]?.streak || 0, 7),
      isToday: i === 6,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Goals</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Build lasting habits one day at a time
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-2xl ${darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'} shadow-sm`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Flame size={18} className="text-peach-500" />
            <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Streaks</span>
          </div>
          <p className="text-3xl font-bold font-display">{totalStreak}</p>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>days combined</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-2xl ${darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'} shadow-sm`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Trophy size={18} className="text-sage-500" />
            <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completed Today</span>
          </div>
          <p className="text-3xl font-bold font-display">{goalsCompleted}/{goals.length}</p>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>goals met</p>
        </motion.div>
      </div>

      <div className={`p-4 rounded-2xl ${darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'} shadow-sm`}>
        <p className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>This Week</p>
        <div className="flex justify-between">
          {streakDays.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  day.active
                    ? 'bg-sage-500 text-white'
                    : day.isToday
                    ? darkMode ? 'bg-navy-800 text-white ring-2 ring-sage-400' : 'bg-gray-100 text-gray-700 ring-2 ring-sage-400'
                    : darkMode ? 'bg-navy-800 text-gray-500' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {day.active ? '✓' : day.label}
              </div>
              <span className={`text-xs ${day.isToday ? 'font-bold' : ''} ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold font-display">Active Goals</h2>
        {goals.filter((g) => g.active).map((goal, i) => {
          const Icon = categoryIcons[goal.category] || Target;
          const colors = categoryColors[goal.category] || { bg: 'bg-gray-100', text: 'text-gray-600', progress: 'bg-gray-500' };
          const progress = Math.min(getProgress(goal), 100);
          const isComplete = progress >= 100;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-4 rounded-2xl border ${
                darkMode ? 'bg-navy-900 border-navy-800' : 'bg-white border-gray-100'
              } shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <Icon size={18} className={colors.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{goal.title}</h3>
                    {isComplete && (
                      <span className="text-xs font-medium text-sage-500 bg-sage-100 px-2 py-0.5 rounded-full">Done!</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`flex-1 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-navy-800' : 'bg-gray-100'}`}>
                      <motion.div
                        className={`h-full rounded-full ${colors.progress}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <span className={`text-xs font-medium shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 ml-13">
                <Flame size={14} className="text-peach-500" />
                <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {goal.streak} day streak
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
