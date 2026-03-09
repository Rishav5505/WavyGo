import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const testimonials = [
    {
        name: "Rishav",
        role: "Solo Rider",
        content: "WavyGo provided the best bike rental experience in Delhi. The Himalayan was in top-notch condition, and the pickup process was seamless. Truly a biker's delight!",
        avatar: "/rishav-test.jpg",
        rating: 5
    },
    {
        name: "Priya Patel",
        role: "Moto-Vlogger",
        content: "As a creator, I needed a reliable machine for the Spiti circuit. WavyGo's KTM 390 was a beast. The 24/7 support gave me peace of mind throughout the trip!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        rating: 5
    },
    {
        name: "Ankit Verma",
        role: "Club President",
        content: "We rented 10 bikes for our weekend club ride. Every single bike was perfectly maintained and verified. WavyGo is the new gold standard for bike rentals.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        rating: 5
    }
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-16 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-slate-50/50 pointer-events-none -z-10"></div>
            <div className="container-custom">
                <div className="text-center mb-10 md:mb-16 px-4">
                    <Reveal center>
                        <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 tracking-tighter leading-none mb-4">Voices of <br /><span className="text-primary">Elite Mobility</span></h2>
                    </Reveal>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.1em] md:tracking-[0.3em] text-[10px] whitespace-normal">What the community is saying</p>
                </div>

                <div className="max-w-5xl mx-auto px-4 md:px-0">
                    <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                        {/* Decorative Quote Mark */}
                        <div className="absolute top-4 right-4 md:top-8 md:right-8 text-6xl md:text-7xl font-black text-slate-50/10 pointer-events-none select-none italic tracking-tighter">"</div>

                        <div className="w-40 h-40 md:w-64 md:h-64 rounded-3xl md:rounded-[2.5rem] overflow-hidden shrink-0 shadow-xl relative group mt-4 md:mt-0">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={index}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.8 }}
                                    src={testimonials[index].avatar}
                                    className="w-full h-full object-cover"
                                    alt={testimonials[index].name}
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        <div className="flex-grow flex flex-col justify-center">
                            <div className="flex justify-start gap-1 mb-4 md:mb-6 mt-4 md:mt-0">
                                {[...Array(testimonials[index].rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.8 }}
                                    className="mb-8 md:mb-12 text-left"
                                >
                                    <p className="text-sm sm:text-base md:text-2xl text-slate-700 leading-relaxed md:leading-tight font-medium mb-6 md:mb-8">
                                        "{testimonials[index].content}"
                                    </p>
                                    <div>
                                        <h4 className="text-lg md:text-2xl font-black text-slate-900 leading-none mb-1 md:mb-2">{testimonials[index].name}</h4>
                                        <p className="text-primary font-bold uppercase text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em]">{testimonials[index].role}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex gap-4 md:gap-6 justify-start">
                                <button
                                    onClick={prev}
                                    className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group"
                                >
                                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={next}
                                    className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group"
                                >
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
