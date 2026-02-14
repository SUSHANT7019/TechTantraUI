import { useState, useMemo, useRef, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ───────────────────────── CSS keyframe (injected once) ───────────────────────── */
const ORBIT_STYLE_ID = 'schedule-orbit-keyframes';

/* ──────────────────────────── Schedule Data ──────────────────────────── */
const scheduleData = [
    {
        day: "Day 1",
        date: "Feb 20th",
        events: [
            {
                time: "09:30 AM",
                event: "Check-in & Registration",
                descriptions: [
                    "Kick off your TechTantra experience — grab your badge, swag, and welcome kit.",
                    "Get settled, meet fellow innovators, and prepare to bring ideas to life.",
                ],
            },
            {
                time: "10:00 AM",
                event: "Opening Ceremony",
                descriptions: [
                    "Ignite the event with keynote inspiration and theme reveal.",
                    "Feel the energy, set intentions, and get ready to build something epic.",
                ],
            },
            {
                time: "11:00 AM",
                event: "Start Of The Journey",
                descriptions: [
                    "The clock starts and the creative journey begins — form teams and ignite ideas.",
                    "Turn concepts into coded reality as the 24-hour challenge officially kicks off.",
                ],
            },
            {
                time: "12:00 PM",
                event: "Ideation & Planning",
                descriptions: [
                    "Refine your problem statement and blueprint your winning solution.",
                    "Collaborate, strategize, and map out your development roadmap for success.",
                ],
            },
            {
                time: "01:30 PM",
                event: "Lunch Break",
                descriptions: [
                    "Recharge with good food and energizing conversations with peers.",
                    "Fuel your body so your mind stays sharp for what\u2019s ahead.",
                ],
            },
            {
                time: "02:30 PM",
                event: "Development Phase 1",
                descriptions: [
                    "Start building the core of your idea with focused development.",
                    "Code foundational features and make the first real progress toward your goal.",
                ],
            },
            {
                time: "05:00 PM",
                event: "Tea Break",
                descriptions: [
                    "Pause for a refreshing break and let new ideas percolate.",
                    "Re-energize with tea and chat about what you\u2019ve built so far.",
                ],
            },
            {
                time: "05:30 PM",
                event: "Development Phase 2",
                descriptions: [
                    "Return to the codebase with momentum — polish and expand features.",
                    "Iterate fast, collaborate hard, and push your solution toward completion.",
                ],
            },
            {
                time: "08:30 PM",
                event: "Dinner Break",
                descriptions: [
                    "Enjoy a well-deserved dinner and refuel for the night ahead.",
                    "Connect with mentors and peers over hearty food and insights.",
                ],
            },
            {
                time: "10:00 PM",
                event: "Development Phase 3",
                descriptions: [
                    "The night shift begins — breathe life into remaining features.",
                    "Push boundaries, debug aggressively, and race toward the next milestone.",
                ],
            },
        ],
    },
    {
        day: "Day 2",
        date: "Feb 21st",
        events: [
            {
                time: "01:00 AM",
                event: "Tea Break",
                descriptions: [
                    "Refresh your energy with a warm cup and light snacks.",
                    "Embrace the midnight spirit and stay dialed in for innovation.",
                ],
            },
            {
                time: "01:30 AM",
                event: "Overnight Build Spirit",
                descriptions: [
                    "Harness the quiet hours to build features that matter most.",
                    "Keep the momentum alive — breakthroughs happen when persistence meets focus.",
                ],
            },
            {
                time: "06:00 AM",
                event: "Refreshment Break",
                descriptions: [
                    "Stretch, hydrate, and reset your focus as dawn breaks.",
                    "Let fresh energy and dawn light spark new ideas and refinements.",
                ],
            },
            {
                time: "06:30 AM",
                event: "Testing & Final Touch",
                descriptions: [
                    "Polish your project with rigorous testing and bug fixes.",
                    "Make UI/UX seamless and align every part of your solution to excellence.",
                ],
            },
            {
                time: "07:30 AM",
                event: "Breakfast & Tea Break",
                descriptions: [
                    "Replenish with breakfast and prepare for the critical final hours.",
                    "Briefly relax, then refocus for the final stretch of development.",
                ],
            },
            {
                time: "08:30 AM",
                event: "Sprint Round",
                descriptions: [
                    "Make your final push — wrap up key features and polish demos.",
                    "Sync as a team, finalize your pitch, and perfect your presentation flow.",
                ],
            },
            {
                time: "09:30 AM",
                event: "Final Presentation Round",
                descriptions: [
                    "Showcase your innovation confidently to judges and peers.",
                    "Tell your story, highlight impact, and leave a lasting impression.",
                ],
            },
            {
                time: "11:00 AM",
                event: "End Of The Journey",
                descriptions: [
                    "Reflect on the journey you\u2019ve traveled and celebrate your grit.",
                    "Acknowledge growth, creativity, and resilience of every participant.",
                ],
            },
            {
                time: "12:00 PM",
                event: "Prize Distribution",
                descriptions: [
                    "Honor excellence — winners and standout contributors take the stage.",
                    "Celebrate achievement and inspire everyone to push further next time.",
                ],
            },
            {
                time: "01:00 PM",
                event: "End Of The Era",
                descriptions: [
                    "Officially close the event on a high note with gratitude and pride.",
                    "Carry forward the skills, friendships, and memories beyond TechTantra.",
                ],
            },
        ],
    },
];

/* Precompute flat list (data is static, no need for useMemo) */
const flatEvents = scheduleData.flatMap((dayData) =>
    dayData.events.map((evt) => ({
        ...evt,
        day: dayData.day,
        date: dayData.date,
    }))
);

/* ──────────────────────── Orbit components (pure CSS) ──────────────────────── */

const OrbitingIcon = memo(({ radius, duration, color = "#0AC4E0", delay = 0, reverse = false, letter }) => {
    const dir = reverse ? "reverse" : "normal";
    return (
        <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
                width: radius * 2,
                height: radius * 2,
                border: `1px solid ${color}20`,
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    animation: `orbit-spin ${duration}s linear ${delay}s infinite ${dir}`,
                }}
            >
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border-2 border-current flex items-center justify-center text-xs font-bold text-white shadow-[0_0_8px_currentColor]"
                    style={{
                        color,
                        animation: `orbit-spin ${duration}s linear ${delay}s infinite ${reverse ? "normal" : "reverse"}`,
                    }}
                >
                    {letter}
                </div>
            </div>
        </div>
    );
});

