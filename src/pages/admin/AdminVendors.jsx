import React, { useState, useEffect } from 'react';
import {
    Users, ShieldCheck, Clock, CheckCircle2, XCircle,
    MoreVertical, IndianRupee, Bike, Eye, TrendingUp, Search, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminVendors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, pending, approved
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedVendor, setSelectedVendor] = useState(null);

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendorsData = async () => {
            try {
                const { data } = await API.get('/users/vendors-stats');
                setVendors(data);
            } catch (error) {
                console.error("Error fetching vendors stats:", error);
                // Fallback to local storage if API fails or for legacy support
                const pending = JSON.parse(localStorage.getItem('pendingVendors') || '[]');
                if (pending.length > 0) {
                    setVendors(prev => {
                        const existingIds = prev.map(v => v.id);
                        const newVendors = pending.filter(p => !existingIds.includes(p.id));
                        return [...prev, ...newVendors];
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVendorsData();
    }, []);

    // Extract unique locations for the dropdown
    const locations = ['all', ...new Set(vendors.map(v => v.location))];

    const handleApprove = (id) => {
        const updatedVendors = vendors.map(v => v.id === id ? { ...v, status: 'approved' } : v);
        setVendors(updatedVendors);

        // Also update localStorage
        const pending = JSON.parse(localStorage.getItem('pendingVendors') || '[]');
        const updatedPending = pending.map(v => v.id === id ? { ...v, status: 'approved' } : v);
        localStorage.setItem('pendingVendors', JSON.stringify(updatedPending));
    };

    const handleReject = (id) => {
        if (window.confirm("Are you sure you want to reject this vendor?")) {
            const updatedVendors = vendors.filter(v => v.id !== id);
            setVendors(updatedVendors);

            // Also update localStorage
            const pending = JSON.parse(localStorage.getItem('pendingVendors') || '[]');
            const filteredPending = pending.filter(v => v.id !== id);
            localStorage.setItem('pendingVendors', JSON.stringify(filteredPending));
        }
    };

    const filteredVendors = vendors.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || v.status === filter;
        const matchesLocation = selectedLocation === 'all' || v.location === selectedLocation;
        return matchesSearch && matchesFilter && matchesLocation;
    });

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vendor Management</h1>
                    <p className="text-slate-500 font-medium">Manage and verify WavyGo partners across India.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                        {['all', 'pending', 'approved'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Stats for Vendors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-emerald-50 shadow-sm relative overflow-hidden group">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                        <Users className="w-6 h-6" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Active Vendors</p>
                    <h3 className="text-2xl font-black text-slate-900">{vendors.filter(v => v.status === 'approved').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-emerald-50 shadow-sm relative overflow-hidden group">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                        <Clock className="w-6 h-6" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Pending Approvals</p>
                    <h3 className="text-2xl font-black text-slate-900">{vendors.filter(v => v.status === 'pending').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-emerald-50 shadow-sm relative overflow-hidden group">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Fleet Analytics</p>
                    <h3 className="text-2xl font-black text-slate-900">{vendors.reduce((acc, curr) => acc + curr.bikes, 0)} Bikes</h3>
                </div>
            </div>

            {/* Search & Location Bar */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#f8fefc] border border-emerald-100/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all font-bold text-slate-700"
                    />
                </div>
                
                <div className="relative w-full md:w-64 group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 z-10" />
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full bg-[#f8fefc] border border-emerald-100/50 rounded-2xl py-4 pl-12 pr-10 focus:outline-none focus:border-primary transition-all font-black text-[10px] uppercase tracking-widest text-slate-600 appearance-none cursor-pointer"
                    >
                        {locations.map(loc => (
                            <option key={loc} value={loc}>
                                {loc === 'all' ? 'All Locations' : loc}
                            </option>
                        ))}
                    </select>
                    <MoreVertical className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none rotate-90" />
                </div>
            </div>

            {/* Vendor List Table (Modern Cards for Desktop/Mobile) */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence>
                    {loading ? (
                        <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-[0.2em] italic">Synchronizing Fleet Partners...</div>
                    ) : filteredVendors.length === 0 ? (
                        <div className="py-20 text-center text-slate-400 bg-white rounded-[2.5rem] border border-dashed border-slate-200 uppercase text-[10px] font-black tracking-widest">No matching vendors found in our database.</div>
                    ) : (
                        filteredVendors.map((vendor, i) => (
                        <motion.div
                            key={vendor.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                        >
                            {/* Vendor Profile */}
                            <div className="flex items-center gap-6 flex-1 min-w-0">
                                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 text-xl font-black ${vendor.status === 'pending' ? 'bg-orange-50 text-orange-400 border border-orange-100' : 'bg-[#effaf6] text-primary border border-emerald-100'
                                    }`}>
                                    {vendor.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl font-black text-slate-900 leading-tight flex items-center gap-2 truncate">
                                        {vendor.name}
                                        {vendor.status === 'approved' && <ShieldCheck className="w-5 h-5 text-primary" />}
                                    </h3>
                                    <p className="text-slate-400 text-sm font-medium mt-1 truncate">{vendor.email}</p>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">
                                            {vendor.location}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Joined {vendor.joinedDate}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Stats */}
                            <div className="grid grid-cols-3 gap-8 lg:gap-12 flex-1 md:bg-slate-50/50 md:p-6 rounded-[2rem] border-slate-100">
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1">
                                        <Bike className="w-2.5 h-2.5" /> Bikes
                                    </p>
                                    <p className="text-lg font-black text-slate-900">{vendor.bikes}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1">
                                        <TrendingUp className="w-2.5 h-2.5" /> Bookings
                                    </p>
                                    <p className="text-lg font-black text-slate-900">{vendor.bookings}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1">
                                        <IndianRupee className="w-2.5 h-2.5" /> Revenue
                                    </p>
                                    <p className="text-lg font-black text-primary">₹{vendor.revenue.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 shrink-0">
                                {vendor.status === 'pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleApprove(vendor.id)}
                                            className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                        >
                                            <CheckCircle2 className="w-4 h-4" /> Approve Vendor
                                        </button>
                                        <button
                                            onClick={() => handleReject(vendor.id)}
                                            className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all border border-rose-100"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="px-6 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 cursor-default">
                                            <ShieldCheck className="w-4 h-4 text-primary" /> Verified Partner
                                        </button>
                                        <button
                                            onClick={() => setSelectedVendor(vendor)}
                                            className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-primary transition-all"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button className="p-4 text-slate-300 hover:text-slate-900 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )))}
                </AnimatePresence>
            </div>

            {/* Vendor Insight Modal */}
            <AnimatePresence>
                {selectedVendor && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedVendor(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="bg-[#035c3e] p-8 md:p-12 text-white relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none" />
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-3xl font-black border border-white/10">
                                            {selectedVendor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h2 className="text-3xl font-black tracking-tight">{selectedVendor.name}</h2>
                                                <ShieldCheck className="w-6 h-6 text-primary" />
                                            </div>
                                            <p className="text-white/60 font-bold mt-1 uppercase tracking-widest text-xs">{selectedVendor.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedVendor(null)}
                                        className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all"
                                    >
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Quick Stats Row */}
                                <div className="grid grid-cols-3 gap-6 mt-12">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">Total Revenue</p>
                                        <p className="text-2xl font-black">₹{selectedVendor.revenue.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">Total Bookings</p>
                                        <p className="text-2xl font-black">{selectedVendor.bookings}</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">Active Fleet</p>
                                        <p className="text-2xl font-black">{selectedVendor.bikes} Bikes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
                                {/* Insights Sections */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inventory Distribution</h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: "Cruiser/Tours", value: 45, color: "bg-primary" },
                                                { label: "Sports/Street", value: 35, color: "bg-indigo-500" },
                                                { label: "Scooters", value: 20, color: "bg-orange-500" }
                                            ].map((stat, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between text-xs font-bold mb-2">
                                                        <span className="text-slate-600 uppercase tracking-tight">{stat.label}</span>
                                                        <span className="text-slate-900">{stat.value}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${stat.value}%` }}
                                                            className={`h-full ${stat.color}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-8 rounded-3xl space-y-4 border border-slate-100">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Business Summary</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                                            "{selectedVendor.name} has been a verified partner since {selectedVendor.joinedDate}.
                                            They maintain a 98% booking fulfillment rate and are currently leading the {selectedVendor.location} market in Cruiser rentals."
                                        </p>
                                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                                            <span className="text-[10px] font-black text-slate-400 uppercase">Fulfillment Rate</span>
                                            <span className="text-primary font-black">98.4%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Placeholder for real activity log */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Traffic (Last 24h)</h4>
                                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">Trending High</span>
                                    </div>
                                    <div className="h-32 bg-[#f8fefc] border border-emerald-100 rounded-[2rem] flex items-end justify-between p-6 gap-2">
                                        {[40, 70, 45, 90, 65, 80, 50, 60, 85, 40, 75, 45].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                className="w-full bg-primary/20 rounded-t-lg border-x border-t border-primary/20"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
                                <button
                                    onClick={() => setSelectedVendor(null)}
                                    className="px-8 py-4 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-600 transition-all"
                                >
                                    Close Insights
                                </button>
                                <button className="px-10 py-4 bg-slate-900 text-white rounded-[1.2rem] font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-900/10 hover:bg-primary transition-all">
                                    Download Full Audit
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminVendors;
