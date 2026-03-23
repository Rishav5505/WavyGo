import React from 'react';
import { motion } from 'framer-motion';
import { 
    User, Mail, Phone, MapPin, 
    Bike, Building2, FileText, Clock, 
    CalendarCheck, FileSignature, Info, 
    RotateCcw, LogOut, ChevronRight, Edit2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PersonalizationItem = ({ icon: Icon, label, color }) => (
    <div className="w-full flex items-center justify-between p-5 px-6 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0 group text-left cursor-pointer">
        <div className="flex items-center gap-5">
            <div className={`p-2.5 rounded-xl bg-[#effaf6] ${color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="font-bold text-slate-800 text-[15px]">{label}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
    </div>
);

const VendorProfile = () => {
    const navigate = useNavigate();
    const vendorName = localStorage.getItem('vendorName') || "Rishav Kumar";
    const vendorPhone = localStorage.getItem('vendorPhone') || "9508287609";
    const vendorEmail = JSON.parse(localStorage.getItem('userInfo') || '{}').email || "rishavkumar33372@gmail.com";
    const profileImage = localStorage.getItem('profileImage') || 
                         JSON.parse(localStorage.getItem('userInfo') || '{}').profileImage || 
                         '';

    return (
        <div className="space-y-4 md:space-y-8 pb-32 max-w-md mx-auto md:max-w-none px-2">
            {/* Ultra-Compact Header Title */}
            <div className="flex items-center justify-between px-1">
                <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Profile</h1>
                <div className="w-8 h-8 rounded-full bg-emerald-50 md:bg-white flex items-center justify-center text-primary border border-emerald-100/50 md:border-slate-100">
                    <User className="w-4 h-4" />
                </div>
            </div>

            {/* Profile Info Card - Compact */}
            <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-emerald-50 shadow-sm flex items-center gap-4 md:gap-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[4rem] pointer-events-none" />
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#effaf6] flex items-center justify-center text-primary text-2xl md:text-3xl font-black relative border-2 md:border-4 border-white shadow-lg shrink-0 overflow-hidden">
                    {profileImage ? (
                        <img src={profileImage} alt={vendorName} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-10 h-10" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight truncate">{vendorName}</h2>
                    <p className="text-slate-500 font-bold text-[13px] md:text-sm mt-0.5">{vendorPhone}</p>
                    <p className="text-slate-400 font-medium text-xs truncate mt-0.5">{vendorEmail}</p>
                </div>
                <button className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-lg border border-slate-100 hover:bg-primary hover:text-white transition-all">
                    <Edit2 className="w-4 h-4" />
                </button>
            </div>

            {/* Personalization Section */}
            <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Personalization</h3>
                <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm overflow-hidden">
                    <Link to="/vendor/packages">
                        <PersonalizationItem icon={Bike} label="Vehicle Management" color="text-primary" />
                    </Link>
                    <Link to="/vendor/settings?tab=bank">
                        <PersonalizationItem icon={Building2} label="Bank Details" color="text-primary" />
                    </Link>
                    <Link to="/vendor/settings?tab=docs-business">
                        <PersonalizationItem icon={FileText} label="Business Documents" color="text-primary" />
                    </Link>
                    <Link to="/vendor/settings?tab=docs-owner">
                        <PersonalizationItem icon={User} label="Owner Documents" color="text-primary" />
                    </Link>
                    <Link to="/vendor/settings?tab=timing">
                        <PersonalizationItem icon={Clock} label="Business Timing" color="text-primary" />
                    </Link>
                    <Link to="/vendor/packages">
                        <PersonalizationItem icon={CalendarCheck} label="Vehicle Availability" color="text-primary" />
                    </Link>
                    <Link to="/vendor/settings?tab=terms">
                        <PersonalizationItem icon={FileSignature} label="Terms & Conditions" color="text-primary" />
                    </Link>
                    <Link to="/vendor/settings?tab=about">
                        <PersonalizationItem icon={Info} label="About Us" color="text-primary" />
                    </Link>
                    <Link to="/vendor/settings?tab=refund">
                        <PersonalizationItem icon={RotateCcw} label="Refund" color="text-primary" />
                    </Link>
                </div>
            </div>

            {/* Logout Button */}
            <button 
                onClick={() => {
                    localStorage.clear();
                    navigate('/auth');
                }}
                className="w-full h-16 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center gap-3 text-rose-500 font-black text-sm uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm"
            >
                <LogOut className="w-5 h-5" /> Sign Out
            </button>
        </div>
    );
};

export default VendorProfile;
