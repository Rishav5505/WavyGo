import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, MapPin, Image as ImageIcon, CheckCircle2, XCircle, Loader2, Upload } from 'lucide-react';
import API from '../../utils/api';
import Button from '../../components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';

const AdminCities = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCity, setEditingCity] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        isPopular: false
    });

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const { data } = await API.get('/cities');
            setCities(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
            // Fallback mock
            setCities([
                { _id: '1', name: 'Manali', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80', description: 'The gateway to adventure in the Himalayas.', isPopular: true, isActive: true, bikeCount: 24 },
                { _id: '2', name: 'Leh', image: 'https://images.unsplash.com/photo-1581791538302-03537b9c97bf?auto=format&fit=crop&q=80', description: 'Experience the magic of the cold desert.', isPopular: true, isActive: true, bikeCount: 18 },
                { _id: '3', name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80', description: 'Capital city with deep historical roots.', isPopular: false, isActive: true, bikeCount: 45 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (city = null) => {
        if (city) {
            setEditingCity(city);
            setFormData({
                name: city.name,
                image: city.image,
                description: city.description,
                isPopular: city.isPopular
            });
        } else {
            setEditingCity(null);
            setFormData({ name: '', image: '', description: '', isPopular: false });
        }
        setIsModalOpen(true);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setLoading(true);

        try {
            const { data } = await API.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Complete the URL if it is a relative path
            const fullUrl = data.startsWith('http') ? data : `http://localhost:5000${data}`;
            setFormData(prev => ({ ...prev, image: fullUrl }));
        } catch (error) {
            alert('Upload failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingCity) {
                await API.put(`/cities/${editingCity._id}`, formData);
            } else {
                await API.post('/cities', formData);
            }
            fetchCities();
            setIsModalOpen(false);
        } catch (error) {
            alert(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this city? This cannot be undone.')) {
            try {
                await API.delete(`/cities/${id}`);
                setCities(cities.filter(c => c._id !== id));
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-900 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
                        <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Destinations</h1>
                        <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                             Manage service cities and featured destinations
                        </p>
                    </div>
                </div>
                <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 rounded-xl py-4 shadow-xl shadow-emerald-900/10">
                    <Plus className="w-5 h-5" /> Add New City
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search by city name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-600/40 transition-all font-bold text-slate-700 text-sm"
                    />
                </div>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredCities.map((city) => (
                        <motion.div
                            key={city._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img src={city.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={city.name} />
                                <div className="absolute top-6 left-6 flex gap-2">
                                    {city.isPopular && (
                                        <span className="bg-emerald-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-900/30">
                                            Popular
                                        </span>
                                    )}
                                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg border ${city.isActive ? 'bg-white text-emerald-900 border-emerald-50' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                        {city.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-2xl font-black text-white">{city.name}</h3>
                                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {city.bikeCount || 0} Bikes Available
                                    </p>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-500 text-xs font-bold leading-relaxed line-clamp-2">
                                    {city.description}
                                </p>
                                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenModal(city)} className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-900 hover:bg-emerald-50 rounded-xl transition-all">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(city._id)} className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                        Last Updated: {new Date(city.updatedAt || Date.now()).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                        >
                            <div className="p-8 md:p-12">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                        {editingCity ? 'Edit Destination' : 'Add New Destination'}
                                    </h2>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">City Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Manali, India"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-emerald-600/40 transition-all font-bold text-slate-700"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">City Banner Image</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Preview & Upload Area */}
                                            <div className="relative h-40 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden group flex flex-col items-center justify-center gap-3">
                                                {formData.image ? (
                                                    <>
                                                        <img src={formData.image} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Upload className="w-8 h-8 text-white animate-bounce" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-slate-300">
                                                        <ImageIcon className="w-10 h-10" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">No Image Chosen</span>
                                                    </div>
                                                )}
                                                <input 
                                                    type="file" 
                                                    onChange={handleUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                    accept="image/*"
                                                />
                                            </div>

                                            {/* Manual URL Input */}
                                            <div className="flex flex-col justify-center space-y-3">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">OR paste image URL</p>
                                                <div className="relative">
                                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <input
                                                        type="url"
                                                        value={formData.image}
                                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                        placeholder="https://images.unsplash.com/..."
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 focus:outline-none focus:border-emerald-600/40 transition-all font-bold text-slate-700 text-xs"
                                                    />
                                                </div>
                                                <p className="text-[9px] text-emerald-600/60 font-medium italic">
                                                    💡 Tip: Upload high-res images for better visuals.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Marketing Description</label>
                                        <textarea
                                            required
                                            rows="3"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Short catchy description for the destination..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] py-4 px-6 focus:outline-none focus:border-emerald-600/40 transition-all font-bold text-slate-700 resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setFormData({ ...formData, isPopular: !formData.isPopular })}>
                                            {formData.isPopular ? (
                                                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                                            )}
                                            <span className="text-xs font-black text-emerald-900 uppercase tracking-tight">Mark as Popular Destination</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-emerald-900 text-white rounded-2xl py-5 font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                            {editingCity ? 'Save Changes' : 'Publish Destination'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCities;
