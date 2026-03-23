import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, Bike, Calendar, Settings, 
    LogOut, Bell, Menu, X, User, ChevronRight,
    Star, Heart, Building2, FileText, Clock, 
    CalendarCheck, FileSignature, Info, RotateCcw, 
    ShieldCheck, HelpCircle, Phone, Share2, 
    LineChart, Wallet, CreditCard, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VendorLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/vendor/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { path: '/vendor/packages', icon: Bike, label: 'My Fleet' },
        { path: '/vendor/bookings', icon: Calendar, label: 'Rentals' },
        { path: '/vendor/settings', icon: Settings, label: 'Account' },
    ];

    const personalizationItems = [
        { path: '/vendor/packages', icon: Bike, label: 'Vehicle Management' },
        { path: '/vendor/settings?tab=bank', icon: Building2, label: 'Bank Details' },
        { path: '/vendor/settings?tab=docs-business', icon: FileText, label: 'Business Documents' },
        { path: '/vendor/settings?tab=docs-owner', icon: User, label: 'Owner Documents' },
        { path: '/vendor/settings?tab=timing', icon: Clock, label: 'Business Timing' },
        { path: '/vendor/packages', icon: CalendarCheck, label: 'Vehicle Availability' },
        { path: '/vendor/settings?tab=terms', icon: FileSignature, label: 'Terms & Conditions' },
        { path: '/vendor/settings?tab=about', icon: Info, label: 'About Us' },
        { path: '/vendor/settings?tab=refund', icon: RotateCcw, label: 'Refund' },
        { path: '/vendor/settings?tab=privacy', icon: ShieldCheck, label: 'Privacy Policy' },
        { path: '/vendor/settings?tab=support', icon: HelpCircle, label: 'Help and Support' },
        { path: '/vendor/settings?tab=contact', icon: Phone, label: 'Contact Us' },
        { path: '/vendor/settings?tab=share', icon: Share2, label: 'Share App' },
        { path: '/vendor/settings?tab=rate', icon: Star, label: 'Rate Us' },
    ];

    return (
        <div className="min-h-screen bg-[#f1f6f5] flex font-sans selection:bg-primary selection:text-white">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-emerald-50 transition-transform duration-500 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col p-6">
                    {/* Logo */}
                    <Link to="/vendor/dashboard" className="flex items-center gap-3 px-2 mb-12">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group">
                            <Bike className="w-6 h-6 text-white group-hover:-rotate-12 transition-transform" />
                        </div>
                        <span className="text-xl font-bold text-slate-800">Vendor Hub</span>
                    </Link>

                    {/* Menu */}
                    <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Main Experience</p>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
                                    location.pathname === item.path 
                                    ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                                    : 'text-slate-500 hover:bg-emerald-50 hover:text-primary'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'animate-pulse' : ''}`} />
                                    <span className="font-bold text-sm">{item.label}</span>
                                </div>
                                {location.pathname === item.path && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        ))}

                        <div className="pt-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Personalization</p>
                            <div className="space-y-1">
                                {personalizationItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
                                            location.pathname === item.path 
                                            ? 'bg-primary text-white' 
                                            : 'text-slate-500 hover:bg-emerald-50 hover:text-primary'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-bold text-[13px]">{item.label}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* Bottom Branding / Logout */}
                    <div className="mt-auto space-y-4">
                        <div className="bg-[#effaf6] p-6 rounded-[2rem] border border-emerald-100/50 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">Partner Stats</span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 mb-1">Weekly Views</p>
                            <p className="text-xl font-black text-primary tracking-tight">1,240 <span className="text-[10px] text-emerald-500">+12%</span></p>
                        </div>
                        <button 
                            onClick={() => navigate('/admin/login')}
                            className="flex items-center gap-4 w-full px-4 py-4 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all font-bold text-sm group"
                        >
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#f8fbfa]">
                {/* Header Navbar - Hidden on mobile, as we use bottom nav and page titles */}
                <header className="hidden lg:flex h-24 bg-white/80 backdrop-blur-xl border-b border-emerald-50 items-center justify-between px-6 md:px-10 shrink-0 sticky top-0 z-40">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Live Connection Status: Excellent</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-7">
                        <div className="relative cursor-pointer group p-2">
                            <Bell className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
                        </div>
                        
                        <div className="h-10 w-[1px] bg-slate-100" />

                        <div className="flex items-center gap-4 bg-slate-50 p-1.5 md:pr-4 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all group cursor-pointer">
                            <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 relative">
                                <User className="w-5 h-5 md:w-6 md:h-6" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border-2 border-slate-50">
                                     <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-xs font-black text-slate-900 leading-tight">{localStorage.getItem('vendorName') || 'Vendor'}</p>
                                <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-0.5 leading-none">Vendor ID #{localStorage.getItem('vendorId')?.substring(1, 5) || '722'}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Sub Content area */}
                <section className="flex-1 overflow-y-auto px-1 md:px-10 py-2 md:py-12 custom-scrollbar pb-32 md:pb-12">
                    <div className="max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </section>

                {/* Mobile Bottom Navigation (Visible on < 1024px) */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-emerald-50 px-6 py-4 flex items-center justify-between z-[60] lg:hidden safe-area-bottom">
                    {[
                        { icon: Home, label: 'Home', path: '/vendor/dashboard' },
                        { icon: LineChart, label: 'Insights', path: '/vendor/insights' },
                        { icon: Wallet, label: 'Earnings', path: '/vendor/earnings' },
                        { icon: User, label: 'Profile', path: '/vendor/profile' }
                    ].map((item) => (
                        <Link 
                            key={item.label}
                            to={item.path}
                            className={`flex flex-col items-center gap-1.5 transition-all ${
                                location.pathname === item.path ? 'text-primary' : 'text-slate-400'
                            }`}
                        >
                            <item.icon className={`w-6 h-6 ${location.pathname === item.path ? 'fill-primary/10 stroke-[2.5]' : 'stroke-[1.5]'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${location.pathname === item.path ? 'opacity-100' : 'opacity-60'}`}>
                                {item.label}
                            </span>
                            {location.pathname === item.path && (
                                <motion.div 
                                    layoutId="bottomTab"
                                    className="w-1.5 h-1.5 bg-primary rounded-full absolute -top-1" 
                                />
                            )}
                        </Link>
                    ))}
                </nav>
            </main>
        </div>
    );
};

export default VendorLayout;
