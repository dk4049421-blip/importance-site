import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MoveRight } from "lucide-react";

export default function MessageScreen({ onNext }) {
    const [isOpen, setIsOpen] = useState(false);

    const greeting = "To my favorite person,";

    const mainMessage = `I wanted to write this down because sometimes just saying it isn't enough. You need to know exactly how important you are to me.
Before you came along, things were fine. But with you? Everything is just brighter. Your laugh is my favorite sound, and your presence is my absolute safest space.
I know life gets crazy, but I see you. I see how hard you try and how beautiful your soul genuinely is. You are the heartbeat of my happiest days.`;

    const signOff = "Yours entirely, always.";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center z-10 w-full h-full max-w-2xl mx-auto"
        >
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="envelope"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, rotate: -10 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={() => setIsOpen(true)}
                    >
                        <motion.div
                            whileHover={{ y: -10}}
                            transition={{ duration: 0.5 }}
                            className="relative bg-pink-500/10 p-10 rounded-3xl border border-pink-500/30 backdrop-blur-md shadow-[0_0_10px_rgba(236,72,153,0.2)]"
                        >
                            <Mail className="w-24 h-24 text-pink-300 group-hover:text-pink-400 transition-colors" />
                        </motion.div>
                        <p className="mt-8 text-pink-200 tracking-wide  text-sm animate-pulse">
                            Tap to open your letter
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="open-letter"
                        initial={{ opacity: 0, scale: 0.8, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.1 }}
                        className="relative w-full max-h-152 bg-white/5 backdrop-blur-2xl border border-pink-500/20 rounded-4xl p-8 md:p-10 shadow-[0_0_30px_rgba(236,72,153,0.15)] flex flex-col"
                    >

                        <div className="mt-4 mb-6">
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-2xl font-semibold text-pink-300/90"
                            >
                                {greeting}
                            </motion.h3>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1.5 }}
                            className="text-slate-200 md:text-lg leading-loose font-light whitespace-pre-wrap max-h-[50vh] overflow-y-auto"
                        >
                            {mainMessage}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.5, duration: 0.8 }}
                            className="mt-8 text-right text-pink-400 font-medium italic"
                        >
                            {signOff}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3.5, duration: 0.5 }}
                            className="mt-10 flex justify-center"
                        >
                            <button
                                onClick={onNext}
                                className="flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-pink-500 shadow-lg"
                            >
                                One last thing <MoveRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

