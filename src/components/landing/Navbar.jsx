import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', id: 'home', emoji: '🏠', path: '/' },
        { name: 'Winners', id: 'winners', emoji: '🏆', path: '/winners' },
        { name: 'About', id: 'about', emoji: '💡' },
        { name: 'Prizes', id: 'prizes', emoji: '🏆' },
        { name: 'Tracks', id: 'tracks', emoji: '🛤️' },
        { name: 'Schedule', id: 'schedule', emoji: '📅' },
        { name: 'FAQ', id: 'faq', emoji: '❓' },
        { name: 'Venue', id: 'venue', emoji: '📍' },
    ];

    const scrollToSection = (id) => {
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = 70;
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementTop - navbarHeight, behavior: 'smooth' });
        }
    };

    const handleNavClick = (link) => {
        setIsOpen(false);
        if (link.path) {
            navigate(link.path);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollToSection(link.id), 300);
        } else {
            // Small delay to let menu close animation finish
            setTimeout(() => scrollToSection(link.id), 100);
        }
    };

    // Stagger animation variants for mobile menu items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.1,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.03,
                staggerDirection: -1,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 120, damping: 14 }
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: { duration: 0.15 }
        }
    };

    return (
        <>
            {/* ═══════════════════════════════════════════ */}
            {/*                  NAV BAR                    */}
            {/* ═══════════════════════════════════════════ */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-black/70 backdrop-blur-xl py-2.5 sm:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                    : 'bg-transparent py-3.5 sm:py-5'
                    }`}
            >
                {/* Top Glow Line */}
                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

                <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2.5 cursor-pointer relative z-[60]"
                        onClick={() => handleNavClick(navLinks[0])}
                    >
                        <div className="relative">
                            <img
                                src="/logo.jpeg"
                                alt="TechTantra"
                                className="h-9 sm:h-12 w-9 sm:w-12 rounded-full object-cover ring-2 ring-cyan-400/30 transition-all duration-300 hover:ring-cyan-400/60"
                            />
                        </div>
                        <span className="text-lg sm:text-xl font-bold font-outfit text-white tracking-tight">
                            TECH<span className="text-cyan-400">TANTRA</span>
                        </span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-2">
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                onClick={() => handleNavClick(link)}
                                className="relative px-3 lg:px-4 py-2 text-zinc-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                            </motion.button>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}
                            className="ml-2 px-5 lg:px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-white text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all border border-cyan-400/20"
                        >
                            Register
                        </motion.button>
                    </div>

                    {/* Mobile Toggle */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={20} className="text-cyan-400" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={20} className="text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </nav>

            {/* ═══════════════════════════════════════════ */}
            {/*    MOBILE FULL-SCREEN MENU (Outside nav)    */}
            {/* ═══════════════════════════════════════════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="md:hidden fixed inset-0 z-[55] bg-black/98 backdrop-blur-3xl overflow-y-auto overscroll-contain"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {/* Decorative Floating Orbs — pointer-events-none so they don't block scroll */}
                        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                            <motion.div
                                className="absolute top-[15%] -left-10 w-52 h-52 rounded-full bg-cyan-500/15 blur-[80px]"
                                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className="absolute bottom-[20%] -right-10 w-44 h-44 rounded-full bg-blue-600/15 blur-[70px]"
                                animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className="absolute top-[50%] left-[30%] w-60 h-60 rounded-full bg-purple-600/8 blur-[100px]"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </div>

                        {/* Menu Content — scrollable */}
                        <motion.div
                            className="relative z-10 flex flex-col items-center min-h-full pt-24 pb-12 px-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Logo at top of menu */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col items-center mb-8"
                            >
                                <div className="relative mb-3">
                                    <img
                                        src="/logo.jpeg"
                                        alt="TechTantra"
                                        className="h-16 w-16 rounded-2xl object-cover ring-2 ring-cyan-400/40 shadow-xl shadow-cyan-500/20"
                                    />
                                    <div className="absolute -inset-3 rounded-2xl bg-cyan-400/10 blur-xl -z-10" />
                                </div>
                                <h3 className="text-xl font-black font-outfit text-white tracking-tight">
                                    TECH<span className="text-cyan-400">TANTRA</span> <span className="text-zinc-500 font-normal text-sm">1.0</span>
                                </h3>
                                <p className="text-zinc-600 text-xs mt-1 tracking-widest uppercase">Hack The Future</p>
                            </motion.div>

                            {/* Gradient Divider */}
                            <motion.div
                                variants={itemVariants}
                                className="w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-6"
                            />

                            {/* Nav Links — Card Style */}
                            <div className="flex flex-col gap-2 w-full max-w-[280px]">
                                {navLinks.map((link) => (
                                    <motion.button
                                        key={link.name}
                                        variants={itemVariants}
                                        onClick={() => handleNavClick(link)}
                                        whileTap={{ scale: 0.96 }}
                                        className="group relative w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-cyan-500/20 active:bg-cyan-500/10 active:border-cyan-500/30 transition-all duration-200"
                                    >
                                        {/* Emoji Icon */}
                                        <span className="text-lg w-7 text-center">{link.emoji}</span>

                                        {/* Link Text */}
                                        <span className="flex-1 text-left text-[15px] font-semibold text-zinc-300 group-hover:text-white group-active:text-cyan-300 transition-colors tracking-wide uppercase font-outfit">
                                            {link.name}
                                        </span>

                                        {/* Arrow */}
                                        <ChevronRight size={16} className="text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                                    </motion.button>
                                ))}
                            </div>

                            {/* Gradient Divider */}
                            <motion.div
                                variants={itemVariants}
                                className="w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-6"
                            />

                            {/* CTA Button */}
                            <motion.button
                                variants={itemVariants}
                                onClick={() => { setIsOpen(false); navigate('/register'); }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative w-full max-w-[280px] py-4 rounded-2xl font-bold text-white text-base overflow-hidden"
                            >
                                {/* Button Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl" />

                                {/* Animated Shimmer */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                                />

                                {/* Outer Glow */}
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-md opacity-40" />

                                <span className="relative flex items-center justify-center gap-2 text-base font-outfit tracking-wide">
                                    <Sparkles size={18} />
                                    Register Now
                                </span>
                            </motion.button>

                            {/* Bottom branding */}
                            <motion.p
                                variants={itemVariants}
                                className="mt-8 text-zinc-700 text-[10px] tracking-[0.25em] uppercase font-medium"
                            >
                                Hackathon 2026 • SVERI COE Pandharpur
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
