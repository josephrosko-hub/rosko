import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Moon, Sunrise, Clock, AlertCircle } from 'lucide-react';
import { XAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useHealthStore } from '../store/healthStore';

const stageColors = { deep: '#6d28d9', rem: '#0ea5e9', light: '#7dd3fc', awake: '#f87171' };

export default function Sleep() {
  const { darkMode, getToday, getEntriesByCategory } = useHealthStore();
  const sleep = getToday('sleep');
  const weekData = getEntriesByCategory('sleep', 7);

  const chartData = weekData.map((e) => ({
    day: format(new Date(e.date), 'EEE'),
    hours: e.data.totalHours,
    deep: e.data.deepSleep / 60,
    rem: e.data.remSleep / 60,
    light: e.data.lightSleep / 60,
  }));

  const stageData = sleep ? [
    { name: 'Deep', value: Math.round(sleep.data.deepSleep), color: stageColors.deep, pct: Math.round(sleep.data.deepSleep / (sleep.data.totalHours * 60) * 100) },
    { name: 'REM', value: Math.round(sleep.data.remSleep), color: stageColors.rem, pct: Math.round(sleep.data.remSleep / (sleep.data.totalHours * 60) * 100) },
    { name: 'Light', value: Math.round(sleep.data.lightSleep), color: stageColors.light, pct: Math.round(sleep.data.lightSleep / (sleep.data.totalHours * 60) * 100) },
    { name: 'Awake', value: Math.round(sleep.data.awake), color: stageColors.awake, pct: Math.round(sleep.data.awake / (sleep.data.totalHours * 60) * 100) },
  ] : [];

  return (
    <div className="px-5 pt-14 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Sleep</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last night's analysis</p>
      </div>

      {/* Sleep Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl text-center ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex flex-col items-center"
        >
          <span className="text-5xl font-bold font-display">{sleep?.data.quality || 0}</span>
          <span className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sleep Score</span>
        </motion.div>
        <div className="flex justify-center gap-6 mt-5">
          <div className="text-center">
            <Moon size={16} className="mx-auto mb-1 text-lavender-400" />
            <p className="text-sm font-semibold">{sleep?.data.bedtime || '—'}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Bedtime</p>
          </div>
          <div className="text-center">
            <Sunrise size={16} className="mx-auto mb-1 text-amber-400" />
            <p className="text-sm font-semibold">{sleep?.data.wakeTime || '—'}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Wake</p>
          </div>
          <div className="text-center">
            <Clock size={16} className="mx-auto mb-1 text-sky-400" />
            <p className="text-sm font-semibold">{sleep?.data.totalHours || '—'}h</p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total</p>
          </div>
        </div>
      </motion.div>

      {/* Sleep Stages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <h3 className="text-sm font-semibold mb-4">Sleep Stages</h3>
        <div className="flex h-4 rounded-full overflow-hidden mb-4">
          {stageData.map((stage, i) => (
            <motion.div
              key={stage.name}
              initial={{ width: 0 }}
              animate={{ width: `${stage.pct}%` }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
              style={{ backgroundColor: stage.color }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stageData.map((stage) => (
            <div key={stage.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
              <div>
                <p className="text-xs font-medium">{stage.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {stage.value}min ({stage.pct}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Sleep Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <SmallMetric label="Efficiency" value={`${sleep?.data.efficiency || 0}%`} darkMode={darkMode} />
        <SmallMetric label="Latency" value={`${sleep?.data.latency || 0}m`} darkMode={darkMode} />
        <SmallMetric label="Consistency" value={`${sleep?.data.consistency || 0}%`} darkMode={darkMode} />
      </div>

      {/* Sleep Debt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-400" />
            <h3 className="text-sm font-semibold">Sleep Debt</h3>
          </div>
          <span className="text-lg font-bold text-amber-400">{sleep?.data.sleepDebt || 0}h</span>
        </div>
        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {sleep?.data.sleepDebt > 2 ? 'Consider an earlier bedtime to pay down your debt.' : 'Your sleep debt is manageable. Keep consistent!'}
        </p>
      </motion.div>

      {/* Weekly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <h3 className="text-sm font-semibold mb-4">This Week</h3>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="20%">
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: darkMode ? '#6b7280' : '#9ca3af' }} axisLine={false} tickLine={false} />
              <Bar dataKey="deep" stackId="sleep" fill={stageColors.deep} radius={[0, 0, 0, 0]} />
              <Bar dataKey="rem" stackId="sleep" fill={stageColors.rem} radius={[0, 0, 0, 0]} />
              <Bar dataKey="light" stackId="sleep" fill={stageColors.light} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

function SmallMetric({ label, value, darkMode }) {
  return (
    <div className={`p-3 rounded-2xl text-center ${darkMode ? 'bg-navy-900/50 border border-navy-800/50' : 'bg-white border border-gray-100'}`}>
      <p className="text-lg font-bold font-display">{value}</p>
      <p className={`text-[10px] mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
    </div>
  );
}
