import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Moon, Sun, Download, Shield, Bell, ChevronRight, Heart } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

export default function Profile() {
  const { profile, darkMode, toggleDarkMode, updateProfile, entries } = useHealthStore();
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
    a.download = 'vitalflow-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    totalEntries: entries.length,
    daysTracked: new Set(entries.map((e) => e.date)).size,
    categories: new Set(entries.map((e) => e.category)).size,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Profile</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your account and preferences
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl text-center ${
          darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'
        } shadow-sm`}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sage-300 to-sage-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
          {profile.name[0]}
        </div>
        <h2 className="text-xl font-bold font-display">{profile.name}</h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {stats.daysTracked} days tracked
        </p>

        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-navy-800">
          <div>
            <p className="text-lg font-bold font-display">{stats.totalEntries}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Entries</p>
          </div>
          <div>
            <p className="text-lg font-bold font-display">{stats.daysTracked}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Days</p>
          </div>
          <div>
            <p className="text-lg font-bold font-display">{stats.categories}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Categories</p>
          </div>
        </div>
      </motion.div>

      {editing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-5 rounded-2xl ${darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'} shadow-sm space-y-4`}
        >
          <h3 className="font-semibold font-display">Edit Profile</h3>
          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full mt-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sage-300 ${
                darkMode ? 'bg-navy-800 border-navy-700 text-white' : 'bg-gray-50 border-gray-200'
              }`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className={`w-full mt-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sage-300 ${
                  darkMode ? 'bg-navy-800 border-navy-700 text-white' : 'bg-gray-50 border-gray-200'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                className={`w-full mt-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sage-300 ${
                  darkMode ? 'bg-navy-800 border-navy-700 text-white' : 'bg-gray-50 border-gray-200'
                }`}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-sage-500 to-sage-600 shadow-md"
            >
              Save
            </button>
            <button
              onClick={() => { setEditing(false); setFormData(profile); }}
              className={`flex-1 py-2.5 rounded-xl font-medium ${darkMode ? 'bg-navy-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-navy-900 border border-navy-800' : 'bg-white border border-gray-100'} shadow-sm`}>
          <SettingItem
            icon={User}
            label="Edit Profile"
            onClick={() => setEditing(true)}
            darkMode={darkMode}
          />
          <SettingItem
            icon={darkMode ? Sun : Moon}
            label={darkMode ? 'Light Mode' : 'Dark Mode'}
            onClick={toggleDarkMode}
            darkMode={darkMode}
            toggle
            active={darkMode}
          />
          <SettingItem icon={Bell} label="Notifications" darkMode={darkMode} />
          <SettingItem icon={Shield} label="Privacy & Security" darkMode={darkMode} />
          <SettingItem icon={Download} label="Export Data" onClick={handleExport} darkMode={darkMode} />
          <SettingItem icon={Heart} label="About VitalFlow" darkMode={darkMode} last />
        </div>
      )}

      <div className="text-center pt-4">
        <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          VitalFlow v1.0 — Your health, simplified.
        </p>
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, label, onClick, darkMode, toggle, active, last }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${
        !last ? (darkMode ? 'border-b border-navy-800' : 'border-b border-gray-50') : ''
      } ${darkMode ? 'hover:bg-navy-800' : 'hover:bg-gray-50'}`}
    >
      <Icon size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
      <span className="flex-1 text-sm font-medium">{label}</span>
      {toggle ? (
        <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${active ? 'bg-sage-500' : 'bg-gray-300'}`}>
          <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${active ? 'translate-x-4' : ''}`} />
        </div>
      ) : (
        <ChevronRight size={16} className={darkMode ? 'text-gray-600' : 'text-gray-300'} />
      )}
    </button>
  );
}
