import React, { useState, useEffect } from 'react';
import {
    Users, ShieldCheck, Clock, CheckCircle2, XCircle,
    MoreVertical, IndianRupee, Bike, Eye, TrendingUp, Search, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../utils/api';

const AdminVendors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, pending, approved
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [vendorBikes, setVendorBikes] = useState([]);
    const [bikesLoading, setBikesLoading] = useState(false);

    useEffect(() => {
        const fetchVendorBikes = async () => {
            if (selectedVendor) {
                try {
                    setBikesLoading(true);
                    const { data } = await API.get(`/packages/vendor/${selectedVendor.id}`);
                    setVendorBikes(data);
                } catch (error) {
                    console.error("Error fetching vendor bikes:", error);
                } finally {
                    setBikesLoading(false);
                }
            } else {
                setVendorBikes([]);
            }
        };
        fetchVendorBikes();
    }, [selectedVendor]);

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendorsData = async () => {
            try {
                setLoading(true);
                const { data } = await API.get('/users/vendors-stats');

                // Get local vendors for transition/legacy support
                const pendingLocal = JSON.parse(localStorage.getItem('pendingVendors') || '[]');

                // Merge database vendors with local ones (if not already there by email)
                const dbEmails = new Set(data.map(v => v.email));
                const uniqueLocal = pendingLocal.filter(p => !dbEmails.has(p.email));

                setVendors([...data, ...uniqueLocal]);
            } catch (error) {
                console.error("Error fetching vendors stats:", error);
                const pending = JSON.parse(localStorage.getItem('pendingVendors') || '[]');
                setVendors(pending);
            } finally {
                setLoading(false);
            }
        };

        fetchVendorsData();
    }, []);

    // Extract unique locations for the dropdown
    const locations = ['all', ...new Set(vendors.map(v => v.location))];

    const handleApprove = async (id) => {
        try {
            // Check if it's a genuine objectId or local temp vendor safely
            if (id && id.toString().length > 20) {
                await API.put(`/users/vendor/${id}/approve`);
            }

            const updatedVendors = vendors.map(v => v.id === id ? { ...v, status: 'approved' } : v);
            setVendors(updatedVendors);

            // Also update localStorage for fallback support
            const pending = JSON.parse(localStorage.getItem('pendingVendors') || '[]');
            const updatedPending = pending.map(v => v.id === id ? { ...v, status: 'approved' } : v);
            localStorage.setItem('pendingVendors', JSON.stringify(updatedPending));
        } catch (error) {
            console.error('Failed to approve vendor', error);
            alert('Failed to approve vendor');
        }
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
                                {/* Fleet Details Section */}
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inventory & Fleet Details</h4>
                                        <span className="text-[10px] font-black text-primary bg-primary/10 px-4 py-2 rounded-xl">
                                            {vendorBikes.length} BIKES ADDED
                                        </span>
                                    </div>

                                    {bikesLoading ? (
                                        <div className="py-20 text-center text-slate-300 font-bold uppercase tracking-widest animate-pulse">
                                            Fetching Live Fleet Data...
                                        </div>
                                    ) : vendorBikes.length === 0 ? (
                                        <div className="py-20 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                                            <Bike className="w-12 h-12 text-slate-300 mx-auto mb-4 opacity-50" />
                                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">No bikes found for this vendor.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {vendorBikes.map((bike) => (
                                                <div key={bike._id} className="bg-[#f8fefc] border border-emerald-100 p-6 rounded-[2rem] flex gap-6 items-center hover:shadow-lg transition-all">
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                                                        <img src={bike.image} alt={bike.title} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-black text-slate-900 truncate">{bike.title}</h5>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <MapPin className="w-3 h-3 text-slate-400" />
                                                            <span className="text-[10px] font-bold text-slate-500 truncate">{bike.location}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-4">
                                                            <div className="text-primary font-black text-sm">₹{bike.price}</div>
                                                            <div className="flex items-center gap-1 text-[10px] bg-white px-2 py-1 rounded-full border border-emerald-50 shadow-sm">
                                                                <span className="text-orange-400 font-black">{bike.rating || 4.5}</span>
                                                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Business Summary Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Performance Stats</h4>
                                        <div className="space-y-6 pt-4">
                                            {[
                                                { label: "Completion Rate", value: 98, color: "bg-primary" },
                                                { label: "Customer Satisfaction", value: 92, color: "bg-emerald-400" },
                                                { label: "Response Time", value: 85, color: "bg-blue-400" }
                                            ].map((stat, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-tight">
                                                        <span className="text-white/60">{stat.label}</span>
                                                        <span>{stat.value}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
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

                                    <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Partner Note</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                                                "{selectedVendor.name} has been a core partner since {selectedVendor.joinedDate}.
                                                Consistent inventory quality and prompt response have been their key strengths."
                                            </p>
                                        </div>
                                        <div className="pt-8 flex items-center justify-between">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</span>
                                            <span className="text-primary font-black text-2xl tracking-tighter">#12 Vendor</span>
                                        </div>
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
