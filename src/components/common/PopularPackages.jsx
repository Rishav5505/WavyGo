import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowUpRight, Loader, Zap, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Button from './Button';
import API from '../../utils/api';

const PopularPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking bike data for WavyGo demonstration
        const mockBikes = [
            {
                _id: "1",
                title: "Royal Enfield Classic 350",
                location: "Available in Delhi",
                price: "1,200",
                rating: "4.9",
                image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/183389/classic-350-right-side-view-50.jpeg?isig=0&q=80",
                duration: "Self-Drive",
                tag: "Bestseller",
                link: "/bike/65e5a2e1f1a2b3c4d5e6f001"
            },
            {
                _id: "2",
                title: "KTM Duke 390",
                location: "Available in Manali",
                price: "1,500",
                rating: "4.8",
                image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/148323/duke-390-right-side-view-14.png?isig=0&q=80",
                duration: "Self-Drive",
                tag: "Modern",
                link: "/bike/65e5a2e1f1a2b3c4d5e6f002"
            },
            {
                _id: "3",
                title: "Honda Activa 6G",
                location: "Available in Goa",
                price: "400",
                rating: "4.7",
                image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/44686/activa-6g-right-side-view-2.png?isig=0&q=80",
                duration: "Self-Drive",
                tag: "Economical",
                link: "/bike/65e5a2e1f1a2b3c4d5e6f003"
            },
            {
                _id: "4",
                title: "Honda Shine 125",
                location: "Available in Bangalore",
                price: "1,800",
                rating: "5.0",
                image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/45481/shine-right-side-view-12.jpeg?isig=0&q=100",
                duration: "Self-Drive",
                tag: "Bestseller",
                link: "/bike/65e5a2e1f1a2b3c4d5e6f004"
            }
        ];

        setPackages(mockBikes);
        setLoading(false);
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-24">
            <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
    );

    if (packages.length === 0) return null;

    return (
        <section className="pt-0 pb-8 md:pb-24 bg-slate-50 text-slate-900">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
                    <div className="text-left space-y-4">
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-none uppercase">Most Popular <br /><span className="text-primary">Ride</span></h2>
                        </Reveal>
                        <p className="max-w-xl text-slate-500 font-medium text-sm md:text-base leading-relaxed">The most powerful and stylish rides in the city, verified for performance and ready for your next adventure.</p>
                    </div>
                    <Link to="/packages">
                        <Button variant="outline" className="rounded-full px-10 h-[60px] border-slate-200 text-slate-600 font-bold tracking-widest uppercase text-[10px] hover:bg-primary hover:text-white transition-all">Explore Full Fleet</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 px-4 md:px-0">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col hover:shadow-[0_20px_40px_rgba(3,92,62,0.12)] transition-all duration-700 relative hover:-translate-y-2"
                        >
                            {/* Proximity & Availability Badge */}
                            <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 flex flex-col gap-1">
                                <div className="bg-white/60 backdrop-blur-2xl px-2.5 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-bold text-primary shadow-xl border border-white/40 flex items-center gap-1.5 md:gap-2">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse"></div>
                                    <MapPin className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> <span className="hidden sm:inline">0.8 KM AWAY</span><span className="inline sm:hidden">0.8 KM</span>
                                </div>
                                <div className="bg-rose-500/10 backdrop-blur-xl px-2.5 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl text-[8px] md:text-xs font-bold text-rose-600 shadow-lg border border-rose-100/50 flex items-center gap-1.5 md:gap-2 invisible group-hover:visible translate-x-4 group-hover:translate-x-0 transition-all">
                                    <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" /> 2 Left
                                </div>
                            </div>

                            <div className="relative h-28 md:h-48 overflow-hidden bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] flex items-center justify-center p-4 md:p-6">
                                <img src={pkg.image} className="max-w-full max-h-full object-contain scale-110 group-hover:scale-125 transition-transform duration-1000 mix-blend-multiply" alt={pkg.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            <div className="p-3 md:p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2 md:mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 flex-wrap">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 ${i < 4 ? 'text-secondary fill-secondary' : 'text-slate-200 fill-slate-200'}`} />
                                                ))}
                                            </div>
                                            <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">{pkg.rating} <span className="hidden sm:inline">Rating</span></span>
                                        </div>
                                        <h3 className="text-sm md:text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">{pkg.title}</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-4 md:mb-6">
                                    <div className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg md:rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                                            <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">Engine</span>
                                            <span className="text-[10px] md:text-xs font-semibold text-slate-700 leading-none truncate">Petrol</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg md:rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                                            <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">Start</span>
                                            <span className="text-[10px] md:text-xs font-semibold text-slate-700 leading-none truncate">Button</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex flex-col gap-2.5 md:gap-4">
                                    <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Price/Day</span>
                                            <div className="flex items-baseline gap-0.5 md:gap-1">
                                                <span className="text-base md:text-2xl font-bold text-primary">₹{pkg.price}</span>
                                            </div>
                                        </div>
                                        <Link to={pkg.link} className="h-fit hidden sm:block">
                                            <span className="text-[10px] font-black text-primary border-b-2 border-primary hover:text-black hover:border-black transition-all cursor-pointer tracking-widest uppercase">Details</span>
                                        </Link>
                                    </div>

                                    <Link to={pkg.link}>
                                        <Button className="w-full h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-900 text-white shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-2 md:gap-3 group/btn overflow-hidden">
                                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] z-10">Rent<span className="hidden sm:inline"> This Machine</span></span>
                                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform z-10" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularPackages;
