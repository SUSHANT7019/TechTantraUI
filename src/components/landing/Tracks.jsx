import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const TrackCard = ({ title, description, color, video, isFlipped, onFlip }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const handleClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            onFlip();
        }
    };

    return (
        <div
            className="w-[220px] sm:w-[260px] h-[340px] sm:h-[390px] cursor-pointer perspective-1000 group"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onAnimationComplete={() => {
                    setIsAnimating(false);
                    setAnimationKey(prev => prev + 1); // Restart border animation after flip
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front Side */}
                <div
                    className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${color} flex flex-col p-6 backface-hidden`}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="absolute inset-0 bg-black/20" />

                    {/* video Area */}
                    <div className="relative z-10 w-full h-40 bg-black/40 rounded-xl mb-6 overflow-hidden border border-white/10 shadow-inner group">
                        <video
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <h3 className="text-2xl font-black text-white mb-2 font-outfit uppercase tracking-wider drop-shadow-md">{title}</h3>
                    </div>

                    {/* Decorative Blur */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                </div>

                {/* Back Side */}
                <div
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-[#0AC4E0]/30 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center backface-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <h3 className="text-xl font-black text-[#0AC4E0] mb-6 font-outfit uppercase tracking-wide">{title}</h3>
                    <p className="text-zinc-300 text-lg font-medium leading-relaxed drop-shadow-sm">
                        {description}
                    </p>


                    {/* <div className="mt-8 px-4 py-2 border border-[#0AC4E0]/50 rounded-full text-[#0AC4E0] text-xs font-bold uppercase tracking-widest bg-[#0AC4E0]/10">
                        View Details
                    </div> */}


                </div>
            </motion.div>

            {/* Glowing Running Border Effect */}
            <div className={`absolute inset-0 z-50 pointer-events-none rounded-2xl overflow-hidden transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <svg className="w-full h-full" width="100%" height="100%" viewBox="0 0 260 390" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                    <motion.rect
                        key={animationKey}
                        x="2" y="2" width="256" height="386"
                        rx="16" ry="16"
                        fill="none"
                        stroke="#0AC4E0"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="1300"
                        initial={{ strokeDashoffset: 1300 }}
                        animate={{ strokeDashoffset: isHovered ? 0 : 1300 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="drop-shadow-[0_0_8px_#0AC4E0]"
                    />
                </svg>
            </div>
        </div>
    );
};

const Tracks = () => {
    const scrollContainerRef = useRef(null);
    const [activeCardIndex, setActiveCardIndex] = useState(null);

    const handleCardClick = (index) => {
        setActiveCardIndex(activeCardIndex === index ? null : index);
    };

    const tracks = [
        {
            title: "AI & ML",
            description: "Turn data into decisions—build intelligent solutions that learn, predict, and transform the future.",
            color: "from-black to-[#0992C2]/60",
            video: "https://res.cloudinary.com/dgx4bwlbo/video/upload/v1771039091/aiml_ndtppx.mp4"
        },
        {
            title: "Agri Tech",
            description: "Empower farmers and food systems with tech-driven solutions for sustainable agriculture.",
            color: "from-black to-[#0AC4E0]/60",
            video: "https://res.cloudinary.com/dgx4bwlbo/video/upload/v1771039090/agritech_hfziuz.mp4"
        },
        {
            title: "IoT & Robotics",
            description: "Connect, automate, and revolutionize the physical world with smart devices and robots.",
            color: "from-black to-[#0992C2]/60",
            video: "https://res.cloudinary.com/dgx4bwlbo/video/upload/v1771039092/iotrb_oebgoy.mp4"
        },
        {
            title: "Fintech",
            description: "Redefine finance with innovative tools that make money smarter, faster, and more secure.",
            color: "from-black to-[#0AC4E0]/60",
            video: "https://res.cloudinary.com/dgx4bwlbo/video/upload/v1771039089/fintech_msl7mv.mp4"
        },
        {
            title: "Open Innovation",
            description: "Think beyond boundaries—create bold, out-of-the-box solutions for real-world challenges.",
            color: "from-black to-[#0AC4E0]/60",
            video: "https://res.cloudinary.com/dgx4bwlbo/video/upload/v1771039091/open_f1o189.mp4"
        },
    ];

    return (
        <section id="tracks" className="py-24 relative overflow-hidden bg-black/50">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-[#0992C2] mb-4 font-outfit">TRACKS</h2>
                    <p className="text-[#FFFCFB] text-lg font-medium max-w-2xl mx-auto">Choose your arena and dominate the competition with your innovative solutions.</p>
                </motion.div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto pb-12 pt-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-px-8 md:scroll-px-12"
                >
                    <div className="flex w-fit mx-auto gap-4 sm:gap-8 px-8 md:px-12">
                        {tracks.map((track, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="snap-start flex-shrink-0"
                            >
                                <TrackCard
                                    {...track}
                                    isFlipped={activeCardIndex === i}
                                    onFlip={() => handleCardClick(i)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Scroll hint indicators could go here if needed */}
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0AC4E0]/20 to-transparent -z-10" />
        </section>
    );
};

export default Tracks;
