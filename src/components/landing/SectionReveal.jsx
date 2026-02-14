import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    default: {
        initial: { opacity: 0, rotateX: 60, y: 80, scale: 0.9 },
        whileInView: { opacity: 1, rotateX: 0, y: 0, scale: 1 }
    },
    rotateY: {
        initial: { opacity: 0, scale: 0.9, y: 50 },
        whileInView: { opacity: 1, scale: 1, y: 0 }
    },
    slideRight: {
        initial: { opacity: 0, x: -100, rotateY: -20 },
        whileInView: { opacity: 1, x: 0, rotateY: 0 }
    },
    slideLeft: {
        initial: { opacity: 0, x: 100, rotateY: 20 },
        whileInView: { opacity: 1, x: 0, rotateY: 0 }
    },
    zoom: {
        initial: { opacity: 0, scale: 0.5, rotateX: -30 },
        whileInView: { opacity: 1, scale: 1, rotateX: 0 }
    },
    flip: {
        initial: { opacity: 0, rotateX: -90 },
        whileInView: { opacity: 1, rotateX: 0 }
    }
};

const SectionReveal = ({ children, variant = "default" }) => {
    const selectedVariant = variants[variant] || variants.default;

    return (
        <div style={{ perspective: '1200px', contain: 'paint' }} className="w-full">
            <motion.div
                initial={selectedVariant.initial}
                whileInView={selectedVariant.whileInView}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d', willChange: 'opacity, transform' }}
                className="w-full"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default SectionReveal;
