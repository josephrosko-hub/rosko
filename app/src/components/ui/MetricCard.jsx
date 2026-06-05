import { motion } from 'framer-motion';

export default function MetricCard({ icon: Icon, title, value, unit, color, progress, darkMode }) {
  const colorClasses = {
    sage: 'from-sage-100 to-sage-50 border-sage-200',
    sky: 'from-sky-100 to-sky-50 border-sky-200',
    peach: 'from-peach-100 to-peach-50 border-peach-200',
    lavender: 'from-lavender-100 to-lavender-50 border-lavender-200',
  };

  const darkColorClasses = {
    sage: 'from-sage-900/40 to-sage-900/20 border-sage-800/50',
    sky: 'from-sky-900/40 to-sky-900/20 border-sky-800/50',
    peach: 'from-peach-900/40 to-peach-900/20 border-peach-800/50',
    lavender: 'from-lavender-900/40 to-lavender-900/20 border-lavender-800/50',
  };

  const iconColors = {
    sage: 'text-sage-600',
    sky: 'text-sky-600',
    peach: 'text-peach-500',
    lavender: 'text-lavender-500',
  };

  const progressColors = {
    sage: 'bg-sage-500',
    sky: 'bg-sky-500',
    peach: 'bg-peach-400',
    lavender: 'bg-lavender-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-4 border bg-gradient-to-br ${
        darkMode ? darkColorClasses[color] : colorClasses[color]
      } shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className={iconColors[color]} />
        <span className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {title}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-display">{value}</span>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{unit}</span>
      </div>
      {progress !== undefined && (
        <div className="mt-3">
          <div className={`h-1.5 rounded-full ${darkMode ? 'bg-navy-800' : 'bg-white/60'} overflow-hidden`}>
            <motion.div
              className={`h-full rounded-full ${progressColors[color]}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
