import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from '../components/landing/SmoothScroll';
import Preloader from '../components/landing/Preloader';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Tracks from '../components/landing/Tracks';
import Sponsors from '../components/landing/Sponsors';
import Footer from '../components/landing/Footer';
import Pricing from '../components/landing/Pricing';
import Schedule from '../components/landing/Schedule';
import FAQ from '../components/landing/FAQ';
import Venue from '../components/landing/Venue';
import Organisers from '../components/landing/marque/Organisers';
import SectionReveal from '../components/landing/SectionReveal';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Reduced delay slightly for better UX
        return () => clearTimeout(timer);
    }, []);


    return (
        <SmoothScroll>
            <AnimatePresence mode="wait">
                {loading && <Preloader key="preloader" setLoading={setLoading} />}
            </AnimatePresence>

            {/* Video Background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/bgvod.mp4" type="video/mp4" />
                </video>
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {!loading && (
                <div className="relative z-10 min-h-screen text-white overflow-x-hidden">
                    <SectionReveal variant="zoom">
                        <Hero />
                    </SectionReveal>
                    <SectionReveal variant="rotateY">
                        <About />
                    </SectionReveal>
                    <SectionReveal variant="slideRight">
                        <Pricing />
                    </SectionReveal>
                    <SectionReveal variant="zoom">
                        <Tracks />
                    </SectionReveal>
                    <SectionReveal variant="slideRight">
                        <Schedule />
                    </SectionReveal>
                    <SectionReveal variant="slideLeft">
                        <FAQ />
                    </SectionReveal>
                    <SectionReveal variant="slideRight">
                        <Organisers />
                    </SectionReveal>
                    <SectionReveal variant="slideRight">
                        <Venue />
                    </SectionReveal>
                    {/* <SectionReveal variant="zoom">
                        <Sponsors />
                    </SectionReveal> */}
                    <SectionReveal>
                        <Footer />
                    </SectionReveal>
                </div>
            )}
        </SmoothScroll>
    );
};

export default Home;
