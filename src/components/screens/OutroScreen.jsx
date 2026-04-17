import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Star } from 'lucide-react';

export default function OutroScreen() {
  const [hugSent, setHugSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4"
    >
      {/* 1. Orbiting Rings & Icons (Video Jaisa) */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <div className="absolute w-40 h-40 rounded-full border border-white/10" />
        <div className="absolute w-56 h-56 rounded-full border border-white/10" />

        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute w-56 h-56 flex items-start justify-center">
          <Star className="w-5 h-5 text-yellow-300 fill-yellow-300 -mt-2.5 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
        </motion.div>

        <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="absolute w-40 h-40 flex items-start justify-center">
          <Heart className="w-4 h-4 text-purple-400 fill-purple-400 -mt-2 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
        </motion.div>

        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
          <Heart className="w-20 h-20 text-pink-500 fill-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]" />
        </motion.div>
      </div>

      {/* 2. Tera Custom Text (Bhutkiii wala) */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 z-10 drop-shadow-md">
        You are my <span className="text-pink-400">Favourite<br/>Behen ( Bhutkiii )</span>
      </h1>
      <p className="text-slate-300 mb-12 text-center z-10">
        You mean more to me than you know.
      </p>

      {/* 3. Button - Ab isme Glowing/Bouncing Heart Hoga */}
      <div className="relative z-10">
        <button
          onClick={() => setHugSent(true)}
          disabled={hugSent}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-medium transition-all ${
            hugSent 
              ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' 
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
          }`}
        >
          {hugSent ? (
            <AnimatePresence>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex items-center gap-2">
                <span className="text-pink-200">Hug sent!</span>
                {/* YAHAN HAI FIX - Emoji hata kar Bouncing/Glowing Icon lagaya */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart 
                    className="w-5 h-5 text-pink-400 fill-pink-400"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(236,72,153,0.8))' }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send a hug
            </>
          )}
        </button>

        {/* Floating Hearts Particle Effect (Pichla wala safe hai) */}
        {mounted && hugSent && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 0, 
                  y: -200 - Math.random() * 100, 
                  x: (Math.random() - 0.5) * 150,
                  scale: 1 + Math.random()
                }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut", delay: Math.random() * 0.2 }}
                className="absolute"
              >
                <Heart className={`w-6 h-6 ${i % 2 === 0 ? 'text-pink-500 fill-pink-500' : 'text-purple-400 fill-purple-400'} drop-shadow-md`} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
