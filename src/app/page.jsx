"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/screens/IntroScreen';
import MeterScreen from '@/components/screens/MeterScreen'; // Naya Screen Link kiya
import StarScreen from '@/components/screens/StarScreen';
import MessageScreen from '@/components/screens/MessageScreen';
import OutroScreen from '@/components/screens/OutroScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);

  // Screens ka sequence (Order) set kiya
  const screens = [
    <IntroScreen key="screen-0" onNext={() => setCurrentScreen(1)} />, 
    <MeterScreen key="screen-1" onNext={() => setCurrentScreen(2)} />, // Intro ke baad Meter aayega
    <StarScreen key="screen-2" onNext={() => setCurrentScreen(3)} />, 
    <MessageScreen key="screen-3" onNext={() => setCurrentScreen(4)} />, 
    <OutroScreen key="screen-4" />
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-purple-500/20 via-black to-fuchsia-600/20">

      {/* Background Music Code */}
      {currentScreen > 0 && <audio autoPlay loop src="/song.mp3" />}

      <main className="relative w-full min-h-screen flex items-center justify-center p-6 py-10">
        <AnimatePresence mode="wait">
          {screens[currentScreen]}
        </AnimatePresence>
      </main>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light">
        @Deepak
      </motion.div>

    </div>
  );
}
