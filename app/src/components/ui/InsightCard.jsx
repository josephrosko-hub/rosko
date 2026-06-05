import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function InsightCard({ text, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-3 p-4 rounded-2xl ${
        darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'
      } shadow-sm`}
    >
      <div className="p-2 rounded-xl bg-peach-100 dark:bg-peach-900/30 shrink-0">
        <Lightbulb size={16} className="text-peach-500" />
      </div>
      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{text}</p>
    </motion.div>
  );
}
