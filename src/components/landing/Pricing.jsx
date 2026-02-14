import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Gift } from 'lucide-react';

const GiftCard = ({ tier, prize, description, color, gradient, shadowColor, Icon, delay, isOpen, onToggle }) => {
    return (
        <div
            className="relative w-full max-w-[260px] sm:max-w-xs h-56 sm:h-64 mx-auto perspective-1000 cursor-pointer group"
            onClick={onToggle}
        >
            <motion.div
                className="w-full h-full relative preserve-3d"
                initial={{ transform: "translateY(0px)" }}
                animate={{ transform: isOpen ? "translateY(30px)" : "translateY(0px)" }}
                transition={{ duration: 0.5 }}
            >
                {/* Hidden Content (Prize Details) - Becomes visible when box opens */}
                <motion.div
                    className="absolute inset-x-4 top-0 h-48 bg-black/90 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center p-4 backdrop-blur-md z-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{
                        opacity: isOpen ? 1 : 0,
                        y: isOpen ? -110 : 0,
                        scale: isOpen ? 1 : 0.8
                    }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                    </div>

                    <div className="relative z-10 w-full">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Icon className={`text-${color}-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`} size={28} />
                            <h3 className={`text-lg font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} uppercase tracking-widest`}>
                                {tier}
                            </h3>
                        </div>

                        <div className="py-2 border-y border-white/10 w-full mb-2 bg-white/5 rounded-lg">
                            <p className="text-3xl font-bold text-white font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">{prize}</p>
                            <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Cash Prize</p>
                        </div>

                        <p className="text-zinc-300 text-xs font-medium leading-relaxed px-2">
                            {description}
                        </p>
                    </div>
                </motion.div>

                {/* Box Lid */}
                <motion.div
                    className={`absolute top-0 left-0 w-full h-16 rounded-t-lg z-20 origin-top bg-gradient-to-br ${gradient} shadow-lg`}
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                        rotateX: isOpen ? -120 : 0,
                        y: isOpen ? -16 : 0
                    }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
                >
                    {/* Lid Ribbon (Top) */}
                    <div className="absolute inset-x-0 mx-auto w-6 h-full bg-red-600/80 shadow-md" />
                    <div className="absolute inset-y-0 my-auto h-6 w-full bg-red-600/80 shadow-md top-1/2 -translate-y-1/2" />

                    {/* Lid Front Face (for thickness effect) */}
                    <div className={`absolute bottom-0 w-full h-3 bg-gradient-to-r ${gradient} brightness-75 transform translate-y-full`} />
                </motion.div>

                {/* Box Body */}
                <motion.div
                    className={`absolute bottom-0 w-full h-44 rounded-b-xl z-10 bg-gradient-to-br ${gradient} shadow-[0_20px_50px_${shadowColor}] flex flex-col items-center justify-center overflow-hidden`}
                >
                    {/* Wrapping Paper Pattern/Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                    {/* Vertical Ribbon */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 h-full bg-red-600 shadow-xl z-20" />

                    {/* Front Text (Hint) */}
                    <motion.div
                        animate={{ opacity: isOpen ? 0 : 1 }}
                        className="relative z-30 text-center"
                    >
                        {/* Badge on Box */}
                        <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 shadow-lg mb-2">
                            <h4 className="text-white font-black text-lg uppercase tracking-wider drop-shadow-md">{tier}</h4>
                        </div>

                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const Pricing = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const prizes = [
        {
            tier: "Runner-Up",
            prize: "₹4,000",
            description: "+Trophy & Certificate of Excellence",
            color: "slate",
            gradient: "from-slate-300 via-gray-200 to-slate-400",
            shadowColor: "rgba(148,163,184,0.4)",
            Icon: Medal
        },
        {
            tier: "Winner",
            prize: "₹7,000",
            description: "+ Trophy & Certificate of Excellence",
            color: "yellow",
            gradient: "from-yellow-200 via-amber-100 to-yellow-400",
            shadowColor: "rgba(250,204,21,0.4)",
            Icon: Trophy
        },
        {
            tier: "Rising Diploma Talent",
            prize: "₹4,000",
            description: "+ Trophy & Certificate of Excellence",
            color: "sky",
            gradient: "from-sky-300 via-cyan-200 to-sky-400",
            shadowColor: "rgba(56,189,248,0.4)",
            Icon: Award
        }
    ];

    return (
        <section id="prizes" className="py-20 sm:py-32 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#0AC4E0]/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-[#0AC4E0] mb-6 font-outfit drop-shadow-xl">
                        PRIZE POOL
                    </h2>
                    <p className="text-[#FFFCFB] text-lg max-w-2xl mx-auto font-medium">
                        Glory awaits the bold. Compete for cash prizes, trophies, and recognition.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto items-end">
                    {prizes.map((prize, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className={prize.tier === "Winner" ? "mb-12 md:mb-16 order-first md:order-none" : ""}
                        >
                            {/* Winner card pushed up or scaled slightly larger? */}
                            <div className={prize.tier === "Winner" ? "transform md:-translate-y-12 md:scale-110 relative z-20" : "relative z-10"}>
                                <GiftCard
                                    {...prize}
                                    delay={i * 0.2}
                                    isOpen={openIndex === i}
                                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
