import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    Search, MapPin, Clock, Star, ArrowUpRight, Loader,
    X, Check, Gauge, Mountain, Sofa, Info, BarChart3, Plus
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import AIRoutePlanner from '../components/common/AIRoutePlanner';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Sparkles as SparklesIcon } from 'lucide-react';

const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (e) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (isMobile) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};

const MOCK_BIKES = [
    {
        _id: 'mock1',
        title: 'Royal Enfield Himalayan',
        location: 'Manali',
        price: 1200,
        category: 'Cruiser',
        image: '/images/bikes/himalayan.png',
        specs: { cc: 450, terrain: 'Mountain', transmission: 'Manual' },
        rating: 4.9,
        reviews: 245,
        isDemo: true
    },
    {
        _id: 'mock2',
        title: 'KTM Duke 390',
        location: 'Delhi',
        price: 1500,
        category: 'Sports',
        image: '/images/bikes/duke390.png',
        specs: { cc: 398, terrain: 'City', transmission: 'Manual' },
        rating: 4.8,
        reviews: 189,
        isDemo: true
    },
    {
        _id: 'mock3',
        title: 'Honda Activa 6G',
        location: 'Jaipur',
        price: 400,
        category: 'Commuter',
        image: '/images/bikes/activa.png',
        specs: { cc: 110, terrain: 'City', transmission: 'Automatic' },
        rating: 4.7,
        reviews: 320,
        isDemo: true
    },
    {
        _id: 'mock4',
        title: 'Triumph Speed 400',
        location: 'Bangalore',
        price: 1800,
        category: 'Premium',
        image: '/images/bikes/ninja.png', // User reference shows Ninja for Triumph
        specs: { cc: 400, terrain: 'City', transmission: 'Manual' },
        rating: 5.0,
        reviews: 142,
        isDemo: true
    },
    {
        _id: 'mock5',
        title: 'Royal Enfield Interceptor 650',
        location: 'Goa',
        price: 1800,
        category: 'Premium',
        image: '/images/bikes/interceptor.png',
        specs: { cc: 648, terrain: 'Coastal', transmission: 'Manual' },
        rating: 4.8,
        reviews: 145,
        isDemo: true
    },
    {
        _id: 'mock6',
        title: 'BMW G310 GS Adventure',
        location: 'Rishikesh',
        price: 1800,
        category: 'Cruiser',
        image: '/images/bikes/bmw310.png',
        specs: { cc: 310, terrain: 'Off-Road', transmission: 'Manual' },
        rating: 4.7,
        reviews: 56,
        isDemo: true
    },
    {
        _id: 'mock7',
        title: 'Kawasaki Ninja 400',
        location: 'Pune',
        price: 2500,
        category: 'Sports',
        image: '/images/bikes/ninja.png',
        specs: { cc: 399, terrain: 'Highway', transmission: 'Manual' },
        rating: 4.9,
        reviews: 78,
        isDemo: true
    },
    {
        _id: 'mock8',
        title: 'Harley Davidson X440',
        location: 'Mumbai',
        price: 2000,
        category: 'Premium',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=cover',
        specs: { cc: 440, terrain: 'City', transmission: 'Manual' },
        rating: 4.9,
        reviews: 210,
        isDemo: true
    }
];

