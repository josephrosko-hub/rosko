import { motion } from 'framer-motion';
import { Home, Moon, Zap, Apple, Brain, User } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'sleep', icon: Moon, label: 'Sleep' },
  { id: 'activity', icon: Zap, label: 'Activity' },
  { id: 'nutrition', icon: Apple, label: 'Fuel' },
  { id: 'insights', icon: Brain, label: 'Insights' },
  { id: 'profile', icon: User, label: 'You' },
];

export default function Navigation() {
  const { activeTab, setActiveTab, darkMode } = useHealthStore();

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 ${darkMode ? 'glass' : 'glass-light'} safe-area-bottom`}>
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className={`absolute inset-0 rounded-2xl ${darkMode ? 'bg-white/10' : 'bg-sage-100'}`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={`relative z-10 transition-colors duration-200 ${
                  isActive
                    ? darkMode ? 'text-white' : 'text-sage-700'
                    : darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
                strokeWidth={isActive ? 2.2 : 1.5}
              />
              <span className={`relative z-10 text-[10px] font-medium transition-colors duration-200 ${
                isActive
                  ? darkMode ? 'text-white' : 'text-sage-700'
                  : darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
