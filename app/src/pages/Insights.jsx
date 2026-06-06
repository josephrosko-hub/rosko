import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Brain, TrendingUp, AlertTriangle, Trophy, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { XAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useHealthStore } from '../store/healthStore';

const priorityColors = {
  high: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: 'text-red-400' },
  medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400' },
  low: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400' },
};

const typeIcons = {
  correlation: Brain,
  trend: TrendingUp,
  recommendation: AlertTriangle,
  achievement: Trophy,
};

export default function Insights() {
  const { darkMode, getInsights, getEntriesByCategory, badges } = useHealthStore();
  const insights = getInsights();
  const hrvData = getEntriesByCategory('biometrics', 14);
  const recoveryData = getEntriesByCategory('recovery', 14);

  const hrvChartData = hrvData.map((e) => ({
    day: format(new Date(e.date), 'MMM d'),
    hrv: e.data.hrv,
  }));

  const recoveryChartData = recoveryData.map((e) => ({
    day: format(new Date(e.date), 'MMM d'),
    score: e.data.score,
  }));

  const avgHRV = hrvData.reduce((s, e) => s + e.data.hrv, 0) / Math.max(hrvData.length, 1);
  const prevAvgHRV = hrvData.slice(0, 7).reduce((s, e) => s + e.data.hrv, 0) / Math.max(hrvData.slice(0, 7).length, 1);
  const hrvTrend = avgHRV - prevAvgHRV;

  return (
    <div className="px-5 pt-14 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Insights</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI-powered health intelligence</p>
      </div>

      {/* HRV Trend Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold">HRV Trend (14 days)</h3>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            hrvTrend >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {hrvTrend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(hrvTrend).toFixed(0)}ms
          </div>
        </div>
        <p className={`text-xs mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Average: {Math.round(avgHRV)}ms
        </p>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hrvChartData}>
              <defs>
                <linearGradient id="hrvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: darkMode ? '#4b5563' : '#9ca3af' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
              <Area type="monotone" dataKey="hrv" stroke="#8b5cf6" strokeWidth={2} fill="url(#hrvGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recovery Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <h3 className="text-sm font-semibold mb-3">Recovery Trend</h3>
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={recoveryChartData}>
              <defs>
                <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: darkMode ? '#4b5563' : '#9ca3af' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
              <Area type="monotone" dataKey="score" stroke="#34d399" strokeWidth={2} fill="url(#recGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Insights */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-lavender-400" />
          <h2 className="text-lg font-bold font-display">AI Coach</h2>
        </div>
        <div className="space-y-3">
          {insights.map((insight, i) => {
            const Icon = typeIcons[insight.type] || Brain;
            const colors = priorityColors[insight.priority] || priorityColors.low;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`p-4 rounded-2xl border ${darkMode ? 'glass' : 'glass-light'} ${colors.border}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={16} className={colors.icon} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">{insight.title}</p>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{insight.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-lg font-bold font-display mb-3">Achievements</h2>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`p-3 rounded-2xl text-center ${
                badge.earned
                  ? darkMode ? 'glass' : 'glass-light'
                  : darkMode ? 'bg-navy-900/30 opacity-50' : 'bg-gray-100 opacity-50'
              }`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <p className="text-[10px] font-medium mt-1 leading-tight">{badge.name}</p>
              {!badge.earned && badge.progress && (
                <div className={`h-1 rounded-full mt-1.5 overflow-hidden ${darkMode ? 'bg-navy-800' : 'bg-gray-200'}`}>
                  <div className="h-full rounded-full bg-lavender-400" style={{ width: `${badge.progress}%` }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
