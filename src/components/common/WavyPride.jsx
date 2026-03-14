import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Zap, Star, Shield, ArrowRight, Gift, Medal, Target, TrendingUp, Users, ChevronRight, Award, Crown } from 'lucide-react';

const TIERS = [
    { 
        id: 'bronze', 
        name: 'Bronze Rider', 
        icon: Medal, 
        color: 'text-orange-600', 
        border: 'border-orange-200',
        bg: 'bg-orange-50',
        points: '0 - 5,000',
        benefits: ['5% discount on bookings', 'Standard support', 'Wavy Pride Badge']
    },
    { 
        id: 'silver', 
        name: 'Silver Elite', 
        icon: Award, 
        color: 'text-slate-400', 
        border: 'border-slate-200',
        bg: 'bg-slate-50',
        points: '5,001 - 15,000',
        benefits: ['10% discount on bookings', 'Priority booking slot', 'Free helmet rental', 'Personalized route tips']
    },
    { 
        id: 'gold', 
        name: 'Gold Legend', 
        icon: Crown, 
        color: 'text-amber-500', 
        border: 'border-amber-200',
        bg: 'bg-amber-50/50',
        points: '15,000+',
        benefits: ['15% discount on bookings', '24/7 VIP Concierge', 'Exclusive gear access', 'Free backup bike support']
    }
];

const stats = [
    { id: 1, label: 'Riding Hours', value: '428', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, label: 'Club Points', value: '12,450', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 3, label: 'Active Tier', value: 'Silver', icon: Award, color: 'text-slate-500', bg: 'bg-slate-100' },
    { id: 4, label: 'Total Savings', value: '₹4,200', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const WavyPride = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const userPoints = 12450;
    const nextTierPoints = 15000;
    const progress = (userPoints / nextTierPoints) * 100;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Rider Club Header */}
            <div className="relative p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-[#e2f3ee] text-slate-900 overflow-hidden group shadow-sm border border-primary/5">
                <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 transition-transform group-hover:scale-110 duration-1000">
                    <Crown className="w-24 h-24 md:w-48 md:h-48 text-primary" />
                </div>
                
                <div className="relative z-10 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                        <div className="flex items-center gap-1.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 text-primary text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-primary/20 shadow-sm">
                            <Award className="w-3 md:w-3.5 h-3 md:h-3.5" /> Silver Elite Member
                        </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-5xl font-black mb-3 md:mb-4 tracking-tighter leading-[1.1] md:leading-tight italic uppercase">Rider Club <br className="md:hidden" /><span className="text-primary/40">Loyalty</span></h2>
                    
                    <p className="text-slate-600 text-[11px] md:text-lg leading-relaxed mb-6 md:mb-10 max-w-lg font-medium pr-4">
                        Bhai, aap <span className="text-slate-900 font-bold">Gold Legend</span> banne ke bahut kareeb ho! Bas <span className="text-primary font-bold italic underline decoration-primary/30">2,550 points</span> aur... 🎖️
                    </p>
                    
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex justify-between items-end text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-500">
                            <div className="flex flex-col md:flex-row md:gap-2">
                                <span className="text-slate-400">Points:</span>
                                <span>12,450 / 15,000</span>
                            </div>
                            <span className="text-primary shrink-0">83% Progress</span>
                        </div>
                        <div className="h-2.5 md:h-3 bg-white rounded-full overflow-hidden p-0.5 border border-primary/10">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary via-emerald-500 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(3,92,62,0.3)]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Loyalty Tiers Display */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {TIERS.map((tier) => (
                    <div key={tier.id} className={`relative p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border-2 transition-all duration-500 hover:-translate-y-2 ${tier.id === 'silver' ? `bg-white ${tier.border} shadow-2xl shadow-slate-200` : `bg-slate-50/50 ${tier.border} opacity-80`} ${tier.id === 'gold' && 'col-span-2 md:col-span-1'}`}>
                        {tier.id === 'silver' && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 text-white px-3 py-1 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-widest border border-white/20 whitespace-nowrap z-10">
                                Current
                            </div>
                        )}
                        
                        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${tier.bg} ${tier.color} flex items-center justify-center mb-4 md:mb-8 shadow-sm`}>
                            <tier.icon className="w-5 h-5 md:w-8 md:h-8" />
                        </div>
                        
                        <h3 className={`text-xs md:text-xl font-black uppercase italic mb-0.5 tracking-tight ${tier.color}`}>{tier.name}</h3>
                        <p className="text-[7px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-6">{tier.points} Pts</p>
                        
                        <ul className="space-y-2 md:space-y-4">
                            {tier.benefits.slice(0, tier.id === 'gold' && activeTab !== 'gold_details' ? 2 : 10).map((benefit, i) => (
                                <li key={i} className="flex items-center gap-2 text-[8px] md:text-xs font-bold text-slate-600">
                                    <div className={`w-1 h-1 rounded-full shrink-0 ${tier.id === 'silver' ? 'bg-primary' : 'bg-slate-300'}`} />
                                    <span className="line-clamp-1">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Points Summary & Redemption */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-50">
                    <button className="flex-1 py-6 text-xs font-black uppercase tracking-[0.2em] text-primary border-b-2 border-primary">
                        Rewards Wallet
                    </button>
                    <button className="flex-1 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600">
                        Points History
                    </button>
                </div>
                
                <div className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h4 className="text-xl font-black uppercase italic text-slate-900 tracking-tight">Available Rewards</h4>
                            <div className="grid grid-cols-2 gap-3 md:flex md:flex-col md:gap-4">
                                {[
                                    { title: '₹1,000 Off', pts: '8,000', icon: Gift },
                                    { title: 'Free GoPro', pts: '4,500', icon: Target },
                                    { title: 'Pride Jacket', pts: '12,000', icon: Shield }
                                ].map((reward, i) => (
                                    <div key={i} className="flex flex-col md:flex-row items-center md:items-center justify-between p-4 md:p-5 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-white hover:shadow-lg transition-all text-center md:text-left">
                                        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <reward.icon size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] md:text-sm font-bold text-slate-800 leading-tight mb-1">{reward.title}</p>
                                                <p className="text-[8px] md:text-[10px] font-black text-amber-600 uppercase tracking-widest">{reward.pts} Pts</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="hidden md:block w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10 flex flex-col justify-center items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl shadow-primary/10 mb-6">
                                <Zap className="w-10 h-10 text-primary animate-pulse" />
                            </div>
                            <h4 className="text-2xl font-black text-slate-900 italic uppercase mb-2">Power Up!</h4>
                            <p className="text-xs text-slate-500 font-medium mb-8">Bhai, pichle mahine aapne <span className="text-primary font-black">2,400 points</span> earn kiye hain. Gold tier bas thodi hi door hai!</p>
                            <button className="w-full bg-slate-950 text-white rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all">
                                Earn More Points
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WavyPride;
