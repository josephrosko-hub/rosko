import { format } from 'date-fns';
import { Moon, Footprints, Droplets, Utensils, Smile, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHealthStore } from '../store/healthStore';
import WellnessRing from '../components/ui/WellnessRing';
import MetricCard from '../components/ui/MetricCard';
import InsightCard from '../components/ui/InsightCard';
import QuickActions from '../components/QuickActions';

export default function Dashboard() {
  const { profile, darkMode, getTodayEntries, getWellnessScore } = useHealthStore();
  const todayEntries = getTodayEntries();
  const wellnessScore = getWellnessScore();

  const sleep = todayEntries.find((e) => e.category === 'sleep');
  const activity = todayEntries.find((e) => e.category === 'activity');
  const hydration = todayEntries.find((e) => e.category === 'hydration');
  const nutrition = todayEntries.find((e) => e.category === 'nutrition');
  const mood = todayEntries.find((e) => e.category === 'mood');
  const body = todayEntries.find((e) => e.category === 'body');

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const insights = [
    'You slept 12% better this week — your consistent bedtime is paying off!',
    'On days you walk 8,000+ steps, your mood score averages 15% higher.',
    'Great hydration streak! 12 days in a row hitting your water goal.',
  ];

  const moodEmojis = ['😔', '😕', '😐', '🙂', '😊'];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-display">{greeting()}, {profile.name}</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {format(new Date(), 'EEEE, MMMM d')}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-300 to-sage-500 flex items-center justify-center text-white font-bold text-sm">
          {profile.name[0]}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`rounded-3xl p-6 flex flex-col items-center ${
          darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'
        } shadow-sm`}
      >
        <WellnessRing score={wellnessScore} />
        <p className={`mt-3 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {wellnessScore >= 80
            ? "You're doing amazing today! Keep it up."
            : wellnessScore >= 60
            ? 'Good progress — a little more activity could boost your score.'
            : 'Log more entries to improve your wellness score.'}
        </p>
      </motion.div>

      <QuickActions darkMode={darkMode} />

      <div>
        <h2 className="text-lg font-semibold font-display mb-3">Today's Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            icon={Moon}
            title="Sleep"
            value={sleep ? sleep.data.hours.toFixed(1) : '—'}
            unit="hrs"
            color="lavender"
            progress={sleep ? (sleep.data.hours / 8) * 100 : 0}
            darkMode={darkMode}
          />
          <MetricCard
            icon={Footprints}
            title="Steps"
            value={activity ? activity.data.steps.toLocaleString() : '—'}
            unit="steps"
            color="sage"
            progress={activity ? (activity.data.steps / 10000) * 100 : 0}
            darkMode={darkMode}
          />
          <MetricCard
            icon={Droplets}
            title="Water"
            value={hydration ? hydration.data.glasses : '—'}
            unit="glasses"
            color="sky"
            progress={hydration ? (hydration.data.glasses / 8) * 100 : 0}
            darkMode={darkMode}
          />
          <MetricCard
            icon={Utensils}
            title="Calories"
            value={nutrition ? nutrition.data.calories.toLocaleString() : '—'}
            unit="kcal"
            color="peach"
            progress={nutrition ? (nutrition.data.calories / 2200) * 100 : 0}
            darkMode={darkMode}
          />
          <MetricCard
            icon={Smile}
            title="Mood"
            value={mood ? moodEmojis[mood.data.score - 1] : '—'}
            unit=""
            color="peach"
            darkMode={darkMode}
          />
          <MetricCard
            icon={Heart}
            title="Heart Rate"
            value={body ? body.data.heartRate : '—'}
            unit="bpm"
            color="lavender"
            progress={body ? Math.min((body.data.heartRate / 100) * 100, 100) : 0}
            darkMode={darkMode}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold font-display mb-3">Insights</h2>
        <div className="space-y-3">
          {insights.map((text, i) => (
            <InsightCard key={i} text={text} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </div>
  );
}
