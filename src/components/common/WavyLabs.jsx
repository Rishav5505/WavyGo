import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Zap, Volume2, Info, Maximize2, RotateCcw, Play, Pause } from 'lucide-react';
import Button from './Button';

const WavyLabs = () => {
    const [isIgnited, setIsIgnited] = useState(false);
    const [activeHotspot, setActiveHotspot] = useState(null);
    const audioRef = useRef(null);
    const bikeRef = useRef(null);

    // Mouse movement for 360-like tilt
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return; // Disable on mobile for perf
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        setMousePos({ x, y });
    };

    const hotspots = [
        { id: 'engine', top: '65%', left: '45%', title: 'V-Twin Power', desc: '350cc of raw torque and refined vibrations.' },
        { id: 'exhaust', top: '75%', left: '75%', title: 'Bass Note', desc: 'Custom tuned exhaust for that signature Wavy thump.' },
        { id: 'seat', top: '50%', left: '55%', title: 'Cloud Comfort', desc: 'Dual-density foam for those 500km+ days.' },
    ];

    const toggleIgnition = () => {
        setIsIgnited(!isIgnited);
        if (!isIgnited) {
            // Play ignition sound logic here if file exists
            // if (audioRef.current) audioRef.current.play();
        } else {
            // if (audioRef.current) audioRef.current.pause();
        }
    };

    return (
        <section 
            onMouseMove={handleMouseMove}
            className="py-6 md:py-10 bg-[#e2f3ee] relative overflow-hidden selection:bg-primary selection:text-white"
        >
            {/* Labs Background Pattern */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #035c3e 0.5px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#e2f3ee] via-transparent to-[#e2f3ee]"></div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col items-center text-center mb-4 md:mb-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2"
                    >
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">Experimental Feature</span>
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter uppercase mb-2">
                        Wavy<span className="text-primary">Labs</span>
                    </h2>
                    <p className="max-w-xl text-slate-600 font-medium text-xs md:text-sm">Experience the machine's soul. Interact with our flagship fleet.</p>
                </div>

                <div className="relative aspect-[4/5] md:aspect-[21/9] w-full max-w-6xl mx-auto rounded-[2rem] md:rounded-[3rem] bg-white shadow-[0_40px_80px_-15px_rgba(3,92,62,0.15)] border border-white/50 overflow-hidden group">
                    {/* Interaction UI */}
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 flex flex-col gap-4">
                        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl">
                            <h3 className="text-slate-900 font-black text-[10px] md:text-xs uppercase tracking-widest mb-1">Classic 350</h3>
                            <p className="text-primary text-[8px] md:text-[10px] font-bold tracking-tighter uppercase">Stealth Black Edition</p>
                        </div>
                    </div>

                    <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex gap-3">
                        <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/60 backdrop-blur-xl border border-white/40 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all shadow-lg">
                            <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>

                    {/* Controls Footer */}
                    <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 md:gap-6">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleIgnition}
                            className={`flex flex-col items-center gap-1.5 md:gap-2 group`}
                        >
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${isIgnited ? 'bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)]' : 'bg-white border border-slate-200 hover:border-primary'}`}>
                                <Volume2 className={`w-5 h-5 md:w-6 md:h-6 ${isIgnited ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`} />
                            </div>
                            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-slate-500">{isIgnited ? 'Stop' : 'Ignite'}</span>
                        </motion.button>
                        
                        <div className="w-px h-10 md:h-12 bg-slate-200"></div>
                        
                        <button 
                            onClick={() => setMousePos({ x: 0, y: 0 })}
                            className="flex flex-col items-center gap-1.5 md:gap-2 group"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-primary transition-all shadow-xl">
                                <RotateCcw className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-primary" />
                            </div>
                            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-slate-500">Reset</span>
                        </button>
                    </div>

                    {/* Main Interactive Bike Container */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-white to-[#f0f9f6]">
                        <motion.div
                            animate={{ 
                                rotateY: mousePos.x,
                                rotateX: -mousePos.y,
                                y: isIgnited ? [0, -2, 0] : 0
                            }}
                            transition={{ 
                                rotateY: { type: 'spring', stiffness: 50 },
                                rotateX: { type: 'spring', stiffness: 50 },
                                y: { duration: 0.1, repeat: Infinity }
                            }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            <img 
                                src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/183389/classic-350-right-side-view-50.jpeg?isig=0&q=100" 
                                className={`max-w-[90%] md:max-w-[70%] h-auto object-contain transition-all duration-1000 mix-blend-multiply ${isIgnited ? 'brightness-110' : 'brightness-100'}`}
                                alt="Labs Bike"
                            />
                            
                            {/* Hotspots */}
                            {hotspots.map((spot) => (
                                <div 
                                    key={spot.id}
                                    style={{ top: spot.top, left: spot.left }}
                                    className="absolute z-30"
                                >
                                    <button 
                                        onMouseEnter={() => setActiveHotspot(spot.id)}
                                        onMouseLeave={() => setActiveHotspot(null)}
                                        onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                                        className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center shadow-lg group/btn"
                                    >
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full group-hover/btn:scale-150 transition-transform"></div>
                                        
                                        <AnimatePresence>
                                            {activeHotspot === spot.id && (
                                                <motion.div 
                                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                                    className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-40 md:w-48 p-3 md:p-4 bg-white border border-slate-100 rounded-xl md:rounded-2xl text-left shadow-2xl z-50"
                                                >
                                                    <h4 className="text-slate-900 font-black text-[9px] md:text-[10px] uppercase tracking-widest mb-1">{spot.title}</h4>
                                                    <p className="text-slate-500 text-[9px] md:text-[10px] leading-relaxed">{spot.desc}</p>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>
                            ))}

                            {/* Vibration Lines when Ignited */}
                            {isIgnited && (
                                <>
                                    <div className="absolute inset-0 opacity-10 md:opacity-20 pointer-events-none">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div 
                                                key={i}
                                                animate={{ opacity: [0, 1, 0], scale: [1, 1.15] }}
                                                transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                                                className="absolute inset-0 border-2 border-primary rounded-full"
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Status Console */}
                    <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 flex flex-col items-end gap-1.5 md:gap-2 text-right">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <span className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isIgnited ? 'bg-primary animate-pulse' : 'bg-slate-300'}`}></div>
                        </div>
                        <div className="bg-slate-100 px-2 py-1 md:px-3 md:py-1 rounded-lg border border-slate-200">
                            <span className="text-[7px] md:text-[9px] font-mono text-primary tracking-tighter">
                                {isIgnited ? 'RPM: 1250' : 'SYSTEM: IDLE'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WavyLabs;
