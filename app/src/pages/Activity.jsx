import { motion } from 'framer-motion';
import { format, subDays } from 'date-fns';
import { Zap, Flame, Footprints, Clock, TrendingUp, Dumbbell } from 'lucide-react';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';
import { useHealthStore } from '../store/healthStore';

export default function Activity() {
  const { darkMode, getToday, getEntriesByCategory } = useHealthStore();
  const strain = getToday('strain');
  const weekData = getEntriesByCategory('strain', 7);

  const chartData = weekData.map((e) => ({
    day: format(new Date(e.date), 'EEE'),
    strain: e.data.score,
    steps: e.data.steps,
  }));

  const weeklySteps = weekData.reduce((sum, e) => sum + e.data.steps, 0);
  const weeklyCalories = weekData.reduce((sum, e) => sum + e.data.activeCalories, 0);
  const weeklyMinutes = weekData.reduce((sum, e) => sum + e.data.activeMinutes, 0);

  return (
    <div className="px-5 pt-14 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Activity</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today's strain & movement</p>
      </div>

      {/* Strain Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Today's Strain</p>
            <p className="text-4xl font-bold font-display text-sky-400 mt-1">{strain?.data.score.toFixed(1) || '0.0'}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Max HR</p>
            <p className="text-lg font-bold">{strain?.data.maxHR || '—'} <span className="text-xs font-normal">bpm</span></p>
          </div>
        </div>
        <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-navy-800' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-300 via-sky-500 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((strain?.data.score || 0) / 21 * 100, 100)}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>0</span>
          <span className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Light</span>
          <span className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Moderate</span>
          <span className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>High</span>
          <span className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>21</span>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <MetricBox icon={Footprints} label="Steps" value={strain?.data.steps?.toLocaleString() || '0'} sub="/ 10,000" color="text-sage-400" darkMode={darkMode} />
        <MetricBox icon={Flame} label="Active Cal" value={strain?.data.activeCalories?.toString() || '0'} sub="kcal" color="text-peach-400" darkMode={darkMode} />
        <MetricBox icon={Clock} label="Active Min" value={strain?.data.activeMinutes?.toString() || '0'} sub="minutes" color="text-sky-400" darkMode={darkMode} />
        <MetricBox icon={TrendingUp} label="Distance" value={strain?.data.distance?.toFixed(1) || '0'} sub="km" color="text-lavender-400" darkMode={darkMode} />
      </div>

      {/* Workouts */}
      {strain?.data.workouts?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-lg font-bold font-display mb-3">Workouts</h2>
          <div className="space-y-2">
            {strain.data.workouts.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl ${darkMode ? 'glass' : 'glass-light'}`}
              >
                <div className="w-11 h-11 rounded-xl bg-sky-500/20 flex items-center justify-center">
                  <Dumbbell size={18} className="text-sky-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{w.type}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{w.duration}min • {w.calories} cal</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-sky-400">{w.strain.toFixed(1)}</p>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>strain</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Weekly Strain Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <h3 className="text-sm font-semibold mb-1">Weekly Strain</h3>
        <p className={`text-xs mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {weeklySteps.toLocaleString()} steps • {weeklyCalories.toLocaleString()} cal • {weeklyMinutes} min
        </p>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="strainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: darkMode ? '#6b7280' : '#9ca3af' }} axisLine={false} tickLine={false} />
              <Area type="monotone" dataKey="strain" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#strainGrad)" dot={{ fill: '#0ea5e9', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

function MetricBox({ icon: Icon, label, value, sub, color, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-2xl ${darkMode ? 'glass' : 'glass-light'}`}
    >
      <Icon size={16} className={`${color} mb-2`} />
      <p className="text-xl font-bold font-display">{value}</p>
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{sub}</p>
    </motion.div>
  );
}
