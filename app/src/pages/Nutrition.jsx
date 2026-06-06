import { motion } from 'framer-motion';
import { Droplets, Timer, Plus, Check } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

export default function Nutrition() {
  const { darkMode, getToday } = useHealthStore();
  const nutrition = getToday('nutrition');

  const macros = [
    { name: 'Protein', current: nutrition?.data.protein || 0, target: nutrition?.data.proteinTarget || 140, color: '#34d399', unit: 'g' },
    { name: 'Carbs', current: nutrition?.data.carbs || 0, target: nutrition?.data.carbsTarget || 280, color: '#38bdf8', unit: 'g' },
    { name: 'Fat', current: nutrition?.data.fat || 0, target: nutrition?.data.fatTarget || 70, color: '#f48b54', unit: 'g' },
  ];

  const caloriesPct = Math.min(((nutrition?.data.calories || 0) / (nutrition?.data.target || 2200)) * 100, 100);
  const waterPct = Math.min(((nutrition?.data.water || 0) / (nutrition?.data.waterTarget || 8)) * 100, 100);

  return (
    <div className="px-5 pt-14 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Fuel</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nutrition & hydration</p>
      </div>

      {/* Calorie Ring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl text-center ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <div className="relative inline-flex items-center justify-center w-36 h-36">
          <svg width={144} height={144} className="-rotate-90">
            <circle cx="72" cy="72" r="60" fill="none" stroke="currentColor" strokeWidth="10" className="text-white/5" />
            <motion.circle
              cx="72" cy="72" r="60" fill="none"
              stroke="#34d399" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={377}
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 377 * (1 - caloriesPct / 100) }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-display">{nutrition?.data.calories || 0}</span>
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>/ {nutrition?.data.target || 2200} kcal</span>
          </div>
        </div>
        <p className={`text-sm mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {(nutrition?.data.target || 2200) - (nutrition?.data.calories || 0) > 0
            ? `${(nutrition?.data.target || 2200) - (nutrition?.data.calories || 0)} kcal remaining`
            : 'Target reached!'}
        </p>
      </motion.div>

      {/* Macro Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <h3 className="text-sm font-semibold mb-4">Macros</h3>
        <div className="space-y-4">
          {macros.map((macro) => {
            const pct = Math.min((macro.current / macro.target) * 100, 100);
            return (
              <div key={macro.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-medium">{macro.name}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {macro.current}{macro.unit} / {macro.target}{macro.unit}
                  </span>
                </div>
                <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-navy-800' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: macro.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Water Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-sky-400" />
            <h3 className="text-sm font-semibold">Hydration</h3>
          </div>
          <span className="text-sm font-bold text-sky-400">{nutrition?.data.water || 0} / {nutrition?.data.waterTarget || 8}</span>
        </div>
        <div className="flex gap-1.5 mb-3">
          {Array.from({ length: nutrition?.data.waterTarget || 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              className={`flex-1 h-10 rounded-lg transition-all ${
                i < (nutrition?.data.water || 0)
                  ? 'bg-sky-400/80'
                  : darkMode ? 'bg-navy-800' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-navy-800' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full rounded-full bg-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${waterPct}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Meals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold font-display">Meals</h2>
          <button className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg active:scale-90 transition-transform">
            <Plus size={16} className="text-white" />
          </button>
        </div>
        <div className="space-y-2">
          {(nutrition?.data.meals || []).map((meal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className={`flex items-center gap-3 p-3.5 rounded-2xl ${darkMode ? 'glass' : 'glass-light'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                meal.logged
                  ? 'bg-emerald-500/20'
                  : darkMode ? 'bg-navy-800' : 'bg-gray-100'
              }`}>
                {meal.logged ? <Check size={16} className="text-emerald-400" /> : <Plus size={16} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{meal.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{meal.time}</p>
              </div>
              {meal.logged && (
                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{meal.calories} cal</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fasting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Timer size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold">Intermittent Fasting</h3>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold font-display">{nutrition?.data.fastingHours || 0}</span>
          <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>hours fasted</span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden mt-3 ${darkMode ? 'bg-navy-800' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(((nutrition?.data.fastingHours || 0) / 16) * 100, 100)}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>16:8 window • Target: 16 hours</p>
      </motion.div>
    </div>
  );
}
