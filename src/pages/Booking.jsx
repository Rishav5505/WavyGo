import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, Check, Users, Package, PhoneCall, 
    ChevronLeft, ArrowRight, MapPin, CreditCard, 
    Send, Loader2, Shield, Camera, HardHat, 
    Wind, Trash2, Plus, Tag, Ticket, X, AlertCircle
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const GEAR_ITEMS = [
    {
        id: 'helmet',
        name: 'Professional Helmet',
        price: 200,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400',
        icon: HardHat,
        desc: 'ISI certified with anti-fog visor'
    },
    {
        id: 'jacket',
        name: 'Riding Jacket',
        price: 350,
        image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=400',
        icon: Shield,
        desc: 'Level 2 armor protection'
    },
    {
        id: 'gloves',
        name: 'Guarded Gloves',
        price: 100,
        image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=400',
        icon: Wind,
        desc: 'Leather mesh with knuckle guard'
    },
    {
        id: 'gopro',
        name: 'GoPro Hero 12',
        price: 500,
        image: 'https://images.unsplash.com/photo-1542614392-1c73ec541f53?q=80&w=400',
        icon: Camera,
        desc: '4K stabilized footage'
    }
];

const MOCK_BIKES = [
    { _id: 'mock1', title: 'Royal Enfield Himalayan', location: 'Manali', price: 1200 },
    { _id: 'mock2', title: 'KTM Duke 390', location: 'Delhi', price: 1500 },
    { _id: 'mock3', title: 'Honda Activa 6G', location: 'Jaipur', price: 400 },
    { _id: 'mock4', title: 'Triumph Speed 400', location: 'Bangalore', price: 1800 }
];

