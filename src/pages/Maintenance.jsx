import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Wrench, Hammer, Clock } from 'lucide-react';

const Maintenance = ({ message }) => {
    return (
        <div className="min-h-screen bg-[#effaf6] flex items-center justify-center p-6 text-center overflow-hidden relative">
            {/* Animated Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full flex items-center justify-center"
                >
                    <Settings className="w-64 h-64 text-primary/10" />
                </motion.div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full relative z-10"
            >
                <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mx-auto mb-10 text-primary border border-slate-50">
                    <motion.div
                        animate={{ 
                            rotate: [0, 10, -10, 0],
                            y: [0, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <Hammer className="w-12 h-12" />
                    </motion.div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight uppercase italic">
                    Improving Your <br />
                    <span className="text-primary underline decoration-primary/20 underline-offset-8">Adventure.</span>
                </h1>
                
                <p className="text-slate-500 font-bold text-sm md:text-lg mb-12 max-w-lg mx-auto leading-relaxed uppercase tracking-widest bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white">
                    {message || 'Our website is currently undergoing scheduled maintenance to bring you a more premium experience. We will be back online shortly!'}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Back In: <span className="text-slate-900">Few Hours</span></span>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-900 px-6 py-3 rounded-2xl shadow-xl shadow-emerald-900/20">
                        <Wrench className="w-5 h-5 text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Status: <span className="text-primary">Upgrading</span></span>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200/50">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">WavyGo Premium Bike Rentals</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Maintenance;
