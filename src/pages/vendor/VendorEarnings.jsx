import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Bell, IndianRupee, Wallet, CreditCard, 
    ArrowRight, Clock, CheckCircle2, XCircle, 
    AlertCircle, TrendingUp, History, User
} from 'lucide-react';
import API from '../../utils/api';

const VendorEarnings = () => {
    const [amount, setAmount] = useState('1000');
    const [earningsData, setEarningsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const vendorId = localStorage.getItem('vendorId') || 'V1';

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                setLoading(true);
                const { data } = await API.get(`/bookings/vendor-stats?vendorId=${encodeURIComponent(vendorId)}`);
                setEarningsData(data);
            } catch (error) {
                console.error("Failed to fetch earnings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEarnings();
    }, [vendorId]);

    const summaryData = [
        { label: "Total Earnings", value: earningsData?.earnings || "0", color: "bg-emerald-50/50 border-emerald-100", textColor: "text-emerald-700", icon: IndianRupee },
        { label: "Total Withdrawal", value: "0", color: "bg-emerald-50/50 border-emerald-100", textColor: "text-emerald-700", icon: Wallet },
        { label: "Current Balance", value: earningsData?.earnings || "0", color: "bg-emerald-50/50 border-emerald-100", textColor: "text-emerald-700", icon: IndianRupee, fullWidth: true },
    ];

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 md:space-y-12 pb-24 max-w-md mx-auto md:max-w-none px-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Earnings</h1>
                <div className="relative cursor-pointer group">
                    <div className="w-10 h-10 bg-[#effaf6] rounded-full flex items-center justify-center text-primary shadow-sm border border-emerald-50">
                        <Bell className="w-5 h-5 fill-primary/10" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
                    </div>
                </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {summaryData.map((stat, idx) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className={`${stat.color} ${stat.textColor} ${stat.fullWidth ? 'col-span-2 md:col-span-1' : ''} p-6 md:p-8 rounded-[1.8rem] border shadow-sm relative group`}
                    >
                         <div className="flex justify-between items-start mb-4">
                            <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] opacity-60">{stat.label}</p>
                            <stat.icon className="w-4 h-4 md:w-6 md:h-6 opacity-30" />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black flex items-center gap-1 leading-none">
                             {stat.value.toLocaleString()}
                        </h3>
                    </motion.div>
                ))}
            </div>

            {/* Withdraw Section */}
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-emerald-50 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 font-black text-slate-700 text-lg focus:outline-none focus:border-primary transition-all"
                            placeholder="Amount"
                        />
                    </div>
                    <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                        Withdraw
                    </button>
                </div>
                <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5" /> Minimum Withdrawal Request ₹ 1000
                </p>
            </div>

            {/* Transaction History (Mock for now, but real container) */}
            <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <History className="w-5 h-5 text-primary" /> Transaction History
                    </h3>
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">View All</button>
                </div>

                <div className="py-20 text-center space-y-4 bg-white/50 rounded-[2rem] border border-emerald-50">
                    <div className="w-16 h-16 bg-[#effaf6] rounded-[1.5rem] flex items-center justify-center mx-auto">
                        <AlertCircle className="w-8 h-8 text-primary opacity-20" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">No Transactions Found !</p>
                </div>
            </div>
        </div>
    );
};

export default VendorEarnings;
