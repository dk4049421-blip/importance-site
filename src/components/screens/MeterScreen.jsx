import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence add kiya
import { Heart } from 'lucide-react';

export default function MeterScreen({ onNext }) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHolding) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            // 100% reached. Infinity symbol now visible in UI.
            // Delay navigation so they see the symbol.
            setTimeout(() => onNext(), 1500); // 1.5 second delay after 100%
            return 100;
          }
          return prev + 2; 
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
      // Reset only if user stops holding before 100%
      if (progress < 100) {
        setProgress(0);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isHolding, progress, onNext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center select-none touch-none"
      onPointerDown={() => setIsHolding(true)}
      onPointerUp={() => setIsHolding(false)}
      onPointerLeave={() => setIsHolding(false)}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
        How important are you to me?
      </h2>
      <p className="text-slate-300 mb-12 text-center px-4">Hold the heart to find out</p>

      <div className="relative flex items-center justify-center w-48 h-48 mb-8">
        <motion.div animate={{ scale: isHolding ? 1.1 : 1 }}>
          <Heart className={`w-16 h-16 ${progress > 50 ? 'text-pink-500' : 'text-slate-600'}`} fill={progress > 0 ? 'currentColor' : 'none'} />
        </motion.div>
        
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="96" cy="96" r="85" fill="transparent" stroke="rgba(236,72,153,0.2)" strokeWidth="4" />
          <circle cx="96" cy="96" r="85" fill="transparent" stroke="#ec4899" strokeWidth="4"
            strokeDasharray="534"
            strokeDashoffset={534 - (534 * progress) / 100}
            className="transition-all duration-75"
          />
        </svg>
      </div>

      {/* Main Updated Logic for Percentage vs Infinity Symbol */}
      <AnimatePresence mode="wait">
        {progress === 100 ? (
          // Infinity Symbol Displays after 100%
          <motion.div
            key="infinity-symbol"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-6xl font-black text-pink-400"
          >
            ♾️
          </motion.div>
        ) : (
          // Percentage Displays from 0% to 99%
          <motion.div
            key="percentage-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-3xl font-bold text-pink-400"
          >
            {progress}%
          </motion.div>
        )}
      </AnimatePresence>
      
      <button className="mt-10 px-8 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold pointer-events-none">
        Press and Hold
      </button>
    </motion.div>
  );
}
