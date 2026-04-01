import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Star, MessageSquare, Plus, Trash2, Edit2, 
    CheckCircle2, XCircle, User, MapPin, 
    Camera, Loader2, X, Quote, Save
} from 'lucide-react';
import API from '../../utils/api';
import Button from '../../components/common/Button';

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        role: 'Traveller',
        comment: '',
        rating: 5,
        image: '',
        city: '',
        isActive: true
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data } = await API.get('/testimonials/admin');
            setTestimonials(data);
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('image', file);
        setUploading(true);

        try {
            const { data } = await API.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const fullPath = data.startsWith('http') ? data : `${API.defaults.baseURL.replace('/api', '')}${data}`;
            setFormData({ ...formData, image: fullPath });
        } catch (error) {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTestimonial) {
                await API.put(`/testimonials/${editingTestimonial._id}`, formData);
                alert('Testimonial updated!');
            } else {
                await API.post('/testimonials', formData);
                alert('Testimonial added!');
            }
            setModalOpen(false);
            setEditingTestimonial(null);
            resetForm();
            fetchTestimonials();
        } catch (error) {
            alert('Save failed');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            role: 'Traveller',
            comment: '',
            rating: 5,
            image: '',
            city: '',
            isActive: true
        });
    };

    const handleEdit = (t) => {
        setEditingTestimonial(t);
        setFormData({
            name: t.name,
            role: t.role,
            comment: t.comment,
            rating: t.rating,
            image: t.image,
            city: t.city || '',
            isActive: t.isActive
        });
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this testimonial?')) {
            try {
                await API.delete(`/testimonials/${id}`);
                fetchTestimonials();
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const toggleStatus = async (t) => {
        try {
            await API.put(`/testimonials/${t._id}`, { isActive: !t.isActive });
            fetchTestimonials();
        } catch (error) {
            alert('Update failed');
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-900 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
                        <Quote className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Social Proof</h1>
                        <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                            Manage customer testimonials and stories
                        </p>
                    </div>
                </div>

                <Button 
                    onClick={() => {
                        resetForm();
                        setEditingTestimonial(null);
                        setModalOpen(true);
                    }}
                    className="bg-emerald-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-emerald-900/20 hover:scale-105 transition-all font-black uppercase tracking-widest text-xs"
                >
                    <Plus className="w-5 h-5" /> Add New Story
                </Button>
            </div>

            {/* Testimonials Grid */}
            {loading ? (
                <div className="py-20 flex justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-emerald-900" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <motion.div
                            key={t._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-emerald-900/5 relative ${!t.isActive ? 'opacity-60' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-sm relative">
                                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${t.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900">{t.name}</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                                    ))}
                                </div>
                            </div>

                            <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8">
                                "{t.comment}"
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                    <MapPin className="w-3 h-3" /> {t.city || 'Adventure Destination'}
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={() => toggleStatus(t)} className={`p-2 rounded-xl transition-colors ${t.isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50'}`}>
                                        <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleEdit(t)} className="p-2 text-slate-400 hover:text-emerald-900 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(t._id)} className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-xl transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

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
                                    <h2 className="text-2xl font-black text-slate-900">{editingTestimonial ? 'Update Story' : 'New Client Story'}</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Capture authentic experiences</p>
                                </div>
                                <button onClick={() => setModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </header>

                            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Client Name</label>
                                            <div className="relative">
                                                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-900/20" />
                                                <input
                                                    type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm"
                                                    placeholder="John Doe" required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Client Role (Label)</label>
                                            <select
                                                value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm appearance-none cursor-pointer"
                                            >
                                                <option>Traveller</option>
                                                <option>Vlogger</option>
                                                <option>Influencer</option>
                                                <option>Student</option>
                                                <option>Digital Nomad</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Avatar / Image</label>
                                            <div className="relative group/up overflow-hidden bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-900/20 transition-all h-[116px] flex flex-col items-center justify-center cursor-pointer">
                                                <input type="file" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                {uploading ? (
                                                    <Loader2 className="w-6 h-6 animate-spin text-emerald-900" />
                                                ) : formData.image ? (
                                                    <div className="w-full h-full flex items-center justify-center p-2">
                                                        <img src={formData.image} alt="Preview" className="h-full rounded-xl object-contain shadow-sm" />
                                                    </div>
                                                ) : (
                                                    <div className="text-center">
                                                        <Camera className="w-6 h-6 text-slate-300 mx-auto mb-1 group-hover/up:text-emerald-900 transition-colors" />
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Select Photo</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Destination City</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-900/20" />
                                            <input
                                                type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm"
                                                placeholder="Shimla, Manali..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Rating Strength</label>
                                        <div className="flex items-center gap-4 bg-slate-50 h-[60px] px-6 rounded-2xl">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star} type="button" onClick={() => setFormData({...formData, rating: star})}
                                                    className="transition-transform active:scale-90"
                                                >
                                                    <Star className={`w-5 h-5 ${star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                                                </button>
                                            ))}
                                            <span className="ml-auto font-black text-slate-400 text-xs">{formData.rating}/5</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Client Feedback</label>
                                    <textarea
                                        value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})}
                                        className="w-full bg-slate-50 border-none rounded-[2rem] p-8 focus:ring-2 focus:ring-emerald-900/10 font-bold text-slate-700 transition-all outline-none shadow-sm min-h-[160px] resize-none"
                                        placeholder="The experience was absolutely mind-blowing..." required
                                    />
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
                                        <Save className="w-5 h-5" /> {editingTestimonial ? 'Update Story' : 'Publish Review'}
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

export default AdminTestimonials;
