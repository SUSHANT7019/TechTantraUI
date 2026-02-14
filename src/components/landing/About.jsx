import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Users, Globe, Trophy } from 'lucide-react';

const FeatureCard = ({ title, description, Icon, delay }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            whileHover={{ y: -10, scale: 1.02 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 hover:bg-black/60 transition-all duration-300 group overflow-hidden"
        >
            {/* Glowing Running Border Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg className="w-full h-full" width="100%" height="100%" style={{ overflow: 'visible' }}>
                    <motion.rect
                        width="100%"
                        height="100%"
                        x="0"
                        y="0"
                        rx="16"
                        ry="16"
                        fill="none"
                        stroke="#0AC4E0"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: isHovered ? 1 : 0,
                            opacity: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ filter: "drop-shadow(0 0 8px #0AC4E0)" }}
                    />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="text-cyan-400 mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 transform origin-left">
                    <Icon size={32} className="sm:hidden" />
                    <Icon size={40} className="hidden sm:block" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-outfit">{title}</h3>
                <p className="text-zinc-300 leading-relaxed font-light">{description}</p>
            </div>
        </motion.div>
    );
};

const About = () => {
    const features = [
        { title: "24 Hours", description: "Non-stop coding, caffeine, and creativity to build disruptive solutions.", Icon: Clock },
        { title: "Expert Mentors", description: "Get guidance from industry leaders and tech pioneers throughout the event.", Icon: Users },
        { title: "Global Network", description: "Connect with developers, designers, and innovators from around the world.", Icon: Globe },
        { title: "15k Prize Pool", description: "Win big with cash prizes, and exclusive swags.", Icon: Trophy },
    ];

    return (
        <section id="about" className="py-16 sm:py-24 relative">
            <div className="container mx-auto px-3 sm:px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0992C2] mb-4 font-outfit">Why Participate?</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
