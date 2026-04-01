import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, MapPin } from 'lucide-react';
import API from '../../utils/api';

const POPULAR_CITIES = [
    { name: "Delhi", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1587474260584-136574528ed5&w=400&h=400&fit=cover" },
    { name: "Mumbai", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1566552881560-0be862a7c445&w=400&h=400&fit=cover" },
    { name: "Bangalore", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1596176530529-78163a4f7af2&w=400&h=400&fit=cover" },
    { name: "Pune", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1562016600-ece13e8ba570&w=400&h=400&fit=cover" },
    { name: "Jaipur", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1477587458883-47145ed94245&w=400&h=400&fit=cover" },
    { name: "Goa", img: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Palolem_beach%2CGoa_-_panoramio.jpg" },
    { name: "Ahmedabad", img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Riverfront_Ahmedabad.jpg" },
    { name: "Chandigarh", img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/New_Chandigarh_Skyline.jpg" },
    { name: "Hyderabad", img: "https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg" },
    { name: "Dehradun", img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Dehradun_clock_tower_picture.jpg" },
    { name: "Rishikesh", img: "https://upload.wikimedia.org/wikipedia/commons/4/46/Laxmanjhula.jpg" },
    { name: "Manali", img: "https://upload.wikimedia.org/wikipedia/commons/0/03/Manali_City.jpg" },
];

const CitySelectorModal = ({ isOpen, onClose, onSelect, allCities }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [dbCities, setDbCities] = useState([]);

    useEffect(() => {
        const fetchDbCities = async () => {
            try {
                const { data } = await API.get('/cities');
                setDbCities(data.filter(c => c.isActive));
            } catch (error) {
                console.error("Failed to fetch cities for modal:", error);
            }
        };
        fetchDbCities();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredCities([]);
        } else {
            // Combine hardcoded and DB cities for search
            const combined = [...new Set([...allCities, ...dbCities.map(c => c.name)])];
            const results = combined.filter(city =>
                city.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 10);
            setFilteredCities(results);
        }
    }, [searchTerm, allCities, dbCities]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <MapPin className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                        Select Your City
                                    </h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Premium Rentals in 50+ Cities</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors group"
                            >
                                <X className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="p-6 md:px-8 pt-6">
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search or type city to select..."
                                    autoFocus
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
                            {/* Search Results */}
                            {searchTerm.trim() !== '' && (
                                <div className="mb-8">
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 ml-1">Search Results</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {filteredCities.length > 0 ? (
                                            filteredCities.map((city, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        onSelect(city.split(',')[0]);
                                                        onClose();
                                                    }}
                                                    className="flex items-center gap-4 p-3 hover:bg-primary/5 rounded-xl transition-all group text-left border border-transparent hover:border-primary/20"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary flex items-center justify-center transition-colors">
                                                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-white" />
                                                    </div>
                                                    <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">{city}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-500 font-medium p-4 italic">No cities found matching "{searchTerm}"</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Popular Cities Grid */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 ml-1">Popular Destinations</h4>
                                {dbCities.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mb-10">
                                        {dbCities.map((city, idx) => (
                                            <motion.button
                                                key={`db-${idx}`}
                                                whileHover={{ y: -5 }}
                                                onClick={() => {
                                                    onSelect(city.name);
                                                    onClose();
                                                }}
                                                className="group flex flex-col items-center gap-3"
                                            >
                                                <div className="relative w-full aspect-square rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-lg group-hover:shadow-emerald-500/20 transition-all border-2 border-transparent group-hover:border-emerald-500">
                                                    <img
                                                        src={city.image}
                                                        alt={city.name}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <span className="text-sm font-black text-slate-700 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                                                    {city.name}
                                                </span>
                                            </motion.button>
                                        ))}
                                    </div>
                                )}

                                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 ml-1">Other Popular Destinations</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                                    {POPULAR_CITIES.filter(pc => !dbCities.some(db => db.name.toLowerCase() === pc.name.toLowerCase())).map((city, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            onClick={() => {
                                                onSelect(city.name);
                                                onClose();
                                            }}
                                            className="group flex flex-col items-center gap-3"
                                        >
                                            <div className="relative w-full aspect-square rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-lg group-hover:shadow-primary/20 transition-all border-2 border-transparent group-hover:border-primary">
                                                <img
                                                    src={city.img}
                                                    alt={city.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-sm font-black text-slate-700 group-hover:text-primary transition-colors uppercase tracking-tight">
                                                {city.name}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WavyGo • Verified Machines • No Security Deposit</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CitySelectorModal;
