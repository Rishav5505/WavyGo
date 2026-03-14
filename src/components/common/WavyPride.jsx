import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Zap, Star, Shield, ArrowRight, Gift, Medal, Target, TrendingUp, Users, ChevronRight } from 'lucide-react';

const stats = [
    { id: 1, label: 'Riding Hours', value: '428', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, label: 'Wavy Points', value: '12,450', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 3, label: 'Trips Done', value: '24', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 4, label: 'Rewards', value: '8', icon: Medal, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const rewards = [
    { title: 'Free Helmet Upgrade', points: '2,500', icon: Shield, desc: 'Premium carbon fiber helmets.' },
    { title: '15% Off Voucher', points: '5,000', icon: Gift, desc: 'Flat discount on next ride.' },
    { title: 'Weekend Pass', points: '12,000', icon: Star, desc: '48H free rental (commuter).' },
];

const WavyPride = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const currentHours = 428;
    const nextTierHours = 500;
    const progress = (currentHours / nextTierHours) * 100;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Banner area */}
            <div className="relative p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-[#e2f3ee] text-slate-900 overflow-hidden group border border-primary/10 shadow-sm">
                <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 transition-transform group-hover:scale-110 duration-700">
                    <Trophy className="w-16 h-16 md:w-24 md:h-24 text-primary" />
                </div>
                
                <div className="relative z-10 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest border border-primary/20">Explorer Level</span>
                        <span className="text-[9px] font-medium text-slate-500">Since Jan 2024</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-slate-900 leading-tight">Wavy Pride Benefits</h2>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-sm md:max-w-none">
                        You're just <span className="text-slate-900 font-bold">72 hours</span> away from becoming a <span className="text-primary font-bold">Veteran Rider</span>. Keep riding to unlock perks.
                    </p>
                    
                    <div className="space-y-2.5">
                        <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">
                            <span>Progress to Veteran</span>
                            <span className="text-primary">86%</span>
                        </div>
                        <div className="h-2 md:h-2.5 bg-white rounded-full overflow-hidden border border-primary/5">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary to-emerald-400 shadow-[0_0_10px_rgba(3,92,62,0.5)]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={stat.id} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 md:mb-4`}>
                            <stat.icon size={16} className="md:w-5 md:h-5" />
                        </div>
                        <p className="text-slate-500 text-[10px] md:text-xs font-medium mb-1">{stat.label}</p>
                        <h4 className="text-lg md:text-xl font-bold text-slate-900">{stat.value}</h4>
                    </div>
                ))}
            </div>

            {/* Main Tabs / Content Area */}
            <div className="rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 overflow-hidden bg-white">
                <div className="flex border-b border-slate-50 overflow-x-auto scrollbar-hide">
                    {['Overview', 'Rewards', 'History'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`flex-1 py-5 text-sm font-bold transition-all relative ${activeTab === tab.toLowerCase() ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab}
                            {activeTab === tab.toLowerCase() && (
                                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div 
                                key="overview"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <TrendingUp size={18} className="text-primary" /> Current Standing
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                            As an <span className="font-bold">Explorer</span>, you get 5% cashback on all wallet top-ups and early access to weekend rental slots.
                                        </p>
                                        <button className="text-xs font-bold text-primary flex items-center gap-1 group">
                                            View all tier benefits <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <Target size={18} className="text-emerald-600" /> This Month's Mission
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            Complete 3 rides over 40km to earn an extra <span className="font-bold">1,000 Wavy Points</span>.
                                        </p>
                                        <div className="mt-4 flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full">
                                                <div className="h-full bg-emerald-500 w-2/3 rounded-full" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500">2/3 Done</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'rewards' && (
                            <motion.div 
                                key="rewards"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                {rewards.map((reward, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <reward.icon size={20} className="md:w-6 md:h-6" />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-slate-900 text-sm md:text-base">{reward.title}</h5>
                                                <p className="text-[10px] md:text-xs text-slate-500">{reward.desc}</p>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                                            <span className="text-[10px] md:text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">{reward.points} Points</span>
                                            <button className="px-4 py-1.5 md:px-5 md:py-2 rounded-xl bg-primary text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider hover:bg-slate-900 transition-all">Redeem</button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'history' && (
                            <motion.div 
                                key="history"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-10"
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                    <Clock className="text-slate-300" size={32} />
                                </div>
                                <p className="text-slate-400 text-sm font-medium">Your point history will appear here.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Support micro-banner */}
            <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                    <Shield className="text-primary" size={20} />
                    <div>
                        <p className="text-sm font-bold text-slate-900">Elite Rider Support</p>
                        <p className="text-[10px] text-slate-500">Dedicated helpline active for Veteran & Legend tiers.</p>
                    </div>
                </div>
                <button className="text-[10px] font-bold text-slate-900 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">Contact Team</button>
            </div>
        </div>
    );
};

export default WavyPride;
