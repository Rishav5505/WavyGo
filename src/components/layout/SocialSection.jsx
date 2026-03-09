import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import Reveal from '../common/Reveal';

// Importing local images sent by the user for maximum reliability
import hydImg from '../../assets/images/locations/hyderabad.png';
import mumImg from '../../assets/images/locations/mumbai.png';
import uttImg from '../../assets/images/locations/uttarakhand.jpg';
import punImg from '../../assets/images/locations/pune.png';
import gurImg from '../../assets/images/locations/gurugram.png';
import cheImg from '../../assets/images/locations/chennai.png';
import kolImg from '../../assets/images/locations/kolkata.png';
import vizImg from '../../assets/images/locations/vizag.png';

const locations = [
    {
        name: "Delhi",
        img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
        state: "National Capital"
    },
    {
        name: "Uttarakhand",
        img: uttImg,
        state: "Dev Bhoomi"
    },
    {
        name: "Mumbai",
        img: mumImg,
        state: "Maharashtra"
    },
    {
        name: "Hyderabad",
        img: hydImg,
        state: "Telangana"
    },
    {
        name: "Pune",
        img: punImg,
        state: "Maharashtra"
    },
    {
        name: "Gurugram",
        img: gurImg,
        state: "Haryana"
    },
    {
        name: "Chennai",
        img: cheImg,
        state: "Tamil Nadu"
    },
    {
        name: "Kolkata",
        img: kolImg,
        state: "West Bengal"
    },
    {
        name: "Vizag",
        img: vizImg,
        state: "Andhra Pradesh"
    },
];

const SocialSection = () => {
    // Duplicate items for infinite scroll effect
    const infiniteLocations = [...locations, ...locations];

    return (
        <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16 px-4">
                    <Reveal center>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-tight md:leading-none mb-6">
                            WavyGo around <br className="block md:hidden" /> <span className="text-primary">all over India</span>
                        </h2>
                    </Reveal>
                </div>

                {/* Locations Infinite Slider */}
                <div className="relative group/slider">
                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{
                            x: [0, -3096] // (Item width 320px + gap 24px) * 9 items = 3096px
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 45,
                                ease: "linear",
                            },
                        }}
                        whileHover={{ animationPlayState: "paused" }}
                        style={{
                            display: 'flex',
                            gap: '1.5rem', // 24px (gap-6)
                        }}
                    >
                        {infiniteLocations.map((loc, i) => (
                            <motion.div
                                key={i}
                                className="group relative flex-shrink-0 w-[260px] md:w-[320px] aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 cursor-pointer border border-slate-100"
                            >
                                {/* Image Overlay */}
                                <img
                                    src={loc.img}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                                    alt={loc.name}
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-2 mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                        <MapPin className="w-3 h-3 text-primary" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{loc.state}</span>
                                    </div>
                                    <h3 className="text-white text-3xl font-black tracking-tight mb-2 text-center">{loc.name}</h3>

                                    {/* Small Divider */}
                                    <div className="w-8 h-1 bg-primary rounded-full mb-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" />
                                </div>

                                {/* Navigation Arrow (Appears on Hover) */}
                                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0 text-white shadow-2xl">
                                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Decorative Navigation (Visual Aid) */}
                    <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 -left-12 -right-12 justify-between pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-500">
                        <button className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border border-slate-50 text-slate-800 hover:bg-primary hover:text-white transition-all pointer-events-auto active:scale-90">
                            <span className="text-2xl font-black">←</span>
                        </button>
                        <button className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border border-slate-50 text-slate-800 hover:bg-primary hover:text-white transition-all pointer-events-auto active:scale-90">
                            <span className="text-2xl font-black">→</span>
                        </button>
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    <div className="w-12 h-2.5 bg-primary rounded-full shadow-lg shadow-primary/20 transition-all duration-700" />
                    <div className="w-2.5 h-2.5 bg-slate-200 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-slate-200 rounded-full" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
};

export default SocialSection;
