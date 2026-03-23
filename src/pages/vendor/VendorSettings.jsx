import React, { useState, useEffect } from 'react';
import { 
    User, Mail, Phone, MapPin, 
    Lock, Shield, Star, Camera,
    Save, Bell, ChevronRight, CheckCircle2,
    Building2, FileText, Clock, FileSignature,
    Info, RotateCcw, ShieldCheck, HelpCircle,
    Share2, Globe, Landmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import API from '../../utils/api';

const VendorSettings = () => {
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'profile';
    
    const [formData, setFormData] = useState({
        businessName: localStorage.getItem('vendorName') || "Rishav Kumar",
        ownerName: "Owner Name",
        email: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).email : "rishavkumar33372@gmail.com",
        phone: "+91 95082 87609",
        location: localStorage.getItem('vendorLocation') || "Manali",
        aboutUs: "Professional bike rentals for all travelers.",
        bankDetails: {
            accountNo: "",
            ifscCode: "",
            accountHolder: "",
            bankName: ""
        },
        businessTiming: {
            open: "09:00",
            close: "21:00"
        },
        policies: {
            refundPolicy: "24-hour full refund applies on all bookings.",
            termsAndConditions: "Standard rental terms apply.",
            privacyPolicy: "We protect your business data."
        },
        notifications: true
    });

    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await API.get('/vendor/profile');
                if (data) {
                    setFormData(prev => ({
                        ...prev,
                        ...data,
                        businessName: data.businessName || prev.businessName,
                        aboutUs: data.aboutUs || prev.aboutUs,
                        bankDetails: data.bankDetails || prev.bankDetails,
                        businessTiming: data.businessTiming || prev.businessTiming,
                        policies: data.policies || prev.policies,
                        contactDetails: data.contactDetails || prev.contactDetails
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            const { data } = await API.put('/vendor/profile', formData);
            setSaved(true);
            localStorage.setItem('vendorName', formData.businessName);
            localStorage.setItem('vendorLocation', formData.location);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            alert("Failed to save profile: " + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="py-20 text-center font-bold">Loading Management Center...</div>;

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Business Management</h1>
                    <p className="text-slate-500 font-medium capitalize">Manage your {activeTab.replace('-', ' ')} and preferences.</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
                >
                    {saved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {saved ? 'Changes Saved' : 'Save All Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Side: Profile Status */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm p-8 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="w-full h-full rounded-[2.5rem] bg-[#effaf6] flex items-center justify-center text-4xl font-black text-primary border-4 border-white shadow-xl">
                                {formData.businessName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </div>
                            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-primary transition-all">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 leading-tight">{formData.businessName}</h2>
                        <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1 italic">Verified Professional Partner</p>
                        
                        <div className="mt-8 pt-8 border-t border-slate-50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-slate-400">Profile Completion</span>
                                <span className="text-xs font-black text-primary">85%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[85%]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <Shield className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                        <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-6">Support Status</h3>
                        <p className="text-xl font-black mb-2">Priority Support Active</p>
                        <p className="text-xs text-white/60 mb-8 leading-relaxed">As a verified vendor, you have 24/7 priority access to our support desk.</p>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs transition-colors">Contact Support Manager</button>
                    </div>
                </div>

                {/* Right Side: Dynamic Content based on activeTab */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm p-8 md:p-12 min-h-[500px]">
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* General Profile Tab */}
                                {(activeTab === 'profile' || activeTab === 'about') && (
                                    <div className="space-y-8">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pb-4 border-b border-slate-50">Business Identity</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Business Name</label>
                                                <div className="relative">
                                                    <Landmark className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                    <input 
                                                        type="text" 
                                                        value={formData.businessName}
                                                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Base Location</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                    <input 
                                                        type="text" 
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">About Us / Description</label>
                                                <textarea 
                                                    rows="5" 
                                                    value={formData.aboutUs}
                                                    onChange={(e) => setFormData({...formData, aboutUs: e.target.value})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm resize-none"
                                                    placeholder="Tell customers about your rentals..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Bank Details Tab */}
                                {activeTab === 'bank' && (
                                    <div className="space-y-8">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pb-4 border-b border-slate-50">Banking & Financials</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Bank Name</label>
                                                <input 
                                                    type="text" 
                                                    value={formData.bankDetails?.bankName || ''}
                                                    onChange={(e) => setFormData({...formData, bankDetails: {...formData.bankDetails, bankName: e.target.value}})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Account Holder</label>
                                                <input 
                                                    type="text" 
                                                    value={formData.bankDetails?.accountHolder || ''}
                                                    onChange={(e) => setFormData({...formData, bankDetails: {...formData.bankDetails, accountHolder: e.target.value}})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Account Number</label>
                                                <input 
                                                    type="text" 
                                                    value={formData.bankDetails?.accountNo || ''}
                                                    onChange={(e) => setFormData({...formData, bankDetails: {...formData.bankDetails, accountNo: e.target.value}})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">IFSC Code</label>
                                                <input 
                                                    type="text" 
                                                    value={formData.bankDetails?.ifscCode || ''}
                                                    onChange={(e) => setFormData({...formData, bankDetails: {...formData.bankDetails, ifscCode: e.target.value}})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Documents Tab */}
                                {(activeTab === 'docs-business' || activeTab === 'docs-owner') && (
                                    <div className="space-y-8">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pb-4 border-b border-slate-50">KYC & Compliance</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-10 border-2 border-dashed border-slate-100 rounded-[2rem] text-center space-y-4 hover:border-primary transition-colors group cursor-pointer">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400 group-hover:text-primary transition-colors">
                                                    <FileText className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-700">Business Registration</p>
                                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Upload GST or Trade License</p>
                                                </div>
                                            </div>
                                            <div className="p-10 border-2 border-dashed border-slate-100 rounded-[2rem] text-center space-y-4 hover:border-primary transition-colors group cursor-pointer">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400 group-hover:text-primary transition-colors">
                                                    <User className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-700">Owner Verification</p>
                                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Upload PAN or Aadhaar</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Timing Tab */}
                                {activeTab === 'timing' && (
                                    <div className="space-y-8">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pb-4 border-b border-slate-50">Operational Hours</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Opening Time</label>
                                                <input 
                                                    type="time" 
                                                    value={formData.businessTiming?.open || '09:00'}
                                                    onChange={(e) => setFormData({...formData, businessTiming: {...formData.businessTiming, open: e.target.value}})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Closing Time</label>
                                                <input 
                                                    type="time" 
                                                    value={formData.businessTiming?.close || '21:00'}
                                                    onChange={(e) => setFormData({...formData, businessTiming: {...formData.businessTiming, close: e.target.value}})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Policies Tab */}
                                {(activeTab === 'terms' || activeTab === 'refund' || activeTab === 'privacy') && (
                                    <div className="space-y-8">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pb-4 border-b border-slate-50">Policies & Legal</h3>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Terms & Conditions</label>
                                                <textarea 
                                                    rows="4" 
                                                    value={formData.policies?.termsAndConditions || ''}
                                                    onChange={(e) => setFormData({...formData, policies: {...formData.policies, termsAndConditions: e.target.value}})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm resize-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Refund Policy</label>
                                                <textarea 
                                                    rows="4" 
                                                    value={formData.policies?.refundPolicy || ''}
                                                    onChange={(e) => setFormData({...formData, policies: {...formData.policies, refundPolicy: e.target.value}})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Contact & Support Tab */}
                                {(activeTab === 'contact' || activeTab === 'support') && (
                                    <div className="space-y-8">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pb-4 border-b border-slate-50">Support Channels</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Public Phone</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                    <input 
                                                        type="text" 
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Support Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                    <input 
                                                        type="email" 
                                                        value={formData.email}
                                                        readOnly
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-400 text-sm opacity-60 cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Share & Rate Tab */}
                                {(activeTab === 'share' || activeTab === 'rate') && (
                                    <div className="space-y-8 text-center py-10">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 border-b border-slate-50 pb-4">Social & Ratings</h3>
                                        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto text-primary mb-6">
                                            <Share2 className="w-10 h-10" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900">Share Your Business Profile</h4>
                                        <p className="text-sm text-slate-500 max-w-sm mx-auto">Help more people find your bike rentals by sharing your verified profile link.</p>
                                        <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4">
                                            <code className="text-xs font-bold text-primary truncate">https://wavygo.com/vendor/{formData.businessName.replace(/\s+/g, '-').toLowerCase()}</code>
                                            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Copy Link</button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorSettings;
