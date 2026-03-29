import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Star, Globe, Compass, Zap, Play, Volume2, VolumeX, MessageCircle } from 'lucide-react';
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
            <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 bg-[#035c3e] flex items-center justify-center overflow-hidden">
                <div className="relative z-10 text-center text-white px-4">
                    <Reveal center width="100%">
                        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none uppercase">
                            <span className="text-slate-900">Our</span> <span className="text-white">Story</span>
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
                                <div className="border-l-4 border-secondary pl-6 py-4 bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] italic font-medium text-slate-800 shadow-sm rounded-r-2xl">
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
                                className="relative max-w-[440px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#035c3e]/10 bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] group"
                            >
                                <video
                                    ref={videoRef}
                                    src={wavygoVideo}
                                    autoPlay
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    className="w-full h-auto aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
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

                            <div className="absolute -bottom-10 -left-10 bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] p-8 rounded-2xl shadow-xl hidden xl:block border border-[#035c3e]/10 z-10">
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
            <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#f0f9f6]">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-center border border-[#035c3e]/10 shadow-sm group hover:scale-105 transition-all duration-300">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5">
                                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">{stat.value}</h3>
                                <p className="text-slate-500 md:text-slate-400 font-bold uppercase tracking-wider md:tracking-widest text-[8px] md:text-[10px]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Insta-style Story Feed */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom max-w-6xl mx-auto">
                    <div className="text-center mb-10 md:mb-16 px-4">
                        <Reveal center>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-none mb-4">Our <span className="text-[#035c3e]">Journey</span></h2>
                        </Reveal>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.1em] md:tracking-[0.3em] text-[10px] whitespace-normal">Told through memories</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                id: 1,
                                image: "/images/insta/1.png",
                                likes: "1,245",
                                caption: "Find the BEST BIKE for RENT. Book Now. 🏍️ #wavygo #bikerentals",
                                time: "2 DAYS AGO"
                            },
                            {
                                id: 2,
                                image: "/images/insta/2.png",
                                likes: "2,089",
                                caption: "Get your favourite vehicle on rent. Cruiser, Scooter, E-Scooter, or Sport bike! ⚡",
                                time: "4 DAYS AGO"
                            },
                            {
                                id: 3,
                                image: "/images/insta/3.jpg",
                                likes: "4,532",
                                caption: "Rule the roads of Dehradun with WAVYGO. 🏔️ #dehradun #uttarakhand",
                                time: "1 WEEK AGO"
                            },
                            {
                                id: 4,
                                image: "/images/insta/4.jpg",
                                likes: "8,921",
                                caption: "Ride Your Way. Happy Women's Day to every woman who chooses to ride her own path. 🙌♀️",
                                time: "1 WEEK AGO"
                            },
                            {
                                id: 5,
                                image: "/images/insta/5.jpg",
                                likes: "15.4k",
                                caption: "Punch found his perfect rental partner. No more sad days. 🐒❤️🏍️",
                                time: "2 WEEKS AGO"
                            }
                        ].map((post) => (
                            <div 
                                key={post.id}
                                className="bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] p-3 md:p-4 rounded-[1rem] md:rounded-[1.5rem] border border-[#035c3e]/10 shadow-sm transition-all duration-300 hover:scale-[1.02] flex flex-col max-w-sm mx-auto w-full"
                            >
                                {/* Post Header */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-0.5">
                                            <div className="w-full h-full bg-[#035c3e] rounded-full flex items-center justify-center">
                                                <span className="text-white text-[8px] font-black italic">WG</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-slate-900 leading-none mb-0.5">wavygo.official</h4>
                                        <p className="text-[9px] text-slate-500">Original Audio</p>
                                    </div>
                                    <button className="text-slate-900 font-bold text-xs hover:text-slate-500">•••</button>
                                </div>

                                {/* Image */}
                                <div className="aspect-square w-full bg-slate-100 overflow-hidden relative group rounded-xl md:rounded-[1.25rem] mb-3 shadow-inner">
                                    <img src={post.image} alt="post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>

                                {/* Actions */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <button className="hover:opacity-50 transition-opacity"><Heart className="w-4 h-4 md:w-5 md:h-5 text-slate-900" /></button>
                                            <button className="hover:opacity-50 transition-opacity"><MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-slate-900" /></button>
                                            <button className="hover:opacity-50 transition-opacity"><Zap className="w-4 h-4 md:w-5 md:h-5 text-slate-900" /></button>
                                        </div>
                                        <button className="hover:opacity-50 transition-opacity"><Compass className="w-4 h-4 md:w-5 md:h-5 text-slate-900" /></button>
                                    </div>
                                    
                                    <p className="text-xs font-bold text-slate-900 mb-1">{post.likes} likes</p>
                                    
                                    <p className="text-[10px] md:text-xs text-slate-700 mb-2 leading-relaxed">
                                        <span className="font-bold text-slate-900 mr-1.5">wavygo.official</span>
                                        {post.caption}
                                    </p>

                                    <p className="text-[8px] md:text-[9px] text-slate-400 font-medium uppercase tracking-widest">{post.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
            <Footer />
        </div>
    );
};

export default About;
