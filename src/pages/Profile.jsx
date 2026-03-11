import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, ShoppingBag, Wallet, LogOut, Edit, Camera, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    if (!user) {
        navigate('/auth');
        return null;
    }

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'bookings', label: 'My Bookings', icon: ShoppingBag },
        { id: 'wallet', label: 'Wallet', icon: Wallet },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-gradient-to-b from-white to-[#f0f9f6] min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow container-custom pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-80 space-y-6"
                    >
                        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 p-8">
                            <div className="relative mb-6">
                                <div className="h-24 bg-primary rounded-2xl w-full mb-[-3rem]"></div>
                                <div className="relative flex justify-center">
                                    <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-primary overflow-hidden shadow-md">
                                        <User className="w-12 h-12 fill-primary/10" />
                                    </div>
                                    <button className="absolute bottom-0 right-1/2 translate-x-12 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-slate-500 hover:text-primary transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-xl font-black text-slate-900 leading-tight">{user.name}</h2>
                                <p className="text-xs font-medium text-slate-400 mt-1">{user.email}</p>
                            </div>

                            <nav className="space-y-1">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold text-sm ${activeTab === item.id
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === item.id ? 'rotate-90' : ''}`} />
                                    </button>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500 hover:bg-red-50 font-bold text-sm transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </nav>

                            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                                <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100"
                    >
                        <div className="mb-10 flex justify-between items-center">
                            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                {activeTab === 'profile' ? 'Profile Details' : activeTab === 'bookings' ? 'My Bookings' : 'Wallet Status'}
                            </h1>
                            {activeTab === 'profile' && (
                                <Button variant="outline" className="px-6 py-2 rounded-xl text-xs font-bold border-slate-200 flex items-center gap-2">
                                    <Edit className="w-3.5 h-3.5" /> Edit
                                </Button>
                            )}
                        </div>

                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-[#035c3e]/10">
                                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Full Name</p>
                                            <p className="text-lg font-bold text-slate-900 leading-none">{user.name}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-[#035c3e]/10">
                                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Email Address</p>
                                            <p className="text-lg font-bold text-slate-900 leading-none">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-[#035c3e]/10">
                                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Phone Number</p>
                                            <p className="text-lg font-bold text-slate-900 leading-none">+91 95082 87609</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No Bookings Yet</h3>
                                <p className="text-slate-400 text-sm mb-8">Ready to start your first adventure?</p>
                                <Button onClick={() => navigate('/packages')} className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest">
                                    Explore Bikes
                                </Button>
                            </div>
                        )}

                        {activeTab === 'wallet' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-primary rounded-[2rem] p-8 text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
                                    <Wallet className="w-10 h-10 mb-6 opacity-80" />
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Current Balance</p>
                                    <h2 className="text-4xl font-black tracking-tight mb-8">₹0.00</h2>
                                    <Button className="w-full bg-white text-primary hover:bg-slate-50 font-black text-[10px] uppercase tracking-widest py-3">
                                        Add Money
                                    </Button>
                                </div>
                                <div className="bg-slate-50 rounded-[2rem] p-8 flex flex-col justify-center border border-slate-100">
                                    <p className="text-[10pt] font-black uppercase text-slate-400 tracking-widest mb-2">Transactions</p>
                                    <p className="text-sm font-bold text-slate-500">No transaction history found.</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
