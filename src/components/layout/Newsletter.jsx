import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Reveal from '../common/Reveal';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[150px] -z-10 rounded-full"></div>
            <div className="container-custom">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <Reveal>
                            <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">Member Access</span>
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none italic uppercase">Elite <br /><span className="text-primary">Insiders</span></h2>
                        </Reveal>
                        <p className="text-slate-400 leading-relaxed font-medium text-xl max-w-lg">Join the inner circle. Get priority access to new fleet arrivals, exclusive cross-country routes, and elite community events.</p>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="bg-white/5 backdrop-blur-2xl p-10 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Access Granted.</h3>
                                    <p className="text-slate-400 font-medium">Welcome to the elite collective. Check your portal shortly.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="space-y-6">
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white placeholder:text-slate-500 focus:outline-none focus:bg-white/10 focus:border-primary/50 transition-all font-bold text-lg"
                                        />
                                        <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity"></div>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full h-20 bg-primary text-white hover:bg-white hover:text-primary rounded-2xl font-black uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center gap-4"
                                    >
                                        <Send className="w-5 h-5" />
                                        {status === 'loading' ? 'Verifying...' : 'Join The Collective'}
                                    </Button>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center mt-6">Zero spam. Pure high-performance culture.</p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
