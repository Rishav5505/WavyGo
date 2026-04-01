import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Ticket, Plus, Trash2, Edit2, CheckCircle2, 
    XCircle, Clock, Percent, DollarSign, Calendar,
    Tag, Info, Search, X, Save, AlertCircle, TrendingUp
} from 'lucide-react';
import API from '../../utils/api';
import Button from '../../components/common/Button';

const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: 10,
        minBookingAmount: 0,
        maxDiscount: 0,
        expiryDate: '',
        usageLimit: 100,
        description: '',
        isActive: true
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const { data } = await API.get('/coupons');
            setCoupons(data);
        } catch (error) {
            console.error("Failed to fetch coupons:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            code: '',
            discountType: 'percentage',
            discountValue: 10,
            minBookingAmount: 0,
            maxDiscount: 0,
            expiryDate: '',
            usageLimit: 100,
            description: '',
            isActive: true
        });
    };

    const handleEdit = (c) => {
        setEditingCoupon(c);
        setFormData({
            code: c.code,
            discountType: c.discountType,
            discountValue: c.discountValue,
            minBookingAmount: c.minBookingAmount,
            maxDiscount: c.maxDiscount || 0,
            expiryDate: new Date(c.expiryDate).toISOString().split('T')[0],
            usageLimit: c.usageLimit,
            description: c.description,
            isActive: c.isActive
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCoupon) {
                await API.put(`/coupons/${editingCoupon._id}`, formData);
                alert('Coupon updated!');
            } else {
                await API.post('/coupons', formData);
                alert('New coupon created!');
            }
            setModalOpen(false);
            setEditingCoupon(null);
            resetForm();
            fetchCoupons();
        } catch (error) {
            alert(error.response?.data?.message || 'Save failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                await API.delete(`/coupons/${id}`);
                fetchCoupons();
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const toggleStatus = async (c) => {
        try {
            await API.put(`/coupons/${c._id}`, { isActive: !c.isActive });
            fetchCoupons();
        } catch (error) {
            alert('Status update failed');
        }
    };

    const filteredCoupons = coupons.filter(c => 
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-900 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
                        <Ticket className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Promotions & Coupons</h1>
                        <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                             Create and manage discount codes for your customers
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Active Now</p>
                        <p className="text-xl font-black text-slate-900">{coupons.filter(c => c.isActive).length}</p>
                    </div>
                    <Button 
                        onClick={() => {
                            resetForm();
                            setEditingCoupon(null);
                            setModalOpen(true);
                        }}
                        className="bg-emerald-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-emerald-900/20 hover:scale-105 transition-all font-black uppercase tracking-widest text-xs"
                    >
                        <Plus className="w-5 h-5" /> New Coupon
                    </Button>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                    type="text"
                    placeholder="Search codes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-emerald-600/40 transition-all font-bold text-slate-700 text-sm shadow-sm"
                />
            </div>

            {/* Coupons List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCoupons.map((c) => (
                    <motion.div
                        key={c._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-emerald-900/5 ${!c.isActive ? 'opacity-60' : ''}`}
                    >
                        <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                            {/* Left: Code Box */}
                            <div className="md:w-48 h-32 bg-slate-50 rounded-[1.8rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 group-hover:border-emerald-600/20 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-bl-2xl -mr-4 -mt-4 shadow-inner" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 bg-white rounded-tr-2xl -ml-4 -mb-4 shadow-inner" />
                                
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Discount Code</p>
                                <h3 className="text-2xl font-black text-slate-900 tracking-[-0.05em] uppercase">{c.code}</h3>
                                <div className={`mt-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${c.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {c.isActive ? 'Active' : 'Disabled'}
                                </div>
                            </div>

                            {/* Right: Info */}
                            <div className="flex-grow space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xl font-black text-slate-900 leading-none mb-1">
                                            {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                                        </p>
                                        <p className="text-xs font-bold text-slate-400">{c.description || 'No description provided'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => toggleStatus(c)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all">
                                            {c.isActive ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                                        </button>
                                        <button onClick={() => handleEdit(c)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-900 rounded-xl transition-all">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(c._id)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50/50 p-4 rounded-2xl">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Usage</span>
                                        </div>
                                        <p className="text-sm font-black text-slate-700">{c.usedCount} <span className="text-[10px] text-slate-300">/ {c.usageLimit}</span></p>
                                    </div>
                                    <div className="bg-slate-50/50 p-4 rounded-2xl">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Expiry</span>
                                        </div>
                                        <p className="text-sm font-black text-slate-700">{new Date(c.expiryDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden"
                        >
                            <header className="p-8 md:p-10 border-b border-slate-50 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">{editingCoupon ? 'Configure Coupon' : 'Create Special Offer'}</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Driving loyalty through rewards</p>
                                </div>
                                <button onClick={() => setModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </header>

                            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Unique Code</label>
                                        <div className="relative">
                                            <Tag className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-900/20" />
                                            <input
                                                type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm"
                                                placeholder="WAVY2024" required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Discount Type</label>
                                        <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
                                            {['percentage', 'fixed'].map((type) => (
                                                <button
                                                    key={type} type="button" onClick={() => setFormData({...formData, discountType: type})}
                                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                        formData.discountType === type ? 'bg-white shadow-sm text-emerald-900' : 'text-slate-400'
                                                    }`}
                                                >
                                                    {type === 'percentage' ? <Percent className="w-3 h-3 inline mr-2" /> : <DollarSign className="w-3 h-3 inline mr-2" />}
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                            {formData.discountType === 'percentage' ? 'Percentage Off (%)' : 'Fixed Discount (₹)'}
                                        </label>
                                        <input
                                            type="number" value={formData.discountValue} onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Minimum Booking Amount</label>
                                        <input
                                            type="number" value={formData.minBookingAmount} onChange={(e) => setFormData({...formData, minBookingAmount: e.target.value})}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Usage Limit</label>
                                        <input
                                            type="number" value={formData.usageLimit} onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Expiry Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-900/20" />
                                            <input
                                                type="date" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Offer Description</label>
                                    <textarea
                                        value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full bg-slate-50 border-none rounded-[2rem] p-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm min-h-[100px] resize-none"
                                        placeholder="Flat 10% off on all Himalayan rentals..."
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-6 bg-[#f0f9f6] rounded-3xl border border-emerald-900/5">
                                    <Info className="w-5 h-5 text-emerald-900 shrink-0" />
                                    <p className="text-[10px] font-bold text-emerald-900/60 leading-relaxed">
                                        Coupon will be automatically disabled once the usage limit is reached or the expiry date passes.
                                    </p>
                                </div>

                                <footer className="pt-8 flex justify-end gap-4">
                                    <button 
                                        type="button" onClick={() => setModalOpen(false)}
                                        className="px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <Button 
                                        type="submit"
                                        className="bg-emerald-900 text-white px-12 py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20 hover:scale-105 transition-all font-black uppercase tracking-widest text-[10px]"
                                    >
                                        <Save className="w-5 h-5" /> {editingCoupon ? 'Update Offer' : 'Launch Coupon'}
                                    </Button>
                                </footer>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCoupons;
