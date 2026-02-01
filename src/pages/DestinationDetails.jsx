import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, ArrowRight, Sun, Star, Car, Mountain, Heart, Zap, Shield, HelpCircle, FileText } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import { destinationsData } from '../data/destinations';
import API from '../utils/api';
import { Loader } from 'lucide-react';

const DestinationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                // First check static data
                if (destinationsData[id]) {
                    setData(destinationsData[id]);
                } else {
                    // Try fetching from API
                    const { data: pkgData } = await API.get(`/packages/${id}`);

                    // Determine enrichment key
                    const titleLower = pkgData.title.toLowerCase();
                    let enrichKey = null;
                    if (titleLower.includes('chakrata')) enrichKey = 'chakrata';
                    else if (titleLower.includes('spiti')) enrichKey = 'shimla';
                    else if (titleLower.includes('manali')) enrichKey = 'manali';
                    else if (titleLower.includes('ladakh')) enrichKey = 'ladakh';
                    else if (titleLower.includes('kashmir')) enrichKey = 'kashmir';
                    else if (titleLower.includes('sikkim')) enrichKey = 'sikkim';

                    const staticInfo = enrichKey ? destinationsData[enrichKey] : {};

                    // Map API fields and merge with static if available
                    const mergedData = {
                        ...staticInfo,
                        ...pkgData,
                        name: pkgData.title,
                        state: pkgData.location,
                        images: {
                            hero: pkgData.image || staticInfo.images?.hero || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600",
                        },
                        packageSummary: {
                            duration: pkgData.duration || staticInfo.packageSummary?.duration,
                            price: pkgData.price,
                            destinations: pkgData.location,
                        },
                        itinerary: (pkgData.itinerary && pkgData.itinerary.length > 0)
                            ? pkgData.itinerary.map(item => ({
                                day: item.day,
                                title: item.title,
                                desc: item.activity || item.description
                            }))
                            : (staticInfo.itinerary || [
                                { day: 1, title: "Arrival", desc: "Arrival and local sightseeing." },
                                { day: 2, title: "Exploration", desc: "Full day of adventure and sightseeing." },
                                { day: 3, title: "Departure", desc: "Return journey with beautiful memories." }
                            ]),
                        inclusions: (pkgData.inclusions && pkgData.inclusions.length > 0) ? pkgData.inclusions : (staticInfo.inclusions || ["Stay", "Meals", "Transfers"]),
                        exclusions: (pkgData.exclusions && pkgData.exclusions.length > 0) ? pkgData.exclusions : (staticInfo.exclusions || ["Personal expenses", "Tips"]),
                        faqs: staticInfo.faqs || [
                            { question: "Is this trip safe?", answer: "Yes, we providing experienced guides and 24/7 support." }
                        ],
                        packages: [{ price: pkgData.price }]
                    };

                    setData(mergedData);
                }
            } catch (error) {
                console.error("Failed to fetch destination details", error);
                navigate('/packages');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Destination Not Found</h2>
                <Link to="/packages">
                    <Button>Back to Packages</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen selection:bg-primary selection:text-white">
            <Navbar />

            {/* Simple Hero */}
            <section className="relative h-[60vh] flex items-center justify-center bg-slate-900 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] scale-105"
                    style={{ backgroundImage: `url("${data.images.hero}")` }}
                >
                    <div className="absolute inset-0 bg-slate-900/40"></div>
                </div>
                <div className="relative z-10 text-center text-white mt-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-lg">{data.title || data.name}</h1>
                        <p className="text-lg md:text-2xl text-slate-200 font-medium">{data.state}, India</p>
                    </motion.div>
                </div>
            </section>

            <main className="container-custom py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Content */}
                    <div className="lg:col-span-8">
                        {/* Tabs */}
                        <div className="flex border-b mb-10 overflow-x-auto">
                            {['overview', 'itinerary', 'inclusions', 'faq'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <h2 className="text-3xl font-bold text-slate-900">Experience the Unseen</h2>
                                <p className="text-slate-600 text-lg leading-relaxed">{data.description}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                        <Mountain className="w-6 h-6 text-primary mx-auto mb-3" />
                                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Altitude</p>
                                        <p className="font-bold text-slate-900">{data.altitude}</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                        <Sun className="w-6 h-6 text-secondary mx-auto mb-3" />
                                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Winter Temp</p>
                                        <p className="font-bold text-slate-900">{data.winterTemp}</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                        <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
                                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Duration</p>
                                        <p className="font-bold text-slate-900">{data.packageSummary.duration}</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                        <Star className="w-6 h-6 text-amber-500 mx-auto mb-3" />
                                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Rating</p>
                                        <p className="font-bold text-slate-900">5.0/5</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'itinerary' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                {data.itinerary.map((item) => (
                                    <div key={item.day} className="flex gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0">
                                            {item.day}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'inclusions' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">Inclusions</h3>
                                    {data.inclusions.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-600">
                                            <Shield className="w-4 h-4 text-emerald-500" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 text-slate-400">Exclusions</h3>
                                    {data.exclusions.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-400 line-through">
                                            <Zap className="w-4 h-4 text-slate-300" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'faq' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                                {data.faqs.map((faq, i) => (
                                    <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex items-start gap-4">
                                            <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.question}</h3>
                                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar / Booking Card */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Starting From</p>
                            <h2 className="text-4xl font-bold text-slate-900 mb-2">₹{data.packages[0].price.toLocaleString()}</h2>
                            <p className="text-slate-500 mb-8 pb-8 border-b italic">All-inclusive package price</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                    <Calendar className="w-4 h-4 text-primary" /> Flexible Dates
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                    <Heart className="w-4 h-4 text-rose-500" /> Couple Friendly
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                    <Car className="w-4 h-4 text-blue-500" /> Private Transport
                                </div>
                            </div>

                            {/* PDF Brochure Button */}
                            <a
                                href={`/brochures/${id}.pdf`}
                                download
                                className="w-full h-12 mb-3 flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-xl transition-colors border-2 border-amber-200"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const link = document.createElement('a');
                                    link.href = `/brochures/${id}.pdf`;
                                    link.target = '_blank';
                                    link.rel = 'noopener noreferrer';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                            >
                                <FileText className="w-5 h-5" />
                                View Brochure (PDF)
                            </a>

                            <Link to="/booking">
                                <Button className="w-full h-14 rounded-xl font-bold text-lg">Book This Trip</Button>
                            </Link>
                            <p className="text-center text-xs text-slate-400 mt-6">Secure booking with free cancellation support.</p>
                        </div>
                    </div>
                </div>
            </main>

            <CTA />
            <Footer />
        </div>
    );
};

export default DestinationDetails;
