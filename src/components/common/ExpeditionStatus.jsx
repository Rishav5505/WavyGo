import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Sun, CloudRain, ShieldAlert } from 'lucide-react';
import Reveal from './Reveal';

const ExpeditionStatus = () => {
    const routes = [
        {
            name: "Manali-Leh Highway",
            pass: "Rohtang & Baralacha La",
            status: "open",
            statusText: "Open",
            weather: "Sunny",
            temp: "14°C",
            info: "Clear tarmac, perfect cruiser conditions.",
            color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
            glow: "bg-emerald-500",
            Icon: Sun
        },
        {
            name: "Spiti Valley Circuit",
            pass: "Kunzum Pass",
            status: "caution",
            statusText: "Caution",
            weather: "Gravel Warning",
            temp: "8°C",
            info: "Water crossings active near Batal. High ground-clearance bikes recommended.",
            color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
            glow: "bg-amber-500",
            Icon: ShieldAlert
        },
        {
            name: "Srinagar-Leh Highway",
            pass: "Zoji La Pass",
            status: "open",
            statusText: "Open",
            weather: "Light Rain",
            temp: "11°C",
            info: "Open for one-way traffic. Expect slush near pass summit.",
            color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
            glow: "bg-emerald-500",
            Icon: CloudRain
        },
        {
            name: "Chakrata-Munsiyari Route",
            pass: "Jalori Pass Bypass",
            status: "closed",
            statusText: "Closed",
            weather: "Landslip",
            temp: "16°C",
            info: "Road blocked due to rockfall. Clearance expected in 24 hours.",
            color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
            glow: "bg-rose-500",
            Icon: ShieldAlert
        }
    ];

    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-[#023e2a] text-white selection:bg-white selection:text-[#023e2a]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 bg-emerald-400 pointer-events-none z-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-15 bg-yellow-400 pointer-events-none z-0"></div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
                    <div className="text-left">
                        <Reveal>
                            <span className="text-emerald-300 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-3 block">
                                Real-Time Expedition Status
                            </span>
                        </Reveal>
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-none mb-4 md:mb-0 text-white">
                                Live Mountain <br /><span className="text-yellow-400">Pass Advisories</span>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal>
                        <p className="text-emerald-100/70 font-medium text-xs md:text-sm max-w-sm leading-relaxed">
                            Checked hourly by local mountain hubs. Ride with verified road updates and safety advisories before launching.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {routes.map((route, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-[1.5rem] p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group hover:-translate-y-1 hover:bg-white/15"
                        >
                            <div>
                                {/* Status Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${route.glow}`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${route.glow}`}></span>
                                        </span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${route.color}`}>
                                            {route.statusText}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-200 text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full">
                                        <route.Icon className="w-3.5 h-3.5" />
                                        <span>{route.temp}</span>
                                    </div>
                                </div>

                                {/* Pass Information */}
                                <h3 className="text-lg font-black tracking-tight mb-0.5 text-white group-hover:text-yellow-400 transition-colors">
                                    {route.name}
                                </h3>
                                <p className="text-[10px] text-emerald-200/70 font-bold uppercase tracking-wider mb-4 flex items-center gap-1">
                                    <Navigation className="w-3 h-3 text-yellow-400 rotate-45" /> {route.pass}
                                </p>

                                <p className="text-xs text-emerald-100/90 leading-relaxed font-medium mb-6">
                                    {route.info}
                                </p>
                            </div>

                            {/* Weather indicator banner */}
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-emerald-200/60 text-[10px] font-black uppercase tracking-wider">
                                <span>Weather Status:</span>
                                <span className="text-white font-bold">{route.weather}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpeditionStatus;
