import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CTA = () => {
    return (
        <section className="pt-2 pb-16 md:py-16 bg-white relative overflow-hidden">
            <div className="container-custom">
                <div className="relative max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-[#035c3e] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
                    {/* Background Accents (Subtle) */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-10 animate-pulse"></div>

                    <div className="relative z-10 p-6 md:p-16 text-center">
                        <div className="inline-flex items-center justify-center gap-2 md:gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-4 md:px-6 py-2 md:py-2.5 rounded-xl mb-6 md:mb-8 shadow-inner w-auto max-w-[90%]">
                            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white animate-spin-slow flex-shrink-0" />
                            <span className="text-white text-[7px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-[0.3em] leading-tight text-center">Limited Edition Fleet Launch</span>
                        </div>

                        <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter uppercase leading-tight md:leading-[0.9]">
                            Ignite Your <br className="block" /><span className="text-white/60">Freedom</span>
                        </h2>

                        <p className="text-sm md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-12 font-medium leading-relaxed">
                            Stop scrolling. Start riding. Access India's most verified fleet of premium machines with zero security deposit.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link to="/packages" className="w-full md:w-auto">
                                <Button className="w-full md:px-12 h-16 rounded-xl bg-white text-[#035c3e] border-none font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg group hover:bg-slate-100 transition-all duration-500">
                                    Book Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/contact" className="w-full md:w-auto">
                                <button className="w-full md:px-12 h-16 rounded-xl border-2 border-white/30 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all duration-500">
                                    Support Desk
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
