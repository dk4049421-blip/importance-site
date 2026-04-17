"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/screens/IntroScreen';
import MeterScreen from '@/components/screens/MeterScreen';
import StarScreen from '@/components/screens/StarScreen';
import MessageScreen from '@/components/screens/MessageScreen';
import OutroScreen from '@/components/screens/OutroScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const screens = [
    <IntroScreen key="screen-0" onNext={() => setCurrentScreen(1)} />, 
    <StarScreen key="screen-1" onNext={() => setCurrentScreen(2)} />, 
    <MeterScreen key="screen-2" onNext={() => setCurrentScreen(3)} />, 
    <MessageScreen key="screen-3" onNext={() => setCurrentScreen(4)} />, 
    <OutroScreen key="screen-4" />
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-gray-900 via-black to-purple-900/40">

      {/* Floating Background Particles (Video Jaisa) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              initial={{ y: "100vh", x: `${Math.random() * 100}vw`, opacity: Math.random() }}
              animate={{ y: "-10vh", opacity: [0, 1, 0] }}
              transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            />
          ))}
        </div>
      )}

      {currentScreen > 0 && <audio autoPlay loop src="/song.mp3" />}

      <main className="relative w-full min-h-screen flex items-center justify-center p-6 py-10 z-10">
        <AnimatePresence mode="wait">
          {screens[currentScreen]}
        </AnimatePresence>
      </main>

      <motion.div
        initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light">
        @Deepak
      </motion.div>
    </div>
  );
}
