import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Star, Globe, Compass, Zap, Play, Volume2, VolumeX } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Reveal from '../components/common/Reveal';
import Separator from '../components/common/Separator';

// Import local assets
import wavygoVideo from '../assets/wavygo.mp4';


const About = () => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const stats = [
        { label: "Happy Travelers", value: "2,500+", icon: Users },
        { label: "Destinations", value: "15+", icon: Globe },
        { label: "Guest Rating", value: "4.9/5", icon: Star },
        { label: "Safety Score", value: "100%", icon: Shield },
    ];

    return (
        <div className="bg-white dark:bg-[#011f15] min-h-screen selection:bg-primary selection:text-white overflow-x-hidden transition-colors duration-300">
            <Navbar />

            {/* Premium Hero Section - Brand Green */}
            <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 bg-[#035c3e] flex items-center justify-center overflow-hidden">
                <div className="relative z-10 text-center text-white px-4">
                    <Reveal center width="100%">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter leading-none italic uppercase">
                            Our <span className="text-white NOT-italic">Story</span>
                        </h1>
                    </Reveal>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="h-1.5 w-32 bg-white/20 mx-auto rounded-full mb-6"
                    ></motion.div>
                    <p className="text-sm md:text-base text-white/70 font-bold uppercase tracking-[0.4em]">Innovation in Mobility</p>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20">
                    <Separator variant="horizon" color="fill-white dark:fill-slate-950 transition-colors duration-300" height="h-12 md:h-24" />
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-8 md:py-24">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">The WavyGo Vision</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">Elite Bike Rentals <br />Driven by Freedom.</h2>
                            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                                <p>
                                    Welcome to <span className="text-slate-900 dark:text-white font-bold">WavyGo</span>, where we believe every ride is an opportunity to explore the unknown. We are India's most modern bike rental platform, connecting riders with premium machines.
                                </p>
                                <p>
                                    Founded by motorcycle enthusiasts, we evolved from a small fleet into a professional rental boutique dedicated to creating seamless, safe, and powerful riding experiences across India.
                                </p>
                                <div className="border-l-4 border-secondary pl-6 py-2 bg-slate-50 dark:bg-[#035c3e] italic font-medium text-slate-800 dark:text-white shadow-sm dark:shadow-[#035c3e]/20 transition-colors duration-300">
                                    "We bridge the gap between heavy city traffic and the open highway freedom."
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Autoplay Video Section */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative max-w-[440px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group"
                            >
                                <video
                                    ref={videoRef}
                                    src={wavygoVideo}
                                    autoPlay
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    className="w-full h-auto aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Sound Toggle Button */}
                                <button
                                    onClick={toggleMute}
                                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                                    className="absolute bottom-6 right-6 z-20 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300"
                                >
                                    {isMuted ? (
                                        <VolumeX className="w-5 h-5 text-white" />
                                    ) : (
                                        <Volume2 className="w-5 h-5 text-white" />
                                    )}
                                </button>
                                {/* Play Icon Overlay just for aesthetics */}
                                <div className="absolute inset-0 bg-primary/10 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                        <Play className="w-8 h-8 text-white fill-white ml-2" />
                                    </div>
                                </div>
                            </motion.div>

                            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-[#035c3e] p-8 rounded-2xl shadow-xl hidden xl:block border border-slate-100 dark:border-[#047d54] z-10 transition-colors duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Pure Satisfaction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 md:py-24 bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl text-center border border-slate-100 shadow-sm">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <stat.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="py-12 md:py-32 bg-white text-center">
                <div className="container-custom max-w-4xl mx-auto">
                    <Compass className="w-12 h-12 text-secondary/40 mx-auto mb-10" />
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 italic">
                        "Tradition in hospitality, <br className="hidden md:block" /> innovation in exploration."
                    </h2>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">The WavyGo DNA</p>
                </div>
            </section>

            <CTA />
            <Footer />
        </div>
    );
};

export default About;
