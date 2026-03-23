import React, { useState, useEffect } from 'react';
import { 
    Calendar, Search, Filter, Mail, Phone, 
    User, Users, Bike, Clock, CheckCircle2, XCircle, 
    IndianRupee, ChevronRight, MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import API from '../../utils/api';

const VendorBookings = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Read from localStorage (set during login)
    const currentVendorId = localStorage.getItem('vendorId') || "V1"; 

    useEffect(() => {
        const fetchVendorBookings = async () => {
            try {
                const { data } = await API.get(`/bookings/vendor?vendorId=${currentVendorId}`);
                setBookings(data || []);
            } catch (error) {
                console.error("Failed to fetch vendor bookings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVendorBookings();
    }, [currentVendorId]);

    const filtered = bookings.filter(bk => {
        const matchesSearch = (bk.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (bk._id || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || bk.status.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">All Bookings</h1>
                    <p className="text-slate-500 font-medium">Manage your active, pending and history of rides.</p>
                </div>
                <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                    <div className="flex bg-white p-1 rounded-2xl border border-emerald-50 w-full md:w-auto overflow-hidden">
                        {[
                            { label: 'Ongoing', filter: 'Active' },
                            { label: 'Upcoming', filter: 'Pending' },
                            { label: 'History', filter: 'Completed' }
                        ].map((t) => (
                            <button
                                key={t.label}
                                onClick={() => setFilter(t.filter)}
                                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                                    filter === t.filter ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bookings Table/Cards */}
            <div className="space-y-4">
                {loading ? (
                    <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest">Finding your riders...</div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center space-y-8">
                        <div className="max-w-xs mx-auto opacity-80">
                             <img src="https://img.freepik.com/free-vector/empty-folder-concept-illustration_114360-6101.jpg" alt="No bookings" className="w-full mix-blend-multiply" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">No Bookings Found !</h3>
                    </div>
                ) : (
                    <AnimatePresence>
                        {filtered.map((bk, i) => (
                            <motion.div
                                key={bk._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-xl transition-all group"
                            >
                                <div className="flex items-start gap-6 flex-1">
                                    <div className="w-16 h-16 bg-[#effaf6] rounded-[1.5rem] flex items-center justify-center flex-shrink-0">
                                        <Bike className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{bk._id.slice(-6).toUpperCase()}</span>
                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                                bk.status.toLowerCase() === 'confirmed' ? 'bg-emerald-500' : 
                                                bk.status.toLowerCase() === 'cancelled' ? 'bg-red-500' : 
                                                'bg-amber-500'
                                            }`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${
                                                bk.status.toLowerCase() === 'confirmed' ? 'text-emerald-500' : 
                                                bk.status.toLowerCase() === 'cancelled' ? 'text-red-500' : 
                                                'text-amber-500'
                                            }`}>{bk.status}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{bk.packageId?.title || bk.itemTitle}</h3>
                                        <div className="flex flex-wrap items-center gap-4 mt-3">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                                <User className="w-3.5 h-3.5" /> {bk.userName}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                                <Calendar className="w-3.5 h-3.5" /> {new Date(bk.travelDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                                <Users className="w-3.5 h-3.5" /> {bk.guests} Guests
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 w-full lg:w-auto mt-4 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                                    <div className="flex items-center gap-4 sm:border-r border-slate-100 pr-0 sm:pr-8 w-full sm:w-auto justify-between sm:justify-start">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Total Payout</p>
                                            <p className="text-xl font-black text-slate-900 flex items-center gap-0.5 whitespace-nowrap">
                                                <IndianRupee className="w-4 h-4 text-primary" /> {bk.totalPrice}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <a href={`tel:${bk.phone}`} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                                <Phone className="w-4 h-4" />
                                            </a>
                                            <a href={`mailto:${bk.email}`} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                                <Mail className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        {bk.status.toLowerCase() === 'pending' && (
                                            <button 
                                                onClick={async () => {
                                                    try {
                                                        await API.put(`/bookings/${bk._id}/status`, { status: 'confirmed' });
                                                        // Refresh state or locally update
                                                        setBookings(prev => prev.map(b => b._id === bk._id ? {...b, status: 'confirmed'} : b));
                                                    } catch (e) { alert('Failed to confirm'); }
                                                }}
                                                className="flex-1 sm:flex-none px-6 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                            >
                                                Confirm Ride
                                            </button>
                                        )}
                                        <button className="flex-1 sm:flex-none p-4 bg-slate-950 text-white rounded-2xl hover:bg-primary transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default VendorBookings;
