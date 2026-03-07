import { motion } from "framer-motion";
import { Heart, MoveRight } from "lucide-react";

export default function IntroScreen({ onNext }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center z-10"
        >
            <motion.div
                className="mb-8"
            >
                <Heart className="w-20 h-20 text-pink-500" fill="currentColor" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
                Hey <span className="text-pink-400">Cutiepie...</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-md">
                I made something for you because I want to tell you something important.
            </p>
            <motion.button
                whileHover={{ boxShadow: "0px 0px 20px rgba(236,72,153,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="flex items-center gap-2 bg-pink-600/20 border border-pink-500/50 text-pink-100 px-8 py-4 rounded-full font-medium backdrop-blur-md transition-colors hover:bg-pink-600/40"
            >
                Open it <MoveRight className="w-5 h-5" />
            </motion.button>
        </motion.div>
    )
}