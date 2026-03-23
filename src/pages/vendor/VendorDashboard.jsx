import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Bike, IndianRupee, Star, Calendar, ArrowUpRight,
    Box, Settings, Bell, User, LayoutDashboard, Plus,
    Building2, FileText, Clock, CalendarCheck, FileSignature,
    Info, RotateCcw, ShieldCheck, HelpCircle, Phone,
    Share2, LogOut, ChevronRight, Edit2, MapPin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../utils/api';

const VendorStatCard = ({ label, value, icon: Icon, color, trend }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-emerald-50 relative overflow-hidden group h-full"
    >
        <div className={`w-9 h-9 md:w-12 md:h-12 ${color} rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-sm`}>
            <Icon className="w-4.5 h-4.5 md:w-6 md:h-6" />
        </div>
        <p className="text-slate-400 text-[9px] md:text-xs font-black uppercase tracking-widest mb-1 md:mb-1.5 leading-none">{label}</p>
        <div className="flex items-end justify-between gap-1 flex-wrap">
            <h3 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight leading-none">{value}</h3>
            {trend && (
                <span className="text-[8px] md:text-[10px] font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    {trend}
                </span>
            )}
        </div>
    </motion.div>
);

const PersonalizationItem = ({ icon: Icon, label, color }) => (
    <button className="w-full flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0 group text-left">
        <div className="flex items-center gap-5">
            <div className={`${color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="font-bold text-slate-800 text-base">{label}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
    </button>
);

const VendorDashboard = () => {
    const navigate = useNavigate();
    const vendorName = localStorage.getItem('vendorName') || "Rishav Kumar";
    const vendorPhone = localStorage.getItem('vendorPhone') || "9508287609";
    const vendorEmail = JSON.parse(localStorage.getItem('userInfo') || '{}').email || "rishavkumar33372@gmail.com";
    const vendorLocation = localStorage.getItem('vendorLocation') || "Manali";
    const vendorId = localStorage.getItem('vendorId') || "V1";
    const isDemoVendor = vendorName === "Ram Rentals";

    const recentBookings = isDemoVendor ? [
        { id: "BK102", bike: "RE Himalayan 450", client: "Amit Singh", status: "Active", date: "Today" },
        { id: "BK101", bike: "RE Hunter 350", client: "Rahul Jha", status: "Completed", date: "Yesterday" },
        { id: "BK099", bike: "KTM Duke 390", client: "Suresh Rao", status: "Pending", date: "2 Hours Ago" }
    ] : [];

    const [vendorStats, setVendorStats] = useState({
        totalBikes: 0,
        activeRentals: 0,
        earnings: "0",
        rating: "New"
    });
    const [profileImage, setProfileImage] = useState(
        // Check both direct storage and userInfo object
        localStorage.getItem('profileImage') || 
        JSON.parse(localStorage.getItem('userInfo') || '{}').profileImage || 
        ''
    );
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = React.useRef(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation: Limit size to 5MB, only images
        if (file.size > 5 * 1024 * 1024) {
            alert("File size is too large (max 5MB).");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        
        try {
            setUploading(true);
            const { data: imageUrl } = await API.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            // Format URL to be absolute
            const backendHost = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://wavygo.onrender.com';
            const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${backendHost}${imageUrl}`;
            
            // Save to profile
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const userId = userInfo._id || userInfo.id || localStorage.getItem('vendorId');

            if (userId) {
                try {
                    await API.put('/users/profile', {
                        id: userId,
                        profileImage: fullImageUrl
                    });
                } catch (apiError) {
                    console.warn("API profile update failed, but files local save worked", apiError);
                    // We don't block here if it's a demo account or backend is slightly mismatched
                }
            }

            // Update all storages
            setProfileImage(fullImageUrl);
            localStorage.setItem('profileImage', fullImageUrl);
            
            // Also update userInfo object so other parts of app see it
            userInfo.profileImage = fullImageUrl;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            alert("Photo updated successfully!");
        } catch (error) {
            console.error("Upload failed details:", error.response?.data || error.message);
            alert(`Failed to update photo: ${error.response?.data?.message || error.message}`);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await API.get(`/bookings/vendor-stats?vendorId=${encodeURIComponent(vendorId)}`);
                setVendorStats({
                    totalBikes: data.totalBikes,
                    activeRentals: data.activeRentals,
                    earnings: data.earnings.toLocaleString(),
                    rating: isDemoVendor ? "4.8" : "New"
                });
            } catch (error) {
                console.error("Failed to fetch vendor stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [vendorId]);

    return (
        <div className="space-y-4 md:space-y-8 pb-10">
            {/* Ultra-Compact Premium Header */}
            <div className="bg-white p-3.5 md:p-7 rounded-[2rem] border border-emerald-50 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-24 h-full bg-primary/5 rounded-l-[4rem] pointer-events-none" />
                
                <div className="relative z-10 flex items-center justify-between gap-2 md:gap-6">
                    <div className="flex items-center gap-3">
                        {/* More Compact Mobile Avatar */}
                        <div className="relative shrink-0">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleImageChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                            <div 
                                onClick={() => fileInputRef.current.click()}
                                className="w-14 h-14 md:w-24 md:h-24 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center text-primary border-2 md:border-4 border-white shadow-lg overflow-hidden cursor-pointer group/avatar"
                            >
                                {uploading ? (
                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                ) : profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-7 h-7 md:w-12 md:h-12" />
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                                    <Plus className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-primary text-white rounded-lg md:rounded-xl flex items-center justify-center border-2 border-white shadow-lg pointer-events-none">
                                <Edit2 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                            </div>
                        </div>

                        {/* Text Info - Responsive Sizing */}
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5 md:mb-1">
                                <h1 className="text-sm md:text-2xl font-black text-slate-900 leading-none truncate max-w-[100px] md:max-w-none">{vendorName}</h1>
                                <span className="px-1.5 py-0.5 bg-emerald-50 text-primary text-[7px] md:text-[9px] font-black uppercase rounded-md border border-emerald-100">{vendorLocation}</span>
                            </div>
                            <p className="text-slate-500 font-bold text-[10px] md:text-sm leading-none">{vendorPhone}</p>
                            <p className="hidden md:block text-slate-400 font-medium text-xs truncate max-w-[200px] mt-2">{vendorEmail}</p>
                        </div>
                    </div>

                    {/* Action Button - Optimized for Mobile Width */}
                    <Link to="/vendor/packages/add" className="shrink-0">
                        <button className="w-11 h-11 md:h-14 md:px-8 bg-slate-950 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest md:tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 active:scale-95">
                            <Plus className="w-5 h-5" />
                            <span className="hidden md:inline">Add New Bike</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Dashboard Controls Title - Compact */}
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase">Control Center</h2>
                <div className="flex items-center gap-1.5">
                     <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{vendorLocation} Live</span>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Link to="/vendor/packages">
                    <VendorStatCard
                        label="My Inventory"
                        value={vendorStats.totalBikes}
                        icon={Bike}
                        color="bg-emerald-500 text-white"
                        trend={isDemoVendor ? "+1 this week" : null}
                    />
                </Link>
                <Link to="/vendor/bookings">
                    <VendorStatCard
                        label="Active Rides"
                        value={vendorStats.activeRentals}
                        icon={Calendar}
                        color="bg-primary text-white"
                    />
                </Link>
                <Link to="/vendor/earnings">
                    <VendorStatCard
                        label="Total Earnings"
                        value={`₹${vendorStats.earnings}`}
                        icon={IndianRupee}
                        color="bg-slate-900 text-white"
                        trend={isDemoVendor ? "+₹4,200" : null}
                    />
                </Link>
                <VendorStatCard
                    label="Vendor Rating"
                    value={vendorStats.rating}
                    icon={Star}
                    color="bg-amber-400 text-white"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2rem] border border-emerald-50 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-emerald-50 flex justify-between items-center">
                            <h2 className="font-black text-slate-900 uppercase tracking-widest text-sm">Recent Bookings</h2>
                            <button className="text-primary font-bold text-xs hover:underline">View All</button>
                        </div>
                        <div className="divide-y divide-emerald-50">
                            {recentBookings.map((bk) => (
                                <div key={bk.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#effaf6] rounded-xl flex items-center justify-center font-bold text-primary text-xs">
                                            {bk.id}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{bk.bike}</p>
                                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{bk.client} • {bk.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${bk.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
                                            bk.status === 'Completed' ? 'bg-slate-100 text-slate-600' :
                                                'bg-amber-100 text-amber-600'
                                        }`}>
                                        {bk.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Tips / Bike Status */}
                <div className="space-y-6">
                    <div className="bg-[#effaf6] p-8 rounded-[2rem] border border-emerald-100/50">
                        <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                            <Bell className="w-4 h-4 text-primary" /> Vendor Tips
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p className="text-xs font-medium text-slate-600 leading-relaxed">Keep your bike photos high-quality to get 2x more bookings.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p className="text-xs font-medium text-slate-600 leading-relaxed">Response time is critical for Delhi city riders.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p className="text-xs font-medium text-slate-600 leading-relaxed">Check tyre pressure regularly for customer safety.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                        <h2 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-4">Support</h2>
                        <p className="text-sm font-bold mb-6">Need help with your listings?</p>
                        <button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-xs hover:bg-white hover:text-primary transition-all">
                            Talk to Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
