import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useHealthStore } from './store/healthStore';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './pages/Dashboard';
import LogEntry from './pages/LogEntry';
import Trends from './pages/Trends';
import Goals from './pages/Goals';
import Profile from './pages/Profile';

function App() {
  const darkMode = useHealthStore((state) => state.darkMode);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('vitalflow-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('vitalflow-onboarded', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="log" element={<LogEntry />} />
            <Route path="trends" element={<Trends />} />
            <Route path="goals" element={<Goals />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