const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [packages, setPackages] = useState([]);
    const [availableCoupons, setAvailableCoupons] = useState([]);
    
    // Coupon States
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(null); // { code, discount }
    const [applyingCoupon, setApplyingCoupon] = useState(false);
    const [couponError, setCouponError] = useState('');

    const [formData, setFormData] = useState({
        packageId: '',
        travelDate: '',
        guests: 1,
        userName: user?.name || '',
        email: user?.email || '',
        phone: '',
        specialRequests: '',
        selectedGear: []
    });

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await API.get('/packages');
                setPackages([...(data || []), ...MOCK_BIKES]);
                
                // Fetch active coupons
                const couponRes = await API.get('/coupons');
                setAvailableCoupons(couponRes.data.filter(c => c.isActive && new Date(c.expiryDate) > new Date()));
            } catch (error) {
                console.error("Failed to fetch data", error);
                setPackages(MOCK_BIKES);
            }
        };
        fetchPackages();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pkgId = params.get('packageId');
        if (pkgId) {
            setFormData(prev => ({ ...prev, packageId: pkgId }));
        }
    }, [location.search]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Calculation Logic
    const calculateTotal = () => {
        if (!packages || packages.length === 0 || !formData.packageId) {
            return { subtotal: 0, discount: 0, total: 0 };
        }

        const rawId = formData.packageId.toString();
        const cleanId = rawId.includes('-') ? rawId.split('-')[0] : rawId;

        const selectedPackage = packages.find(p => p._id.toString() === cleanId);
        if (!selectedPackage) return { subtotal: 0, discount: 0, total: 0 };

        const packageTotal = (Number(selectedPackage.price) || 0) * (Number(formData.guests) || 1);
        const gearTotal = (formData.selectedGear || []).reduce((acc, gid) => {
            const gear = GEAR_ITEMS.find(g => g.id === gid);
            return acc + (Number(gear?.price) || 0);
        }, 0) * (Number(formData.guests) || 1);

        const subtotal = packageTotal + gearTotal;
        const discount = couponApplied ? Number(couponApplied.discount) : 0;
        
        return {
            subtotal,
            discount,
            total: Math.max(0, subtotal - discount)
        };
    };

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setApplyingCoupon(true);
        setCouponError('');
        
        try {
            const { subtotal } = calculateTotal();
            const { data } = await API.post('/coupons/apply', { 
                code: couponCode, 
                amount: subtotal 
            });
            setCouponApplied({ code: data.code, discount: data.discount });
            setCouponCode('');
        } catch (error) {
            setCouponError(error.response?.data?.message || 'Invalid coupon code');
        } finally {
            setApplyingCoupon(false);
        }
    };

    const removeCoupon = () => {
        setCouponApplied(null);
        setCouponError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const selectedPackage = packages.find(p => p._id === formData.packageId);
            const { total, discount } = calculateTotal();
            
            const payload = {
                ...formData,
                userId: user?._id || user?.id,
                vendorId: selectedPackage?.vendorId,
                vendorName: selectedPackage?.vendorName,
                itemTitle: selectedPackage?.title,
                totalAmount: total,
                discountApplied: discount,
                couponUsed: couponApplied?.code
            };
            
            await API.post('/bookings', payload);
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to process booking');
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppRedirect = () => {
        const selectedPackage = packages.find(p => p._id === formData.packageId);
        const { total } = calculateTotal();
        const message = `Booking Inquiry for ${selectedPackage?.title}. Amount: ₹${total}. Name: ${formData.userName}, Phone: ${formData.phone}`;
        window.open(`https://wa.me/919508287609?text=${encodeURIComponent(message)}`, '_blank');
    };

    const { subtotal, discount, total } = calculateTotal();

    return (
        <div className="bg-slate-50 min-h-screen selection:bg-primary selection:text-white">
            <Navbar />

            <div className="bg-[#E1F1EA] py-12 md:py-16 pt-24 md:pt-32 text-center px-6 border-b border-emerald-100/50 relative overflow-hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} className="absolute inset-0 pointer-events-none">
                    <Ticket className="w-96 h-96 absolute -top-20 -left-20 rotate-12" />
                    <Tag className="w-96 h-96 absolute -bottom-20 -right-20 -rotate-12" />
                </motion.div>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight text-slate-900 relative z-10">Plan Your Trip</h1>
                <p className="text-sm md:text-base text-emerald-800/70 font-medium relative z-10">Secure your mountain adventure in few simple steps.</p>
            </div>

            <main className="container-custom py-10 md:py-16 -mt-8 md:-mt-10 mb-20 px-4 md:px-0">
                <div className="max-w-4xl mx-auto">
                    {!isSubmitted && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 mb-8 md:mb-10 shadow-sm border border-slate-100 flex justify-between items-center overflow-x-auto gap-4 no-scrollbar">
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} className="flex items-center gap-2 md:gap-3 shrink-0">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-colors ${step >= s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {s}
                                    </div>
                                    <span className={`text-[10px] md:text-sm font-bold uppercase tracking-widest ${step >= s ? 'text-slate-900' : 'text-slate-400'}`}>
                                        {s === 1 ? 'Trip' : s === 2 ? 'Gear' : s === 3 ? 'Details' : 'Confirm'}
                                    </span>
                                    {s < 4 && <div className="hidden md:block w-10 h-px bg-slate-200 ml-2"></div>}
                                </div>
                            ))}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-slate-100 text-center">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <Check className="w-10 h-10 text-emerald-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase italic">Booking Confirmed!</h2>
                                <p className="text-slate-500 max-w-sm mx-auto mb-10 font-bold text-sm uppercase tracking-widest">Adventure starts at ₹{total}</p>
                                
                                <div className="bg-slate-50 rounded-3xl p-8 mb-10 text-left max-w-md mx-auto space-y-4 border border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Package</span>
                                        <span className="text-slate-900 font-black">{packages.find(p => p._id === formData.packageId)?.title}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Amount Paid</span>
                                        <span className="text-emerald-900 font-black text-xl">₹{total}</span>
                                    </div>
                                    {couponApplied && (
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                                            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><Tag className="w-3 h-3"/> Saved</span>
                                            <span className="text-indigo-600 font-black">-₹{discount}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button onClick={() => navigate('/')} variant="outline" className="px-10 py-5 rounded-2xl font-bold flex items-center gap-2 justify-center">
                                        <ChevronLeft className="w-5 h-5" /> Return Home
                                    </Button>
                                    <Button onClick={handleWhatsAppRedirect} className="px-10 py-5 rounded-2xl font-bold flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-xl shadow-green-500/20 justify-center">
                                        <PhoneCall className="w-5 h-5" /> Chat on WhatsApp
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-slate-100">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {step === 1 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                                    <Package className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Select Trip</h2>
                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Step 1 of 4</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3 md:col-span-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Choose Package</label>
                                                    <select name="packageId" value={formData.packageId} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4.5 focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-700 appearance-none cursor-pointer" required>
                                                        <option value="">Select a journey</option>
                                                        {packages.map(p => <option key={p._id} value={p._id}>{p.title} - ₹{p.price}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Travel Date</label>
                                                    <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-700" required />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Guests</label>
                                                    <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-700" required />
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-6">
                                                <Button onClick={() => setStep(2)} disabled={!formData.packageId || !formData.travelDate} className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 bg-emerald-900 text-white shadow-xl shadow-emerald-900/10">Continue to Gear <ArrowRight className="w-5 h-5" /></Button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center justify-between border-b pb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                                        <Shield className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Expedition Gear</h2>
                                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Optional Add-ons</p>
                                                    </div>
                                                </div>
                                                <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                                    <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Active: {formData.selectedGear.length} Items</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {GEAR_ITEMS.map((item) => {
                                                    const isSelected = formData.selectedGear.includes(item.id);
                                                    return (
                                                        <motion.div
                                                            key={item.id}
                                                            whileHover={{ y: -5 }}
                                                            onClick={() => {
                                                                const newGear = isSelected
                                                                    ? formData.selectedGear.filter(id => id !== item.id)
                                                                    : [...formData.selectedGear, item.id];
                                                                setFormData({ ...formData, selectedGear: newGear });
                                                            }}
                                                            className={`relative group cursor-pointer rounded-[2rem] overflow-hidden border-2 transition-all p-5 ${isSelected ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-slate-50 bg-white hover:border-slate-100'}`}
                                                        >
                                                            <div className="flex gap-5 items-center">
                                                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h4 className="font-black text-slate-900 text-sm leading-tight mb-1">{item.name}</h4>
                                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-3">{item.desc}</p>
                                                                    <div className="flex items-baseline gap-1">
                                                                        <span className="text-primary font-black text-lg tracking-tight">₹{item.price}</span>
                                                                        <span className="text-[8px] text-slate-300 font-black uppercase">/ Journey</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-primary scale-110' : 'bg-slate-50 scale-100'}`}>
                                                                {isSelected ? <Check className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-slate-200" />}
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>

                                            <div className="flex justify-between pt-8 border-t border-slate-50">
                                                <button onClick={() => setStep(1)} className="px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Back</button>
                                                <Button onClick={() => setStep(3)} className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 bg-emerald-900 text-white shadow-xl shadow-emerald-900/10">Personal Details <ArrowRight className="w-5 h-5" /></Button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-4 border-b pb-6">
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                                    <CreditCard className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Rider Info</h2>
                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Step 3 of 4</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                    <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-700" placeholder="John Biker" required />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-700" placeholder="hello@adventure.com" required />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-700" placeholder="+91 XXXX XXXX" required />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Special Requirements (Optional)</label>
                                                    <textarea name="specialRequests" rows="3" value={formData.specialRequests} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-700 resize-none" placeholder="Height info, dietary needs etc."></textarea>
                                                </div>
                                            </div>
                                            <div className="flex justify-between pt-8 border-t border-slate-50">
                                                <button onClick={() => setStep(2)} className="px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Back</button>
                                                <Button onClick={() => setStep(4)} disabled={!formData.userName || !formData.email || !formData.phone} className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 bg-emerald-900 text-white shadow-xl shadow-emerald-900/10">Summary & Save <ArrowRight className="w-5 h-5" /></Button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-4 border-b pb-6">
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                                    <Calendar className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Final Summary</h2>
                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Verify & Apply Coupons</p>
                                                </div>
                                            </div>

                                            {/* Price Breakdown Card */}
                                            <div className="bg-slate-50/50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm space-y-6">
                                                <div className="flex justify-between items-center pb-4 border-b border-slate-200/50">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Adventure Type</p>
                                                        <h3 className="font-black text-slate-900 text-lg uppercase italic">
                                                            {packages.find(p => {
                                                                const rawId = formData.packageId.toString();
                                                                const cleanId = rawId.includes('-') ? rawId.split('-')[0] : rawId;
                                                                return p._id.toString() === cleanId;
                                                            })?.title || 'Selected Journey'}
                                                        </h3>
                                                    </div>
                                                    <p className="font-black text-slate-900 text-lg">₹{subtotal}</p>
                                                </div>

                                                {/* Coupon Management */}
                                                <div className="py-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block ml-1">Have a Coupon Code?</label>
                                                    {couponApplied ? (
                                                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center justify-between bg-[#f0f9f6] border border-emerald-900/10 p-5 rounded-2xl">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-emerald-900 text-white rounded-xl flex items-center justify-center">
                                                                    <Tag className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-black text-emerald-900 uppercase tracking-tighter">Code Activated: {couponApplied.code}</p>
                                                                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Save ₹{discount} instantly</p>
                                                                </div>
                                                            </div>
                                                            <button type="button" onClick={removeCoupon} className="p-2 hover:bg-emerald-100 rounded-lg text-emerald-900 transition-colors">
                                                                <X className="w-5 h-5" />
                                                            </button>
                                                        </motion.div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            <div className="flex gap-3">
                                                                <div className="relative flex-grow">
                                                                    <Ticket className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                                    <input
                                                                        type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/10 font-black text-slate-700 text-sm uppercase"
                                                                        placeholder="ENTER CODE"
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button" onClick={handleApplyCoupon} disabled={applyingCoupon || !couponCode.trim()}
                                                                    className="px-8 bg-emerald-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-800 transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/10"
                                                                >
                                                                    {applyingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                                                                </button>
                                                            </div>

                                                            {/* Recommended Coupons */}
                                                            {availableCoupons.length > 0 && (
                                                                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                                                    {availableCoupons.map(c => (
                                                                        <button
                                                                            key={c._id} type="button"
                                                                            onClick={() => {
                                                                                setCouponCode(c.code);
                                                                                // Auto apply
                                                                            }}
                                                                            className="flex-shrink-0 bg-white border border-slate-100 px-4 py-3 rounded-xl hover:border-emerald-600/30 transition-all text-left"
                                                                        >
                                                                            <p className="text-emerald-900 font-black text-[10px] uppercase mb-0.5">{c.code}</p>
                                                                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                                                                                {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                                                                            </p>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    {couponError && <p className="text-rose-500 text-[9px] font-black uppercase tracking-tight mt-2 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {couponError}</p>}
                                                </div>

                                                <div className="space-y-3 pt-4">
                                                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                                                        <span>Subtotal</span>
                                                        <span>₹{subtotal}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs font-bold text-emerald-600 uppercase tracking-[0.2em]">
                                                        <span>Discount</span>
                                                        <span>-₹{discount}</span>
                                                    </div>
                                                    <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.3em] mb-1">Final Amount</p>
                                                            <p className="text-3xl font-black text-slate-900 tracking-tighter">₹{total}</p>
                                                        </div>
                                                        <p className="text-[9px] font-black text-emerald-900 bg-emerald-50 px-3 py-1 rounded-lg uppercase tracking-widest">Payable on Pickup</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between pt-8 border-t border-slate-50">
                                                <button onClick={() => setStep(3)} className="px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Back</button>
                                                <Button type="submit" disabled={loading} className="px-14 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 bg-emerald-900 text-white shadow-2xl shadow-emerald-900/20">
                                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Confirm & Book</>}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Booking;
