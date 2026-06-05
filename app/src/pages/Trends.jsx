import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useHealthStore } from '../store/healthStore';

const timeRanges = [
  { label: '7D', days: 7 },
  { label: '14D', days: 14 },
  { label: '30D', days: 30 },
];

const categories = [
  { id: 'sleep', label: 'Sleep', color: '#8b5cf6', unit: 'hrs', dataKey: 'hours' },
  { id: 'activity', label: 'Steps', color: '#75856a', unit: 'steps', dataKey: 'steps' },
  { id: 'hydration', label: 'Hydration', color: '#0ea5e9', unit: 'glasses', dataKey: 'glasses' },
  { id: 'nutrition', label: 'Calories', color: '#f48b54', unit: 'kcal', dataKey: 'calories' },
  { id: 'mood', label: 'Mood', color: '#f16d30', unit: '', dataKey: 'score' },
  { id: 'body', label: 'Weight', color: '#a78bfa', unit: 'kg', dataKey: 'weight' },
];

export default function Trends() {
  const [range, setRange] = useState(7);
  const [activeCategory, setActiveCategory] = useState('sleep');
  const { entries, darkMode } = useHealthStore();

  const getChartData = () => {
    const data = [];
    for (let i = range - 1; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const dayEntries = entries.filter((e) => e.date === date && e.category === activeCategory);
      const entry = dayEntries[dayEntries.length - 1];

      const cat = categories.find((c) => c.id === activeCategory);
      data.push({
        date: format(subDays(new Date(), i), 'MMM d'),
        value: entry ? entry.data[cat.dataKey] : null,
      });
    }
    return data;
  };

  const chartData = getChartData();
  const activeCat = categories.find((c) => c.id === activeCategory);

  const avgValue = chartData.filter((d) => d.value != null).reduce((sum, d) => sum + d.value, 0) /
    Math.max(chartData.filter((d) => d.value != null).length, 1);

  const maxValue = Math.max(...chartData.filter((d) => d.value != null).map((d) => d.value), 0);
  const minValue = Math.min(...chartData.filter((d) => d.value != null).map((d) => d.value), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Trends</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Track your progress over time
        </p>
      </div>

      <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? 'bg-navy-900' : 'bg-gray-100'}`}>
        {timeRanges.map(({ label, days }) => (
          <button
            key={days}
            onClick={() => setRange(days)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              range === days
                ? darkMode ? 'bg-navy-800 text-white shadow' : 'bg-white text-gray-900 shadow'
                : darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'text-white shadow-md'
                : darkMode ? 'bg-navy-900 text-gray-400' : 'bg-white text-gray-500 border border-gray-200'
            }`}
            style={activeCategory === cat.id ? { backgroundColor: cat.color } : {}}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div
        key={`${activeCategory}-${range}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-navy-900 border-navy-800' : 'bg-white border-gray-100'
        } shadow-sm`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold font-display">{activeCat.label}</h3>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Last {range} days</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold" style={{ color: activeCat.color }}>
              {activeCategory === 'body' ? avgValue.toFixed(1) : Math.round(avgValue)}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>avg {activeCat.unit}</p>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${activeCategory}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeCat.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={activeCat.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1e293b' : '#f0f0f0'} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: darkMode ? '#6b7280' : '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: darkMode ? '#6b7280' : '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1e293b' : '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  color: darkMode ? '#fff' : '#111',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={activeCat.color}
                strokeWidth={2.5}
                fill={`url(#gradient-${activeCategory})`}
                dot={{ fill: activeCat.color, r: 3 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className={`grid grid-cols-3 gap-3`}>
        <StatBox label="Average" value={activeCategory === 'body' ? avgValue.toFixed(1) : Math.round(avgValue)} unit={activeCat.unit} darkMode={darkMode} />
        <StatBox label="Highest" value={activeCategory === 'body' ? maxValue.toFixed(1) : Math.round(maxValue)} unit={activeCat.unit} darkMode={darkMode} />
        <StatBox label="Lowest" value={activeCategory === 'body' ? minValue.toFixed(1) : Math.round(minValue)} unit={activeCat.unit} darkMode={darkMode} />
      </div>
    </div>
  );
}

function StatBox({ label, value, unit, darkMode }) {
  return (
    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'}`}>
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
      <p className="text-lg font-bold font-display mt-0.5">{value}</p>
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{unit}</p>
    </div>
  );
}
