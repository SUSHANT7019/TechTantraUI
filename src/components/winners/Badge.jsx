
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Medal } from 'lucide-react';

const Badge = ({ place }) => {
    const getBadgeConfig = (place) => {
        const lowercasePlace = place.toLowerCase();
        if (lowercasePlace.includes('1st') || lowercasePlace.includes('champion')) {
            return {
                color: 'from-amber-400 to-yellow-600',
                textColor: 'text-amber-100',
                icon: <Trophy className="w-4 h-4" />,
                label: 'Champion'
            };
        }
        if (lowercasePlace.includes('2nd') || lowercasePlace.includes('runner-up')) {
            return {
                color: 'from-slate-300 to-slate-500',
                textColor: 'text-slate-100',
                icon: <Medal className="w-4 h-4" />,
                label: 'Runner Up'
            };
        }
        if (lowercasePlace.includes('3rd')) {
            return {
                color: 'from-orange-400 to-orange-700',
                textColor: 'text-orange-100',
                icon: <Star className="w-4 h-4" />,
                label: '3rd Place'
            };
        }
        return {
            color: 'from-purple-500 to-indigo-600',
            textColor: 'text-purple-100',
            icon: <Star className="w-4 h-4" />,
            label: place
        };
    };

    const config = getBadgeConfig(place);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${config.color} ${config.textColor} text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/20`}
        >
            {config.icon}
            <span>{config.label}</span>
        </motion.div>
    );
};

export default Badge;
