import React, { useState, useEffect } from 'react';
import {
    IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight,
    Wallet, Clock, CheckCircle2, Download, Search, Filter,
    Building2, Calendar, MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../utils/api';

const AdminFinancials = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [payouts, setPayouts] = useState([]);
    const [financialStats, setFinancialStats] = useState({
        platformRevenue: 0,
        pendingPayouts: 0,
        totalBookings: 0
    });

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                setLoading(true);
                const { data } = await API.get('/bookings/admin/financials');
                setFinancialStats(data.stats);
                setPayouts(data.payouts);
            } catch (error) {
                console.error("Error fetching financial data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFinancialData();
    }, []);

    const stats = [
        { label: "Platform Revenue", value: `₹${Number(financialStats.platformRevenue).toLocaleString('en-IN')}`, trend: "+15%", icon: IndianRupee, color: "bg-primary" },
        { label: "Pending Payouts", value: `₹${Number(financialStats.pendingPayouts).toLocaleString('en-IN')}`, trend: `${payouts.length} Vendors`, icon: Clock, color: "bg-orange-500" },
        { label: "Total Bookings", value: financialStats.totalBookings.toString(), trend: "+5.2%", icon: TrendingUp, color: "bg-indigo-600" }
    ];

    const handleProcessPayout = (id) => {
        if (window.confirm("Mark this payout as completed?")) {
            setPayouts(payouts.map(p => p.id === id ? { ...p, status: 'completed' } : p));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Financial Hub</h1>
                    <p className="text-slate-500 font-medium">Manage platform revenue and vendor settlement reports.</p>
                </div>
                <button className="px-6 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-all">
                    <Download className="w-4 h-4" /> Export Ledger (Excel)
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
                    >
                        <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/10`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.value}</h3>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-emerald-500 text-[10px] font-black flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                                <ArrowUpRight className="w-3 h-3" /> {stat.trend}
                            </span>
                            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">vs last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Payout Management Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Wallet className="w-7 h-7 text-primary" /> Vendor Payouts
                    </h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Find payout # or vendor..."
                            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary font-bold text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Vendor Node</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount Due</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Settlement Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Action Center</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payouts.filter(p => p.vendor.toLowerCase().includes(searchTerm.toLowerCase())).map((p, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                                        <td className="px-8 py-6">
                                            <p className="font-black text-slate-900">#{p.id}</p>
                                            <p className="text-[10px] font-bold text-slate-300 uppercase mt-1">{p.date}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#effaf6] rounded-xl flex items-center justify-center text-primary font-black shadow-sm">
                                                    {p.vendor.charAt(0)}
                                                </div>
                                                <p className="font-black text-slate-700">{p.vendor}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-black text-slate-900 text-lg">
                                            ₹{p.amount.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${p.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                                                }`}>
                                                {p.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            {p.status === 'pending' ? (
                                                <button
                                                    onClick={() => handleProcessPayout(p.id)}
                                                    className="px-6 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm"
                                                >
                                                    Process Payment
                                                </button>
                                            ) : (
                                                <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                                                    <Download className="w-5 h-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Secondary Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                    <Building2 className="w-10 h-10 text-primary mb-6" />
                    <h3 className="text-xl font-black mb-2">Commission Rate</h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">Platform is currently operating on a flat 15% commission model per booking.</p>
                    <div className="flex items-end gap-3">
                        <span className="text-5xl font-black text-primary">15%</span>
                        <span className="text-xs text-slate-500 font-bold mb-2 uppercase tracking-widest">Global Fee</span>
                    </div>
                </div>

                <div className="bg-[#f8fefc] p-10 rounded-[3.5rem] border border-emerald-100 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Financial Calendar</h3>
                            <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-emerald-50 shadow-sm">
                                <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Next Settlement Cycle</p>
                                <p className="text-sm font-black text-primary">Mar 20, 2026</p>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-emerald-50 shadow-sm opacity-50">
                                <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Bank Verification Status</p>
                                <p className="text-sm font-black text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> All Clear</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminFinancials;
