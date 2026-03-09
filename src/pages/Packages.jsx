import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, MapPin, Clock, Star, ArrowUpRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import API from '../utils/api';

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

const Packages = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await API.get('/packages');
                if (data && data.length > 0) {
                    setPackages(data);
                } else {
                    throw new Error("Empty data");
                }
            } catch (error) {
                console.error("Failed to fetch packages, using mock data", error);
                const mockBikes = [
                    {
                        _id: "65e5a2e1f1a2b3c4d5e6f001",
                        title: "Royal Enfield Himalayan",
                        location: "Delhi / Manali",
                        price: 1200,
                        rating: "4.9",
                        category: "Cruiser",
                        image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/183389/classic-350-right-side-view-50.jpeg?isig=0&q=80",
                        duration: "24 Hours"
                    },
                    {
                        _id: "65e5a2e1f1a2b3c4d5e6f002",
                        title: "KTM Duke 390",
                        location: "Delhi / Pune",
                        price: 1500,
                        rating: "4.8",
                        category: "Sports",
                        image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/148323/duke-390-right-side-view-14.png?isig=0&q=80",
                        duration: "24 Hours"
                    },
                    {
                        _id: "65e5a2e1f1a2b3c4d5e6f003",
                        title: "Honda Activa 6G",
                        location: "Goa / Jaipur",
                        price: 400,
                        rating: "4.7",
                        category: "Commuter",
                        image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/44686/activa-6g-right-side-view-2.png?isig=0&q=80",
                        duration: "24 Hours"
                    },
                    {
                        _id: "65e5a2e1f1a2b3c4d5e6f004",
                        title: "Triumph Speed 400",
                        location: "Bangalore",
                        price: 1800,
                        rating: "5.0",
                        category: "Premium",
                        image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
                        duration: "24 Hours"
                    }
                ];
                setPackages(mockBikes);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const categories = ['All', 'Cruiser', 'Sports', 'Commuter', 'Premium'];

    const filteredPackages = packages.filter(pkg => {
        const matchesCategory = activeCategory === 'All' || pkg.category === activeCategory;
        const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-[#f8f9fa] min-h-screen selection:bg-primary selection:text-white">
            <Navbar />

            {/* Header / Hero Section - WavyGo Green Theme */}
            <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 bg-[#035c3e] text-center text-white overflow-hidden">
                <div className="container-custom relative z-10 px-4">
                    <Reveal center width="100%">
                        <h1 className="text-4xl md:text-[5rem] font-black mb-3 md:mb-4 tracking-tighter leading-tight md:leading-none italic uppercase">
                            Rental <span className="text-white NOT-italic">Fleet</span>
                        </h1>
                    </Reveal>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-sm md:text-lg text-white/70 max-w-2xl mx-auto font-medium tracking-tight px-2"
                    >
                        Choose your machine for the next big adventure.
                    </motion.p>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-20"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[150px] opacity-10"></div>
                </div>
            </section>

            {/* Premium Filter & Search Bar - Pill Design */}
            <section className="relative z-20 -mt-10 md:-mt-16 px-4">
                <div className="container-custom max-w-6xl">
                    <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-4 md:p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
                        {/* Categories Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 order-2 md:order-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-3 md:px-9 md:py-4.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.15em] transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-[#035c3e] text-white shadow-lg shadow-[#035c3e]/20 scale-105'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Pill */}
                        <div className="relative w-full md:max-w-md group flex-grow order-1 md:order-2">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 group-focus-within:text-[#035c3e] transition-colors z-10" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search machines..."
                                className="w-full bg-slate-50 border border-transparent hover:border-slate-200 rounded-full pl-14 pr-6 py-4 md:py-5 text-sm md:text-base font-semibold text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#035c3e]/20 focus:bg-white transition-all shadow-inner"
                            />
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
                                                className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col hover:shadow-[0_40px_80px_-20px_rgba(3,92,62,0.15)] transition-all duration-500 relative h-full"
                                            >
                                                {/* Category Badge */}
                                                <div className="absolute top-5 left-5 z-20" style={{ transform: "translateZ(30px)" }}>
                                                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-primary border border-primary/10 shadow-sm uppercase tracking-widest">
                                                        {pkg.category}
                                                    </div>
                                                </div>

                                                {/* Image Container - Premium Gradient + Blend Mode */}
                                                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] flex items-center justify-center p-2" style={{ transform: "translateZ(20px)" }}>
                                                    <img
                                                        src={pkg.image}
                                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 mix-blend-multiply"
                                                        alt={pkg.title}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#035c3e]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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

            <Footer />
        </div>
    );
};

export default Packages;
