import { useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Footprints, Droplets, Utensils, Smile, Heart, Check, X } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

const categories = [
  { id: 'sleep', icon: Moon, label: 'Sleep', color: 'lavender' },
  { id: 'activity', icon: Footprints, label: 'Activity', color: 'sage' },
  { id: 'hydration', icon: Droplets, label: 'Hydration', color: 'sky' },
  { id: 'nutrition', icon: Utensils, label: 'Nutrition', color: 'peach' },
  { id: 'mood', icon: Smile, label: 'Mood', color: 'peach' },
  { id: 'body', icon: Heart, label: 'Body', color: 'lavender' },
];

const colorMap = {
  sage: { bg: 'bg-sage-100', text: 'text-sage-600', ring: 'ring-sage-300', activeBg: 'bg-sage-500' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-600', ring: 'ring-sky-300', activeBg: 'bg-sky-500' },
  peach: { bg: 'bg-peach-100', text: 'text-peach-600', ring: 'ring-peach-300', activeBg: 'bg-peach-500' },
  lavender: { bg: 'bg-lavender-100', text: 'text-lavender-600', ring: 'ring-lavender-300', activeBg: 'bg-lavender-500' },
};

export default function LogEntry() {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState(false);
  const { addEntry, darkMode } = useHealthStore();

  const handleSave = () => {
    if (!selected) return;

    const entry = {
      category: selected,
      date: format(new Date(), 'yyyy-MM-dd'),
      data: formData,
    };

    addEntry(entry);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setSelected(null);
      setFormData({});
    }, 2000);
  };

  const renderForm = () => {
    switch (selected) {
      case 'sleep':
        return (
          <div className="space-y-4">
            <InputField label="Hours Slept" type="number" step="0.5" value={formData.hours || ''} onChange={(v) => setFormData({ ...formData, hours: parseFloat(v) })} darkMode={darkMode} />
            <div>
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quality</label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFormData({ ...formData, quality: star })}
                    className={`w-10 h-10 rounded-full text-lg transition-all ${
                      formData.quality >= star
                        ? 'bg-lavender-500 text-white scale-110'
                        : darkMode ? 'bg-navy-800 text-gray-400' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Bedtime" type="time" value={formData.bedtime || ''} onChange={(v) => setFormData({ ...formData, bedtime: v })} darkMode={darkMode} />
            <InputField label="Wake Time" type="time" value={formData.wakeTime || ''} onChange={(v) => setFormData({ ...formData, wakeTime: v })} darkMode={darkMode} />
          </div>
        );
      case 'activity':
        return (
          <div className="space-y-4">
            <InputField label="Steps" type="number" value={formData.steps || ''} onChange={(v) => setFormData({ ...formData, steps: parseInt(v) })} darkMode={darkMode} />
            <InputField label="Active Minutes" type="number" value={formData.activeMinutes || ''} onChange={(v) => setFormData({ ...formData, activeMinutes: parseInt(v) })} darkMode={darkMode} />
            <InputField label="Calories Burned" type="number" value={formData.calories || ''} onChange={(v) => setFormData({ ...formData, calories: parseInt(v) })} darkMode={darkMode} />
            <div>
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Workout Type</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Running', 'Walking', 'Cycling', 'Yoga', 'Strength', 'Swimming'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, workoutType: type })}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      formData.workoutType === type
                        ? 'bg-sage-500 text-white'
                        : darkMode ? 'bg-navy-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'hydration':
        return (
          <div className="space-y-4">
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Glasses of Water</label>
            <div className="flex items-center gap-4 justify-center py-4">
              <button
                onClick={() => setFormData({ ...formData, glasses: Math.max(0, (formData.glasses || 0) - 1) })}
                className={`w-12 h-12 rounded-full text-xl font-bold ${darkMode ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-700'} transition-all active:scale-90`}
              >
                −
              </button>
              <div className="text-center">
                <span className="text-5xl font-bold font-display text-sky-500">{formData.glasses || 0}</span>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/ 8 glasses</p>
              </div>
              <button
                onClick={() => setFormData({ ...formData, glasses: (formData.glasses || 0) + 1 })}
                className={`w-12 h-12 rounded-full text-xl font-bold ${darkMode ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-700'} transition-all active:scale-90`}
              >
                +
              </button>
            </div>
            <div className="flex justify-center gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-6 h-8 rounded-full transition-all ${
                    i < (formData.glasses || 0) ? 'bg-sky-400' : darkMode ? 'bg-navy-800' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        );
      case 'nutrition':
        return (
          <div className="space-y-4">
            <InputField label="Calories" type="number" value={formData.calories || ''} onChange={(v) => setFormData({ ...formData, calories: parseInt(v) })} darkMode={darkMode} />
            <InputField label="Protein (g)" type="number" value={formData.protein || ''} onChange={(v) => setFormData({ ...formData, protein: parseInt(v) })} darkMode={darkMode} />
            <InputField label="Carbs (g)" type="number" value={formData.carbs || ''} onChange={(v) => setFormData({ ...formData, carbs: parseInt(v) })} darkMode={darkMode} />
            <InputField label="Fat (g)" type="number" value={formData.fat || ''} onChange={(v) => setFormData({ ...formData, fat: parseInt(v) })} darkMode={darkMode} />
          </div>
        );
      case 'mood':
        return (
          <div className="space-y-4">
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>How are you feeling?</label>
            <div className="flex justify-center gap-3 py-4">
              {['😔', '😕', '😐', '🙂', '😊'].map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => setFormData({ ...formData, score: i + 1 })}
                  className={`w-14 h-14 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                    formData.score === i + 1
                      ? 'bg-peach-200 scale-125 shadow-md'
                      : darkMode ? 'bg-navy-800' : 'bg-gray-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div>
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Journal Note (optional)</label>
              <textarea
                value={formData.note || ''}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="How was your day?"
                rows={3}
                className={`w-full mt-2 p-3 rounded-xl border resize-none focus:outline-none focus:ring-2 focus:ring-peach-300 ${
                  darkMode ? 'bg-navy-800 border-navy-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 placeholder-gray-400'
                }`}
              />
            </div>
          </div>
        );
      case 'body':
        return (
          <div className="space-y-4">
            <InputField label="Weight (kg)" type="number" step="0.1" value={formData.weight || ''} onChange={(v) => setFormData({ ...formData, weight: parseFloat(v) })} darkMode={darkMode} />
            <InputField label="Heart Rate (bpm)" type="number" value={formData.heartRate || ''} onChange={(v) => setFormData({ ...formData, heartRate: parseInt(v) })} darkMode={darkMode} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Log Entry</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Track your health data quickly and easily
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {categories.map(({ id, icon: Icon, label, color }) => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSelected(id); setFormData({}); setSaved(false); }}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border ${
              selected === id
                ? `${colorMap[color].bg} ${colorMap[color].text} border-current shadow-md`
                : darkMode
                ? 'bg-navy-900 border-navy-800 text-gray-400'
                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-5 rounded-2xl border ${
              darkMode ? 'bg-navy-900 border-navy-800' : 'bg-white border-gray-100'
            } shadow-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display capitalize">{selected}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            {renderForm()}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={saved}
              className={`w-full mt-6 py-3 rounded-xl font-medium text-white transition-all ${
                saved ? 'bg-sage-500' : 'bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700'
              } shadow-md`}
            >
              {saved ? (
                <span className="flex items-center justify-center gap-2">
                  <Check size={18} /> Saved!
                </span>
              ) : (
                'Save Entry'
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
        >
          <p className="text-sm">Select a category above to start logging</p>
        </motion.div>
      )}
    </div>
  );
}

function InputField({ label, type, step, value, onChange, darkMode }) {
  return (
    <div>
      <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
      <input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all ${
          darkMode ? 'bg-navy-800 border-navy-700 text-white' : 'bg-gray-50 border-gray-200'
        }`}
      />
    </div>
  );
}
