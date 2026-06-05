import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealthStore } from './store/healthStore';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Sleep from './pages/Sleep';
import Activity from './pages/Activity';
import Nutrition from './pages/Nutrition';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import Onboarding from './components/Onboarding';

const pages = {
  home: Dashboard,
  sleep: Sleep,
  activity: Activity,
  nutrition: Nutrition,
  insights: Insights,
  profile: Profile,
};

function App() {
  const { darkMode, activeTab } = useHealthStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('vitalflow-v2-onboarded');
    if (!hasOnboarded) setShowOnboarding(true);
  }, []);

  if (showOnboarding) {
    return (
      <Onboarding onComplete={() => {
        localStorage.setItem('vitalflow-v2-onboarded', 'true');
        setShowOnboarding(false);
      }} />
    );
  }

  const ActivePage = pages[activeTab] || Dashboard;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-navy-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <main className="pb-24 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ActivePage />
          </motion.div>
        </AnimatePresence>
      </main>
      <Navigation />
    </div>
  );
}

export default App;
