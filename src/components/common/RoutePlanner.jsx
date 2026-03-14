import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Shield, Coffee, Fuel, Camera, ArrowRight, Star, Clock, Navigation } from 'lucide-react';
import Reveal from './Reveal';

const routes = [
    {
        id: 'manali-leh',
        name: 'Manali to Leh Expedition',
        difficulty: 'Hard',
        distance: '473 KM',
        duration: '2-3 Days',
        color: '#035c3e',
        stops: [
            { id: 1, name: 'Manali Base', type: 'start', x: 45, y: 35, desc: 'WavyGo Main Hub. Gear up here.' },
            { id: 2, name: 'Rohtang Pass', type: 'camera', x: 48, y: 30, desc: 'Highest viewpoint. Perfect for photos.' },
            { id: 3, name: 'Keylong Pitt', type: 'pitstop', x: 46, y: 22, desc: 'Food, fuel and basic repairs.' },
            { id: 4, name: 'Sarchu Safety Zone', type: 'safety', x: 50, y: 15, desc: 'Medical aid & oxygen cylinders available.' },
            { id: 5, name: 'Leh Finishing', type: 'end', x: 52, y: 8, desc: 'Drop off point or continue to Pangong.' }
        ]
    },
    {
        id: 'coastal-goa',
        name: 'The Goa Coastal Trail',
        difficulty: 'Easy',
        distance: '120 KM',
        duration: '1 Day',
        color: '#fbbf24',
        stops: [
            { id: 1, name: 'North Goa', type: 'start', x: 25, y: 65, desc: 'Start from Calangute.' },
            { id: 2, name: 'Old Goa', type: 'pitstop', x: 28, y: 72, desc: 'Heritage stop and snacks.' },
            { id: 3, name: 'South Goa Cafe', type: 'pitstop', x: 32, y: 80, desc: 'Partner cafe with free parking.' },
            { id: 4, name: 'Palolem Hub', type: 'end', x: 35, y: 88, desc: 'Enjoy the sunset.' }
        ]
    }
];

