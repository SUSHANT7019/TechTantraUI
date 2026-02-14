import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Disc as Discord, ArrowUp, Mail, Heart, CalendarDays, FileText, MapPin, ExternalLink, Lightbulb } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        quickLinks: [
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Schedule", href: "#schedule" },
            { name: "Tracks", href: "#tracks" },
            { name: "Prizes", href: "#prizes" }
        ],
        support: [
            { name: "FAQ", href: "#faq" },
            { name: "Venue", href: "#venue" },
            { name: "Contact Us", href: "mailto:techtantra1074@gmail.com" },
            { name: "Register", href: "/register" }
        ],
        resources: [
            { name: "Schedule", href: "https://drive.google.com/file/d/1bx_mhuBYZ2A569m2crGM1f8e5FAhinLI/view?usp=drive_link", icon: CalendarDays },
            { name: "Rule Book", href: "https://drive.google.com/file/d/1STp8d7vo7VusK9ybh-p9eJDl1o0HPKIe/view?usp=drive_link", icon: FileText },
            { name: "Problem Statements", href: "https://drive.google.com/file/d/1ysd6Qjk1hD_kQ62ibje9dEj9L9WMGLpf/view?usp=drive_link", icon: Lightbulb }
        ]

    };

    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/techtantra1.0_sveri_2k26/", color: "hover:text-pink-500", bg: "hover:bg-pink-500/10 hover:border-pink-500/30", label: "Instagram" },
    ];

    return (
        <footer className="relative overflow-hidden bg-gradient-to-b from-black/80 via-black/95 to-black border-t border-white/5">

            {/* ═══════════════════════════════════════════ */}
            {/*          BACKGROUND EFFECTS                */}
            {/* ═══════════════════════════════════════════ */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[#0AC4E0]/5 blur-[120px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-600/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">

                {/* ═══════════════════════════════════════ */}
                {/*    MOBILE: Premium Stacked Layout       */}
                {/*    DESKTOP: Classic 4-Column Grid       */}
                {/* ═══════════════════════════════════════ */}

                <div className="pt-10 sm:pt-16 pb-8">

                    {/* ─── Brand & Social (Always on top) ─── */}
                    <div className="text-center sm:text-left mb-10 sm:mb-0">

                        {/* Desktop: 4-col grid */}
                        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
                            {/* Brand */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2.5">
                                    <img src="/logo.jpeg" alt="TechTantra" className="h-10 w-10 rounded-full object-cover ring-2 ring-cyan-400/20" />
                                    <h2 className="text-xl font-black text-white font-outfit tracking-tight">
                                        TECH<span className="text-cyan-400">TANTRA</span>
                                    </h2>
                                </div>
                                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                                    Igniting innovation and coding the future. Join us for 24 hours of creation, collaboration, and chaos.
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            aria-label={social.label}
                                            className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 transition-all duration-300 hover:scale-110 ${social.color} ${social.bg}`}
                                        >
                                            <social.icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-white font-bold font-outfit mb-5 text-sm uppercase tracking-widest text-zinc-400">Quick Links</h3>
                                <ul className="space-y-2.5">
                                    {footerLinks.quickLinks.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href} className="text-zinc-500 hover:text-[#0AC4E0] text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:translate-x-1">
                                                <span className="w-1 h-1 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 group-hover:w-2 transition-all duration-200" />
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 className="text-white font-bold font-outfit mb-5 text-sm uppercase tracking-widest text-zinc-400">Support</h3>
                                <ul className="space-y-2.5">
                                    {footerLinks.support.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href} className="text-zinc-500 hover:text-[#0AC4E0] text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:translate-x-1">
                                                <span className="w-1 h-1 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 group-hover:w-2 transition-all duration-200" />
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h3 className="text-white font-bold font-outfit mb-5 text-sm uppercase tracking-widest text-zinc-400">Resources</h3>
                                <div className="space-y-3">
                                    {footerLinks.resources.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all duration-300"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                                <link.icon size={16} className="text-cyan-400" />
                                            </div>
                                            <div>
                                                <span className="text-zinc-300 text-sm font-semibold group-hover:text-white transition-colors">{link.name}</span>
                                                <span className="block text-zinc-600 text-xs">View PDF</span>
                                            </div>
                                            <ExternalLink size={14} className="text-zinc-600 group-hover:text-cyan-400 ml-auto transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ═══════════════════════════════════════ */}
                        {/*  MOBILE: Attractive Card-Based Layout   */}
                        {/* ═══════════════════════════════════════ */}
                        <div className="sm:hidden">

                            {/* Brand Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center mb-8"
                            >
                                <div className="relative mb-4">
                                    <img
                                        src="/logo.jpeg"
                                        alt="TechTantra"
                                        className="h-16 w-16 rounded-2xl object-cover ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-400/10"
                                    />
                                    <div className="absolute -inset-2 rounded-2xl bg-cyan-400/10 blur-xl -z-10" />
                                </div>
                                <h2 className="text-2xl font-black text-white font-outfit tracking-tight mb-2">
                                    TECH<span className="text-cyan-400">TANTRA</span>
                                </h2>
                                <p className="text-zinc-500 text-sm leading-relaxed max-w-[260px]">
                                    Igniting innovation and coding the future ✨
                                </p>
                            </motion.div>

                            {/* Social Icons - Prominent Row */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex justify-center gap-4 mb-10"
                            >
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-300 active:scale-90 ${social.color} ${social.bg}`}
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </motion.div>

                            {/* Resource Cards - Prominent */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="grid grid-cols-2 gap-3 mb-8"
                            >
                                {footerLinks.resources.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-cyan-500/30 active:scale-95 transition-all duration-300"
                                    >
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/15 flex items-center justify-center group-hover:from-cyan-500/25 group-hover:to-blue-600/25 transition-colors">
                                            <link.icon size={20} className="text-cyan-400" />
                                        </div>
                                        <span className="text-zinc-300 text-sm font-bold tracking-wide">{link.name}</span>
                                    </a>
                                ))}
                            </motion.div>

                            {/* Links - Clean Two-Column Layout */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-2 gap-x-6 gap-y-1 mb-8 px-4"
                            >
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60 mb-3">Navigate</h4>
                                    {footerLinks.quickLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="block py-1.5 text-zinc-500 hover:text-white active:text-cyan-400 text-sm font-medium transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60 mb-3">Support</h4>
                                    {footerLinks.support.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="block py-1.5 text-zinc-500 hover:text-white active:text-cyan-400 text-sm font-medium transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Divider */}
                            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mx-auto mb-6" />
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════ */}
                {/*            BOTTOM BAR                   */}
                {/* ═══════════════════════════════════════ */}
                <div className="py-5 sm:py-6 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                        {/* Copyright */}
                        <p className="text-zinc-600 text-xs sm:text-sm font-medium text-center flex items-center gap-1.5 flex-wrap justify-center">
                            <span>© 2026 TechTantra.</span>
                            <span className="hidden sm:inline">Made with</span>
                            <span className="sm:hidden">With</span>
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
                            <span>by</span>
                            <span className="text-zinc-400 font-semibold">Technical Team</span>
                        </p>

                        {/* Back to Top */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
                        >
                            <span className="text-zinc-500 group-hover:text-cyan-400 text-xs font-bold uppercase tracking-wider transition-colors">
                                Back to Top
                            </span>
                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-all">
                                <ArrowUp size={12} className="text-zinc-500 group-hover:text-cyan-400 group-hover:-translate-y-0.5 transition-all" />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
