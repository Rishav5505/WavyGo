import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Reveal from './Reveal';
import API from '../../utils/api';

const Testimonials = () => {
    const [liveTestimonials, setLiveTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchLiveTestimonials = async () => {
            try {
                const { data } = await API.get('/testimonials');
                if (data.length > 0) {
                    setLiveTestimonials(data);
                } else {
                    // Fallback to defaults if no live ones exist
                    setLiveTestimonials([
                        {
                            name: "Rishav",
                            role: "Solo Rider",
                            comment: "WavyGo provided the best bike rental experience in Delhi. The Himalayan was in top-notch condition, and the pickup process was seamless. Truly a biker's delight!",
                            image: "/rishav-test.jpg",
                            rating: 5,
                            city: "Delhi"
                        },
                        {
                            name: "Priya Patel",
                            role: "Moto-Vlogger",
                            comment: "As a creator, I needed a reliable machine for the Spiti circuit. WavyGo's KTM 390 was a beast. The 24/7 support gave me peace of mind throughout the trip!",
                            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
                            rating: 5,
                            city: "Manali"
                        }
                    ]);
                }
            } catch (error) {
                console.error("Testimonial fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLiveTestimonials();
    }, []);

    const next = () => setIndex((prev) => (prev + 1) % liveTestimonials.length);
    const prev = () => setIndex((prev) => (prev - 1 + liveTestimonials.length) % liveTestimonials.length);

    if (loading) return null;
    if (liveTestimonials.length === 0) return null;

    const current = liveTestimonials[index];

    return (
        <section className="py-16 bg-gradient-to-b from-white to-[#f0f9f6] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none -z-10"></div>
            <div className="container-custom">
                <div className="text-center mb-10 md:mb-16 px-4">
                    <Reveal center>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-none mb-4">Voices of <span className="text-primary">Elite Mobility</span></h2>
                    </Reveal>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.1em] md:tracking-[0.3em] text-[10px] whitespace-normal">What the community is saying</p>
                </div>

                <div className="max-w-5xl mx-auto px-4 md:px-0">
                    <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-16 bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-[#035c3e]/10 overflow-hidden">
                        {/* Decorative Quote Mark */}
                        <div className="absolute top-4 right-4 md:top-8 md:right-8 text-5xl md:text-7xl font-black text-slate-50/10 pointer-events-none select-none italic tracking-tighter">"</div>

                        <div className="w-24 h-24 md:w-64 md:h-64 rounded-2xl md:rounded-[2.5rem] overflow-hidden shrink-0 shadow-xl relative group mt-2 md:mt-0 bg-slate-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={index}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.8 }}
                                    src={current.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                    className="w-full h-full object-cover"
                                    alt={current.name}
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        <div className="flex-grow flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                            <div className="flex justify-center lg:justify-start gap-1 mb-4 md:mb-6 mt-4 md:mt-0">
                                {[...Array(current.rating || 5)].map((_, i) => (
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
                                    className="mb-8 md:mb-12 text-center lg:text-left"
                                >
                                    <p className="text-sm sm:text-base md:text-2xl text-slate-700 leading-relaxed md:leading-tight font-medium mb-6 md:mb-8">
                                        "{current.comment || current.content}"
                                    </p>
                                    <div>
                                        <h4 className="text-lg md:text-2xl font-black text-slate-900 leading-none mb-1 md:mb-2">{current.name}</h4>
                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 justify-center lg:justify-start">
                                            <p className="text-primary font-bold uppercase text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em]">{current.role}</p>
                                            {current.city && (
                                                <>
                                                    <span className="hidden md:block text-slate-300">•</span>
                                                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{current.city}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex gap-4 md:gap-6 justify-center lg:justify-start">
                                <button
                                    onClick={prev}
                                    className="w-12 h-12 flex items-center justify-center bg-white/60 backdrop-blur-sm border border-[#035c3e]/10 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group shadow-sm"
                                >
                                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={next}
                                    className="w-12 h-12 flex items-center justify-center bg-white/60 backdrop-blur-sm border border-[#035c3e]/10 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group shadow-sm"
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
