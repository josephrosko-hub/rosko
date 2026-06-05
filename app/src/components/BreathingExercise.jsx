import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const phases = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
const durations = [4, 4, 4, 4];

export default function BreathingExercise({ onClose, darkMode }) {
  const [phase, setPhase] = useState(0);
  const [seconds, setSeconds] = useState(durations[0]);
  const [cycles, setCycles] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          const nextPhase = (phase + 1) % 4;
          setPhase(nextPhase);
          if (nextPhase === 0) setCycles((c) => c + 1);
          return durations[nextPhase];
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, phase]);

  const circleScale = phase === 0 ? 1.4 : phase === 2 ? 0.8 : phase === 1 ? 1.4 : 0.8;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-lavender-50 to-white dark:from-navy-950 dark:to-navy-900"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-navy-800 shadow"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col items-center gap-8">
        <motion.div
          animate={{ scale: active ? circleScale : 1 }}
          transition={{ duration: durations[phase], ease: 'easeInOut' }}
          className="w-48 h-48 rounded-full bg-gradient-to-br from-lavender-300 to-lavender-500 opacity-60 flex items-center justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-white/40 dark:bg-navy-900/40" />
        </motion.div>

        <div className="text-center">
          <p className="text-2xl font-bold font-display text-lavender-600">{active ? phases[phase] : 'Ready?'}</p>
          {active && <p className="text-4xl font-bold mt-2">{seconds}</p>}
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {cycles > 0 ? `${cycles} cycles completed` : 'Box breathing — 4-4-4-4'}
          </p>
        </div>

        <button
          onClick={() => setActive(!active)}
          className={`px-8 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all ${
            active ? 'bg-gray-500' : 'bg-gradient-to-r from-lavender-500 to-lavender-600'
          }`}
        >
          {active ? 'Pause' : 'Start'}
        </button>
      </div>
    </motion.div>
  );
}
