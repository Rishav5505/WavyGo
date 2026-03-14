import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Sparkles, Map as MapIcon, Coffee, Camera, Bike, ArrowRight, Loader2, Info, ChevronRight, Mountain, Waves, TreePine, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Button from './Button';

const ROUTE_DATA = {
    "delhi_manali": {
        name: "Heart of the Himalayas",
        description: "A legendary run from the plains to the high mountains, passing through winding river valleys and pine forests.",
        scenic_points: ["Bilaspur Lake View", "Kullu Valley Ridges", "Beas River Crossings"],
        stops: ["Murthal (Brunch)", "Amrik Sukhdev", "Pandoh Dam"],
        terrain: "Mixed (Highways + Sharp Hairpins)",
        recommendation: {
            type: "Adventure Tourer",
            model: "Royal Enfield Himalayan",
            reason: "High ground clearance and low-end torque are essential for the steep climbs and occasional water crossings near Manali."
        }
    },
    "bangalore_coorg": {
        name: "The Coffee Trail",
        description: "Smooth tarmac through massive coffee plantations and misty hills. Perfect for a relaxed yet soulful weekend ride.",
        scenic_points: ["Bylakuppe Golden Temple Path", "Madikeri Hill View", "Western Ghats Mist"],
        stops: ["Kamat Lokaruchi (Breakfast)", "Cauvery Nisargadhama"],
        terrain: "Smooth Winding Curves",
        recommendation: {
            type: "Cruiser",
            model: "RE Classic 350",
            reason: "The upright posture and relaxed engine note match the serene vibe of the coffee estates perfectly."
        }
    },
    "mumbai_goa": {
        name: "Konkan Expressway",
        description: "The ultimate coastal run. Coconut groves on one side, Arabian sea on the other. Pure freedom.",
        scenic_points: ["Gateway of India (Start)", "Ratnagiri Coastline", "Vengurla Beach Road"],
        stops: ["Chiplun Riverside", "Typical Konkani Thali Halt"],
        terrain: "Coastal Highways + Ghats",
        recommendation: {
            type: "Sports Cruiser",
            model: "Royal Enfield Meteor",
            reason: "Built for long highways with enough agility to handle the Amba Ghat section comfortably."
        }
    }
};

