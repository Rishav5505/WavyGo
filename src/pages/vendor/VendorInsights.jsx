import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Bell, Calendar, Wallet, CreditCard, 
    Clock, CheckCircle2, XCircle, AlertCircle,
    TrendingUp, ArrowUpRight
} from 'lucide-react';
import API from '../../utils/api';

const VendorInsights = () => {
    const [timeframe, setTimeframe] = useState('Today');
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const vendorId = localStorage.getItem('vendorId') || 'V1';
    const vendorName = localStorage.getItem('vendorName') || 'Rishav';

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setLoading(true);
                const { data } = await API.get(`/bookings/vendor-stats?vendorId=${encodeURIComponent(vendorId)}`);
                setStatsData(data);
            } catch (error) {
                console.error("Failed to fetch insights", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, [vendorId]);

    const stats = [
        { label: "Total Bookings", value: statsData?.totalBookings || "0", color: "bg-white", textColor: "text-slate-900 border-emerald-100", fullWidth: true },
        { label: "Cash", value: statsData?.cash || "0", color: "bg-white", textColor: "text-slate-900 border-emerald-100" },
        { label: "Online", value: statsData?.online || "0", color: "bg-white", textColor: "text-slate-900 border-emerald-100" },
        { label: "Wallet", value: statsData?.wallet || "0", color: "bg-white", textColor: "text-slate-900 border-emerald-100" },
        { label: "Pending", value: statsData?.pending || "0", color: "bg-amber-50/50", textColor: "text-amber-500 border-amber-100" },
        { label: "Accepted", value: statsData?.confirmed || "0", color: "bg-blue-50/50", textColor: "text-blue-500 border-blue-100" },
        { label: "Rejected", value: statsData?.rejected || "0", color: "bg-rose-50/50", textColor: "text-rose-500 border-rose-100" },
        { label: "Cancelled", value: statsData?.cancelled || "0", color: "bg-rose-50/50", textColor: "text-rose-500 border-rose-100" },
        { label: "Ongoing", value: statsData?.ongoing || "0", color: "bg-orange-50/50", textColor: "text-orange-500 border-orange-100" },
        { label: "Completed", value: statsData?.completed || "0", color: "bg-emerald-50/50", textColor: "text-emerald-500 border-emerald-100" },
    ];

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-10 pb-20 max-w-md mx-auto md:max-w-none px-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Insights</h1>
                <div className="relative cursor-pointer group">
                    <div className="w-10 h-10 bg-[#effaf6] rounded-full flex items-center justify-center text-primary shadow-sm border border-emerald-50">
                        <Bell className="w-5 h-5 fill-primary/10" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
                    </div>
                </div>
            </div>

            {/* Timeframe Tabs */}
            <div className="flex gap-2 p-1 bg-white border border-emerald-100 rounded-2xl overflow-x-auto no-scrollbar">
                {['Today', 'Last 7 Days', 'Last 15 Days'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTimeframe(t)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap flex-1 ${
                            timeframe === t 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-100' 
                            : 'text-slate-400 hover:text-slate-600 scale-95 opacity-70'
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={idx}
                        className={`${stat.color} ${stat.textColor} ${stat.fullWidth ? 'col-span-2' : ''} p-5 md:p-8 rounded-[1.5rem] border shadow-sm flex flex-col justify-between min-h-[110px] md:min-h-[160px] relative overflow-hidden group`}
                    >
                        <p className={`text-[10px] md:text-sm font-black uppercase tracking-[0.2em] opacity-60 mb-2`}>{stat.label}</p>
                        <h3 className="text-2xl md:text-4xl font-black">{stat.value}</h3>
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                             <TrendingUp className="w-24 h-24 md:w-32 md:h-32" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Insight Card */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-[10rem] pointer-events-none" />
                <div className="relative z-10">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4">Market Trend</h4>
                    <p className="text-lg font-bold leading-tight mb-4">Your business is growing 15% faster than last month!</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-white/5 py-2 px-4 rounded-xl border border-white/5 inline-flex">
                        <ArrowUpRight className="w-4 h-4" /> Keep it up, {vendorName}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorInsights;
