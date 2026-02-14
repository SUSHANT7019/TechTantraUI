import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const Venue = () => {
    return (
        <section id="venue" className="py-16 sm:py-24 relative">
            <div className="container mx-auto px-3 sm:px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0992C2] mb-4 font-outfit">Venue</h2>
                    <p className="text-[#FFFCFB] font-medium">Where the magic happens.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
                    {/* Map/Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 h-[280px] sm:h-[350px] lg:h-[400px] relative group"
                    >
                        {/* Embed Google Map or Placeholder Image */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.8839399174785!2d75.36706257373703!3d17.65565509502438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc422ebec5b1a15%3A0x5f1b772f119d4472!2sSVERI&#39;s%20College%20Of%20Engineering%2C%20Pandharpur!5e0!3m2!1sen!2sin!4v1770782295530!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-black/60 backdrop-blur-md p-5 sm:p-8 rounded-2xl border border-white/10 hover:border-[#0AC4E0]/30 transition-all duration-300">
                            <MapPin className="text-cyan-400 w-8 h-8 mb-4" />
                            <h3 className="text-2xl font-bold text-[#0AC4E0] mb-2 font-outfit">SVERI's COE(Polytechnic), Pandharpur</h3>
                            <p className="text-[#FFFCFB] mb-4 font-medium">
                                Department of Information Technology, SVERI's College Of Engineering, Pandharpur, Maharashtra 413304
                            </p>
                            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium">
                                Get Directions <ExternalLink size={16} className="ml-2" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#0AC4E0]/30 transition-all duration-300">
                                <Mail className="text-cyan-400 w-6 h-6 mb-3" />
                                <h4 className="text-lg font-bold text-white mb-1">Email Us</h4>
                                <a href="mailto:techtantra1074@gmail.com" className="relative z-20 inline-block text-[#FFFCFB] text-sm font-medium hover:text-cyan-400 transition-colors break-all">techtantra1074@gmail.com</a>
                            </div>
                            <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#0AC4E0]/30 transition-all duration-300">
                                <Phone className="text-cyan-400 w-6 h-6 mb-3" />
                                <h4 className="text-lg font-bold text-white mb-1">Call Us</h4>
                                <p className="text-[#FFFCFB] text-sm font-medium"> <a href="tel:9579322552">+91 95793 22552</a></p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Venue;
