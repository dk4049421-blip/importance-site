import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Star } from 'lucide-react';

export default function OutroScreen() {
  const [hugSent, setHugSent] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center"
    >
      {/* ORBITING SYSTEM (Rings aur Ghoomte hue Taare/Dil) */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        {/* Andar wala Ring */}
        <div className="absolute w-40 h-40 rounded-full border border-white/10" />
        {/* Bahar wala Ring */}
        <div className="absolute w-56 h-56 rounded-full border border-white/10" />

        {/* Bahar ghoomta hua Yellow Star */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56 flex items-start justify-center"
        >
          <Star className="w-5 h-5 text-yellow-300 fill-yellow-300 -mt-2.5 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
        </motion.div>

        {/* Andar ghoomta hua chota Purple Heart */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-40 flex items-start justify-center"
        >
          <Heart className="w-4 h-4 text-purple-400 fill-purple-400 -mt-2 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
        </motion.div>

        {/* Beech wala Main Bada Heart (Dhadakta hua) */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Heart className="w-20 h-20 text-pink-500 fill-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]" />
        </motion.div>
      </div>

      {/* TERA CUSTOM TEXT (Bhutkiii wala) */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 z-10">
        You are my <span className="text-pink-400">Favourite<br/>Behen ( Bhutkiii )</span>
      </h1>
      <p className="text-slate-300 mb-12 text-center z-10">
        You mean more to me than you know.
      </p>

      {/* SEND A HUG BUTTON & FLOATING HEARTS ANIMATION */}
      <div className="relative z-10">
        <button
          onClick={() => setHugSent(true)}
          disabled={hugSent}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            hugSent 
              ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' 
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
          }`}
        >
          {hugSent ? (
            <>Hug sent! 💖</>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send a hug
            </>
          )}
        </button>

        {/* Button dabane par hawa me udte hue Hearts */}
        {hugSent && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
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
                transition={{ 
                  duration: 1.5 + Math.random(), 
                  ease: "easeOut",
                  delay: Math.random() * 0.2
                }}
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
