import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CTA = () => {
    return (
        <section className="pt-2 pb-12 md:py-10 bg-white relative overflow-hidden">
            <div className="container-custom">
                <div className="relative max-w-5xl mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#035c3e] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]">
                    {/* Background Accents (Subtle) */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-10 animate-pulse"></div>

                    <div className="relative z-10 p-6 md:p-10 lg:p-12 text-center">
                        <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl mb-5 shadow-inner w-auto max-w-[90%]">
                            <Sparkles className="w-3 h-3 text-white animate-spin-slow flex-shrink-0" />
                            <span className="text-white text-[7px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-[0.3em] leading-tight text-center">Limited Edition Fleet Launch</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase leading-tight md:leading-[1]">
                            Ignite Your <br className="block" /><span className="text-white/60">Freedom</span>
                        </h2>

                        <p className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
                            Stop scrolling. Start riding. Access India's most verified fleet of premium machines with zero security deposit.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <Link to="/packages" className="w-full md:w-auto">
                                <Button className="w-full md:px-10 h-12 md:h-14 rounded-xl bg-white text-[#035c3e] border-none font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg group hover:bg-slate-100 transition-all duration-500">
                                    Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/contact" className="w-full md:w-auto">
                                <button className="w-full md:px-10 h-12 md:h-14 rounded-xl border-2 border-white/30 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all duration-500">
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
