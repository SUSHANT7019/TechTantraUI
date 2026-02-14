import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';

/* 
  FAQ Data Structure 
  organized by categories for easy management
*/
const FAQ_DATA = [
    {
        category: "Registration",
        faqs: [
            {
                id: "reg-1",
                question: "How do I register for the event?",
                answer: "You can register directly through our website by clicking the 'Register Now' button. You'll need to create an account by providing your details through the form and then join WhatsApp Group."
            },
            {
                id: "reg-2",
                question: "Is there a registration fee?",
                answer: "Yes, there is a registration fee of ₹1000 per Team. This helps us provide meals, Wi-Fi, and a seamless hackathon experience."
            },
            {
                id: "reg-3",
                question: "Can I register individually?",
                answer: "Yes, you can register as an individual. You’ll be responsible for forming or joining a team on your own before the Registration for the event."
            },
            {
                id: "reg-4",
                question: "Can I register after the deadline?",
                answer: "Late registrations may be allowed on a case-by-case basis. Check the official website or contact the organizers for updates."
            }
        ]
    },
    {
        category: "Participation",
        faqs: [
            {
                id: "part-1",
                question: "Who can participate?",
                answer: "The hackathon is open to students, professionals, and tech enthusiasts from all backgrounds. Whether you're a coder, designer, or idea generator, you're welcome!"
            },
            {
                id: "part-2",
                question: "What is the team size limit?",
                answer: "Teams can have between 1 to 4 members. We recommend having a diverse mix of skills (frontend, backend, design) for the best results."
            },
            {
                id: "part-3",
                question: "Can I participate remotely?",
                answer: "No, this is strictly an in-person event. All participants must attend on-site to take part in the hackathon."
            },
            {
                id: "part-4",
                question: "Can I switch teams during the event?",
                answer: "No, switching teams is not allowed once the registration Completed. Please ensure your team is finalized before the Registration."
            }
        ]
    },
    {
        category: "Event Details",
        faqs: [
            {
                id: "evt-1",
                question: "What is the duration of the hackathon?",
                answer: "The hacking period lasts for exactly 24 hours. We also have opening and closing ceremonies, so plan for a full weekend of innovation!"
            },
            {
                id: "evt-2",
                question: "Will food and Wi-Fi be provided?",
                answer: "Absolutely! We provide high-speed Wi-Fi, power strips, and meals ( lunch, Evening Tea, dinner, midnight Tea, Breakfast & Morning Tea) throughout the event."
            },
            {
                id: "evt-3",
                question: "What should I bring?",
                answer: "Bring your laptop, charger, toiletries, and a sleeping bag if you plan to nap. Don't forget your Toke for check-in!"
            },
            {
                id: "evt-4",
                question: "Will there be any workshops or guidance?",
                answer: "There are no formal workshops, but mentors will be available throughout the event to guide and assist teams."
            }

        ]
    },
    {
        category: "Prizes",
        faqs: [
            {
                id: "prz-1",
                question: "What are the prizes?",
                answer: "We have a prize pool of over ₹15,000, including cash prizes, sponsor gadgets, and incubation opportunities for top teams."
            },
            {
                id: "prz-2",
                question: "How is the judging conducted?",
                answer: "Projects are judged based on innovation, technical complexity, design/UX, Solution, and potential impact. We have a panel of industry experts who will review your work."
            },
            {
                id: "prz-3",
                question: "Will mentors be available during the hackathon?",
                answer: "Yes, mentors will be available throughout the event to guide and support all participants in developing their ideas."
            },
            {
                id: "prz-4",
                question: "Will all participants receive a certificate?",
                answer: "Yes, every participant will receive a participation certificate. Winning teams will also get special certificates for their achievements."
            }
        ]
    }
];

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [openFAQId, setOpenFAQId] = useState(null);

    // Flatten data for "All" view or filter by category
    const filteredFAQs = activeCategory === "All"
        ? FAQ_DATA.flatMap(cat => cat.faqs.map(f => ({ ...f, categoryTag: cat.category })))
        : FAQ_DATA.find(cat => cat.category === activeCategory)?.faqs || [];

    const toggleFAQ = (id) => {
        setOpenFAQId(openFAQId === id ? null : id);
    };

    return (
        <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-transparent">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#0AC4E0]/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-3 sm:px-4 relative z-10 max-w-5xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#0AC4E0] font-mono font-bold tracking-wider uppercase mb-2 block">
                        Support & Info
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-outfit mb-4 sm:mb-6">
                        FREQUENTLY ASKED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0AC4E0] to-[#0992C2]">QUESTIONS</span>
                    </h2>
                    <p className="text-[#FFFCFB] max-w-2xl mx-auto text-lg">
                        Everything you need to know about the event. Can't find your answer? Reach out to us on Discord.
                    </p>
                </motion.div>

                {/* Category Filter Bar */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                    <button
                        onClick={() => { setActiveCategory("All"); setOpenFAQId(null); }}
                        className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border backdrop-blur-md
                            ${activeCategory === "All"
                                ? "bg-[#0AC4E0]/10 border-[#0AC4E0] text-[#FFFCFB] shadow-[0_0_20px_rgba(10,196,224,0.3)]"
                                : "bg-black/40 border-white/10 text-[#FFFCFB] hover:border-[#0AC4E0]/50 hover:text-white"
                            }`}
                    >
                        All
                    </button>
                    {FAQ_DATA.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setActiveCategory(cat.category); setOpenFAQId(null); }}
                            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border backdrop-blur-md
                                ${activeCategory === cat.category
                                    ? "bg-[#0AC4E0]/10 border-[#0AC4E0] text-[#FFFCFB] shadow-[0_0_20px_rgba(10,196,224,0.3)]"
                                    : "bg-black/40 border-white/10 text-[#FFFCFB] hover:border-[#0AC4E0]/50 hover:text-white"
                                }`}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>

                {/* FAQ Grid/List */}
                <motion.div
                    layout
                    className="grid gap-4"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredFAQs.map((faq) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                key={faq.id}
                                className={`group border rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md
                                    ${openFAQId === faq.id
                                        ? "bg-black/80 border-[#0AC4E0] shadow-[0_0_15px_rgba(10,196,224,0.1)]"
                                        : "bg-black/60 border-white/10 hover:border-[#0AC4E0]/30"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full text-left p-4 sm:p-6 md:p-8 flex items-start justify-between gap-3 sm:gap-4"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {/* Show category tag if in 'All' view */}
                                            {activeCategory === "All" && faq.categoryTag && (
                                                <span className="text-[10px] items-center px-2 py-1 rounded bg-[#0AC4E0]/10 border border-[#0AC4E0]/20 text-[#0AC4E0] font-bold font-mono uppercase tracking-wider">
                                                    {faq.categoryTag}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className={`text-lg md:text-xl font-bold font-outfit transition-colors duration-300
                                            ${openFAQId === faq.id ? "text-[#0AC4E0]" : "text-white group-hover:text-[#0AC4E0]"}`}>
                                            {faq.question}
                                        </h3>
                                    </div>

                                    {/* Icon */}
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
                                        ${openFAQId === faq.id
                                            ? "bg-[#0AC4E0] border-[#0AC4E0] rotate-180"
                                            : "bg-white/5 border-white/20 group-hover:border-[#0AC4E0] group-hover:text-[#0AC4E0] text-gray-400"
                                        }`}
                                    >
                                        {openFAQId === faq.id
                                            ? <Minus className="w-5 h-5 text-black" />
                                            : <Plus className="w-5 h-5" />
                                        }
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openFAQId === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 md:px-8 pb-8 pt-0">
                                                <div className="w-full h-px bg-gradient-to-r from-[#0AC4E0]/30 to-transparent mb-4" />
                                                <p className="text-zinc-100 leading-relaxed text-base md:text-lg font-medium">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-[#FFFCFB] mb-4">Still have questions?</p>
                    <a
                        href="https://chat.whatsapp.com/EKHcVEAcICB9rIsahdGpOK" target="_blank"
                        className="inline-flex items-center gap-2 text-[#0AC4E0] font-bold hover:text-white transition-colors duration-300 border-b border-[#0AC4E0] hover:border-white pb-1"
                    >
                        <HelpCircle className="w-5 h-5" />
                        Visit our whatsapp Community
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
