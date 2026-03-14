import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, Users, Package, PhoneCall, ChevronLeft, ArrowRight, MapPin, CreditCard, Send, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import API from '../utils/api';
import { Shield, Camera, HardHat, Wind, Trash2, Plus } from 'lucide-react';

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

const Booking = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        packageId: '',
        travelDate: '',
        guests: 1,
        userName: '',
        email: '',
        phone: '',
        specialRequests: '',
        selectedGear: []
    });

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await API.get('/packages');
                if (data && data.length > 0) {
                    setPackages(data);
                } else {
                    // Fallback if DB is empty
                    const mockBikes = [
                        { _id: "65e5a2e1f1a2b3c4d5e6f001", title: "Royal Enfield Himalayan", price: 1200 },
                        { _id: "65e5a2e1f1a2b3c4d5e6f002", title: "KTM Duke 390", price: 1500 },
                        { _id: "65e5a2e1f1a2b3c4d5e6f003", title: "Honda Activa 6G", price: 400 },
                        { _id: "65e5a2e1f1a2b3c4d5e6f004", title: "Triumph Speed 400", price: 1800 }
                    ];
                    setPackages(mockBikes);
                }
            } catch (error) {
                console.error("Failed to fetch packages", error);
                const mockBikes = [
                    { _id: "65e5a2e1f1a2b3c4d5e6f001", title: "Royal Enfield Himalayan", price: 1200 },
                    { _id: "65e5a2e1f1a2b3c4d5e6f002", title: "KTM Duke 390", price: 1500 },
                    { _id: "65e5a2e1f1a2b3c4d5e6f003", title: "Honda Activa 6G", price: 400 },
                    { _id: "65e5a2e1f1a2b3c4d5e6f004", title: "Triumph Speed 400", price: 1800 }
                ];
                setPackages(mockBikes);
            }
        };
        fetchPackages();
    }, []);

    // Set packageId from query param if present
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pkgId = params.get('packageId');
        if (pkgId && !formData.packageId) {
            setFormData(prev => ({ ...prev, packageId: pkgId }));
        }
    }, [location.search, formData.packageId]);
    const nextStep = (e) => {
        if (e) e.preventDefault();
        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/bookings', formData);

            // Re-enable Success Screen as requested
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || 'Failed to process booking';
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppRedirect = () => {
        const selectedPackage = packages.find(p => p._id === formData.packageId);
        const message = `Booking Inquiry for ${selectedPackage?.title}. Name: ${formData.userName}, Phone: ${formData.phone}, Guests: ${formData.guests}`;
        window.open(`https://wa.me/919508287609?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            {/* Simple Header */}
            <div className="bg-slate-900 py-12 md:py-16 pt-24 md:pt-32 text-center text-white px-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">Plan Your Trip</h1>
                <p className="text-sm md:text-base text-slate-400">Simple 3-step process to secure your mountain adventure.</p>
            </div>

            <main className="container-custom py-10 md:py-16 -mt-8 md:-mt-10 mb-20 px-4 md:px-0">
                <div className="max-w-4xl mx-auto">
                    {/* Stepper Header */}
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
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-slate-100 text-center"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                                    <Check className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 md:mb-4 uppercase italic">Booking Confirmed!</h2>
                                <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-8 md:mb-10 font-medium">
                                    Your adventure is being prepared. We've received your data and our team will contact you shortly for confirmation.
                                </p>

                                <div className="bg-slate-50 rounded-2xl p-8 mb-10 text-left max-w-md mx-auto space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Machine</span>
                                        <span className="text-slate-900 font-bold">{packages.find(p => p._id === formData.packageId)?.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Date</span>
                                        <span className="text-slate-900 font-bold">{formData.travelDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Phone</span>
                                        <span className="text-slate-900 font-bold">{formData.phone}</span>
                                    </div>
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
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-3xl p-10 md:p-14 shadow-sm border border-slate-100"
                            >
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {step === 1 && (
                                        <div className="space-y-8">
                                            <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Select Your Experience</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3 md:col-span-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Choose Package</label>
                                                    <select name="packageId" value={formData.packageId} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" required>
                                                        <option value="">Select a journey</option>
                                                        {packages.map(p => <option key={p._id} value={p._id}>{p.title} - ₹{p.price}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Travel Date</label>
                                                    <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium text-sm" required />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Total Guests</label>
                                                    <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" required />
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-6">
                                                <Button onClick={nextStep} disabled={!formData.packageId || !formData.travelDate} className="px-10 py-4 rounded-xl font-bold flex items-center gap-3">Continue to Gear <ArrowRight className="w-5 h-5" /></Button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-8">
                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
                                                <div>
                                                    <h2 className="text-2xl font-black text-slate-900 uppercase italic">Gear Marketplace</h2>
                                                    <p className="text-sm text-slate-500 font-medium">Rent premium safety gear for your expedition.</p>
                                                </div>
                                                <div className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Selected: {formData.selectedGear.length} Items</span>
                                                </div>
                                            </div>

                                            {/* Gear Selection Grid/Carousel */}
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
                                                            className={`relative group cursor-pointer rounded-[2rem] overflow-hidden border-2 transition-all p-4 ${isSelected ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                                                        >
                                                            <div className="flex gap-4 items-center">
                                                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                                </div>
                                                                <div className="flex-1 space-y-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <item.icon className={`w-3.5 h-3.5 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                                                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                                                    </div>
                                                                    <p className="text-[10px] text-slate-500 font-medium leading-tight">{item.desc}</p>
                                                                    <div className="pt-2">
                                                                        <span className="text-primary font-black text-sm tracking-tight">₹{item.price}</span>
                                                                        <span className="text-[9px] text-slate-400 font-bold uppercase ml-1">/ day</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Checkmark overlay */}
                                                            <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-primary scale-110' : 'bg-slate-100 scale-100'}`}>
                                                                {isSelected ? <Check className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-slate-300" />}
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>

                                            <div className="flex justify-between pt-6 border-t">
                                                <Button variant="outline" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold flex items-center gap-3">Back</Button>
                                                <Button onClick={nextStep} className="px-10 py-4 rounded-xl font-bold flex items-center gap-3">Next: Personal Info <ArrowRight className="w-5 h-5" /></Button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-8">
                                            <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Personal Information</h2>
                                            <div className="grid grid-cols-1 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                    <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="Your Name" required />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email ID</label>
                                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="email@example.com" required />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="+91 XXXX XXXX" required />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Special Requests</label>
                                                    <textarea name="specialRequests" rows="3" value={formData.specialRequests} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium resize-none" placeholder="Any special requirements?"></textarea>
                                                </div>
                                            </div>
                                            <div className="flex justify-between pt-6">
                                                <Button variant="outline" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold flex items-center gap-3">Back</Button>
                                                <Button onClick={nextStep} disabled={!formData.userName || !formData.email || !formData.phone} className="px-10 py-4 rounded-xl font-bold flex items-center gap-3">Continue <ArrowRight className="w-5 h-5" /></Button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-8">
                                            <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Review & Confirm</h2>
                                            <div className="bg-slate-50 rounded-2xl p-8 space-y-4 text-left">
                                                <div className="flex justify-between border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400 font-medium tracking-tight">Selected Journey</span>
                                                    <span className="text-slate-900 font-bold">{packages.find(p => p._id === formData.packageId)?.title}</span>
                                                </div>
                                                
                                                {/* Gear Summary */}
                                                <div className="border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400 font-medium tracking-tight block mb-3">Add-on Gears</span>
                                                    {formData.selectedGear.length > 0 ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {formData.selectedGear.map(gid => {
                                                                const gear = GEAR_ITEMS.find(g => g.id === gid);
                                                                return (
                                                                    <span key={gid} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 uppercase flex items-center gap-2">
                                                                        <gear.icon className="w-3 h-3 text-primary" />
                                                                        {gear.name}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-300 italic text-xs">No extra gear selected</span>
                                                    )}
                                                </div>

                                                <div className="flex justify-between border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400 font-medium">Travel Date</span>
                                                    <span className="text-slate-900 font-bold">{formData.travelDate || 'TBD'}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400 font-medium">Party Size</span>
                                                    <span className="text-slate-900 font-bold">{formData.guests} Guest(s)</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-slate-400 font-medium">Contact Details</span>
                                                    <span className="text-slate-900 font-bold">{formData.phone}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between pt-6">
                                                <Button variant="outline" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold flex items-center gap-3">Back</Button>
                                                <Button type="submit" disabled={loading} className="px-12 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-primary/20 bg-primary text-white">
                                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Confirm & Book</>}
                                                </Button>
                                            </div>
                                            <p className="text-center text-xs text-slate-400 font-medium">Your details will be saved securely in our database.</p>
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
