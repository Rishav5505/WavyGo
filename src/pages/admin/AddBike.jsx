import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin, IndianRupee, Clock, Camera, Plus, Trash2,
    ArrowLeft, Loader2, Bike, Settings, ShieldCheck, Gauge
} from 'lucide-react';
import API from '../../utils/api';
import Button from '../../components/common/Button';

const AddBike = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Get current user info
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const isVendor = userInfo.role === 'vendor';

    const [formData, setFormData] = useState({
        title: '',
        location: isVendor ? (localStorage.getItem('vendorLocation') || 'Delhi') : '',
        price: '',
        category: 'Cruiser',
        image: '',
        duration: '24 Hours',
        vendorName: isVendor ? (localStorage.getItem('vendorName') || 'New Vendor') : '',
        vendorId: isVendor ? (localStorage.getItem('vendorId') || 'V1') : '',
        specs: {
            cc: '',
            terrain: 'City',
            comfort: 4,
            mileage: ''
        },
        description: ''
    });

    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);
        setUploading(true);

        try {
            const { data } = await API.post('/upload', formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Ensure the backend path is used correctly with the base URL
            const fullPath = data.startsWith('http') ? data : `${API.defaults.baseURL.replace('/api', '')}${data}`;
            setFormData({ ...formData, image: fullPath });
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Upload failed. Using default placeholder.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/packages', formData);
            alert('Bike listed successfully!');
            navigate(isVendor ? '/vendor/packages' : '/admin/packages');
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || error.message || 'Failed to list bike';
            alert(`Failed: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl pb-20">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-8 font-black text-[10px] uppercase tracking-widest transition-all"
            >
                <ArrowLeft className="w-5 h-5" /> Cancel & Go Back
            </button>

            <header className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">List New Machine</h1>
                <p className="text-slate-500 mt-2 font-medium italic">Add a new bike to your fleet and start earning.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Visual Identity */}
                <div className="bg-[#f8fefc] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-emerald-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                    <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-4 relative z-10 uppercase italic">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                            <Bike className="w-5 h-5" />
                        </div>
                        Bicycle Identity
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block ml-1">Bike Model Title</label>
                            <input
                                type="text" name="title" value={formData.title} onChange={handleChange}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 shadow-sm"
                                placeholder="e.g. Royal Enfield Himalayan 450" required
                            />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block ml-1">Category</label>
                                <select
                                    name="category" value={formData.category} onChange={handleChange}
                                    className="w-full bg-white border border-slate-100 rounded-2xl py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 shadow-sm appearance-none"
                                >
                                    <option>Cruiser</option>
                                    <option>Sports</option>
                                    <option>Commuter</option>
                                    <option>Premium</option>
                                    <option>Electric</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block ml-1">Daily Rental (₹)</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                    <input
                                        type="number" name="price" value={formData.price} onChange={handleChange}
                                        className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-14 pr-8 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 shadow-sm"
                                        placeholder="1200" required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block ml-1">Upload Machine Image</label>
                                <div className="relative group/upload h-[64px]">
                                    <input
                                        type="file"
                                        onChange={handleUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        accept="image/*"
                                    />
                                    <div className="w-full h-full bg-white border border-slate-100 rounded-2xl flex items-center px-8 font-bold text-slate-700 shadow-sm group-hover/upload:border-primary transition-all overflow-hidden">
                                        <Camera className="w-5 h-5 text-slate-300 mr-4 group-hover/upload:text-primary" />
                                        {uploading ? (
                                            <div className="flex items-center gap-3 text-primary animate-pulse">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Uploading Machine...</span>
                                            </div>
                                        ) : formData.image ? (
                                            <span className="text-emerald-500 flex items-center gap-2 truncate">
                                                <ShieldCheck className="w-4 h-4" /> Machine Image Loaded
                                            </span>
                                        ) : (
                                            <span className="text-slate-400 italic">Select clear side-view photo</span>
                                        )}
                                    </div>
                                </div>
                                {formData.image && (
                                    <div className="mt-4 p-2 bg-white rounded-2xl border border-slate-50 shadow-sm flex items-center justify-between">
                                        <div className="w-20 h-20 bg-emerald-50 rounded-xl overflow-hidden p-2">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, image: '' })}
                                            className="text-rose-500 hover:text-rose-700 p-4 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block ml-1">Service City</label>
                                <div className="relative">
                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                    <input
                                        type="text" name="location" value={formData.location} onChange={handleChange}
                                        className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-14 pr-8 focus:outline-none focus:border-primary transition-all font-bold text-slate-700 shadow-sm"
                                        placeholder="Delhi, Goa, etc." required
                                        readOnly={isVendor}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Specs */}
                <div className="bg-slate-950 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10">
                        <Settings className="w-64 h-64 animate-spin-slow" />
                    </div>

                    <h3 className="text-xl font-black mb-10 flex items-center gap-4 relative z-10 uppercase italic">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <Gauge className="w-5 h-5 text-primary" />
                        </div>
                        Technical DNA
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 block ml-1">Engine Capacity (CC)</label>
                            <input
                                type="number" name="specs.cc" value={formData.specs.cc} onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-white"
                                placeholder="350" required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 block ml-1">Expected Mileage (km/pl)</label>
                            <input
                                type="number" name="specs.mileage" value={formData.specs.mileage} onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-white"
                                placeholder="35" required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 block ml-1">Best Suited Terrain</label>
                            <select
                                name="specs.terrain" value={formData.specs.terrain} onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-white appearance-none"
                            >
                                <option className="bg-slate-900">City</option>
                                <option className="bg-slate-900">Highway</option>
                                <option className="bg-slate-900">Mountain</option>
                                <option className="bg-slate-900">Off-road</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 block ml-1">Comfort Score (1-5)</label>
                            <input
                                type="number" name="specs.comfort" min="1" max="5" value={formData.specs.comfort} onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 focus:outline-none focus:border-primary transition-all font-bold text-white"
                                placeholder="5" required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-10">
                    <Button variant="outline" type="button" onClick={() => navigate(-1)} className="px-10 rounded-2xl py-5 font-black uppercase tracking-[0.2em] text-xs">Discard Changes</Button>
                    <Button type="submit" disabled={loading} className="px-12 rounded-2xl py-5 flex items-center justify-center gap-3 bg-primary text-white shadow-xl shadow-primary/20 font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                        List for Rent
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddBike;
