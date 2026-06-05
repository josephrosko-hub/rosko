import { motion } from 'framer-motion';

export default function StrainGauge({ score, max = 21, size = 120 }) {
  const percentage = Math.min(score / max, 1);
  const radius = (size - 12) / 2;
  const arcLength = Math.PI * 1.5;
  const circumference = 2 * Math.PI * radius;
  const dashArray = arcLength * radius;
  const dashOffset = dashArray * (1 - percentage);

  const getColor = () => {
    if (percentage < 0.33) return '#38bdf8';
    if (percentage < 0.66) return '#0ea5e9';
    return '#0284c7';
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(135deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dashArray} ${circumference}`}
          className="text-white/5"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dashArray} ${circumference}`}
          initial={{ strokeDashoffset: dashArray }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ filter: `drop-shadow(0 0 6px rgba(14, 165, 233, 0.4))` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-bold font-display"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score.toFixed(1)}
        </motion.span>
      </div>
    </div>
  );
}
