import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Fuel, Leaf, Map, Route, Zap, TrendingUp, Clock } from 'lucide-react';

const RideStats = () => {
    // Mock data for the dashboard
    const stats = [
        {
            id: 'distance',
            label: 'Distance Covered',
            value: '1,240',
            unit: 'KM',
            icon: Route,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            trend: '+12% from last trip'
        },
        {
            id: 'fuel',
            label: 'Fuel Estimator',
            value: '45.8',
            unit: 'Liters',
            icon: Fuel,
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            trend: 'Avg 27 KM/L'
        },
        {
            id: 'carbon',
            label: 'Carbon Footprint',
            value: '0.12',
            unit: 'Tons CO2',
            icon: Leaf,
            color: 'text-green-500',
            bg: 'bg-green-50',
            trend: 'Eco-Rider Level: Gold'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Live Status Header */}
            <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                            <Activity className="w-6 h-6 text-primary animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tight italic">Live Ride Status</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Session: Manali Expedition</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Time in Saddle</p>
                            <p className="text-xl font-black">04:22:15</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group ${stat.id === 'carbon' && 'col-span-2 md:col-span-1'}`}
                    >
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <p className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-1 mb-3 md:mb-4">
                            <h4 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h4>
                            <span className="text-[8px] md:text-xs font-bold text-slate-400 uppercase">{stat.unit}</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2 pt-3 md:pt-4 border-t border-slate-50">
                            <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500" />
                            <span className="text-[7px] md:text-[9px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">{stat.trend}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Secondary Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4">
                {/* Distance Chart Mockup */}
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h4 className="font-black text-slate-900 uppercase tracking-tight italic">Distance Trend</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last 7 days</p>
                        </div>
                        <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-end justify-between h-32 gap-2">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                                className={`flex-1 rounded-t-lg transition-all ${i === 3 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-slate-200 hover:bg-slate-300'}`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <span key={day} className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{day}</span>
                        ))}
                    </div>
                </div>

                {/* Eco Impact Level */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                            <Leaf className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-slate-900 uppercase tracking-tight italic">Eco Impact Score</h4>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-center">
                        <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden mb-4">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '85%' }}
                                transition={{ delay: 1, duration: 1.5 }}
                                className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-500/20"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Beginner</span>
                            <span className="text-sm font-black text-green-600 uppercase tracking-tighter">85% Eco Elite</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Master</span>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-100">
                        <p className="text-[10px] font-bold text-green-700 leading-relaxed">
                            Bhai, aapki riding style ki wajah se aapne pichle mahine <span className="font-black underline font-italic">12 trees</span> jitna carbon save kiya hai! Keep it up! 🌲✨
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideStats;
