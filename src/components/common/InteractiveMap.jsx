import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Camera, Star, ArrowUpRight, Info } from 'lucide-react';
import Reveal from './Reveal';

const spots = [
    {
        id: 'delhi',
        name: 'New Delhi',
        x: 48,
        y: 28,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800',
        desc: '1,500+ Premium bikes available across the capital.'
    },
    {
        id: 'goa',
        name: 'Goa',
        x: 35,
        y: 75,
        image: 'https://images.unsplash.com/photo-1512343879784-a960640d2f5f?q=80&w=800',
        desc: 'Rent scooters and cruisers for the perfect beach vibe.'
    },
    {
        id: 'bangalore',
        name: 'Bangalore',
        x: 50,
        y: 85,
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800',
        desc: 'Commuter and luxury bikes for the silicon valley.'
    },
    {
        id: 'mumbai',
        name: 'Mumbai',
        x: 25,
        y: 65,
        image: 'https://images.unsplash.com/photo-1570160897040-30430ef2015a?q=80&w=800',
        desc: 'Cruise along the Marine Drive with our premium fleet.'
    },
    {
        id: 'manali',
        name: 'Manali',
        x: 45,
        y: 15,
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800',
        desc: 'Adventure tourers for the ultimate Leh-Ladakh trip.'
    }
];

const InteractiveMap = () => {
    const [activeSpot, setActiveSpot] = useState(null);

    return (
        <section className="py-20 md:py-32 bg-slate-900 relative overflow-hidden">
            {/* Background Decorative Mesh */}
            <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-100 z-10"></div>

            <div className="container-custom relative z-20">
                <div className="text-center mb-16 md:mb-24">
                    <Reveal center>
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                            Pan-India <br />
                            <span className="text-primary">Network</span>
                        </h2>
                    </Reveal>
                    <p className="text-sm font-semibold text-slate-400 mt-4 tracking-wide uppercase">Serving 50+ Cities & 500+ Local Vendors</p>
                </div>

                <div className="max-w-6xl mx-auto relative bg-slate-800/50 rounded-[4rem] aspect-[21/9] md:aspect-[16/7] shadow-2xl border border-white/5 overflow-hidden">
                    {/* The Map Background Layer */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
                            alt="Map Texture"
                            className="w-full h-full object-cover opacity-20 grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
                    </div>

                    {/* Interactive Points */}
                    {spots.map((spot) => (
                        <div
                            key={spot.id}
                            className="absolute z-30 cursor-pointer group"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                            onMouseEnter={() => setActiveSpot(spot)}
                            onMouseLeave={() => setActiveSpot(null)}
                        >
                            <div className="relative -translate-x-1/2 -translate-y-1/2">
                                {/* Pulse Effect */}
                                <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2">
                                    <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-75"></span>
                                    <span className="absolute inset-2 rounded-full bg-primary/60 animate-ping opacity-50 animation-delay-500"></span>
                                </div>

                                <motion.div
                                    animate={{
                                        scale: activeSpot?.id === spot.id ? 1.4 : 1,
                                        backgroundColor: activeSpot?.id === spot.id ? '#035c3e' : '#fff'
                                    }}
                                    className="w-4 h-4 rounded-full shadow-[0_0_20px_rgba(3,92,62,0.6)] border-2 border-white relative z-10"
                                />

                                <AnimatePresence>
                                    {activeSpot?.id === spot.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-6 z-50 border border-white/50"
                                        >
                                            <div className="h-40 rounded-[2rem] overflow-hidden mb-6 relative group/img">
                                                <img src={spot.image} alt={spot.name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Active Fleet</span>
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 leading-none mb-2">{spot.name}</h4>
                                            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">{spot.desc}</p>
                                            <Link to="/packages" className="flex items-center justify-between group/link">
                                                <span className="text-xs font-bold text-primary uppercase tracking-wider border-b-2 border-primary/20 group-hover/link:border-primary transition-all">Explore Availability</span>
                                                <ArrowUpRight className="w-4 h-4 text-primary group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}

                    {/* Premium Label Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-12 opacity-50">
                    {['24/7 Support', 'Verified Hubs', 'Instant Pickup', 'Clean Machines'].map((t, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-primary fill-primary" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider leading-none">{t}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
