import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Moon, Zap, Droplets, Heart, TrendingUp, ChevronRight } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';
import RecoveryRing from '../components/ui/RecoveryRing';
import StrainGauge from '../components/ui/StrainGauge';
import MetricPill from '../components/ui/MetricPill';

export default function Dashboard() {
  const { profile, darkMode, getToday, getRecoveryScore, getStrainScore, getInsights, setActiveTab } = useHealthStore();

  const recovery = getToday('recovery');
  const strain = getToday('strain');
  const sleep = getToday('sleep');
  const biometrics = getToday('biometrics');
  const nutrition = getToday('nutrition');
  const recoveryScore = getRecoveryScore();
  const strainScore = getStrainScore();
  const insights = getInsights();

  const recoveryStatus = recoveryScore >= 67 ? 'green' : recoveryScore >= 34 ? 'yellow' : 'red';
  const statusLabel = { green: 'Peak', yellow: 'Moderate', red: 'Low' };
  const statusColor = { green: 'text-emerald-400', yellow: 'text-amber-400', red: 'text-red-400' };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="px-5 pt-14 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{format(new Date(), 'EEEE, MMM d')}</p>
          <h1 className="text-2xl font-bold font-display mt-0.5">{greeting()}, {profile.name}</h1>
        </div>
        <button onClick={() => setActiveTab('profile')} className="relative">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sage-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {profile.name[0]}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 bg-navy-950 rounded-full p-0.5">
            <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center text-[8px] font-bold text-navy-950">
              {profile.level}
            </div>
          </div>
        </button>
      </div>

      {/* Recovery + Strain Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-3xl ${darkMode ? 'glass' : 'glass-light'} ${recoveryStatus === 'green' ? 'glow-green' : recoveryStatus === 'yellow' ? 'glow-yellow' : 'glow-red'}`}
        >
          <p className={`text-xs font-medium uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recovery</p>
          <RecoveryRing score={recoveryScore} status={recoveryStatus} size={100} />
          <p className={`text-sm font-semibold mt-2 ${statusColor[recoveryStatus]}`}>{statusLabel[recoveryStatus]}</p>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            HRV {recovery?.data.hrv || '—'}ms
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`p-4 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
        >
          <p className={`text-xs font-medium uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Strain</p>
          <StrainGauge score={strainScore} max={21} size={100} />
          <p className="text-sm font-semibold mt-2 text-sky-400">{strainScore.toFixed(1)}</p>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            of 21.0 max
          </p>
        </motion.div>
      </div>

      {/* Quick Metrics Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5"
      >
        <MetricPill icon={Moon} label="Sleep" value={sleep ? `${sleep.data.totalHours}h` : '—'} color="lavender" darkMode={darkMode} onClick={() => setActiveTab('sleep')} />
        <MetricPill icon={Zap} label="Steps" value={strain ? strain.data.steps.toLocaleString() : '—'} color="sage" darkMode={darkMode} onClick={() => setActiveTab('activity')} />
        <MetricPill icon={Droplets} label="Water" value={nutrition ? `${nutrition.data.water}/${nutrition.data.waterTarget}` : '—'} color="sky" darkMode={darkMode} />
        <MetricPill icon={Heart} label="HR" value={biometrics ? `${biometrics.data.restingHR}` : '—'} color="peach" darkMode={darkMode} />
      </motion.div>

      {/* Body Battery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <div className="flex items-center justify-between mb-3">
          <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Body Battery</p>
          <span className="text-2xl font-bold font-display text-emerald-400">{biometrics?.data.bodyBattery || 0}%</span>
        </div>
        <div className={`h-3 rounded-full overflow-hidden ${darkMode ? 'bg-navy-800' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${biometrics?.data.bodyBattery || 0}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Depleted</span>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Charged</span>
        </div>
      </motion.div>

      {/* Coaching Insight */}
      {insights[0] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setActiveTab('insights')}
          className={`p-5 rounded-3xl cursor-pointer active:scale-[0.98] transition-transform ${darkMode ? 'glass' : 'glass-light'}`}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-400 to-lavender-600 flex items-center justify-center shrink-0">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold mb-0.5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{insights[0].title}</p>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{insights[0].text}</p>
            </div>
            <ChevronRight size={16} className={`shrink-0 mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          </div>
        </motion.div>
      )}

      {/* Today's Vitals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-lg font-bold font-display mb-3">Vitals</h2>
        <div className="grid grid-cols-2 gap-2">
          <VitalCard label="Resting HR" value={`${biometrics?.data.restingHR || '—'}`} unit="bpm" darkMode={darkMode} />
          <VitalCard label="HRV" value={`${biometrics?.data.hrv || '—'}`} unit="ms" darkMode={darkMode} />
          <VitalCard label="SpO2" value={`${biometrics?.data.spo2 || '—'}`} unit="%" darkMode={darkMode} />
          <VitalCard label="Resp Rate" value={`${biometrics?.data.respiratoryRate || '—'}`} unit="/min" darkMode={darkMode} />
        </div>
      </motion.div>

      {/* XP Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-4 rounded-2xl ${darkMode ? 'bg-navy-900/50' : 'bg-white'} border ${darkMode ? 'border-navy-800' : 'border-gray-100'}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Level {profile.level}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
              +40 XP today
            </span>
          </div>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {profile.xp}/{profile.xpToNext}
          </span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-navy-800' : 'bg-gray-100'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${(profile.xp / profile.xpToNext) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function VitalCard({ label, value, unit, darkMode }) {
  return (
    <div className={`p-3.5 rounded-2xl ${darkMode ? 'bg-navy-900/50 border border-navy-800/50' : 'bg-white border border-gray-100'}`}>
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-xl font-bold font-display">{value}</span>
        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{unit}</span>
      </div>
    </div>
  );
}