const AIRoutePlanner = ({ onClose }) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [status, setStatus] = useState('idle'); // idle, planning, result
    const [plan, setPlan] = useState(null);

    const handlePlan = (e) => {
        e.preventDefault();
        if (!start || !end) return;

        setStatus('planning');
        
        // Simulate AI thinking
        setTimeout(() => {
            const key = `${start.toLowerCase()}_${end.toLowerCase()}`;
            const result = ROUTE_DATA[key] || {
                name: "Custom Explorer Route",
                description: `A unique journey through the heart of India from ${start} to ${end}. Expect diverse landscapes and hidden gems.`,
                scenic_points: ["Local Landscape Highlights", "Horizon Views"],
                stops: ["Local Artisan Markets", "High-Rated Highway Cafes"],
                terrain: "Varied Terrains",
                recommendation: {
                    type: "All-Rounder",
                    model: "Classic 350",
                    reason: "Reliable performance and comfort for any Indian road condition."
                }
            };
            setPlan(result);
            setStatus('result');
        }, 3000);
    };

    return (
        <section className="py-12 md:py-24 bg-[#e2f3ee] relative overflow-hidden h-full overflow-y-auto">
            {/* Close Button if Modal */}
            {onClose && (
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-primary/10 text-slate-400 hover:text-primary transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            )}

            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/50 rounded-full blur-[100px] -ml-64 -mb-64"></div>
            
            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
                    
                    {/* Left: Input Console */}
                    <div className="space-y-8 md:space-y-12">
                        <div>
                            <Reveal>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6">
                                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Next-Gen Planning</span>
                                </div>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase mb-4 md:mb-6">
                                    AI Route <br /> <span className="text-primary">Intelligence</span>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="text-slate-500 font-medium text-xs md:text-base leading-relaxed max-w-md">
                                    Our neural network analyzes thousands of biker logs to find you the most scenic, safe, and soulful routes across India.
                                </p>
                            </Reveal>
                        </div>

                        <motion.form 
                            layout
                            onSubmit={handlePlan}
                            className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border border-primary/10 space-y-6 md:space-y-8 shadow-[0_40px_80px_-20px_rgba(3,92,62,0.15)]"
                        >
                            <div className="space-y-4 md:space-y-6">
                                <div className="space-y-2 group">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Station</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Delhi"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 pr-4 text-slate-900 font-bold focus:outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-slate-300 text-sm"
                                            value={start}
                                            onChange={(e) => setStart(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center -my-3 md:-my-4 relative z-20">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                                        <Navigation className="w-3 h-3 md:w-4 md:h-4 text-white rotate-45" />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Manali"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 pr-4 text-slate-900 font-bold focus:outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-slate-300 text-sm"
                                            value={end}
                                            onChange={(e) => setEnd(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button 
                                disabled={status === 'planning'}
                                className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-slate-950 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                {status === 'planning' ? (
                                    <>AI Working... <Loader2 className="w-4 h-4 animate-spin text-white" /></>
                                ) : 'Generate Best Route'}
                            </Button>
                        </motion.form>
                    </div>

                    {/* Right: AI Output Display */}
                    <div className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {status === 'idle' && (
                                <motion.div 
                                    key="idle"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    className="text-center space-y-4 md:space-y-6 max-w-sm"
                                >
                                    <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-primary/10 group">
                                        <MapIcon className="w-8 h-8 md:w-10 md:h-10 text-primary/30 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest leading-none">Awaiting Target</h3>
                                    <p className="text-slate-400 text-xs md:text-sm font-medium">Input your journey start and end points to let the AI architect your perfect riding experience.</p>
                                </motion.div>
                            )}

                            {status === 'planning' && (
                                <motion.div 
                                    key="planning"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center space-y-6 md:space-y-8"
                                >
                                    <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-t-2 border-r-2 border-primary/40 rounded-full"
                                        ></motion.div>
                                        <motion.div 
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-4 border-b-2 border-l-2 border-slate-300 rounded-full"
                                        ></motion.div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse mb-2" />
                                            <span className="text-[7.5px] md:text-[9px] font-black text-slate-400 tracking-widest uppercase animate-pulse">Scanning</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Optimizing Scenic Score...</p>
                                        <div className="w-36 md:w-48 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
                                            <motion.div 
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "100%" }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="w-full h-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'result' && plan && (
                                <motion.div 
                                    key="result"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="w-full space-y-6 md:space-y-8"
                                >
                                    {/* Header Info */}
                                    <div className="bg-gradient-to-br from-primary to-[#035c3e] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-primary shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Navigation className="w-16 h-16 md:w-24 md:h-24 text-white rotate-12" />
                                        </div>
                                        <div className="relative z-10">
                                            <span className="text-[8px] md:text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-2 md:mb-4 block">Recommended Route</span>
                                            <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-3 md:mb-4">{plan.name}</h3>
                                            <p className="text-white/80 font-medium text-[10px] md:text-sm leading-relaxed max-w-sm">{plan.description}</p>
                                        </div>
                                    </div>

                                    {/* Route Detail Grid */}
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                                            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                                <Camera className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                                <h4 className="text-[9px] md:text-xs font-black text-slate-900 uppercase tracking-widest">Scenic Points</h4>
                                            </div>
                                            <ul className="space-y-2 md:space-y-3">
                                                {plan.scenic_points.map((pt, i) => (
                                                    <li key={i} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-slate-500 font-medium">
                                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full shrink-0"></div>
                                                        {pt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                                            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                                <Coffee className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                                <h4 className="text-[9px] md:text-xs font-black text-slate-900 uppercase tracking-widest">Biker Stops</h4>
                                            </div>
                                            <ul className="space-y-2 md:space-y-3">
                                                {plan.stops.map((st, i) => (
                                                    <li key={i} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-slate-500 font-medium">
                                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-secondary rounded-full shrink-0"></div>
                                                        {st}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Bike Recommendation Card */}
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border border-white shadow-2xl relative overflow-hidden group"
                                    >
                                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                            <div className="w-full md:w-2/5 aspect-video bg-slate-50 rounded-3xl overflow-hidden relative p-4 flex items-center justify-center">
                                                <img 
                                                    src={plan.recommendation.model.includes('Himalayan') ? "https://imgd.aeplcdn.com/1280x720/n/cw/ec/182663/himalayan-right-side-view-7.jpeg?isig=0" : "https://imgd.aeplcdn.com/1280x720/n/cw/ec/183389/classic-350-right-side-view-50.jpeg?isig=0&q=80"} 
                                                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                                                    alt="Recommended Bike" 
                                                />
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">AI Preference</span>
                                                    <h4 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">{plan.recommendation.model}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{plan.recommendation.type}</p>
                                                </div>
                                                <p className="text-slate-600 text-sm font-medium leading-relaxed border-l-4 border-primary/20 pl-4">
                                                    {plan.recommendation.reason}
                                                </p>
                                                <Link to="/packages">
                                                    <button className="h-14 px-8 rounded-2xl bg-slate-950 text-white font-black uppercase tracking-[0.2em] text-[10px] mt-4 flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                                                        BOOK FOR THIS ROUTE <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {/* Legend Banner */}
                <Reveal delay={0.5}>
                    <div className="mt-24 p-8 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Info className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">Advanced Neural Mapping</h4>
                                <p className="text-slate-500 text-xs font-medium">Our AI analyzes elevation data, traffic patterns, and community reviews to ensure your safety.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-black text-white/40 tracking-[0.2em]">CORE ENGINE ACTIVE</span>
                            </div>
                            <div className="h-12 w-px bg-white/10 hidden md:block"></div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] animate-pulse">WavyGo v2.0</p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default AIRoutePlanner;
