import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import Button from './Button';

const faqs = [
    {
        question: "What documents do I need to rent a bike?",
        answer: "To rent an elite machine, you must provide a valid original Driving License for motorcycles and an Aadhar card or Passport for identity verification. We may keep a copy for our records."
    },
    {
        question: "Is there a security deposit required?",
        answer: "For most of our mid-range machines, we offer zero security deposit for verified riders. For high-performance superbikes, a refundable security deposit of ₹2,000 to ₹5,000 may be required depending on the model."
    },
    {
        question: "Do you provide helmets with the rental?",
        answer: "Yes, we providing one complimentary ISI-marked helmet with every rental. A second helmet for the pillion is available for a nominal daily charge. We recommend bringing your own for a custom fit."
    },
    {
        question: "What happens in case of a mechanical breakdown?",
        answer: "WavyGo maintains an elite roadside assistance network. In the rare event of a breakdown, simply call our 24/7 support line. We'll provide mechanical assistance or a replacement vehicle if you're within our primary service zones."
    },
    {
        question: "Can I take the bike outside city limits?",
        answer: "Absolutely. Our 'Unlimited KMs' policy means you can explore the entire region. However, certain high-altitude or restricted border zones may require prior notification for coordination and safety."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="pt-20 pb-8 md:py-20 bg-slate-50 relative overflow-hidden">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-10 md:mb-12 px-4">
                        <Reveal center>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-tight md:leading-none mb-4">
                                Elite <span className="text-primary">Intelligence</span>
                            </h2>
                        </Reveal>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-[9px] md:text-[10px] whitespace-normal">Everything you need to know before you ignite</p>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`rounded-[1.5rem] transition-all duration-500 border overflow-hidden ${activeIndex === i ? 'bg-slate-900 border-slate-900 shadow-xl' : 'bg-white border-slate-100 hover:border-primary/20 hover:bg-white'}`}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 md:p-7 text-left focus:outline-none gap-4"
                                >
                                    <span className={`text-base md:text-xl font-bold tracking-tight transition-colors ${activeIndex === i ? 'text-white' : 'text-slate-900'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${activeIndex === i ? 'bg-primary text-white rotate-180 shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-400'}`}>
                                        {activeIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "circOut" }}
                                        >
                                            <div className="px-5 md:px-7 pb-5 md:pb-7 text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA Box - More Compact */}
                    <div className="mt-8 md:mt-12 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-white border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                                <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div>
                                <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter mb-1">Still curious?</h4>
                                <p className="text-slate-500 font-medium text-xs md:text-sm">Our elite concierges are standing by to assist.</p>
                            </div>
                        </div>
                        <a href="https://wa.me/919508287609" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto mt-2 md:mt-0">
                            <Button className="w-full px-8 h-12 rounded-xl bg-slate-900 text-white shadow-lg hover:bg-primary transition-all flex items-center justify-center gap-2">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Ignite A Chat</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
