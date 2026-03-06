import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Star, MapPin, Clock, ArrowLeft, CheckCircle, Shield, Gauge, Fuel, Zap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import API from '../utils/api';

const BikeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);

    // 360 viewer mechanics
    const x = useMotionValue(0);
    // When dragged horizontally, we map x drag distance (-200..200) to rotation angle (-180..180)
    const rotateY = useTransform(x, [-200, 200], [-180, 180]);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                // If the package exist via API
                const { data } = await API.get('/packages');
                let foundBike = data.find(p => p._id === id);
                if (foundBike) setBike(foundBike);
                else throw new Error("Not found in API");
            } catch (error) {
                console.log("Using Mock in Details page");
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
                setBike(mockBikes.find(b => b._id === id));
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#035c3e] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Bike Not Found</h1>
                <Button onClick={() => navigate('/packages')}>Back to Packages</Button>
            </div>
        );
    }

    return (
        <div className="bg-[#f8f9fa] min-h-screen">
            <Navbar />

            <div className="pt-24 pb-12 bg-[#035c3e]">
                <div className="container-custom px-4 text-white">
                    <button
                        onClick={() => navigate('/packages')}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 text-sm font-semibold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Fleet
                    </button>
                </div>
            </div>

            <section className="py-12 px-4 -mt-10">
                <div className="container-custom max-w-6xl">
                    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

                        {/* 360 Viewer Section */}
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden h-[500px]">
                            {/* Decorative Background */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#035c3e]/5 rounded-full blur-[50px]"></div>
                            </div>

                            <motion.div
                                className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center perspective-[1000px]"
                                drag="x"
                                dragConstraints={{ left: -300, right: 300 }}
                                style={{ x }}
                            >
                                <motion.div style={{ rotateY }} className="w-full h-full flex items-center justify-center">
                                    <img
                                        src={bike.image}
                                        alt={bike.title}
                                        className="max-w-[120%] max-h-[120%] object-contain pointer-events-none drop-shadow-2xl"
                                    />
                                </motion.div>
                            </motion.div>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2 pointer-events-none">
                                <div className="w-2 h-2 rounded-full bg-[#035c3e] animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#035c3e]">Drag to Rotate 360°</span>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-6">
                                <div className="inline-block bg-[#035c3e]/10 text-[#035c3e] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                    {bike.category}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                                    {bike.title}
                                </h1>

                                <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                                        <span className="text-slate-700">{bike.rating} Rating</span>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-[#035c3e]" />
                                        <span>{bike.location}</span>
                                    </div>
                                </div>

                                <div className="text-3xl font-black text-[#035c3e] flex items-end gap-2 mb-8 border-b border-slate-100 pb-8">
                                    ₹{bike.price.toLocaleString()}
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">/ 24 Hours (Unlimited KMs)</span>
                                </div>

                                {/* Feature Highlights */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#035c3e]">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Insurance</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Fully covered rides</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#035c3e]">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Support</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">24/7 Roadside Assist</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#035c3e]">
                                            <Fuel className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Tank Capacity</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">15L - Long haul ready</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#035c3e]">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Quick Start</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Keyless / Electric start</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={() => navigate(`/booking?packageId=${bike._id}`)}
                                className="w-full h-14 rounded-2xl bg-[#035c3e] text-white shadow-xl shadow-[#035c3e]/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#035c3e]/40 transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
                            >
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-black uppercase tracking-[0.2em]">Proceed to Booking</span>
                            </Button>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BikeDetails;
