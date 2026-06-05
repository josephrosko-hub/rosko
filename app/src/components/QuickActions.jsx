import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Moon, Footprints, Wind } from 'lucide-react';
import { format } from 'date-fns';
import { useHealthStore } from '../store/healthStore';
import BreathingExercise from './BreathingExercise';

export default function QuickActions({ darkMode }) {
  const [showBreathing, setShowBreathing] = useState(false);
  const { addEntry } = useHealthStore();
  const navigate = useNavigate();

  const quickLogWater = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    addEntry({
      category: 'hydration',
      date: today,
      data: { glasses: 1, goal: 8 },
    });
  };

  const actions = [
    { icon: Droplets, label: '+1 Water', color: 'bg-sky-100 text-sky-600', action: quickLogWater },
    { icon: Footprints, label: 'Log Walk', color: 'bg-sage-100 text-sage-600', action: () => navigate('/log') },
    { icon: Moon, label: 'Log Sleep', color: 'bg-lavender-100 text-lavender-600', action: () => navigate('/log') },
    { icon: Wind, label: 'Breathe', color: 'bg-peach-100 text-peach-500', action: () => setShowBreathing(true) },
  ];

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold font-display mb-3">Quick Actions</h2>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4">
          {actions.map(({ icon: Icon, label, color, action }, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.92 }}
              onClick={action}
              className={`shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-2xl ${
                darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'
              } shadow-sm min-w-[72px]`}
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                <Icon size={18} />
              </div>
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showBreathing && <BreathingExercise onClose={() => setShowBreathing(false)} darkMode={darkMode} />}
      </AnimatePresence>
    </>
  );
}