const OrbitPath = memo(({ radius, color = "#0AC4E0" }) => (
    <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
            width: radius * 2,
            height: radius * 2,
            border: `1.5px solid ${color}40`,
        }}
    />
));

/* ──────────────────────── Desktop Timeline Item ──────────────────────── */

const ScheduleItem = memo(({ time, event, descriptions, isLast }) => (
    <div className="relative pl-8 pb-8 group">
        {/* Timeline connector line */}
        {!isLast && (
            <div className="absolute left-[5px] top-3 bottom-0 w-[2px] bg-[#0AC4E0]/20" />
        )}

        {/* Timeline dot */}
        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full z-10 bg-black border border-[#0AC4E0] shadow-[0_0_5px_#0AC4E0] transition-colors duration-300 group-hover:bg-[#0AC4E0]" />

        {/* Card */}
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl transition-[transform,background-color] duration-300 group-hover:translate-x-1 group-hover:bg-white/[0.08] group-hover:border-[#0AC4E0]/20">
            <div className="text-sm text-[#0AC4E0] font-mono mb-1 font-bold tracking-wider">
                {time}
            </div>
            <h3 className="text-xl font-black text-[#0992C2] mb-2 tracking-wide group-hover:text-white transition-colors duration-300">
                {event}
            </h3>
            <div className="space-y-1">
                {descriptions.map((desc, i) => (
                    <p key={i} className="text-[#FFFCFB]/70 text-sm font-semibold leading-relaxed">
                        {desc}
                    </p>
                ))}
            </div>
        </div>
    </div>
));

/* ──────────────────────── Mobile Carousel Card ──────────────────────── */

const SWIPE_THRESHOLD = 50;

const MobileScheduleCard = memo(({ item, index, total, onPrev, onNext }) => {
    /* Touch / swipe handling */
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);

    const onTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    }, []);

    const onTouchMove = useCallback((e) => {
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }, []);

    const onTouchEnd = useCallback(() => {
        if (touchDeltaX.current > SWIPE_THRESHOLD) onPrev();
        else if (touchDeltaX.current < -SWIPE_THRESHOLD) onNext();
    }, [onPrev, onNext]);

    /* Slide direction for animation */
    const [direction, setDirection] = useState(0);
    const prevIndex = useRef(index);

    if (prevIndex.current !== index) {
        setDirection(index > prevIndex.current ? 1 : -1);
        prevIndex.current = index;
    }

    const variants = {
        enter: (d) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
        center: { opacity: 1, x: 0 },
        exit: (d) => ({ opacity: 0, x: d > 0 ? -30 : 30 }),
    };

    return (
        <div
            className="w-full bg-black/90 rounded-2xl border border-[#0AC4E0]/20 shadow-lg overflow-hidden flex flex-col"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Day header + counter */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-white font-outfit">{item.day}</span>
                    <span className="text-[#0AC4E0] font-mono text-xs font-bold">{item.date}</span>
                </div>
                <span className="text-white/40 text-xs font-mono">
                    {index + 1} / {total}
                </span>
            </div>

            {/* Animated content */}
            <div className="px-4 pb-4 flex-1 min-h-[200px] relative">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                        {/* Time badge */}
                        <div className="inline-block bg-[#0AC4E0]/10 border border-[#0AC4E0]/20 rounded-lg px-3 py-1 mb-3">
                            <span className="text-[#0AC4E0] font-mono text-sm font-bold tracking-wider">
                                {item.time}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-black text-[#0992C2] mb-3 tracking-wide">
                            {item.event}
                        </h3>

                        {/* Descriptions */}
                        <div className="space-y-2">
                            {item.descriptions.map((desc, i) => (
                                <p key={i} className="text-[#FFFCFB]/70 text-sm font-semibold leading-relaxed">
                                    {desc}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation row */}
            <div className="flex items-center justify-between px-4 pb-4">
                <button
                    onClick={onPrev}
                    disabled={index === 0}
                    className="w-10 h-10 rounded-full border border-[#0AC4E0]/20 bg-white/5 flex items-center justify-center text-[#0AC4E0] disabled:opacity-20 disabled:cursor-not-allowed active:scale-95 transition-transform duration-200"
                    aria-label="Previous activity"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>

                <div className="flex items-center gap-1.5">
                    {Array.from({ length: Math.min(total, 10) }, (_, i) => {
                        const isCurrent = i === Math.floor((index / total) * 10);
                        return (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${isCurrent ? "w-4 bg-[#0AC4E0]" : "w-1.5 bg-white/10"}`}
                            />
                        );
                    })}
                </div>

                <button
                    onClick={onNext}
                    disabled={index === total - 1}
                    className="w-10 h-10 rounded-full border border-[#0AC4E0]/20 bg-white/5 flex items-center justify-center text-[#0AC4E0] disabled:opacity-20 disabled:cursor-not-allowed active:scale-95 transition-transform duration-200"
                    aria-label="Next activity"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
            </div>
        </div>
    );
});

/* ──────────────────────── Main Schedule Component ──────────────────────── */

const Schedule = () => {
    const [mobileIndex, setMobileIndex] = useState(0);

    /* Inject orbit keyframe once, clean up on unmount */
    useEffect(() => {
        if (!document.getElementById(ORBIT_STYLE_ID)) {
            const tag = document.createElement("style");
            tag.id = ORBIT_STYLE_ID;
            tag.textContent = `@keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
            document.head.appendChild(tag);
        }
        return () => {
            const existing = document.getElementById(ORBIT_STYLE_ID);
            if (existing) existing.remove();
        };
    }, []);

    const handlePrev = useCallback(
        () => setMobileIndex((i) => Math.max(0, i - 1)),
        []
    );
    const handleNext = useCallback(
        () => setMobileIndex((i) => Math.min(flatEvents.length - 1, i + 1)),
        []
    );

    return (
        <section
            id="schedule"
            className="py-12 md:py-16 relative overflow-hidden flex flex-col justify-center"
            style={{ contain: 'layout paint' }}
        >
            <div className="container mx-auto px-4 relative z-10">
                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0992C2] mb-3 sm:mb-4 font-outfit tracking-tight">
                        THE TIMELINE
                    </h2>
                    <p className="text-[#0AC4E0] font-bold text-sm sm:text-lg tracking-widest uppercase">
                    24 Hours of Creation
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-20">
                    {/* ── Orbit Visual (desktop only) ── */}
                    <div className="hidden lg:block sticky top-32 w-[350px] h-[350px] flex-shrink-0">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute w-64 h-64 opacity-20" style={{ background: 'radial-gradient(circle, #0992C2 0%, transparent 70%)' }} />
                            <div className="border border-[#0992C2]/40 w-28 h-28 rounded-full flex items-center justify-center bg-black/40 z-20 shadow-lg">
                                <span className="text-4xl font-black text-white font-outfit">24H</span>
                            </div>

                            <OrbitPath radius={90} color="#0AC4E0" />
                            <OrbitingIcon radius={90} duration={15} color="#0AC4E0" letter="C" />

                            <OrbitPath radius={140} color="#0992C2" />
                            <OrbitingIcon radius={140} duration={25} reverse color="#0992C2" letter="O" />

                            <OrbitPath radius={190} color="#0AC4E0" />
                            <OrbitingIcon radius={190} duration={35} delay={2} color="#0AC4E0" letter="D" />

                            <OrbitPath radius={240} color="#0AC4E0" />
                            <OrbitingIcon radius={240} duration={45} delay={2} color="#0AC4E0" letter="E" />
                        </div>
                    </div>

                    {/* ── MOBILE carousel (< md) ── */}
                    <div className="block md:hidden w-full max-w-md mx-auto">
                        <MobileScheduleCard
                            item={flatEvents[mobileIndex]}
                            index={mobileIndex}
                            total={flatEvents.length}
                            onPrev={handlePrev}
                            onNext={handleNext}
                        />
                    </div>

                    {/* ── DESKTOP / TABLET scrollable list (≥ md) ── */}
                    <div className="hidden md:flex flex-1 w-full text-left max-w-2xl bg-black/60 rounded-3xl border border-[#0AC4E0]/20 shadow-xl h-[500px] overflow-hidden flex-col relative">
                        {/* Scroll-fade hints */}
                        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />

                        <div
                            className="overflow-y-auto p-6 space-y-8 h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                            data-lenis-prevent="true"
                        >
                            {scheduleData.map((day, dayIdx) => (
                                <div key={dayIdx} className="relative">
                                    {/* Sticky day header */}
                                    <div className="sticky top-0 z-30 mb-6 pt-2 pb-3 bg-black/95 border-b border-[#0AC4E0]/20 -mx-4 px-4 shadow-md flex items-baseline gap-4 rounded-xl">
                                        <h3 className="text-3xl font-black text-white font-outfit">
                                            {day.day}
                                        </h3>
                                        <span className="text-[#0AC4E0] font-mono text-base font-bold">
                                            {day.date}
                                        </span>
                                    </div>

                                    {/* Events */}
                                    <div className="space-y-1 pl-4 text-[#FFFCFB]">
                                        {day.events.map((evt, i) => (
                                            <ScheduleItem
                                                key={i}
                                                time={evt.time}
                                                event={evt.event}
                                                descriptions={evt.descriptions}
                                                isLast={i === day.events.length - 1}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Schedule);

