import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Loader2, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';

const TopDestinations = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await API.get('/cities');
                // Filter only active cities and maybe limit to popular ones or first 6
                setCities(data.filter(c => c.isActive).slice(0, 6));
            } catch (error) {
                console.error("Failed to fetch cities for home page:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    if (loading) return (
        <div className="py-20 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
    );

    if (cities.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl text-center md:text-left">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-900 text-[10px] font-black uppercase tracking-widest mb-4"
                        >
                            <MapPin className="w-3 h-3" /> Explore India
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none"
                        >
                            Top <span className="text-emerald-900">Destinations</span> <br /> For Your Next Ride
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/packages" className="group flex items-center gap-3 text-slate-400 hover:text-emerald-900 font-black text-xs uppercase tracking-widest transition-all">
                            View All Cities <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cities.map((city, idx) => (
                        <motion.div
                            key={city._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <Link to="/packages" state={{ selectedCity: city.name }}>
                                <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                                    <img 
                                        src={city.image} 
                                        alt={city.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-[2px] bg-emerald-500" />
                                            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Explore</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-2">{city.name}</h3>
                                        <p className="text-white/60 text-xs font-medium line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            {city.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                                                <Bike className="w-3.5 h-3.5 text-emerald-400" />
                                                <span className="text-white text-[10px] font-black uppercase tracking-tight">{city.bikeCount || 'Many'} Bikes</span>
                                            </div>
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {city.isPopular && (
                                        <div className="absolute top-8 right-8 bg-emerald-600 text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl shadow-emerald-900/30">
                                            Popular
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopDestinations;
