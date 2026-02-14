import { motion } from 'framer-motion';

const SponsorLogo = ({ name }) => (
    <div className="flex items-center justify-center h-24 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer group">
        <span className="text-gray-500 font-bold text-xl group-hover:text-white transition-colors">{name}</span>
    </div>
);

const Sponsors = () => {
    const sponsors = ["Google Cloud", "Microsoft", "GitHub", "Devfolio", "Polygon", "Solana", "DigitalOcean", "Twilio"];

    return (
        <section id="sponsors" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2 font-outfit uppercase">Our Partners</h2>
                    <p className="text-gray-400">Powering the next generation of innovators.</p>
                </motion.div>

                <div className="overflow-hidden mask-linear-fade">
                    <motion.div
                        className="flex gap-8 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        {[...sponsors, ...sponsors].map((sponsor, i) => (
                            <div key={i} className="min-w-[200px]">
                                <SponsorLogo name={sponsor} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
