import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, TrendingUp, Target, Sparkles } from 'lucide-react';

const slides = [
  {
    icon: Heart,
    title: 'Track What Matters',
    description: 'Log sleep, activity, nutrition, hydration, and mood — all in one beautiful app.',
    color: 'from-sage-400 to-sage-600',
  },
  {
    icon: TrendingUp,
    title: 'Discover Insights',
    description: 'Spot trends and correlations you never knew existed. AI-powered summaries guide you.',
    color: 'from-sky-400 to-sky-600',
  },
  {
    icon: Target,
    title: 'Build Lasting Habits',
    description: 'Set goals, track streaks, and celebrate milestones on your wellness journey.',
    color: 'from-lavender-400 to-lavender-600',
  },
];

export default function Onboarding({ onComplete }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center max-w-sm"
        >
          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${slides[current].color} flex items-center justify-center mb-8 shadow-lg`}>
            {(() => {
              const Icon = slides[current].icon;
              return <Icon size={40} className="text-white" />;
            })()}
          </div>
          <h2 className="text-2xl font-bold font-display mb-3">{slides[current].title}</h2>
          <p className="text-gray-500 leading-relaxed">{slides[current].description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-6 px-8">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-sage-500' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-full max-w-xs py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-sage-500 to-sage-600 shadow-lg shadow-sage-500/25 active:scale-95 transition-transform"
        >
          {current === slides.length - 1 ? "Let's Go!" : 'Next'}
        </button>

        {current < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
