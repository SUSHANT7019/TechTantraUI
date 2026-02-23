
import React from 'react';
import { motion } from 'framer-motion';
import Badge from './Badge';
import MemberProfile from './MemberProfile';

const WinnerCard = ({ winner, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="relative group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl shadow-black/50"
        >
            {/* Team Photo Container */}
            <div className="relative aspect-video overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={winner.teamPhoto}
                    alt={winner.teamName}
                    className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Place Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <Badge place={winner.place} />
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <motion.h3
                    className="text-2xl font-black font-outfit text-white mb-4 tracking-tight group-hover:text-yellow-400 transition-colors"
                >
                    {winner.teamName}
                </motion.h3>

                {/* Members List */}
                <div className="space-y-2">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Team Members</p>
                    <div className="grid gap-2">
                        {winner.members.map((member, idx) => (
                            <MemberProfile key={idx} member={member} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
        </motion.div>
    );
};

export default WinnerCard;
