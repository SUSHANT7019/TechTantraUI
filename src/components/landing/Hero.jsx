import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Typewriter = ({ phrases }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Cursor blinking effect
    useEffect(() => {
        const timeout2 = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(timeout2);
    }, []);

    // Typing logic
    useEffect(() => {
        if (index >= phrases.length) return;

        // If finished typing phrase, wait before deleting
        if (subIndex === phrases[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => setReverse(true), 2000);
            return () => clearTimeout(timeout);
        }

        // If finished deleting, switch to next phrase
        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % phrases.length);
            return;
        }

        // Typing/Deleting speed
        const speed = reverse ? 75 : 150;
        const randomSpeed = speed + Math.random() * 50;

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 50 : 100, randomSpeed));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, phrases]);

    return (
        <span className="inline-block relative">
            {phrases[index].substring(0, subIndex)}
            <span className={`inline-block w-[2px] sm:w-[3px] h-[1rem] sm:h-[1.2rem] md:h-[1.5rem] bg-cyan-400 ml-1 align-middle ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
        </span>
    );
};

const RegisterButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-[#0AC4E0] to-[#0992C2] rounded-full shadow-[0_0_20px_rgba(10,196,224,0.3)] hover:shadow-[0_0_35px_rgba(10,196,224,0.6)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0AC4E0] focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
            aria-label="Register Now"
        >
            <span className="relative z-10 mr-2">Register Now</span>
            <svg
                className="w-5 h-5 relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>

            {/* Color fill effect from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        </button>
    );
};

const RuleBookButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-bold text-white transition-all duration-300 ease-in-out bg-transparent border-2 border-white/30 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(10,196,224,0.3)] hover:border-[#0AC4E0] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0AC4E0] focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
            aria-label="Rule Book"
        >
            <svg
                className="w-5 h-5 relative z-10 mr-2 transition-transform duration-300 ease-out group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span className="relative z-10">Rule Book</span>

            {/* Color fill effect from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0AC4E0]/20 to-[#0992C2]/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
        </button>
    );
};

const Hero = () => {
    const ref = useRef(null);
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden text-white px-2 sm:px-0">
            {/* Background Elements - Commented out to show video background */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1531297461136-82lw8e4u57c2?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30 blur-sm"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/50 to-black" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-3 sm:px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-sm sm:text-xl md:text-2xl text-cyan-400 font-mono mb-3 sm:mb-4 tracking-widest min-h-[32px] sm:min-h-[40px] flex items-center justify-center">
                        <Typewriter phrases={["Innovate | Build | Compete", "TechTantra Hackathon 2026"]} />
                    </h2>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-4 sm:mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 font-outfit">
                        TechTantra 1.0
                        <span className="text-translucent-white text-2xl sm:text-3xl md:text-4xl block mt-1 sm:mt-2 tracking-wider">Hack The Future</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-zinc-300 text-sm sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed font-medium drop-shadow-md min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center px-2">
                        <Typewriter phrases={[
                            "Join the elite developers in a 24-hour sprint to build the future.",
                            "Unleash your potential at TechTantra.",
                            "Code. Compete. Conquer.",
                            "Where ideas become innovation.",
                            "Are you ready to make your mark?"
                        ]} />
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <RegisterButton onClick={() => navigate('/register')} />
                        <RuleBookButton onClick={() => window.open('#rulebook', '_self')} />
                    </div>
                </motion.div>
            </div>


        </section>
    );
};

export default Hero;
