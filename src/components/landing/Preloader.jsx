import { motion } from 'framer-motion';

const Preloader = ({ setLoading }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="text-center">
                <motion.h1
                    className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 font-outfit"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    TECHTANTRA 1.0
                </motion.h1>
                <motion.div
                    className="h-1 w-0 bg-gradient-to-r from-cyan-400 to-purple-600 mt-4 mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                />
            </div>
        </motion.div>
    );
};

export default Preloader;
