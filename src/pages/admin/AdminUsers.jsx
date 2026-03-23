import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, MapPin, Calendar, MoreVertical, Shield, UserX, UserCheck, Phone, Bike, Building2 } from 'lucide-react';
import API from '../../utils/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch real users from backend (RESTORED REAL)
                const { data } = await API.get('/users');
                setUsers(data || []);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                // Fallback mock data with phone and activity tracking
                setUsers([
                    {
                        _id: '1',
                        name: 'Rishav Singh',
                        email: 'rishav@wavygo.com',
                        phone: '+91 98765 43210',
                        location: 'Delhi',
                        createdAt: '2024-03-10',
                        role: 'admin',
                        activeRental: { bike: 'RE Himalayan 450', vendor: 'Ram Rentals' }
                    },
                    {
                        _id: '2',
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '+91 88888 77777',
                        location: 'Mumbai',
                        createdAt: '2024-03-15',
                        role: 'user',
                        activeRental: { bike: 'KTM Duke 390', vendor: 'Speedsters Delhi' }
                    },
                    {
                        _id: '3',
                        name: 'Alok Gupta',
                        email: 'alok@gmail.com',
                        phone: '+91 70000 12345',
                        location: 'Manali',
                        createdAt: '2024-03-16',
                        role: 'user',
                        activeRental: null
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.phone && u.phone.includes(searchQuery))
    );

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-600 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                        <Users className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Community</h1>
                        <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                            Manage and monitor all {users.length} registered users
                        </p>
                    </div>
                </div>

                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users..."
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-indigo-600/40 focus:ring-4 focus:ring-indigo-600/5 transition-all font-bold text-slate-700 text-sm shadow-sm"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50 bg-slate-50/50">
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">User Details</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact Info</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Current Activity</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Joined On</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Role</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="px-8 py-6">
                                            <div className="h-4 bg-slate-100 rounded w-full"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                filteredUsers.map((user) => (
                                    <motion.tr
                                        key={user._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xs border border-white shadow-sm ring-4 ring-slate-50">
                                                    {user.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 leading-none mb-1">{user.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                                        <MapPin className="w-2.5 h-2.5 text-rose-500" /> {user.location || 'India'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-slate-600 font-bold text-[11px] uppercase tracking-tight">
                                                    <Mail className="w-3 h-3 text-indigo-500" />
                                                    {user.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600 font-bold text-[11px] uppercase tracking-tight">
                                                    <Phone className="w-3 h-3 text-emerald-500" />
                                                    {user.phone || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {user.activeRental ? (
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
                                                        <Bike className="w-3.5 h-3.5 text-indigo-600" />
                                                        {user.activeRental.bike}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                                        <Building2 className="w-3 h-3" />
                                                        {user.activeRental.vendor}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest italic">No Active Rental</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-tight">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${user.role === 'admin'
                                                    ? 'bg-rose-50 text-rose-600 border-rose-100'
                                                    : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                }`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all">
                                                    <UserX className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all">
                                                    <Shield className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
