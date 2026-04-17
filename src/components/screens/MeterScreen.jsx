import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            setTimeout(() => onNext(), 1500); 
            return 100;
          }
          return prev + 2; 
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
      if (progress < 100) setProgress(0); 
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
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center drop-shadow-lg">
        How important are you to me?
      </h2>
      <p className="text-slate-300 mb-12 text-center px-4">Hold the button to find out</p>

      <div className="relative flex items-center justify-center w-48 h-48 mb-8">
        <motion.div animate={{ scale: isHolding ? 1.1 : 1 }}>
          {/* Yahan Heart ki Glow Progress ke hisaab se badhegi */}
          <Heart 
            className={`w-16 h-16 transition-all duration-300 ${progress > 0 ? 'text-pink-500' : 'text-slate-600'}`} 
            style={{ filter: `drop-shadow(0 0 ${progress / 4}px rgba(236,72,153, ${progress / 100}))` }}
            fill={progress > 0 ? 'currentColor' : 'none'} 
          />
        </motion.div>
        
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="96" cy="96" r="85" fill="transparent" stroke="rgba(236,72,153,0.2)" strokeWidth="4" />
          <circle cx="96" cy="96" r="85" fill="transparent" stroke="#ec4899" strokeWidth="4"
            strokeDasharray="534"
            strokeDashoffset={534 - (534 * progress) / 100}
            className="transition-all duration-75"
            style={{ filter: 'drop-shadow(0 0 8px rgba(236,72,153,0.6))' }}
          />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {progress === 100 ? (
          <motion.div
            key="infinity-symbol"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex items-center justify-center"
          >
            {/* Asli Premium SVG Infinity Sign Video Jaisa */}
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 12px rgba(236,72,153,0.8))' }}>
              <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"/>
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="percentage-display"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-3xl font-bold text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
          >
            {progress}%
          </motion.div>
        )}
      </AnimatePresence>
      
      <button className="mt-10 px-8 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold pointer-events-none drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
        Press and Hold
      </button>
    </motion.div>
  );
}
