import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headset, Tag, ShieldCheck, Zap, ArrowRight, X, Bike } from 'lucide-react';
import Reveal from './Reveal';

const usps = [
    {
        title: "Ultra-Competitive Rates",
        desc: "High-performance machines starting at just ₹300 per day with zero hidden fees.",
        detail: "We believe premium mobility should be accessible. Our transparent pricing model ensures you get the best value without compromising on vehicle quality. No security deposits for verified riders and a satisfaction guarantee.",
        icon: Tag,
        color: "text-primary",
        bg: "bg-primary/5"
    },
    {
        title: "Unrestricted Kilometers",
        desc: "The entire continent is your playground. Ride anywhere without limits.",
        detail: "Your journey shouldn't have a meter. Our unlimited kilometer policy gives you the freedom to explore the most remote corners of India without ever glancing at the odometer or worrying about overage charges.",
        icon: Zap,
        color: "text-primary",
        bg: "bg-primary/5"
    },
    {
        title: "Verified Elite Fleet",
        desc: "Every machine undergoes a rigorous 50-point technical inspection.",
        detail: "We only partner with the best. Each bike in our collection is vetted for mechanical integrity, safety parameters, and cosmetic excellence. If it's on WavyGo, it's ready for the most demanding roads.",
        icon: ShieldCheck,
        color: "text-primary",
        bg: "bg-primary/5"
    },
    {
        title: "Elite Roadside Support",
        desc: "24/7 dedicated assistance across all major Indian expeditions.",
        detail: "Peace of mind is standard. Our nationwide support network is on standby 24/7 to provide mechanical assistance, emergency towing, or route guidance, no matter how far you've wandered.",
        icon: Headset,
        color: "text-primary",
        bg: "bg-primary/5"
    }
];

const WhyChooseUs = () => {
    const [selectedId, setSelectedId] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedId !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [selectedId]);

    return (
        <section className="py-20 relative overflow-hidden bg-slate-50">
            <div className="container-custom">
                <div className="text-left mb-16">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-none mb-6">The WavyGo <br /><span className="text-primary italic">Advantage</span></h2>
                    </Reveal>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] pl-1">Why elite riders choose our network</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {usps.map((usp, i) => (
                        <motion.div
                            key={i}
                            onClick={() => setSelectedId(i)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] md:rounded-[4rem] border border-white/60 group hover:bg-primary transition-all duration-500 cursor-pointer relative overflow-hidden shadow-xl shadow-slate-200/50"
                        >
                            <div className={`w-12 h-12 md:w-16 md:h-16 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:bg-white transition-all duration-500`}>
                                <usp.icon className="w-5 h-5 md:w-7 md:h-7 text-white group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-white tracking-tighter transition-colors">{usp.title}</h3>
                            <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed font-medium transition-colors mb-6 md:mb-10 text-sm">{usp.desc}</p>

                            <div className="inline-flex items-center gap-3 text-primary group-hover:text-white font-bold text-[10px] uppercase tracking-widest mt-auto border-b-2 border-primary/20 group-hover:border-white/20 pb-2 transition-all">
                                Discover More <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Portal */}
            <AnimatePresence>
                {selectedId !== null && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[200]"
                        />
                        <div className="fixed inset-0 z-[201] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                                className="w-full max-w-xl bg-white rounded-[4rem] p-12 md:p-16 shadow-2xl relative overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-8 right-8 p-4 bg-slate-100 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10 transition-all z-10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mb-10 shadow-inner">
                                        {React.createElement(usps[selectedId].icon, { className: "w-10 h-10" })}
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-none">{usps[selectedId].title}</h3>
                                    <p className="text-slate-600 leading-relaxed font-medium text-xl mb-12 border-l-4 border-primary/20 pl-8 italic">
                                        {usps[selectedId].detail}
                                    </p>
                                    <Button
                                        onClick={() => setSelectedId(null)}
                                        className="w-full h-16 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-2xl shadow-primary/20"
                                    >
                                        I Understand
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default WhyChooseUs;
