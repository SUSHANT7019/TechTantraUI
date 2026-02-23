
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Award, Users, Trophy } from 'lucide-react';
import WinnerCard from '../components/winners/WinnerCard';

const winnersData = [
    {
        teamName: "Brahmastra",
        teamPhoto: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771817119/W_ryltdd.png",
        place: "Winner",
        members: [
            { name: "Sushant Rukumpeth", linkedin: "https://www.linkedin.com/in/sushant-rukumpeth-20b5463a9?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/_sushant_1423_?igsh=MTcwaHQ3N2o0anBwMg==" },

            { name: "Firoz Shaikh", linkedin: "https://www.linkedin.com/in/firoz-shaikh-b9a78a3b2?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "#" },

            { name: "Vijay Chavan", linkedin: "https://www.linkedin.com/in/vijay-chavan-b0821b3b1?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/itz_vijjay_07?igsh=MTVmeGg5emw3ZGJ5Ng==" },

            { name: "Aman Ashtekar", linkedin: "https://www.linkedin.com/in/aman-ashtekar-a8b777384?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/a_aman.1427?igsh=MWt2MG84ZGhtYnU0cw==" }

        ]
    },
    {
        teamName: "DevCores",
        teamPhoto: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771817119/R_mwrk14.png",
        place: "Runner-Up",
        members: [
            { name: "Abhinav Mallade", linkedin: "https://www.linkedin.com/in/abhinav-mallade-5a5116305?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/abhi_mallade_24/" },
            { name: "Rahul Samal", linkedin: "https://www.linkedin.com/in/rahul-samal-256ba1330?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/rahul_.samal_.14/" },

            { name: "Prashant Sherla", linkedin: "https://www.linkedin.com/in/prashant-sherla-bb96a8377?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/thadge_sushant___/" },

            { name: "Manoj Silam", linkedin: "https://www.linkedin.com/in/silam-katave-867559377?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/silamkatave3/" }
        ]
    },

    {
        teamName: "TY-EJ",
        teamPhoto: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771817120/RDT_kreoyy.png",
        place: "Rising Diploma Talent Award",
        members: [
            { name: "Pavan Karande", linkedin: "https://www.linkedin.com/in/sushantthadge/", instagram: "https://www.instagram.com/thadge_sushant___/" },
            { name: "Soham Vyavahare", linkedin: "https://www.linkedin.com/in/sushantthadge/", instagram: "https://www.instagram.com/thadge_sushant___/" },
            { name: "Siddharth Deshmukhe", linkedin: "https://www.linkedin.com/in/sushantthadge/", instagram: "https://www.instagram.com/thadge_sushant___/" },
            { name: "Abhijit Bhagat", linkedin: "https://www.linkedin.com/in/sushantthadge/", instagram: "https://www.instagram.com/thadge_sushant___/" }
        ]
    }
];

const WinnersPage = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
            {/* Video Background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://res.cloudinary.com/dgx4bwlbo/video/upload/v1771039051/background_vopq9v.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-yellow-500/10 blur-[120px] rounded-full -z-10" />
                    <div className="absolute top-40 left-0 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full -z-10 animate-pulse" />

                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/70">Techtantra 2026 Results</span>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-6xl md:text-8xl font-black font-outfit mb-6 tracking-tighter leading-none"
                            >
                                THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">WINNERS</span>
                            </motion.h1>

                            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-light leading-relaxed">
                                Celebrating the brilliant minds who pushed the boundaries of innovation and technology to build the future.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Winners Grid */}
                <section className="max-w-7xl mx-auto px-6 pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {winnersData.map((winner, index) => (
                            <WinnerCard key={index} winner={winner} index={index} />
                        ))}
                    </div>
                </section>

                {/* Stats/Closing Section */}
                <section className="border-t border-white/10 bg-white/[0.02] py-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10"
                            >
                                <Users className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                                <div className="text-4xl font-black font-outfit mb-2">130+</div>
                                <div className="text-sm font-medium text-white/40 uppercase tracking-widest">Participants</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10"
                            >
                                <Award className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                                <div className="text-4xl font-black font-outfit mb-2">35+</div>
                                <div className="text-sm font-medium text-white/40 uppercase tracking-widest">Team Submissions</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10"
                            >
                                <Trophy className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                                <div className="text-4xl font-black font-outfit mb-2">15K+</div>
                                <div className="text-sm font-medium text-white/40 uppercase tracking-widest">Prizes Awarded</div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 p-4 rounded-full bg-white text-black shadow-2xl hover:scale-110 transition-transform active:scale-95 z-50 group"
                    >
                        <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>

        </div>
    );
};

export default WinnersPage;