const Packages = () => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompare, setSelectedCompare] = useState([]);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const [activeTerrain, setActiveTerrain] = useState('All');
    const [ccRange, setCcRange] = useState('All');
    const [showAiPlanner, setShowAiPlanner] = useState(false);

    // Grab selected city from route state (if coming from Home Page)
    const location = useLocation();
    const { selectedCity } = location.state || {};

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await API.get('/packages');
                setPackages(data || []);
            } catch (error) {
                console.error("Failed to fetch packages", error);
                setPackages([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const categories = ['All', 'Cruiser', 'Sports', 'Commuter', 'Premium'];
    const targetCity = selectedCity ? selectedCity.split(',')[0].trim().toLowerCase() : (user?.location?.toLowerCase() || "");

    const allItems = [...packages, ...MOCK_BIKES];

    const filteredPackages = allItems.filter(pkg => {
        const matchesCategory = activeCategory === 'All' || pkg.category === activeCategory;
        const matchesTerrain = activeTerrain === 'All' || (pkg.specs && pkg.specs.terrain === activeTerrain);
        const matchesCC = ccRange === 'All' || (pkg.specs && (
            ccRange === '0-200' ? pkg.specs.cc <= 200 :
                ccRange === '200-400' ? (pkg.specs.cc > 200 && pkg.specs.cc <= 400) :
                    pkg.specs.cc > 400
        ));

        // Location filtering logic
        const matchesSelectedCity = !targetCity || pkg.location.toLowerCase().includes(targetCity);

        const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.location.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesTerrain && matchesCC && matchesSearch && matchesSelectedCity;
    });

    const toggleCompare = (bike) => {
        if (selectedCompare.find(b => b._id === bike._id)) {
            setSelectedCompare(selectedCompare.filter(b => b._id !== bike._id));
        } else if (selectedCompare.length < 2) {
            setSelectedCompare([...selectedCompare, bike]);
        }
    };

    return (
        <div className="bg-[#f8f9fa] min-h-screen selection:bg-primary selection:text-white">
            <Navbar />

            {/* Header / Hero Section - WavyGo Green Theme */}
            <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 bg-[#035c3e] text-center text-white overflow-hidden">
                <div className="container-custom relative z-10 px-4">
                    {targetCity && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/10"
                        >
                            <MapPin className="w-4 h-4 text-white" />
                            <span className="text-xs font-black uppercase tracking-widest text-white">Showing Machines in {targetCity}</span>
                        </motion.div>
                    )}
                    <Reveal center width="100%">
                        <h1 className="text-4xl md:text-[5rem] font-black mb-3 md:mb-4 tracking-tighter leading-tight md:leading-none uppercase">
                            {selectedCity ? selectedCity.split(',')[0].trim() : "Rental"} <span className="text-white">Fleet</span>
                        </h1>
                    </Reveal>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-sm md:text-lg text-white/70 max-w-2xl mx-auto font-medium tracking-tight px-2"
                    >
                        {targetCity 
                            ? `Only verified machines and professional vendors from ${targetCity} region.` 
                            : "Choose your machine for the next big adventure."}
                    </motion.p>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -ml-64 -mb-64"></div>
                </div>
            </section>



            {/* Compact Filter & Search Bar */}
            <section className="relative z-20 -mt-8 md:-mt-12 px-4">
                <div className="container-custom max-w-5xl">
                    <div className="bg-white rounded-3xl p-4 md:p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100">
                        <div className="flex flex-col lg:flex-row items-center gap-4 justify-between mb-5">
                            {/* Categories Pills */}
                            <div className="flex flex-wrap items-center justify-center gap-2 order-2 lg:order-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search Pill */}
                            <div className="relative w-full lg:max-w-xs group order-1 lg:order-2">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-primary z-10" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Find your machine..."
                                    className="w-full bg-slate-50 border border-transparent rounded-full pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Smart Filters Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 shrink-0">Terrain:</span>
                                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                                    {['All', 'Mountains', 'Highway', 'City'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setActiveTerrain(t)}
                                            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all whitespace-nowrap ${activeTerrain === t ? 'bg-primary/10 text-primary' : 'bg-slate-50/50 text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 shrink-0">Engine:</span>
                                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                                    {['All', '0-200', '200-400', '400+'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setCcRange(c)}
                                            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all whitespace-nowrap ${ccRange === c ? 'bg-primary/10 text-primary' : 'bg-slate-50/50 text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {c === 'All' ? 'Any CC' : c + ' CC'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Listings */}
            <section className="py-8 md:py-20">
                <div className="container-custom">
                    {loading ? (
                        <div className="flex items-center justify-center py-40">
                            <Loader className="w-10 h-10 text-primary animate-spin" />
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {filteredPackages.length > 0 ? (
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {filteredPackages.map((pkg, i) => (
                                        <TiltCard key={pkg._id} className="perspective-1000">
                                            <div
                                                className="group bg-white rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col hover:shadow-[0_40px_80px_-20px_rgba(3,92,62,0.15)] transition-all duration-500 relative h-full"
                                            >
                                                {/* Category Badge & Compare Toggle */}
                                                <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-center" style={{ transform: "translateZ(30px)" }}>
                                                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-primary border border-primary/10 shadow-sm uppercase tracking-widest max-w-[120px] truncate">
                                                        {pkg.category}
                                                    </div>
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); toggleCompare(pkg); }}
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedCompare.find(b => b._id === pkg._id) ? 'bg-primary text-white scale-110' : 'bg-white/90 text-slate-400 hover:text-primary'}`}
                                                    >
                                                        {selectedCompare.find(b => b._id === pkg._id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                    </button>
                                                </div>

                                                {/* Image Container - Mint Green Theme Isolation */}
                                                <div className="relative h-56 overflow-hidden rounded-t-[2rem] bg-[#effaf6] flex items-center justify-center p-6" style={{ transform: "translateZ(20px)" }}>
                                                    <img
                                                        src={pkg.image}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        alt={pkg.title}
                                                    />
                                                </div>

                                                <div className="p-6 flex-grow flex flex-col" style={{ transform: "translateZ(25px)" }}>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-1.5 mb-2">
                                                                <div className="flex">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-secondary fill-secondary' : 'text-slate-200 fill-slate-200'}`} />
                                                                    ))}
                                                                </div>
                                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{pkg.rating} Rating</span>
                                                            </div>
                                                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors">{pkg.title}</h3>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                                                                <MapPin className="w-3 h-3 text-primary" /> {pkg.location}
                                                                <span className="mx-2 text-slate-200">|</span>
                                                                <span className="text-primary font-black lowercase underline underline-offset-2 decoration-primary/20">{pkg.vendorName}</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Specs Grid */}
                                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                                        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                                                            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-xs">
                                                                <Clock className="w-3.5 h-3.5 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Duration</span>
                                                                <span className="text-[10px] font-bold text-slate-700 leading-none truncate">{pkg.duration}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                                                            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-xs">
                                                                <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Type</span>
                                                                <span className="text-[10px] font-bold text-slate-700 leading-none">Self-Drive</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-auto pt-5 border-t border-slate-50">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex flex-col">
                                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 pointer-events-none">Price / Day</span>
                                                                <div className="flex items-baseline gap-1">
                                                                    <span className="text-2xl font-black text-primary">₹{pkg.price.toLocaleString()}</span>
                                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">/Unlimited</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Link to={`/bike/${pkg._id}`}>
                                                            <Button className="w-full h-12 rounded-xl bg-slate-950 text-white shadow-xl hover:bg-primary transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                                                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Book This Bike</span>
                                                                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </TiltCard>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="text-center py-40">
                                    <h3 className="text-2xl font-bold text-slate-900">No trails found.</h3>
                                    <p className="text-slate-500 mt-2">Try searching for something else.</p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                        className="mt-6 text-primary font-bold underline"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </section>



            {/* Sticky Compare Bar */}
            <AnimatePresence>
                {selectedCompare.length > 0 && !showCompareModal && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-[115px] md:bottom-10 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[92%] md:max-w-xl z-[999]"
                    >
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2 md:-space-x-3 pointer-events-none">
                                    {selectedCompare.map(b => (
                                        <motion.div
                                            layoutId={`compare-${b._id}`}
                                            key={b._id}
                                            className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#e2f3ee] overflow-hidden bg-white shadow-lg"
                                        >
                                            <img src={b.image} className="w-full h-full object-cover" alt={b.title} />
                                        </motion.div>
                                    ))}
                                    {selectedCompare.length < 2 && (
                                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#e2f3ee] bg-white flex items-center justify-center border-dashed">
                                            <Plus className="w-3 h-3 text-slate-300" />
                                        </div>
                                    )}
                                </div>
                                <div className="hidden sm:block">
                                    <h4 className="text-slate-900 font-black text-[9px] uppercase tracking-[0.2em] mb-0.5">
                                        {selectedCompare.length === 1 ? 'Add machine to compare' : 'Comparison Ready'}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 w-20 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-primary"
                                                animate={{ width: selectedCompare.length === 1 ? '50%' : '100%' }}
                                            />
                                        </div>
                                        <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">{selectedCompare.length}/2</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 md:gap-4 font-black">
                                <button
                                    onClick={() => setSelectedCompare([])}
                                    className="px-3 py-2 text-[9px] text-slate-500 uppercase tracking-widest hover:text-rose-500 transition-colors"
                                >
                                    Clear
                                </button>
                                <button
                                    disabled={selectedCompare.length < 2}
                                    onClick={() => setShowCompareModal(true)}
                                    className={`px-5 py-2.5 md:px-8 md:py-3.5 rounded-xl text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${selectedCompare.length < 2 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95'}`}
                                >
                                    {selectedCompare.length < 2 ? 'Select 2' : 'Compare Now'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Comparison Modal */}
            <AnimatePresence>
                {showCompareModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="bg-[#e2f3ee] w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col"
                        >
                            {/* Modal Header - Fixed */}
                            <div className="p-5 md:p-8 flex justify-between items-center bg-[#e2f3ee] border-b border-slate-900/10 z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                    </div>
                                    <h2 className="text-lg md:text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                                        Machine <br className="sm:hidden" /> <span className="text-primary">Versus</span>
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setShowCompareModal(false)}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-rose-500 hover:rotate-90 transition-all duration-300 shadow-sm border border-slate-100"
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-grow custom-scrollbar">
                                <div className="grid grid-cols-2 md:grid-cols-3 md:min-w-0">
                                    {/* Feature Labels Column (Desktop Only) */}
                                    <div className="hidden md:flex flex-col bg-slate-900/5 p-8 pt-[320px] gap-0 border-r border-slate-900/10">
                                        {[
                                            { label: 'Engine', icon: Gauge },
                                            { label: 'Terrain', icon: Mountain },
                                            { label: 'Comfort', icon: Sofa },
                                            { label: 'Mileage', icon: BarChart3 },
                                            { label: 'Rank', icon: Star }
                                        ].map((item, i) => (
                                            <div key={i} className="h-16 flex items-center gap-4 text-slate-500 uppercase tracking-[0.2em] font-black text-[9px] border-b border-slate-900/5 last:border-0">
                                                <item.icon className="w-4 h-4 text-slate-400" /> {item.label}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Comparison Bikes */}
                                    {selectedCompare.map((bike, idx) => (
                                        <div key={bike._id} className={`p-3 md:p-8 text-center flex flex-col items-center border-slate-900/10 ${idx === 0 ? 'border-r' : ''}`}>
                                            {/* Bike Profile Card */}
                                            <div className="w-full mb-4 md:mb-8">
                                                <div className="relative aspect-[4/3] bg-white/50 backdrop-blur-sm rounded-xl md:rounded-[2rem] mb-3 md:mb-6 flex items-center justify-center p-2 md:p-8 border border-white/40 group overflow-hidden shadow-inner">
                                                    <img
                                                        src={bike.image}
                                                        className="w-full h-full object-contain mix-blend-multiply scale-100 md:scale-110 group-hover:scale-125 transition-transform duration-700"
                                                        alt={bike.title}
                                                    />
                                                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/80 backdrop-blur-md px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[6px] md:text-[8px] font-black text-primary border border-primary/20 shadow-sm uppercase tracking-widest">
                                                        {bike.category}
                                                    </div>
                                                </div>
                                                <h3 className="text-[10px] md:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-0.5 leading-tight line-clamp-1">{bike.title}</h3>
                                                <p className="text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">{bike.location}</p>
                                            </div>
                                            {/* Specs Rows */}
                                            <div className="w-full space-y-1 md:space-y-0">
                                                {[
                                                    { label: 'Engine', value: `${bike.specs.cc}`, type: 'text' },
                                                    { label: 'Terrain', value: bike.specs.terrain, type: 'text' },
                                                    { label: 'Comfort', value: bike.specs.comfort, type: 'stars' },
                                                    { label: 'Mileage', value: `${bike.specs.mileage}`, type: 'text' },
                                                    { label: 'Rating', value: `${bike.rating}`, type: 'highlight' }
                                                ].map((row, i) => (
                                                    <div key={i} className="h-12 md:h-16 flex flex-col md:flex-row items-center justify-center md:border-b border-slate-900/10 last:border-0 relative">
                                                        <span className="md:hidden text-[6px] font-black text-slate-300 uppercase tracking-widest">{row.label}</span>

                                                        {row.type === 'text' && (
                                                            <span className="text-xs md:text-lg font-black text-slate-800 tracking-tight">{row.value}</span>
                                                        )}

                                                        {row.type === 'stars' && (
                                                            <div className="flex gap-0.5">
                                                                {[...Array(5)].map((_, s) => (
                                                                    <Star key={s} className={`w-2 h-2 md:w-3.5 md:h-3.5 ${s < row.value ? 'text-secondary fill-secondary' : 'text-slate-100 fill-slate-100'}`} />
                                                                ))}
                                                            </div>
                                                        )}

                                                        {row.type === 'highlight' && (
                                                            <span className="text-xs md:text-lg font-black text-primary tracking-tight">{row.value}★</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            <Link to={`/bike/${bike._id}`} className="mt-4 md:mt-8 w-full">
                                                <Button className="w-full h-10 md:h-14 rounded-xl md:rounded-2xl bg-slate-950 text-white shadow-xl hover:bg-primary transition-all font-black uppercase tracking-widest text-[7px] md:text-[9px] flex items-center justify-center gap-2">
                                                    Book <Check className="w-3 h-3" />
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}

                                    {/* Empty Slot if only 1 bike */}
                                    {selectedCompare.length < 2 && (
                                        <div className="hidden md:flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-slate-100 m-6 rounded-[2.5rem] bg-slate-50/30">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                                <Plus className="w-6 h-6 text-slate-300" />
                                            </div>
                                            <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[9px] leading-relaxed">
                                                Select second bike<br /><span className="text-primary/40">to compare</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Route Planner Modal */}
            <AnimatePresence>
                {showAiPlanner && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden relative"
                        >
                            <AIRoutePlanner onClose={() => setShowAiPlanner(false)} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Planner Floating Button */}
            {!showAiPlanner && (
                <motion.button
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAiPlanner(true)}
                    className="fixed bottom-[180px] md:bottom-[100px] right-6 z-[900] bg-slate-950 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <SparklesIcon className="w-5 h-5 text-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] relative z-10">AI Trip Planner</span>
                </motion.button>
            )}

            <Footer />
        </div>
    );
};

export default Packages;
