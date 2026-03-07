import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function OutroScreen() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center z-10 px-2 w-full h-full relative"
        >
            <div className="relative flex items-center justify-center mb-14">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-20"
                >
                    <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" />
                    <Heart className="w-24 h-24 md:w-32 md:h-32 text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" fill="currentColor" />
                </motion.div>
            </div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
                You are my <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">universe</span>
            </motion.h2>

            <motion.p
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
                className="text-lg text-slate-300 mb-12 max-w-md"
            >
                You mean more to me than you know.
            </motion.p>
        </motion.div>
    );
};