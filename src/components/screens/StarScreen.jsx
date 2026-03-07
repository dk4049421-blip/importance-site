import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { MousePointer2, MoveRight, Star } from 'lucide-react';

export default function StarScreen({onNext}) {
    const [stars, setStars] = useState([]);
    const [messageIndex, setMessageIndex] = useState(0);
    const [buttonActive, setButtonActive] = useState(false);

    const messages = [
        "Sometimes life gets a little dark...",
        "But then...",
        "You show up.",
        "And everything lights up."
    ];

    const handlePointerDown = (e) => {
        const { clientX, clientY } = e;
        if (stars.length < messages.length - 1) {
            setStars(prev => [...prev, { id: Date.now(), x: clientX, y: clientY }]);
        }

        if (messageIndex < messages.length - 1) {
            setMessageIndex(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (messageIndex === messages.length - 1) {
            const t = setTimeout(() => setButtonActive(true), 800);
            return () => clearTimeout(t);
        }
    }, [messageIndex]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${buttonActive ? "cursor-default" : "cursor-crosshair"} overflow-hidden`}
            onPointerDown={handlePointerDown}
        >
            <div className="absolute top-1/4 px-6 text-center pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={messageIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl md:text-4xl font-light md:font-normal text-slate-200"
                    >
                        {messages[messageIndex]}
                    </motion.h2>
                </AnimatePresence>

                {messageIndex === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                        className="mt-6 flex items-center justify-center gap-2 text-pink-400/70 text-sm animate-pulse"
                    >
                        <MousePointer2 className="w-4 h-4" /> Tap anywhere on the screen
                    </motion.div>
                )}
            </div>

            {/* Stars */}
            <AnimatePresence>
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1] }}
                        className="absolute pointer-events-none"
                        style={{ left: star.x - 20, top: star.y - 20 }}
                    >
                        <Star className="w-10 h-10 text-yellow-300" fill="currentColor" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {messageIndex === messages.length - 1 && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className={`absolute bottom-50 flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full backdrop-blur-md hover:bg-white/20 transition-all z-50 ${buttonActive ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                    Keep reading <MoveRight className="w-4 h-4" />
                </motion.button>
            )}
        </motion.div>
    );
};
