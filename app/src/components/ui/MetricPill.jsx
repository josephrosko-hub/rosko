import { motion } from 'framer-motion';

const colorMap = {
  sage: 'bg-sage-500/20 text-sage-400',
  sky: 'bg-sky-500/20 text-sky-400',
  peach: 'bg-peach-500/20 text-peach-400',
  lavender: 'bg-lavender-500/20 text-lavender-400',
  emerald: 'bg-emerald-500/20 text-emerald-400',
};

const lightColorMap = {
  sage: 'bg-sage-100 text-sage-700',
  sky: 'bg-sky-100 text-sky-700',
  peach: 'bg-peach-100 text-peach-700',
  lavender: 'bg-lavender-100 text-lavender-700',
  emerald: 'bg-emerald-100 text-emerald-700',
};

export default function MetricPill({ icon: Icon, label, value, color = 'sage', darkMode, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`shrink-0 flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-all ${
        darkMode ? 'glass' : 'glass-light'
      }`}
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${darkMode ? colorMap[color] : lightColorMap[color]}`}>
        <Icon size={14} />
      </div>
      <div className="text-left">
        <p className={`text-[10px] uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </motion.button>
  );
}
