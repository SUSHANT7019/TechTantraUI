
import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const MemberProfile = ({ member }) => {
    return (
        <div className="flex items-center justify-between gap-3 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <span className="text-sm font-medium text-white/90 group-hover:text-white">{member.name}</span>
            <div className="flex items-center gap-2">
                {member.linkedin && (
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-blue-400 transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                    >
                        <Linkedin className="w-4 h-4" />
                    </motion.a>
                )}
                {member.instagram && (
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-pink-400 transition-colors"
                        aria-label={`${member.name}'s Instagram`}
                    >
                        <Instagram className="w-4 h-4" />
                    </motion.a>
                )}
            </div>
        </div>
    );
};

export default MemberProfile;
