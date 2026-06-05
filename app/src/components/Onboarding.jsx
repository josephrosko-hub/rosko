import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, Trophy, Shield } from 'lucide-react';

const slides = [
  {
    icon: Activity,
    title: 'Know Your Body',
    description: 'Recovery scores, HRV tracking, strain monitoring — understand exactly how your body performs every day.',
    gradient: 'from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Discover hidden correlations between your sleep, strain, nutrition, and recovery. Personalized coaching that learns you.',
    gradient: 'from-lavender-400 to-lavender-600',
    bg: 'bg-lavender-500/10',
  },
  {
    icon: Trophy,
    title: 'Level Up Daily',
    description: 'Earn XP, unlock badges, and build streaks. Your health journey gamified — because consistency should feel rewarding.',
    gradient: 'from-amber-400 to-peach-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Shield,
    title: 'Your Data, Your Rules',
    description: 'End-to-end encrypted. Zero ads. We never sell your health data. Export anytime. Privacy is non-negotiable.',
    gradient: 'from-sky-400 to-sky-600',
    bg: 'bg-sky-500/10',
  },
];

export default function Onboarding({ onComplete }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="fixed inset-0 bg-navy-950 flex flex-col items-center justify-between px-8 py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-20 w-72 h-72 bg-lavender-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex-1 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center text-center w-full"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${slides[current].gradient} flex items-center justify-center mb-10 shadow-2xl`}
            >
              {(() => {
                const Icon = slides[current].icon;
                return <Icon size={48} className="text-white" strokeWidth={1.5} />;
              })()}
            </motion.div>
            <h2 className="text-3xl font-bold font-display text-white mb-4">{slides[current].title}</h2>
            <p className="text-gray-400 leading-relaxed text-base">{slides[current].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === current ? 32 : 8 }}
              className={`h-2 rounded-full transition-colors duration-300 ${
                i === current ? 'bg-white' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => current < slides.length - 1 ? setCurrent(current + 1) : onComplete()}
          className="w-full py-4 rounded-2xl font-semibold text-navy-950 bg-white shadow-xl active:scale-[0.97] transition-transform text-base"
        >
          {current === slides.length - 1 ? "Start My Journey" : 'Continue'}
        </button>

        {current < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
