import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Moon, Sun, Download, Shield, Bell, ChevronRight, Heart, Zap, Trophy, Flame } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

export default function Profile() {
  const { profile, darkMode, toggleDarkMode, updateProfile, entries, goals, badges } = useHealthStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
  };

  const handleExport = () => {
    const data = JSON.stringify({ profile, entries }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vitalflow-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    totalEntries: entries.length,
    daysTracked: new Set(entries.map((e) => e.date)).size,
    longestStreak: Math.max(...goals.map(g => g.streak), 0),
    badgesEarned: badges.filter(b => b.earned).length,
  };

  return (
    <div className="px-5 pt-14 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Profile</h1>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl text-center ${darkMode ? 'glass' : 'glass-light'}`}
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sage-400 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
            {profile.name[0]}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-navy-950 rounded-full p-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-xs font-bold text-navy-950">
              {profile.level}
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold font-display mt-4">{profile.name}</h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Level {profile.level} • {stats.daysTracked} days</p>

        {/* XP Bar */}
        <div className="mt-4 px-4">
          <div className="flex justify-between mb-1">
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Level {profile.level}</span>
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Level {profile.level + 1}</span>
          </div>
          <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-navy-800' : 'bg-gray-200'}`}>
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
              initial={{ width: 0 }}
              animate={{ width: `${(profile.xp / profile.xpToNext) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className={`text-xs mt-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{profile.xp} / {profile.xpToNext} XP</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <StatCard icon={Zap} value={stats.totalEntries} label="Entries" darkMode={darkMode} />
        <StatCard icon={Flame} value={stats.longestStreak} label="Streak" darkMode={darkMode} />
        <StatCard icon={Trophy} value={stats.badgesEarned} label="Badges" darkMode={darkMode} />
        <StatCard icon={Heart} value={stats.daysTracked} label="Days" darkMode={darkMode} />
      </div>

      {/* Edit Form */}
      {editing ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`p-5 rounded-3xl ${darkMode ? 'glass' : 'glass-light'} space-y-4`}
        >
          <h3 className="font-semibold font-display">Edit Profile</h3>
          <InputField label="Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} darkMode={darkMode} />
          <div className="grid grid-cols-3 gap-2">
            <InputField label="Age" type="number" value={formData.age} onChange={(v) => setFormData({ ...formData, age: parseInt(v) })} darkMode={darkMode} />
            <InputField label="Height" type="number" value={formData.height} onChange={(v) => setFormData({ ...formData, height: parseInt(v) })} darkMode={darkMode} />
            <InputField label="Weight" type="number" value={formData.weight} onChange={(v) => setFormData({ ...formData, weight: parseInt(v) })} darkMode={darkMode} />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg active:scale-[0.97] transition-transform">Save</button>
            <button onClick={() => setEditing(false)} className={`flex-1 py-3 rounded-xl font-semibold ${darkMode ? 'bg-navy-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>Cancel</button>
          </div>
        </motion.div>
      ) : (
        <div className={`rounded-3xl overflow-hidden ${darkMode ? 'glass' : 'glass-light'}`}>
          <SettingRow icon={User} label="Edit Profile" onClick={() => setEditing(true)} darkMode={darkMode} />
          <SettingRow icon={darkMode ? Sun : Moon} label="Appearance" value={darkMode ? 'Dark' : 'Light'} onClick={toggleDarkMode} darkMode={darkMode} />
          <SettingRow icon={Bell} label="Notifications" value="On" darkMode={darkMode} />
          <SettingRow icon={Shield} label="Privacy" darkMode={darkMode} />
          <SettingRow icon={Download} label="Export Data" onClick={handleExport} darkMode={darkMode} />
          <SettingRow icon={Heart} label="About VitalFlow" value="v2.0" darkMode={darkMode} last />
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={() => {
            if (window.confirm('Sign out and clear all data? This cannot be undone.')) {
              localStorage.removeItem('vitalflow-v2-storage');
              localStorage.removeItem('vitalflow-v2-onboarded');
              window.location.reload();
            }
          }}
          className={`w-full py-3.5 rounded-2xl font-medium text-red-400 ${darkMode ? 'bg-red-500/10' : 'bg-red-50'} active:scale-[0.97] transition-transform`}
        >
          Sign Out
        </button>
      </div>

      <p className={`text-center text-xs pb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
        VitalFlow v2.0 • Made with obsession for your health
      </p>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, darkMode }) {
  return (
    <div className={`p-3 rounded-2xl text-center ${darkMode ? 'bg-navy-900/50 border border-navy-800/50' : 'bg-white border border-gray-100'}`}>
      <Icon size={14} className={`mx-auto mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <p className="text-lg font-bold font-display">{value}</p>
      <p className={`text-[9px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
    </div>
  );
}

function SettingRow({ icon: Icon, label, value, onClick, darkMode, last }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors active:bg-white/5 ${
        !last ? (darkMode ? 'border-b border-white/5' : 'border-b border-gray-100') : ''
      }`}
    >
      <Icon size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
      <span className="flex-1 text-sm font-medium">{label}</span>
      {value && <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{value}</span>}
      <ChevronRight size={14} className={darkMode ? 'text-gray-600' : 'text-gray-300'} />
    </button>
  );
}

function InputField({ label, type = 'text', value, onChange, darkMode }) {
  return (
    <div>
      <label className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all ${
          darkMode ? 'bg-navy-900 border-navy-800 text-white' : 'bg-white border-gray-200'
        }`}
      />
    </div>
  );
}