const RoutePlanner = () => {
    const [activeRoute, setActiveRoute] = useState(routes[0]);
    const [activeStop, setActiveStop] = useState(null);

    const getIcon = (type) => {
        switch (type) {
            case 'pitstop': return <Coffee className="w-3 h-3" />;
            case 'safety': return <Shield className="w-3 h-3" />;
            case 'camera': return <Camera className="w-3 h-3" />;
            case 'start': return <Navigation className="w-3 h-3" />;
            case 'end': return <MapPin className="w-3 h-3" />;
            default: return <MapPin className="w-3 h-3" />;
        }
    };

    return (
        <section className="py-20 md:py-32 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none"></div>

            <div className="container-custom relative z-20">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
                    <div className="max-w-2xl">
                        <Reveal>
                            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">Adventure Ready</span>
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight uppercase">
                                The Route <span className="text-primary italic">Planner</span>
                            </h2>
                        </Reveal>
                        <p className="text-slate-400 font-medium mt-6 text-sm md:text-lg max-w-xl">Don't just rent a bike, discover the path. Explore curated routes with verified pit-stops and 24/7 safety zones.</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {routes.map(route => (
                            <button
                                key={route.id}
                                onClick={() => setActiveRoute(route)}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeRoute.id === route.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700'}`}
                            >
                                {route.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Route Details Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
                            <h3 className="text-white font-black text-xl mb-6 uppercase tracking-tight italic">{activeRoute.name}</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                            <Star className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Difficulty</span>
                                    </div>
                                    <span className="text-xs font-bold text-white">{activeRoute.difficulty}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <MapPin className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distance</span>
                                    </div>
                                    <span className="text-xs font-bold text-white">{activeRoute.distance}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                            <Clock className="w-4 h-4 text-indigo-500" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                                    </div>
                                    <span className="text-xs font-bold text-white">{activeRoute.duration}</span>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">Waypoints</h4>
                                <div className="space-y-4 relative">
                                    <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-800"></div>
                                    {activeRoute.stops.map(stop => (
                                        <div
                                            key={stop.id}
                                            className="flex items-center gap-4 relative z-10 group cursor-pointer"
                                            onMouseEnter={() => setActiveStop(stop)}
                                            onMouseLeave={() => setActiveStop(null)}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${activeStop?.id === stop.id ? 'bg-primary scale-110' : 'bg-slate-800'}`}>
                                                {getIcon(stop.type)}
                                            </div>
                                            <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${activeStop?.id === stop.id ? 'text-primary' : 'text-slate-400 group-hover:text-white'}`}>{stop.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Visualizer */}
                    <div className="lg:col-span-3">
                        <div className="relative h-[600px] md:h-[700px] bg-slate-900 rounded-[3rem] p-4 md:p-8 shadow-2xl border border-white/5 overflow-hidden group">
                            {/* Map Pattern Overlay */}
                            <div className="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-[10000ms]">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
                                    alt="Map Texture"
                                    className="w-full h-full object-cover grayscale"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-transparent to-slate-950"></div>
                            </div>

                            {/* Animated Connection Lines (Pure CSS SVG) */}
                            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-30">
                                <motion.polyline
                                    points={activeRoute.stops.map(s => `${s.x}%,${s.y}%`).join(' ')}
                                    fill="none"
                                    stroke={activeRoute.color}
                                    strokeWidth="2"
                                    strokeDasharray="8,8"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    key={activeRoute.id}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </svg>

                            {/* Waypoint Markers on Map */}
                            {activeRoute.stops.map((stop) => (
                                <div
                                    key={stop.id}
                                    className="absolute z-20 cursor-pointer"
                                    style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                                    onMouseEnter={() => setActiveStop(stop)}
                                    onMouseLeave={() => setActiveStop(null)}
                                >
                                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                                        <motion.div
                                            animate={{
                                                scale: activeStop?.id === stop.id ? 1.3 : 1,
                                                borderColor: activeStop?.id === stop.id ? activeRoute.color : '#fff'
                                            }}
                                            className={`w-10 h-10 rounded-2xl bg-slate-900 shadow-2xl border-2 flex items-center justify-center transition-all ${activeStop?.id === stop.id ? 'z-50' : 'z-20'}`}
                                        >
                                            <div className={`${activeStop?.id === stop.id ? 'text-primary' : 'text-slate-400'} transition-colors`}>
                                                {getIcon(stop.type)}
                                            </div>
                                        </motion.div>

                                        {/* Simple Stop Label */}
                                        <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg border border-white/5 whitespace-nowrap transition-all duration-300 ${activeStop?.id === stop.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{stop.name}</span>
                                        </div>

                                        {/* Detailed Tooltip */}
                                        <AnimatePresence>
                                            {activeStop?.id === stop.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                                    className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 bg-white rounded-3xl p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] z-50 border border-slate-100"
                                                >
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stop.type === 'safety' ? 'bg-rose-500 text-white' : 'bg-primary/10 text-primary'}`}>
                                                            {getIcon(stop.type)}
                                                        </div>
                                                        <div>
                                                            <h5 className="text-slate-900 font-black text-sm uppercase tracking-tight mb-1">{stop.name}</h5>
                                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest">{stop.type}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-slate-500 text-[11px] leading-relaxed mb-4">{stop.desc}</p>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend / Support Footer */}
                <div className="mt-16 bg-slate-900/30 rounded-3xl p-6 border border-white/5 flex flex-wrap items-center justify-center gap-8 md:gap-16">
                    {[
                        { icon: Coffee, label: 'Verified Pit-stops', color: 'text-primary' },
                        { icon: Shield, label: 'Managed Safety Zones', color: 'text-rose-500' },
                        { icon: Fuel, label: 'Fuel Stations', color: 'text-orange-500' },
                        { icon: Camera, label: 'Photo Spots', color: 'text-indigo-500' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoutePlanner;

